const userService = require('../../../../../services/user.services');

const login = async (parent, args, context) => {
	let data = await userService.login(args);
	return data;
};

module.exports = login;
