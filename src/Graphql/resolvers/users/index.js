const typeDef = require('./typeDefs');
const resolvers = require('./resolvers');

let users = {
	resolvers,
	typeDef,
};

module.exports = users;
