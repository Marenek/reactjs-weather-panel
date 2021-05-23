import React from 'react';
import axios from 'axios';
import {apiUrl, defaultCity, defaultWeatherData, getWeatherQuery} from "../../components/WeatherApiData";
import {Tile} from '../../elements/Tile'
import {SearchCityBar} from '../../components/SearchCityBar'
import './App.css';

export default class App extends React.Component {

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

    // update state with current search input value
    setSearchCity = (e: any) => {
        this.setState({
            searchCity: e.target.value
        })
    }

    // search on enter
    keyPress = (e: any) => {
        if (e.keyCode === 13) {
            this.setWeatherData();
        }
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
            <div className={'app'}>
                <header className={'app__header'}>
                    <div className={'app__header__city'}>
                        {/* city, country */}
                        Weather in {this.state.weatherData.name}, {this.state.weatherData.country}
                    </div>
                    <SearchCityBar
                        className={'app__header__search'}
                        searchCity={this.state.searchCity}
                        onChangeHandler={this.setSearchCity}
                        onClickHandler={this.setWeatherData}
                        onKeyDownHandler={this.keyPress}
                    />
                </header>
                <section className={'app__panel'}>
                    {/* temperature */}
                    <Tile
                        value={this.convertKelvinToCelsius(this.state.weatherData.weather.temperature.actual)}
                        unit={' °C'}
                        prefixAdd={'Feels like '}
                        valueAdd={this.convertKelvinToCelsius(this.state.weatherData.weather.temperature.feelsLike)}
                        unitAdd={' °C'}
                        title={'Actual and apparent temperature'}
                    />
                    {/* summary */}
                    <Tile
                        value={this.state.weatherData.weather.summary.title}
                        valueAdd={this.state.weatherData.weather.summary.description}
                        title={'Weather summary'}
                    />
                    {/* clouds */}
                    <Tile
                        value={this.state.weatherData.weather.clouds.all}
                        unit={' %'}
                        prefixAdd={'Humidity '}
                        valueAdd={this.state.weatherData.weather.clouds.humidity}
                        unitAdd={' %'}
                        title={'Clouds nad humidity'}
                    />
                    {/* wind */}
                    <Tile
                        value={this.state.weatherData.weather.wind.speed}
                        unit={' m/s'}
                        valueAdd={this.state.weatherData.weather.wind.deg}
                        unitAdd={' °'}
                        title={'Wind'}
                    />
                </section>
                <footer className={'app__footer'}>
                    {/* date time */}
                    {this.convertUnixTimestampToDateTime(this.state.weatherData.weather.timestamp)}
                </footer>
            </div>
        );
    }
}
