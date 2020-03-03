import React, { useContext } from "react"

import AlertContext from "../../context/alert/alertContext"

const Alert = () => {
    const { alert } = useContext(AlertContext)

    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /><span style={{marginLeft: '4px'}}>{ alert.msg }</span>
            </div>
        )
    )
}

export default Alert