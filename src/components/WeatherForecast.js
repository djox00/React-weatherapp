import React from 'react'
import ReactDOM from 'react-dom'
import styled from './WeatherForecast.module.css'
import Exit from '../UI/Exit'
import Loading from '../UI/Loading'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSpring, animated } from '@react-spring/web'


const WeatherForecast = (props) => {

    const xClicked = () => {
        props.toggleChange(!props.status);
    }

    const [ForecastData, setForecastData] = useState([]);

    const [Load, setLoad] = useState(false);

    useEffect(() => {

        setLoad(false);
        let cityName = props.cityName;
        var key = 'c73ac925c27dd4d2f46570e31cb9c9ab';

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.Cord.cords.lat}&lon=${props.Cord.cords.lon}&appid=${key}`)
            .then((resp) => { return resp.json() })
            .then((data) => {



                let ForecastObject = [
                    {
                        icon: data.daily[1].weather[0].icon,
                        description: data.daily[1].weather[0].description,
                        date: data.daily[1].dt,
                        temp: {
                            'max-temp': data.daily[1].temp.max,
                            'min-temp': data.daily[1].temp.min
                        }
                    },
                    {
                        icon: data.daily[2].weather[0].icon,
                        description: data.daily[2].weather[0].description,
                        date: data.daily[2].dt,
                        temp: {
                            'max-temp': data.daily[2].temp.max,
                            'min-temp': data.daily[2].temp.min
                        }
                    },
                    {
                        icon: data.daily[3].weather[0].icon,
                        description: data.daily[3].weather[0].description,
                        date: data.daily[3].dt,
                        temp: {
                            'max-temp': data.daily[3].temp.max,
                            'min-temp': data.daily[3].temp.min
                        }
                    },
                    {
                        icon: data.daily[4].weather[0].icon,
                        description: data.daily[4].weather[0].description,
                        date: data.daily[4].dt,
                        temp: {
                            'max-temp': data.daily[4].temp.max,
                            'min-temp': data.daily[4].temp.min
                        }
                    },
                    {
                        date: '',
                        icon: data.daily[5].weather[0].icon,
                        description: data.daily[5].weather[0].description,
                        date: data.daily[5].dt,
                        temp: {
                            'max-temp': data.daily[5].temp.max,
                            'min-temp': data.daily[5].temp.min
                        }
                    }

                ]

                setForecastData(ForecastObject);
                setLoad(true);


            })
            .catch((err) => {
                console.log(err);



            });
    }, []);

    const springProps = useSpring({
        opacity: Load ? 1 : 0,
        display: Load ? 'block' : 'none',
        config: { duration: 800 }


    });





    let outputForecast = ForecastData.map(
        (data) => {



            const unixTime = data.date * 1000;
            const dateObject = new Date(unixTime);
            const DayName = dateObject.toLocaleString("en-US", { weekday: "long" });
            return (<div className={styled.border} > <Col key={Math.random()} align="center">  <div className={styled.bodie}> <p style={{ color: 'white', marginBottom: '-10px', fontWeight: '400' }}> {DayName} </p>    <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} />

                <p className={styled.descriptionText}>{data.description}</p> <p style={{ fontSize: 15, display: 'inline', color: 'white', fontWeight: '400' }}>{Math.round(data.temp['max-temp'] - 273.15)}</p>
                <p style={{ fontSize: 20, display: 'inline', marginLeft: -5, color: 'white' }}> ° </p> / <p style={{ fontSize: 15, display: 'inline', color: 'rgb(51, 51, 51)', fontWeight: '700' }}> {Math.round(data.temp['min-temp'] - 273.15)}
                    <p style={{ fontSize: 20, display: 'inline', marginLeft: -5, color: 'rgb(51, 51, 51)', fontWeight: '700' }}> ° </p></p>




            </div>
            </Col > </div>);

        }

    )


    const Backdrop = props => {
        return <div className={styled.backdrop} />
    }

    const Overlay = props => {
        return (

            <div className={styled.forecastCard}>
                <animated.div style={springProps}>
                    <div className={styled.forecastBackground}>
                        <div className={styled.x}> <Exit style={{ 'transform': 'scale(1.6)' }} className={styled.x} onClick={xClicked} /></div>
                        <Row lg={5} sm={1} xs={1} >
                            {outputForecast}
                        </Row>
                    </div>
                </animated.div >
            </div >)
    }



    if (Load == true) return (

        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay-root"))}



        </React.Fragment >



    )

    else return (
        <Loading />)

}

export default WeatherForecast
