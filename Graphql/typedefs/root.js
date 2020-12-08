const { gql } = require('apollo-server-express');

export default gql`
	type Query {
		_: string
	}
	type Mutation {
		_: string
	}
`;
