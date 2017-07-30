import React from 'react';
import {Component} from 'react';
import './City.less';

// ********** Action creators **********
const deleteCity = (name) => {
    return {
        type: 'DELETE_CITY',
        city: name
    };
};

// ********** Component **********
class City extends Component {

    loadWeatherData() {
        const {store} = this.context;
        const state = store.getState();
        const {cities, parameters} = state;
        const city = cities.find(city => city === this.props.city);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${parameters.appid}&units=${parameters.units}&lang=${parameters.lang}`)
            .then(response => response.json())
            .then(weather => {
                store.dispatch({
                    type: 'UPDATE_WEATHER',
                    city: city.name,
                    weather
                });
                return weather;
            })
            // .then(weather => console.log(weather))
            .catch(error => console.log(error));
    }

    componentWillMount() {
        this.loadWeatherData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const nextCity = nextProps.city;
        const currentCity = this.props.city;

        const nextWeather = nextCity.weather;
        const currentWeather = currentCity.weather;

        const nextTemp = nextWeather.main ? nextWeather.main.temp : '';
        const currentTemp = currentWeather.main ? currentWeather.main.temp : '';

        return nextCity.name !== currentCity.name || nextTemp !== currentTemp;
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        const {cities} = state;
        const city = cities.find(city => city === this.props.city);
        const {name, main, sys, weather, id} = city.weather;
        console.log('render: ', this.props.city.name, main ? 'temp' : 'no temp');

        const Body = () => {
            if (!name) {
                return (
                    <div>
                        <h2 className="text-center city-header">Weather in {this.props.city.name}</h2>
                        <img src="./img/loading_spinner.gif"
                             className="img-responsive spinner-image"/>
                    </div>
                );
            }

            return (
                <div>
                    <h2 className="text-center city-header">Weather in {name}, {sys.country}</h2>
                    {
                        weather.map(rec =>
                            <div className="weather-icon" key={id}>
                                <p className="text-center">{rec.description}</p>
                                <div className="img-wrapper">
                                    <img src={`http://openweathermap.org/img/w/${rec.icon}.png`}
                                         className="img-responsive weather-image"/>
                                </div>
                            </div>
                        )

                    }
                    <h2 className="text-center">{Math.round(main.temp)}°C</h2>
                </div>
            );
        };

        return (
            <div className="col-sm-3 city">
                <span
                    className="city-delete"
                    onClick={() => store.dispatch(deleteCity(this.props.city.name))}
                >
                    x
                </span>
                <Body />
            </div>
        );
    }
}
City.contextTypes = {
    store: React.PropTypes.object
};

export default City;