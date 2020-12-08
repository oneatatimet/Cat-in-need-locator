const userService = require('../../../../../services/user.services');

const changePassword = async (parent, args) => {
	let data = await userService.changePassword(args);
	return data;
};

module.exports = changePassword;
