import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

//import Login from './pages/Login';
import Signup from './pages/Signup';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signup" exact component={Signup} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
