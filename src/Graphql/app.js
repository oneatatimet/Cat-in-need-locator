const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');
const http = require('http');
const middleware = require('../middleware/middleware');
const path = require('path');
const { Client } = require('pg');

const users = require('./resolvers/users');
const animalFound = require('./resolvers/animalfound');

const app = express();
const port = process.env.PORT || 5080;
console.log('port:', port);

const typeDef = gql`
	type Query
	type Mutation
`;

const resolvers = [users.resolvers, animalFound.resolvers];

const typeDefs = [typeDef, users.typeDef, animalFound.typeDef];

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

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client.connect();
if (process.env.NODE_ENV == 'production') {
	let rootPath = path.resolve('client/build');
	app.use(express.static(rootPath));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(rootPath, 'index.html'));
	});
}

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
