const Post = require('../models/post.js');
const sequelize = require('../connect.js');
const fs = require('fs');

exports.createPost = async (req, res) => {
	try {
		var img = null;
		req.file ? img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : img;
		await Post.create({
			userid: req.auth.userId,
			content: req.body.content,
			title: req.body.title,
			imageURL: img,
			date: new Date()
		}).then(() => {
			res.status(200).send("ok");
		}).catch(err => {
			console.log(err);
			res.status(400).send(err);
		})
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.getAllPosts = (req, res) => {
	try {
		sequelize.query(
			"SELECT *, posts.id FROM posts INNER JOIN users ON posts.userid = users.id",
			{
				type: sequelize.QueryTypes.SELECT
			}
		).then(data => {
			var table = [];
			data.forEach(post => {
				table.push(post);
			})
			res.status(200).send(table);
		}).catch(err => {
			console.log(err);
		})

	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.getPost = (req, res) => {
	try {
		sequelize.query(
			"SELECT *, posts.id FROM posts INNER JOIN users ON posts.userid = users.id WHERE posts.id = :id",
			{
				replacements: { id: req.params.id },
				type: sequelize.QueryTypes.SELECT
			}
		).then(post => {
			res.status(200).send(post[0]);
		}).catch(err => {
			console.error(err);
			res.status(400).send(err);
		});
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.deletePost = (req, res) => {
	try {
		Post.findOne({
			where: {
				id: req.body.postid
			}
		}).then(post => {
			if (post.userid == req.auth.userId || req.auth.admin) {
				if (post.imageURL) {
					const filename = post.imageURL.split('/images/')[1];
					fs.unlink('images/' + filename, function (err) {
						if (err) {
							console.error(err);
							res.status(400).send(err);
							return;
						}
						console.log('Deleted file : ' + filename);
					});
					Post.destroy({
						where: {
							id: req.body.postid
						}
					}).then(() => {
						res.status(200).send('ok');
					}).catch(err => {
						console.error(err);
						res.status(400).send(err);
					});
				}
			} else {
				res.status(400).send("user doesn't have authorization");
				return;
			}
		}).catch(err => {
			console.error(err);
			res.status(400).send(err);
		});
	} catch (err) {
		res.status(400).send(err);
	}
}