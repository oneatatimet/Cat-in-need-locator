const createUser = require('./createUser.mutation');
const login = require('./login.mutation');
const deleteUserById = require('./deleteUserById.mutation');
const updateUser = require('./updateUser.mutation');
const changePassword = require('./changePassword.mutation');

let Mutation = {
	createUser,
	login,
	deleteUserById,
	updateUser,
	changePassword,
};

module.exports = Mutation;
