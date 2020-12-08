const db = require('../database');

class Cities {
	static retrieveAll(callback) {
		db.query('SELECT city from catsinfo', (err, res) => {
			if (err.error) return callback(err);
			callback(res);
		});
	}

	static insert(city, callback) {
		db.query('INSERT INTO catsinfo (city) VALUES ($1)', [city], (err, res) => {
			if (err.error) return callback(err);
			callback(res);
		});
	}
}

module.exports = Cities;
