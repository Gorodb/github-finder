import React, { useState } from "react"
import PropTypes from 'prop-types'

const Search = ({ clearUsers, showClear, searchUsers, setAlert }) => {
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
                showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            }

        </div>
    )
}

export default Search

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}