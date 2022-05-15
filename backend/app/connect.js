const Sequelize = require('sequelize');

const config = require('./config.js');
const sequelize = new Sequelize(config.database, config.user, config.password, {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;