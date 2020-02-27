import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Navbar from "./components/layout/Navbar"
import Search from "./components/users/Search"
import Users from "./components/users/Users"

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export default class App extends Component {
    state = {
        users: [],
        loading: false,
        hasError: false
    }

    async componentDidMount() {
        this.setState({
            loading: true,
            hasError: false
        })
        try {
            const res = await axios.get(`https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`)
            this.setState({
                users: res.data,
                loading: false,
                hasError: false
            })
        } catch (err) {
            this.setState({
                users: [],
                loading: false,
                hasError: true
            })
        }
    }

    searchUsers = async (text) => {
        this.setState({
            loading: true,
            hasError: false
        })
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`)
            this.setState({
                users: res.data.items,
                loading: false,
                hasError: false
            })
        } catch (err) {
            this.setState({
                users: [],
                loading: false,
                hasError: true
            })
        }
    }

    render () {
        const { loading, users, hasError } = this.state

        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Search searchUsers={this.searchUsers} />
                    <Users error={hasError} loading={loading} users={users} />
                </div>
            </div>
        )
  }
}


