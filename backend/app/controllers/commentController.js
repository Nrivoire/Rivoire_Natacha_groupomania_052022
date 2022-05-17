const Comment = require('../models/comment.js');
const User = require('../models/user.js');
const sequelize = require('../connect.js');

exports.createComment = (req, res) => {
	try {
		User.findOne({
			where: {
				id : req.auth.userId
			}
		}).then(user => {
			Comment.create({
				postid : req.body.postid,
				userid: user.id,
				message: req.body.message,
				firstname: user.firstname,
				lastname: user.lastname,
				date : req.body.date
			}).then(() => {
				sequelize.query(
					"UPDATE posts SET count_commentaires = count_commentaires + 1 WHERE id = " + req.body.postid, 
				).then(() => {
					res.status(200).send("ok");
				})
				.catch(err => {
					console.log(err)
					res.status(400).send(err);
				})
			}).catch(err => {
				console.log(err);
				res.status(400).send(err);
			})
		}).catch(err => {
			console.log(err);
			res.status(400).send(err);
		})
		
	} catch(err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.getAllCommentsForOnePost = (req, res) => {
	try {
		Comment.findAll({
			where: {
				postid: req.params.id
			}
		})
		.then(comments => {
			var table = [];
			comments.forEach(comment => {
				table.push(comment.dataValues);
			})
			res.status(200).send(table);
		}).catch(err => {
			console.log(err);
			res.status(400).send(err);
		})
	} catch(err) {
		res.status(400).send(err);
	}
}

exports.deleteComment = (req, res) => {
	try {
		Comment.findOne({
			where: {
				id: req.body.commentId
			}
		}).then(comment => {
			if (comment.userid == req.auth.userId || req.auth.admin) {
				Comment.destroy({
					where: {
						id: req.body.commentId
					}
				}).then(() => {
					sequelize.query(
						"UPDATE posts SET count_commentaires = count_commentaires - 1 WHERE id = " + req.body.postid, 
					).then(() => {
						res.status(200).send("ok");
					}).catch(err => {
						console.log(err)
						res.status(400).send(err);
					})
				}).catch(err => {
					console.error(err);
					res.status(400).send(err);
				});
			} else {
				res.status(400).send("user doesn't have authorization");
				return;
			}
		}).catch(err => {
			console.log(err)
			res.status(400).send(err);
		})
		
	} catch (err) {
		res.status(400).send(err);
	}
}