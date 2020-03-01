import React, { Component, Fragment } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

import Spinner from "../spinner/Spinner"
import Repos from "../repos/Repos"

export default class User extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repo: PropTypes.object
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    render() {
        const {
            user: {
                name,
                avatar_url,
                location,
                bio,
                blog,
                login,
                html_url,
                followers,
                following,
                public_repos,
                public_gists,
                company,
                hireable
            },
            loading,
            repos
        } = this.props

        if (loading) return <Spinner/>

        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Back to main page</Link>
                Hireable: {' '}
                {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" alt="" style={{width: '150px'}} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1" rel="noopener noreferrer" target="_blank">Visit github profile</a>
                        <ul>
                            <li>
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Blog: </strong> {blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public repos: {public_repos}</div>
                    <div className="badge badge-dark">Public gists: {public_gists}</div>
                </div>
                
                <Repos repos={repos}/>
            </Fragment>
        )
    }
}