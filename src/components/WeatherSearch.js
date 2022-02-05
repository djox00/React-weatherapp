import React from 'react'
import style from './WeatherSearch.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { useRef } from 'react';

const WeatherSearch = (props) => {

    const UserInput = useRef();

    const onKeyPressHandler = (event) => {
        const searchValue = UserInput.current.value;

        if (event.key === 'Enter' || event.type === 'click') {
            props.getSearch(searchValue);
            UserInput.current.value = '';
        };

    }

    return (
        <div>
            <div className={style.search}>
                <input ref={UserInput} className={style.search} type="text" onKeyPress={onKeyPressHandler} />
            </div>
            <div className={style.search2}>
                <FontAwesomeIcon icon={faSearch} className={style.srchIcon} onClick={onKeyPressHandler}> </FontAwesomeIcon>
            </div>
        </div>
    )
}

export default WeatherSearch
