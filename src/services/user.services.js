const models = require('../DatabaseAccess/models/index');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

require('dotenv').config();

let userService = {
	createUser: async (args) => {
		let user = await models.User.findAll({ where: { email: args.email } });
		if (!user.length) {
			const passwordResetToken = uuid();
			args.passwordResetToken = passwordResetToken;
			console.log('args', args);
			let newUser = new models.User({
				...args,
			});
			let savedUser = await newUser.save();
			if (!savedUser) {
				return 'Something went wrong';
			}
			return 'Success';
		} else {
			throw new Error('A user with this email already exists');
		}
	},
	getUsers: async (args) => {
		let users = await models.User.findAll();
		console.log('userss', users);
		return users;
	},
	login: async (args) => {
		let user = await models.User.findOne({ where: { email: args.email } });

		if (user) {
			return await bcrypt.compare(args.password, user.password).then((isMatch) => {
				if (isMatch) {
					return {
						token: user.token,
					};
				} else {
					throw new Error('Password Incorrect');
				}
			});
		} else {
			throw new Error('No user with that email');
		}
	},
};

module.exports = userService;
