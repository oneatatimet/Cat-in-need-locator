let gql = require('graphql-tag');

const typeDef = gql`
	extend type Query {
		getUsers: [User]
	}
	extend type Mutation {
		createUser(name: String!, email: String!, password: String!, roleId: Int): String
		updateUser: String
		deleteUserById: String
		login: String
		changePassword: String
	}
	type User {
		id: Int
		name: String
		email: String
		roleId: Int
	}
`;

module.exports = typeDef;
