const usersService = require('../../../../../services/user.services');

let getUsers = async (parent, args) => {
	let data = await usersService.getUsers(args);
	return data;
};

module.exports = getUsers;
