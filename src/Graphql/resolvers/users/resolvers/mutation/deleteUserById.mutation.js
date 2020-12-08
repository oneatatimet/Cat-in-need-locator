const userService = require('../../../../../services/user.services');

const deleteUserById = async (parent, args, context) => {
	context.request.middleware.mustBeAdmin();
	let data = await userService.deleteUserById(args);
	return data;
};

module.exports = deleteUserById;
