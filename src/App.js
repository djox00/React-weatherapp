
import styled from './App.module.css';
import MainWeatherCard from './components/MainWeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherSearch from './components/WeatherSearch';
import ErrorMessage from './components/ErrorMessage';
import WeatherForecast from './components/WeatherForecast';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web'
import Author from './components/Author';
import ReactDOM from 'react-dom'
import { Container } from 'react-bootstrap';



function App() {

  const [searchData, setsearchData] = useState('')
  const [id, setid] = useState('');
  const getSearchData = (searchValue, id) => {
    setsearchData(searchValue);
    setid(id);
  }

  const [test, settest] = useState('')


  const arrayChange = (cityname) => {
    settest(cityname);
  }

    ;
  const [errorStatus, seterrorStatus] = useState(false);

  const ErrorCatch = (status) => {
    seterrorStatus(status);

  }
  const [errorMessage, seterrorMessage] = useState('');

  const getErrorMessage = (message) => {
    seterrorMessage(message);
  }
  const [toggle, settoggle] = useState(false);

  const [Cord, setCord] = useState([]);

  const cardClicked = (Cord, status) => {
    settoggle(status);
    setCord(Cord);
  }

  const forecastProps = useSpring({

  }) // treba protovat van roota 


  let forecast = <animated.div style={forecastProps}> <WeatherForecast Cord={Cord} status={toggle} toggleChange={cardClicked} /> </animated.div>

  return (
    <React.Fragment>
      <div className={styled.wrap}>
        <div className={styled.App}>
          <ErrorMessage errorMessage={errorMessage} errorInput={errorStatus} errorOutput={ErrorCatch} />
          <WeatherSearch getSearch={getSearchData} />
          {toggle ? forecast : ''}
          <MainWeatherCard ForecastToggle={toggle} cardClicked={cardClicked} searchValue={searchData} arrayC={arrayChange} errorOutput={ErrorCatch} errorMessage={getErrorMessage} />
        </div>
        <footer className={styled.footer}><Author /></footer>
      </div>
    </React.Fragment>
  );
}

export default App;
