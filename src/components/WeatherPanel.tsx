import React from 'react';
import axios from 'axios';
import {getWeatherQuery} from "./WeatherQuery";

// use live version of https://github.com/konstantinmuenster/graphql-weather-api
const apiUrl = 'https://graphql-weather-api.herokuapp.com/';

export class WeatherPanel extends React.Component {

    state = {
        weatherData: {
            name: '',
            country: ''
        }
    };

    constructor(props: any) {
        super(props);
        this.setWeatherData = this.setWeatherData.bind(this);
        this.setWeatherData();
    }

    componentDidMount() {
        // this.setWeatherData();
        // console.log(this.setWeatherData());
    }

    setWeatherData() {
        let city = "brno";
        // https://medium.com/@stubailo/how-to-call-a-graphql-server-with-axios-337a94ad6cf9
        axios({
            url: apiUrl,
            method: 'post',
            data: {
                query: getWeatherQuery(city)
            }
        }).then((result) => {
            console.log(result)

            const weatherData = result.data.data.getCityByName;
            this.setState({weatherData: weatherData});

            console.log(weatherData);

            // city, country
            console.log(weatherData.name, weatherData.country);

            // actual and feelsLike temperature
            console.log(weatherData.weather.temperature.actual - 273.15, weatherData.weather.temperature.feelsLike - 273.15);

            // date, time
            const date = new Date(weatherData.weather.timestamp * 1000);
            console.log(date.toLocaleDateString(), date.toLocaleTimeString());
        });
    }

    render() {
        return (
            <p>
                Weather Panel
                <br/>
                <button onClick={this.setWeatherData}>REFRESH</button>
                <br/>
                {this.state.weatherData.name}, {this.state.weatherData.country}
                <br/>
            </p>
        );
    }
}
