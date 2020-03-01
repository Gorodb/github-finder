import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

import Navbar from "./components/layout/Navbar"
import Search from "./components/users/Search"
import Users from "./components/users/Users"
import User from "./components/users/User"
import Alert from "./components/layout/Alert"
import About from "./components/pages/About"

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
const client = `client_id=${clientId}&client_secret=${clientSecret}`

export default class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        hasError: false,
        alert: null
    }

    userRequest = (userName) => axios.get(`https://api.github.com/users/${userName}?${client}`)
    userRepoRequest = (userName) => axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&${client}`)
    searchUsersRequest = (text) => axios.get(`https://api.github.com/search/users?q=${text}&${client}`)

    getUsers = async (users) => {
        this.setState({
            loading: true,
            hasError: false
        })
        try {
            this.setState({
                users: await users,
                loading: false,
                hasError: false
            })
        } catch (err) {
            this.setState({
                users: [],
                loading: false,
                hasError: true,
                alert: {msg: 'An Error!', type: 'danger'}
            })
        }
    }

    getUser = async (userName) => {
        this.setState({
            loading: true
        })
        try {
            this.setState({
                user: (await this.userRequest(userName)).data,
                loading: false
            })
        } catch (err) {
            this.setState({
                user: [],
                loading: false,
                alert: {msg: 'An Error!', type: 'danger'}
            })
        }
    }

    getUserRepo = async (userName) => {
        this.setState({
            loading: true
        })
        try {
            this.setState({
                repos: (await this.userRepoRequest(userName)).data,
                loading: false
            })
        } catch (err) {
            this.setState({
                user: [],
                loading: false,
                alert: {msg: 'An Error!', type: 'danger'}
            })
        }
    }

    searchUsers = async (text) => {
        this.getUsers((await this.searchUsersRequest(text)).data.items)
    }

    clearUsers = () => {
        this.setState({ users: [], loading: false, alert: null })
    }

    setAlert = (msg, type, timeout = 3500) => {
        this.setState({ alert: { msg, type } })
        setTimeout(() => this.setState({ alert: null }), timeout)
    }

    render () {
        const { loading, users, hasError, alert, user, repos } = this.state
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={ alert } />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={ this.searchUsers }
                                        clearUsers={ this.clearUsers }
                                        showClear={ users.length > 0 }
                                        setAlert={ this.setAlert }
                                    />
                                    <Users error={hasError} loading={loading} users={users} />
                                </Fragment>
                            )} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User {...props}
                                      getUser={this.getUser}
                                      getUserRepos={this.getUserRepo}
                                      user={user}
                                      repos={repos}
                                      loading={loading}
                                />
                            )} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
  }
}


