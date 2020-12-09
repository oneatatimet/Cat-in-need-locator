import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/login" exact component={Login} />
				<Route path="/settings" exact component={Settings} />
				<Route path="/signup" exact component={Signup} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
