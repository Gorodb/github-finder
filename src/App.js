import React, { useState, Fragment } from 'react'
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

const App = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)
    const [alert, setAlerts] = useState(null)

    const userRequest = (userName) => axios.get(`https://api.github.com/users/${userName}?${client}`)
    const userRepoRequest = (userName) => axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&${client}`)
    const searchUsersRequest = (text) => axios.get(`https://api.github.com/search/users?q=${text}&${client}`)

    const setLoadingAndError = ({ loading, error }) => {
        setLoading(loading)
        setError(error)
    }

    const getUsers = async (users) => {
        setLoadingAndError({ loading: true, error: false })
        try {
            setUsers(await users)
            setLoadingAndError({ loading: false, error: false })
        } catch (err) {
            setUsers([])
            setLoadingAndError({ loading: false, error: true })
            setAlert({msg: 'An Error!', type: 'danger'})
        }
    }

    const getUser = async (userName) => {
        setLoadingAndError({ loading: true, error: false })
        try {
            setUser((await userRequest(userName)).data)
            setLoadingAndError({ loading: false, error: false })
        } catch (err) {
            setUser({})
            setLoadingAndError({ loading: false, error: true })
            setAlert({msg: 'An Error!', type: 'danger'})
        }
    }

    const getUserRepo = async (userName) => {
        setLoadingAndError({ loading: true, error: false })
        try {
            setRepos((await userRepoRequest(userName)).data)
            setLoadingAndError({ loading: false, error: false })
        } catch (err) {
            setRepos([])
            setLoadingAndError({ loading: false, error: true })
            setAlert({msg: 'An Error!', type: 'danger'})
        }
    }

    const searchUsers = async (text) => {
        getUsers((await searchUsersRequest(text)).data.items)
    }

    const clearUsers = () => {
        setUsers([])
        setLoadingAndError({ loading: false, error: false })
        setAlerts(null)
    }

    const setAlert = (msg, type, timeout = 3500) => {
        setAlerts({ alert: { msg, type } })
        setTimeout(() => setAlerts(null), timeout)
    }

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
                                    searchUsers={ searchUsers }
                                    clearUsers={ clearUsers }
                                    showClear={ users.length > 0 }
                                    setAlert={ setAlert }
                                />
                                <Users error={hasError} loading={loading} users={users} />
                            </Fragment>
                        )} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/user/:login' render={props => (
                            <User {...props}
                                  getUser={getUser}
                                  getUserRepos={getUserRepo}
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

export default App
