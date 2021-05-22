import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import './index.css';
import App from './containers/App/App';

// use live version of https://github.com/konstantinmuenster/graphql-weather-api
const apiUrl = 'https://graphql-weather-api.herokuapp.com/';

// https://www.apollographql.com/docs/react/
const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
