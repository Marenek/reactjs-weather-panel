import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {WeatherPanel} from '../../components/WeatherPanel';

function App() {
    return (
        <div className="App">

            <WeatherPanel/>

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Basic communication with API! Check console.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
