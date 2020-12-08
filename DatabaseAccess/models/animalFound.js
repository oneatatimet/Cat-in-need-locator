'use strict';

module.exports = (sequelize, DataTypes) => {
	const AnimalFound = sequelize.define(
		'AnimalFound',
		{
			description: {
				type: DataTypes.STRING,
			},
			locationName: {
				type: DataTypes.STRING,
			},
			lat: {
				type: DataTypes.STRING,
			},
			lng: {
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.INTEGER,
			},
		},
		{}
	);

	return AnimalFound;
};
