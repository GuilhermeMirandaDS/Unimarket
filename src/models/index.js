const { Sequelize } = require('sequelize');
const config = require('../config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

module.exports = sequelize;