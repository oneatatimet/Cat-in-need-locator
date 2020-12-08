const express = require('express');

const { sequelize, User } = require('./models');

const app = express();
app.use(express.json());

app.post('/user', async (req, res) => {
	const { name, email, password, roleId } = req.body;
	try {
		const user = await User.create({ name, email, password, roleId });
		return res.json(user);
	} catch (err) {
		console.log('error');
		return res.status(500).json(err);
	}
});

app.listen({ port: 5000 }, async () => {
	console.log('listening');
	await sequelize.authenticate();
	console.log('db authinticated');
}); //nothing happens here now
