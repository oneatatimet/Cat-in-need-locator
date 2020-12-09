import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, currentUser, ...rest }) => {
	console.log('CurrentUser', currentUser);
	console.log('isAuth', isAuthenticated);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === true && currentUser !== null && currentUser.roleId === 2 ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
