let gql = require('graphql-tag');

const typeDef = gql`
	extend type Query {
		getAnimalsFound: [AnimalFound]
	}

	extend type Mutation {
		createAnimalFound(
			description: String
			locationName: String
			lat: String
			lng: String
			userId: Int
		): String
	}

	type AnimalFound {
		id: Int
		description: String
		locationName: String
		lat: String
		lng: String
		userId: Int
	}
`;

module.exports = typeDef;
