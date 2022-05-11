var config = {};
const dotenv = require("dotenv");
dotenv.config();

config.port = process.env.PORT;
config.database = process.env.SCHEMA;
config.password = process.env.PASSWORD;
config.user = process.env.USER;
config.host = process.env.HOST;

module.exports = config;