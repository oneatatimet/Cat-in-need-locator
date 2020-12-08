const { gql } = require('apollo-server-express');
export default gql`
	extend type Query {
		user(id: ID!): User
		users: [User!]!
	}
	extend type Mutation {
		signUp(email: String, name: String): User
	}
	type user {
		id: ID!
		email: String!
		name: String!
	}
`;
