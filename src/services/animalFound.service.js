const models = require('../DatabaseAccess/models/index');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

require('dotenv').config();

let animalFoundService = {
	createAnimalFound: async (args) => {
		let newAnimal = new models.AnimalFound({
			...args,
		});
		let savedAnimal = await newAnimal.save();
		if (!savedAnimal) {
			return 'Something went wrong';
		}
		return 'Success';
	},
	getAnimalsFound: async (args) => {
		let AnimalFound = await models.AnimalFound.findAll();
		return AnimalFound;
	},
};

module.exports = animalFoundService;
