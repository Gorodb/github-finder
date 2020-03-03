import React, { useState, useContext } from "react"

import GitHubContext from "../../context/gitHub/gitHubContext"
import AlertContext from "../../context/alert/alertContext"

const Search = () => {
    const { clearUsers, searchUsers, users } = useContext(GitHubContext)
    const { setAlert } = useContext(AlertContext)

    const [text, setText] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        if (text !== '') {
            searchUsers(text)
            setText('')
        } else {
            setAlert('Please, enter something', 'light')
        }
    }

    const onChange = e => setText(e.target.value)

    return (
        <div>
            <form className="form" onSubmit={ onSubmit } >
                <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={onChange}
                    placeholder="Search Users..."
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {
                users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            }

        </div>
    )
}

export default Search
