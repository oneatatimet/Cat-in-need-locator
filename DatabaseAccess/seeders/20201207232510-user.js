'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'elon musk',
					email: 'elonmusk@gmail.com',
					password: bcrypt.hashSync('12345'),
					roleId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
