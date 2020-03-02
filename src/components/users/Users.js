import React, {useContext} from "react"

import UserItem from "./UserItem"
import Spinner from "../spinner/Spinner"
import cls from './UserItem.module.css'

import GitHubContext from "../../context/gitHub/gitHubContext";

const Users = () => {
    const { users, loading } = useContext(GitHubContext)

    const usersLoop = (users) => users.map(value => <UserItem key={value.id} user={value} />)

    return (
        <div className={cls.user}>
            { loading ? <Spinner /> : usersLoop(users) }
        </div>
    )
}

export default Users