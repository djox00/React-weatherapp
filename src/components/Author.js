import { faCreditCard, faFaucet, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import React, { Fragment } from 'react'
import { NavLink } from 'react-bootstrap'
import styled from './Author.module.css'
import signature from '../images/signature.png'



const Author = () => {




    return (
        <Fragment>
            <div className={styled.background}>
                <div className={styled.text}> <p className={styled.signature}>Djordje Djuric </p>  <a target="_blank" href="https://github.com/djox00"><FontAwesomeIcon className={styled.icon} icon={faGithub} /></a>
                    <a target="_blank" href="https://www.linkedin.com/in/djordje-djuric"><FontAwesomeIcon className={styled.icon} icon={faLinkedin} /></a> </div>
            </div>
        </Fragment>
    )
}

export default Author
