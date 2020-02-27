import React, { Component } from "react"
import PropTypes from 'prop-types'

export default class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { text } = this.state
        if (text !== '') {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })
        }
    }

    onChange = ({ target: {name, value} }) => this.setState({ [name]: value })

    render() {
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
            </div>
        )
    }
}