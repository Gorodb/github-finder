import React, { useReducer } from "react"

import AlertContext from "./alertContext"
import AlertReducer from "./alertReducer"

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const GitHubState = props => {
    const initialState = null

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    // Set alert
    const setAlert = (msg, type, timeout = 3500) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        })
        setTimeout(() => dispatch({ type: REMOVE_ALERT }) , timeout)
    }

    return <AlertContext.Provider
        value={{
            alert: state,
            setAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default GitHubState