// use live version of https://github.com/konstantinmuenster/graphql-weather-api
export const apiUrl = 'https://graphql-weather-api.herokuapp.com/';

export const defaultCity = 'brno';

export const defaultWeatherData = {
    name: undefined,
    country: undefined,
    weather: {
        summary: {
            title: undefined,
            description: undefined,
            icon: undefined
        },
        temperature: {
            actual: undefined,
            feelsLike: undefined
        },
        wind: {
            speed: undefined,
            deg: undefined
        },
        clouds: {
            all: undefined,
            humidity: undefined
        },
        timestamp: undefined
    }
};

export const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export const getWeatherQuery = (city: string) => {
    return `
    query {
      getCityByName(name: "${city}") {
        name
        country
        weather {
          summary {
            title
            description
            icon
          }
          temperature {
            actual
            feelsLike
          }
          wind {
            speed
            deg
          }
          clouds {
            all
            humidity
          }
          timestamp
        }
      }
    }
`
};

/*
Complete query:

    query {
      getCityByName(name: "${city}") {
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

*/
