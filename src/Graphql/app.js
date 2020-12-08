const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');
const http = require('http');
const middleware = require('../middleware/middleware');

const users = require('./resolvers/users');

const app = express();
const port = process.env.PORT || 5080;
console.log('port:', port);

const typeDef = gql`
	type Query
	type Mutation
`;

const resolvers = [users.resolvers];

const typeDefs = [typeDef, users.typeDef];

const server = new ApolloServer({
	playground: true, // enables the actual playground in production
	typeDefs,
	resolvers,
	async context({ req, connection }) {
		req = await middleware(req);
		return {
			request: req,
		};
	},
});

server.applyMiddleware({ app, path: '/' });

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});

// app.use(express.json());

// app.post('/user', async (req, res) => {
// 	const { name, email, password, roleId } = req.body;
// 	try {
// 		const user = await User.create({ name, email, password, roleId });
// 		return res.json(user);
// 	} catch (err) {
// 		console.log('error');
// 		return res.status(500).json(err);
// 	}
// });

// app.listen({ port: 5000 }, async () => {
// 	console.log('listening');
// 	await sequelize.authenticate();
// 	console.log('db authinticated');
// }); //nothing happens here now
