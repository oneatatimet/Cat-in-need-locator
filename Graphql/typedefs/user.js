let gql = require('graphql-tag');
export default gql`
extend type Query {
    getUsers: [User]
  }
	extend type Mutation {
		createUser(
            name: String!
            email: String!
            password: String!
            roleId: Int)
	}
	type User {
        id: Int
        name: String
        email: String
        roleId: Int
      }
`;
module.exports = typeDef;
