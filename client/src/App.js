import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

if (localStorage.getItem('authToken')) {
	let currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

const App = (props) => {
	const isAuthenticated = localStorage.getItem('authToken') !== null ? true : false;
	const currentUser = JSON.parse(localStorage.getItem('currentUser'));

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/Dashboard" exact component={Dashboard} />
				<Route path="/Settings" exact component={Settings} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
