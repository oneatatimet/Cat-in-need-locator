let gql = require('graphql-tag');

const typeDef = gql`
	extend type Query {
		getUsers: [User]
	}

	extend type Mutation {
		createUser(name: String!, email: String!, password: String!, roleId: Int): String
		updateUser(name: String!, email: String!, roleId: Int, userId: Int!): String
		deleteUserById(userId: Int): String
		login(email: String!, password: String!): Self
		changePassword(userId: Int!, currentPassword: String!, newPassword: String!): String
	}

	type User {
		id: Int
		name: String
		email: String
		roleId: Int
	}

	type Self {
		token: String
	}
`;

module.exports = typeDef;
