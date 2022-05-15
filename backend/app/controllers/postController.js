const Post = require('../models/post.js');
const sequelize = require('../connect.js');

exports.createPost = async (req, res) => {
	try {
		await Post.create({
			userid: req.auth.userId,
			content: req.body.content,
			imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		});
		res.status(200).send("ok");
	} catch(err) {
		res.status(400).send(err);
	}
}

exports.getAllPosts = (req, res) => {
	try {
		sequelize.query(
			"SELECT * FROM posts INNER JOIN users ON posts.userid = users.id;", 
			{
				type: sequelize.QueryTypes.SELECT
			}
		).then(data => {
			var table = [];
			data.forEach(post => {
				console.log(post);
				table.push(post);
			})
			res.status(200).send(table);
		}).catch(err => {
			console.log(err);
		})
		
	} catch(err) {
		res.status(400).send(err);
	}
}