const db = require('../database');

class Descriptions {
	static retrieveAll(callback) {
		db.query('SELECT description from catsinfo', (err, res) => {
			if (err.error) return callback(err);
			callback(res);
		});
	}

	static insert(description, callback) {
		db.query('INSERT INTO catsinfo (description) VALUES ($1)', [description], (err, res) => {
			if (err.error) return callback(err);
			callback(res);
		});
	}
}

module.exports = Descriptions;
