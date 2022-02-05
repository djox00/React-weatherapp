import React from 'react'
import style from './WeatherCard.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CityLabel from './CityLabel';
import Exit from '../UI/Exit';
import Loading from '../UI/Loading';


const WeatherCard = (props) => {

    // weather data 
    const [CityName, setCityName] = useState('');
    const [Temp, setTemp] = useState('');
    const [TempFeelsLike, setTempFeelsLike] = useState('');
    const [TempMax, setTempMax] = useState('');
    const [TempMin, setTempMin] = useState('');
    const [id, setid] = useState('');
    const [icon, seticon] = useState('');
    const [desc, setdesc] = useState('');
    const [CityNameFromObject, setCityNameFromObject] = useState('');
    const [Cord, setCord] = useState([]);
    const [Load, setLoad] = useState(false);

    const [timer, settimer] = useState(true);



    setInterval(() => {
        if (props.Timer == true)
            settimer(!timer);
    }, 60000);


    useEffect(() => {
        setLoad(false);

        let cityName = props.cityName;
        var key = 'c73ac925c27dd4d2f46570e31cb9c9ab';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
            .then((resp) => { return resp.json() })
            .then((data) => {


                setTemp(data.main.temp - 273.15);
                setTempMax(data.main.temp_max - 273.15);
                setTempMin(data.main.temp_min - 273.15);
                setTempFeelsLike(data.main.feels_like - 273.15);
                setid(data.id);
                seticon(data.weather[0].icon);
                setdesc(data.weather[0].description);
                props.getid(id);
                setCityName(cityName);
                setCityNameFromObject(data.name);
                setCord({ cords: { 'lat': data.coord.lat, 'lon': data.coord.lon } });

                setLoad(true);
            })
            .catch((err) => {
                console.log(err);
                props.valid(false);
                props.errorOutput(true);
                props.errorMessage("You've entered a wrong city name!");

            });
    }, [timer]);


    let iconVar = `https://openweathermap.org/img/wn/${icon}@2x.png`;


    const onClickHandler = () => {
        props.del(CityName);
    }

    const [toggle, settoggle] = useState(false);

    const toggleHandler = () => {
        if (Load != false) {
            console.log(Cord);
            props.cardClicked(Cord, true);
        }
    }

    const MouseHoverHandler = (event) => {
        if (event.type == "mouseenter") {
            setMouseEvent(true);
        }
        else if (event.type == "mouseleave") {
            setMouseEvent(false);
        }
    }

    const [MouseEvent, setMouseEvent] = useState(false);

    let cardContent = (<div><img src={iconVar} />
        <div className={style.content} >
            <CityLabel MouseHover={MouseEvent}> {CityNameFromObject} </CityLabel>
            <p style={{ fontSize: 40 }}>  {Math.round(Temp)}  <p style={{ fontSize: 20, display: 'inline', verticalAlign: 'super', marginLeft: 5 }}> °C </p> </p>
            <div style={{ marginTop: -20, fontSize: 20 }}> {Math.round(TempMax)} / {Math.round(TempMin)}</div>
            <p className={style['city-description']} >Description: <p> "{desc}"</p></p>
            <hr className={style.breakLine} />
            <p style={{ fontSize: 15, color: 'rgb(255, 255, 255, 0.6)' }}> Feels Like: {Math.round(TempFeelsLike)} </p>

        </div></div>);


    return (
        <React.Fragment>
            <div className={style.cardBackground} onMouseEnter={MouseHoverHandler} onMouseLeave={MouseHoverHandler} >
                <Exit onClick={onClickHandler} />
                <div className={style.center} onClick={toggleHandler}>
                    {Load ? cardContent : <p style={{ color: "rgba(35, 168, 168, 0.568)" }}>Loading...</p>}
                </div>
            </div >
        </React.Fragment>

    )



}

export default WeatherCard
