import React from 'react'
import styled from './ErrorMessage.module.css'
import { Row } from 'react-bootstrap'
import { Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'


const ErrorMessage = (props) => {

    const ErrorOutput = () => {
        props.errorOutput(false);
    }

    if (props.errorInput)
        return (
            <React.Fragment>

                <div className={styled.errorBox}>
                    <div >
                        <div className={styled.backdrop} />
                        <div className={styled.errorBackround}>
                            <label>{props.errorMessage} </label>
                            <FontAwesomeIcon onClick={ErrorOutput} icon={faRedo} className={styled.redo} />
                        </div>
                    </div>
                </div>
            </React.Fragment>



        )
    else return null;
}

export default ErrorMessage
