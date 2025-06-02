const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: true },
  imagemUrl: { type: DataTypes.STRING, allowNull: true },
  categoria: { type: DataTypes.INTEGER, references: {model: Category, key: 'id'}, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, references: {model: User, key: 'id'}, allowNull: false },
  tags: { type: DataTypes.STRING, allowNull: true }
});

Product.belongsTo(User, { foreignKey: 'userId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
