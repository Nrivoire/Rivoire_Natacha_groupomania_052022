const User = require('../models/user.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const validator = require("email-validator");

exports.createUser = (req, res) => {
	try {
		if (!req.body.email || !validator.validate(req.body.email)) {
			res.status(400).send("wrong email format");
			return;
		} else {
			User.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				if (!user) {
					User.create({
						email: req.body.email,
						birthday: req.body.birthday,
						password: md5(req.body.password),
						firstname: req.body.firstname,
						lastname: req.body.lastname
					}).then(user => {
						var bool = false;
						if (user.dataValues.admin == 1)
							bool = true;
						res.status(200).json({
							userId: user.dataValues.id,
							token: jwt.sign(
								{
									userId: user.dataValues.id,
									admin: bool
								},
								config.secret,
								{ expiresIn: '24h' }
							)
						})
					}).catch(err => {
						console.log(err);
						res.status(400).send(err);
					})
				} else {
					res.status(409).send("User already exist");
					return;
				}
			}).catch((err) => {
				console.log(err);
				res.status(400).send(err);
			});
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.login = async (req, res) => {
	try {
		if (!req.body.email || !validator.validate(req.body.email)) {
			res.status(400).send("wrong email format");
			return;
		} else {
			await User.findOne({
				where: {
					email: req.body.email
				}
			}).then((user) => {
				if (!user) {
					console.log('cannot find user');
					res.status(404).send('cannot find user');
				} else {
					if (user.dataValues.password !== md5(req.body.password))
						res.status(404).send('wrong password');
					else {
						var bool = false;
						if (user.dataValues.admin == 1)
							bool = true;
						res.status(200).json({
							userId: user.dataValues.id,
							admin: bool,
							token: jwt.sign(
								{
									userId: user.dataValues.id,
									admin: bool
								},
								config.secret,
								{ expiresIn: '24h' }
							)
						});
					}
				}
			}).catch((err) => {
				console.log(err);
				res.status(400).send(err);
			})
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.getUser = (req, res) => {
	try {
		User.findOne({
			where: {
				id: req.auth.userId
			}
		}).then(user => {
			res.status(200).send(user.dataValues);
		}).catch(err => {
			console.error(err);
			res.status(400).send(err);
		});
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.deleteUser = (req, res) => {
	try {
		User.destroy({
			where: {
				id: req.auth.userId
			}
		}).then(() => {
			res.status(200).send('ok');
		}).catch(err => {
			console.error(err);
			res.status(400).send(err);
		});
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.updateUser = async (req, res) => {
	try {
		if (req.body.password)
			req.body.password = md5(req.body.password);
		await User.update(req.body, {
			where: {
				id: req.auth.userId
			}
		}).then(() => {
			res.status(200).send('ok');
		}).catch(err => {
			console.error(err);
			res.status(400).send(err);
		});
	} catch (err) {
		res.status(400).send(err);
	}
}