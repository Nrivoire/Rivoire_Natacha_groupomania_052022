const DataTypes = require('sequelize');
const sequelize = require('../connect.js');

const Comment = sequelize.define('comment', {
	postid: {
		type: DataTypes.INTEGER
	},
	userid: {
		type: DataTypes.INTEGER
	},
	message: {
		type: DataTypes.STRING
	},
	firstname: {
		type: DataTypes.STRING
	},
	lastname: {
		type: DataTypes.STRING
	},
	date: {
		type: DataTypes.DATE
	}
} , {
	timestamps: false,
	sequelize,
	modelName: 'Comment' 
});

module.exports = Comment;