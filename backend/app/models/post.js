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
	},
	title: {
		type: DataTypes.STRING
	},
	date: {
		type: DataTypes.DATE
	}
} , {
	// Other model options go here
	timestamps: false,
	sequelize,
	modelName: 'Post' 
});

module.exports = Post;