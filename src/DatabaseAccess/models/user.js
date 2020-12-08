'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				set: function (val) {
					this.setDataValue('password', bcrypt.hashSync(val, 12));
				},
				validate: {},
			},
			roleId: {
				type: DataTypes.INTEGER,
				defaultValue: 2,
			},
			token: {
				type: DataTypes.VIRTUAL,
				get: function () {
					return jwt.sign(
						{
							id: this.id,
							name: this.name,
							email: this.email,
							roleId: this.roleId,
							id: this.id,
						},
						'' + process.env.JWT_KEY
					);
				},
			},
		},
		{}
	);
	User.associate = function (models) {
		// User.hasMany(models.Connection, {
		//   foreignKey: "userId",
		// });
	};
	return User;
};
