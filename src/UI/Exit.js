import React from 'react'
import styled from './Exit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Exit = (props) => {
    return (
        <React.Fragment>
            <div className={styled.exit}>
                <FontAwesomeIcon icon={faTimesCircle} style={props.style} className={styled['exit-icon']} onClick={props.onClick} />
            </div>
        </React.Fragment >
    )
}

export default Exit
