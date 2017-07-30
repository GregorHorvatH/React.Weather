import React from 'react';
import AddCity from './AddCity.jsx';
import CityList from './CityList.jsx';

const WeatherApp = () => (
    <div className="container weather-app">
        <AddCity />
        <CityList />
    </div>
);

export default WeatherApp;