const Post = require('../models/post.js');

exports.createPost = async (req, res) => {
	try {
		if (!req.body.userId) {
			res.status(404).send('A message should be linked to an user')
			return;
		}
		await Post.create({
			userid: req.body.userId,
			content: req.body.content,
			imageURL: req.body.imageURL
		});
		res.status(200).send("ok");
	} catch(err) {
		res.status(400).send(err);
	}
}