const { Sequelize, DataTypes } = require('sequelize');

const config = require('../config.js');
const sequelize = new Sequelize(config.database, config.user, config.password, {
    dialect: "mysql",
    host: "localhost"
});

const User = sequelize.define('user', {
	// Model attributes are defined here
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	birthday: {
		type: DataTypes.DATE
	},
	password: {
		type: DataTypes.STRING
	}
} , {
	// Other model options go here
	timestamps: false,
	sequelize, // We need to pass the connection instance
	modelName: 'User' // We need to choose the model name
});

module.exports = User;