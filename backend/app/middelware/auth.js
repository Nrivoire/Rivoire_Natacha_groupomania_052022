const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, config.secret);
		const userId = decodedToken.userId;
		const admin = decodedToken.admin;
		req.auth = { userId : userId, admin : admin };
		if (req.body.userId && req.body.userId !== userId) {
			res.status(409).send('Invalid user ID');
			return;
		} else {
			next();
		}
	} catch (err) {
		res.status(403).send(err);
	}
};