import React, { Component } from "react"
import PropTypes from 'prop-types'

export default class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { text } = this.state
        if (text !== '') {
            this.props.searchUsers(text)
            this.setState({ text: '' })
        } else {
            this.props.setAlert('Please, enter something', 'light')
        }
    }

    onChange = ({ target: {name, value} }) => this.setState({ [name]: value })

    render() {
        const { clearUsers, showClear } = this.props
        return (
            <div>
                <form className="form" onSubmit={ this.onSubmit } >
                    <input
                        type="text"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
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
}