const User = require('../models/user.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
	try {
		await User.findOne({
			where : {
				email : req.body.email
			}
		}).then(() => {
			User.create({
				email: req.body.email,
				birthday: req.body.birthday,
				password: md5(req.body.password),
				firstname: req.body.firstname,
				lastname: req.body.lastname
			});
			res.status(200).send('Success');
		});
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.getUser = async (req, res) => {
	try {
		await User.findOne({
			where : {
				email : req.body.email
			}
		}).then((user) => {
			if (!user) {
				res.status(404).send('cannot find user');
			} else {
				if (user.dataValues.password !== md5(req.body.password))
					res.status(404).send('wrong password');
				else {
					console.log(user.dataValues);
					res.status(200).json({
						userId: user.dataValues.id,
						token: jwt.sign(
							{ userId: user.dataValues.id },
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' }
						)
					});
				}
			}
		}).catch((err) => {
			console.log(err);
			res.status(400).send(err);
		})
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.deleteUser = async (req, res) => {
	try {
	await User.destroy({
			where: {
				email: 'bryan@email.com'
			}
		}).then(() => {
			res.status(200).send('Success');
		})
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.updateUser = async (req, res) => {
	try {
		await User.update({
			email: req.body.email,
			birthday: req.body.birthday,
			password: md5(req.body.password),
			firstname: req.body.firstname,
			lastname: req.body.lastname
		}, {
			where: {
				id: req.headers.authorization[0]
			}
		}).then(() => {
			res.status(200).send('Success');
		})
	} catch (err) {
		res.status(400).send(err);
	}
}