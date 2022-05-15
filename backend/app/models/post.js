const DataTypes = require('sequelize');
const sequelize = require('../connect.js');

const Post = sequelize.define('post', {
	// Model attributes are defined here
	userid: {
		type: DataTypes.INTEGER
	},
	content: {
		type: DataTypes.STRING
	},
	imageURL: {
		type: DataTypes.STRING
	}
} , {
	// Other model options go here
	timestamps: false,
	sequelize,
	modelName: 'Post' 
});

module.exports = Post;