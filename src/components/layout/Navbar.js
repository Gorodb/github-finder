import React from "react"
import PropTypes from 'prop-types'
import cls from './Navbar.module.css'

const Navbar = ({ icon, title }) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /><span className={cls.navbar}>{title}</span>
            </h1>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'GitHub finder',
    icon: "fab fa-github"
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
