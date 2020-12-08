const jwt = require('jsonwebtoken');
const user = require('../DatabaseAccess/models/user');
const secret = process.env.JWTSK;

module.exports = middleware = async (req) => {
	let { authorization } = req.headers;
	let userSession;
	if (authorization !== null || authorization !== undefined || authorization !== '') {
		try {
			userSession = jwt.verify(authorization, 'secret');
			req.middleware = returnMiddlewareObject(userSession.roleId);
			req.currentUser = userSession;
			return req;
		} catch (e) {
			return new Error('Error in authorization token');
		}
	}
};

function returnMiddlewareObject(roleId) {
	let isUser = () => (roleId === 2 ? true : false);
	let isAdmin = () => (roleId === 1 ? true : false);

	let mustBeUser = () => {
		if (!isUser()) throw new Error('Must be a user');
	};

	let mustBeAdmin = () => {
		if (!isAdmin()) throw new Error('Must be an admin');
	};

	return {
		//All these middleware functions are now accessible through the request object provided in context
		isUser,
		isAdmin,
		mustBeUser,
		mustBeAdmin,
	};
}
