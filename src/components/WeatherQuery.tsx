import {gql} from '@apollo/client';

export const GET_WEATHER = gql`
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
