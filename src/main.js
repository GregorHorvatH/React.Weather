import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import WeatherApp from './components/WeatherApp.jsx';

const cities = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CITY':
            return [...state, {
                name: action.city,
                weather: {}
            }];
        case 'DELETE_CITY':
            return state.filter(city => city.name !== action.city);
        case 'UPDATE_WEATHER':
            return state.map(city =>
                city.name !== action.city ? city : {...city, weather: action.weather});
        default:
            return state;
    }
};

const parameters = (state = {
    appid: "ecd63065bd25bdde07e45cd2f66852ce",
    units: "metric",
    lang: "RU"
}, action) => {
    switch (action.type) {
        case 'TOGGLE_UNITS':
            return {
                ...state,
                units: state.units === 'metric' ? 'imperial' : 'metric'
            };
        case 'CHANGE_LANG':
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
};

const weatherApp = combineReducers({
    cities,
    parameters
});

ReactDOM.render(
    <Provider store={createStore(weatherApp)}>
        <WeatherApp />
    </Provider>,
    document.getElementById("root")
);