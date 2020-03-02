import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

import GitHubState from "./context/gitHub/GitHubState"

import Navbar from "./components/layout/Navbar"
import Search from "./components/users/Search"
import Users from "./components/users/Users"
import User from "./components/users/User"
import Alert from "./components/layout/Alert"
import About from "./components/pages/About"

const App = () => {
    const [alert, setAlerts] = useState(null)

    const setAlert = (msg, type, timeout = 3500) => {
        setAlerts({ alert: { msg, type } })
        setTimeout(() => setAlerts(null), timeout)
    }

    return (
        <GitHubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={ alert } />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        setAlert={ setAlert }
                                    />
                                    <Users />
                                </Fragment>
                            )} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' component={User} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GitHubState>
    )
}

export default App
