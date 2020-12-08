const userService = require('../../../../../services/user.services');

const createUser = async (parent, args) => {
	let newUser = await userService.createUser(args);
	return newUser;
};

module.exports = createUser;
