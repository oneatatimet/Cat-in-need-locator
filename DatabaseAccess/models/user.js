//created the model using cli command
'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */

		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: { type: DataTypes.STRING, allowNull: false },
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
						process.env.JWTSK
					);
				},
			},
		},
		{}
	);
	return User;
};
