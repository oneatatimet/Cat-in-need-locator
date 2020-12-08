import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, HttpLink } from '@apollo/client';

const devBackendUrl = 'http://localhost:5080'; // Dev Mode
const prodBackendUrl = '/'; // Production mode

let token = localStorage.getItem('authToken');
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: devBackendUrl,
		headers: {
			authorization: token ? token : null,
		},
	}),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
// 	<App />,

// 	document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
