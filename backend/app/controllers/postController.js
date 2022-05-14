const Post = require('../models/post.js');

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