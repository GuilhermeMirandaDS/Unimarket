const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Company;
