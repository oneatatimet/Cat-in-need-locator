const userService = require('../../../../../services/user.services');

const createUser = async (parent, args) => {
	let conn = args.connections;
	let NoOfConRequestInSingleAPICall = 5;
	let daysInCurrentMonth = new Date(new Date().getMonth(), new Date().getFullYear(), 0).getDate();
	let perDayConn = Math.ceil(conn / daysInCurrentMonth);
	let hours = Math.ceil(perDayConn / NoOfConRequestInSingleAPICall);
	args.hoursRange = `${hours}`;

	let newUser = await userService.createUser(args);
	return newUser;
};

module.exports = createUser;
