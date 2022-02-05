import React from 'react'
import styled from './Loading.module.css'
import ReactDOM from 'react-dom'

const Loading = () => {


    return (
        <React.Fragment>
            {ReactDOM.createPortal(<div className={styled['loading-backdrop']} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<p className={styled.loading}>Loading</p>, document.getElementById('overlay-root'))}

            )

        </React.Fragment>


    )
}

export default Loading
