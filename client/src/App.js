import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/Dashboard" exact component={Dashboard} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
