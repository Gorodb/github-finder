import React from "react"
import PropTypes from 'prop-types'

import UserItem from "./UserItem"
import Spinner from "../spinner/Spinner"
import cls from './UserItem.module.css'

const Users = ({ users, loading, error }) => {
    const usersLoop = (users) => users.map(value => <UserItem key={value.id} user={value} />)

    if (error) return 'Error!'

    return (
        <div className={cls.user}>
            { loading ? <Spinner /> : usersLoop(users) }
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
}

export default Users