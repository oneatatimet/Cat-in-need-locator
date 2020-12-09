const animalFoundService = require('../../../../../services/animalFound.service');

const getAnimalsFound = async (parent, args) => {
	let newUser = await animalFoundService.getAnimalsFound(args);
	return newUser;
};

module.exports = getAnimalsFound;
