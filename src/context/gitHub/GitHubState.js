import React, { useReducer } from "react"
import axios from 'axios'

import GitHubContext from "./gitHubContext"
import GitHubReducer from "./gitHubReducer"
import {
    SEARCH_USERS,
    GET_USER,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS
} from '../types'

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
const client = `client_id=${clientId}&client_secret=${clientSecret}`

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        error: false,
        alert: null
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState)

    // Search Users
    const searchUsersRequest = (text) => axios.get(`https://api.github.com/search/users?q=${text}&${client}`)
    const searchUsers = async (text) => {
        setLoading()
        const res = (await searchUsersRequest(text)).data.items
        dispatch({ type: SEARCH_USERS, payload: res })
    }

    // Get User
    const userRequest = (userName) => axios.get(`https://api.github.com/users/${userName}?${client}`)
    const getUser = async (userName) => {
        setLoading()
        const res = (await userRequest(userName)).data
        dispatch({ type: GET_USER, payload: res })
    }

    // Get Repos
    const userRepoRequest = (userName) => axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&${client}`)
    const getUserRepos = async (userName) => {
        setLoading()
        const res = (await userRepoRequest(userName)).data
        dispatch({ type: GET_REPOS, payload: res })
    }

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS })

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <GitHubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GitHubContext.Provider>
}

export default GitHubState