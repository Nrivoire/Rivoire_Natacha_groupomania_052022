const DataTypes = require('sequelize');
const sequelize = require('../connect.js');

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
	sequelize,
	modelName: 'User'
});

module.exports = User;