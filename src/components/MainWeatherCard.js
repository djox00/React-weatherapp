import React, { Fragment } from 'react'
import style from './MainWeatherCard.module.css'
import WeatherCard from './WeatherCard'
import { Container, Col, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useSpring, animated } from '@react-spring/web'
import { useTransition } from '@react-spring/web'
let CitiesArray = [{ "cityName": "Tuzla", "id": "3188582", y: -100, delay: 200 }, { "cityName": "Sarajevo", "id": "3191281", y: -50, delay: 400 }, { "cityName": "Zavidovici", "id": "3186717", }, { "cityName": "Los Angeles", "id": "5368361", }];

const MainWeatherCard = (props) => {


    const [SearchArry, setSearchArry] = useState(CitiesArray);
    const [id, setid] = useState('');
    const getid = (getid) => {
        setid(getid);

    }



    const validInputHandler = (expression) => {

        setSearchArry((prevData) => {
            let data = [...prevData];
            data.pop();
            return data;

        })
    }


    useEffect(() => {

        if (props.searchValue !== null && props.searchValue.match(/\S/) && props.searchValue.toString().toLowerCase() !== 'false' && SearchArry.find(({ cityName }) => {
            const str = props.searchValue;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            console.log(str2);
            return cityName === str2;

        }) == undefined) {

            setSearchArry((prevData) => {


                return ([...prevData, { "cityName": props.searchValue, "id": Math.random().toString(), }]);

            });
        }
    }, [props.searchValue]);




    const springProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 }
    })

    const [deletecity, setdeletecity] = useState('');

    const delcity = cityname => {
        setdeletecity(cityname);
    }


    useEffect(() => {
        setSearchArry((prevCities, passCity) => {

            const updatedArray = prevCities.filter(el => el.cityName != deletecity)
            return updatedArray;

        });
    }
        , [deletecity]);

    useEffect(() => {
        window.localStorage.setItem('cities', JSON.stringify(SearchArry));

    }, []);

    const [timerStatus, settimerStatus] = useState(false);
    const status = (status) => {
        settimerStatus(!status);

    }


    let test = window.localStorage.getItem('cities');

    let WeatherCity = SearchArry.map((city) => {
        return (<Col key={Math.random()} align="center"> <animated.div style={springProps}> <WeatherCard Timer={timerStatus} cardClicked={props.cardClicked} errorMessage={props.errorMessage} errorOutput={props.errorOutput} cityName={city.cityName} getid={getid} valid={validInputHandler} del={delcity} />  </animated.div> </Col >)
    });


    const backtoHome = useSpring({
        opacity: props.ForecastToggle ? 0 : 1

    });


    let Switch = <div className={style.switch}> <ToggleSwitch TimerStatus={status} /> <p>Auto refresh</p> </div>;

    return (
        <Fragment>
            <animated.div style={backtoHome}>
                <div className={style.mainCard}>

                    <Container className={style.container}>
                        <div className={style.mainCardItems}>
                            <Row lg={4} md={3} sm={2} xs={1} >
                                {SearchArry.length != 0 ? WeatherCity : <Col lg={12} xs={12} md={12} sm={12} > <p className={style.MaincardEmpty}>Please add a City</p> </Col>}

                            </Row >
                        </div>
                        {SearchArry.length > 0 ? Switch : ''}
                    </Container >

                </div >
            </animated.div>
        </Fragment>
    )
}

export default MainWeatherCard
