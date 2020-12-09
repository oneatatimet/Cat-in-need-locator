import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CommonRoute = ({ component: Component, isAuthenticated, currentUser, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === true && currentUser !== null ? (
					<Component {...props} isAuthenticated currentUser />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default CommonRoute;
