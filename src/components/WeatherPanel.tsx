import React from 'react';
import axios from 'axios';
import {apiUrl, defaultCity, defaultWeatherData, getWeatherQuery} from "./WeatherApiData";
import {Tile} from '../elements/Tile'

export class WeatherPanel extends React.Component {

    state = {
        searchCity: defaultCity,
        weatherData: defaultWeatherData
    };

    constructor(props: any) {
        super(props);

        // init state
        this.setState({});

        // bind function
        this.setWeatherData = this.setWeatherData.bind(this);

        // set weather data
        this.setWeatherData();
    }

    setWeatherData() {
        // https://medium.com/@stubailo/how-to-call-a-graphql-server-with-axios-337a94ad6cf9
        axios({
            url: apiUrl,
            method: 'post',
            data: {
                query: getWeatherQuery(this.state.searchCity)
            }
        }).then((result) => {
            // console.log(result)

            const weatherData = result.data.data.getCityByName;
            console.log(weatherData);

            if (weatherData) {
                this.setState({weatherData: weatherData});

            }
        });
    }

    convertKelvinToCelsius (temperature: any) {
        if (temperature) {
            return (temperature - 273.15).toFixed(1);
        }
    }

    convertUnixTimestampToDateTime (timestamp: any) {
        if (timestamp) {
            const date = new Date(timestamp * 1000);
            return (
                <>
                    {date.toLocaleDateString()}, {date.toLocaleTimeString()}
                </>
            );
        }
    }

    render() {
        return (
            <section>
                Weather Panel
                <br/>
                <button onClick={this.setWeatherData}>REFRESH</button>
                <br/>
                {/* ity, country */}
                {this.state.weatherData.name},
                {this.state.weatherData.country}
                <br/>
                {/* actual and feelsLike temperature */}
                <Tile
                    value={this.convertKelvinToCelsius(this.state.weatherData.weather.temperature.actual)}
                    unit={' °C'}
                    prefixAdd={'Feels like '}
                    valueAdd={this.convertKelvinToCelsius(this.state.weatherData.weather.temperature.feelsLike)}
                    unitAdd={' °C'}
                    title={'Actual and apparent temperature'}
                />
                {/* date time */}
                {this.convertUnixTimestampToDateTime(this.state.weatherData.weather.timestamp)}
                <br/>
            </section>
        );
    }
}
