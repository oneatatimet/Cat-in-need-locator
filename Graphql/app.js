const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');
import typeDefs from './resolvers';
import resolvers from './typedefs';

const app = express();
const port = process.env.PORT || 5000;
console.log('port:', port);

const server = new ApolloServer({
	playground: true, // enables the actual playground in production
	typeDefs,
	resolvers,
});

server.applyMiddleware({ app });

app.listen(port, () => {
	console.log(`🚀 Server ready at http://localhost:${port}`);
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
