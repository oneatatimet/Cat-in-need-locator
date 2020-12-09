const animalFoundService = require('../../../../../services/animalFound.service');

const createAnimalFound = async (parent, args) => {
	let newUser = await animalFoundService.createAnimalFound(args);
	return newUser;
};

module.exports = createAnimalFound;
