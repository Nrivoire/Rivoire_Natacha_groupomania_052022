const { Sequelize, DataTypes } = require('sequelize');

const config = require('../config.js');
const sequelize = new Sequelize(config.database, config.user, config.password, {
    dialect: "mysql",
    host: "localhost"
});

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