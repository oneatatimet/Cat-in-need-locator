import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/index.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import PrivateRoute from './utils/PrivateRoute';
import CommonRoute from './utils/CommonRoute';

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
				<PrivateRoute
					path="/dashboard"
					exact
					component={Dashboard}
					isAuthenticated={isAuthenticated}
					currentUser={currentUser}
				/>

				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<CommonRoute
					path="/settings"
					exact
					component={Settings}
					isAuthenticated={isAuthenticated}
					currentUser={currentUser}
				/>
			</Switch>
		</BrowserRouter>
	);
};
export default App;
