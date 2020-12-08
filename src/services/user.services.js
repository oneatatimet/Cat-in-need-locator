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
	changePassword: async (args) => {
		const { userId, currentPassword, newPassword } = args;
		try {
			let user = await models.User.findOne({
				where: {
					id: userId,
				},
			});
			if (!user) {
				throw new Error(' This user does not exist');
			}
			//compare passwords
			const isMatch = bcrypt.compareSync(currentPassword, user.password);
			if (!isMatch) {
				throw new Error('Current password entered is incorrect');
			}
			user.password = newPassword;
			return user.save().then((res) => 'Password update successful');
		} catch (error) {
			throw new Error(error.message);
		}
	},
	deleteUserById: async (args) => {
		await models.User.destroy({ where: { id: args.userId } });
		return 'user deleted!';
	},
	updateUser: async (args) => {
		await models.User.update({ ...args }, { where: { id: args.userId } });
		return 'User updated successfully!';
	},
};

module.exports = userService;
