import React from "react";
import {ApolloConsumer, gql} from '@apollo/client';

const GET_WEATHER = gql`
  query GetWeatherInCity($city:String!) {
      getCityByName(name: $city) {
        id
        name
        country
        coord {
          lon
          lat
        }
        weather {
          summary {
            title
            description
            icon
          }
          temperature {
            actual
            feelsLike
            min
            max
          }
          wind {
            speed
            deg
          }
          clouds {
            all
            visibility
            humidity
          }
          timestamp
        }
      }
  }
`;

export class WeatherPanel extends React.Component {
    constructor(props: any) {
        super(props);
    }

    weather(){
        return(
            <ApolloConsumer>
                {(client: any) => {
                    client
                        .query({
                            query: GET_WEATHER,
                            variables: {city: 'brno'},
                        })
                        .then((result: any) => {
                            const weatherData = result.data.getCityByName;
                            console.log(weatherData);

                            // city, country
                            console.log(weatherData.name, weatherData.country);

                            // actual and feelsLike temperature
                            console.log(weatherData.weather.temperature.actual - 273.15, weatherData.weather.temperature.feelsLike - 273.15);

                            // date, time
                            const date = new Date(weatherData.weather.timestamp * 1000);
                            console.log(date.toLocaleDateString(), date.toLocaleTimeString());
                        });
                    return 'ook?';
                }}
            </ApolloConsumer>
        )
    }

    render() {
        return (
            <p>
                Weather Panel
                {this.weather()}
            </p>
        );
    }
}
