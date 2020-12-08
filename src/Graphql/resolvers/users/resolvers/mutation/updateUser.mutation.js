const userService = require('../../../../../services/user.services');

const updateUser = async (parent, args, context) => {
	let data = await userService.updateUser(args);
	return data;
};

module.exports = updateUser;
