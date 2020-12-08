const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV; //working on development or production
const PORT = process.env.PORT || 5000; //  herouku port if not thos port for express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities'));

app.use('/api/description', require('./api/description'));
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT} now`);
});

db.query('SELECT NOW()', (err, res) => {
	if (err.error) return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;
