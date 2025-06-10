module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: true },
    imagemUrl: { type: DataTypes.STRING, allowNull: true },
    categoria: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    tags: { type: DataTypes.STRING, allowNull: true }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'seller' });
    Product.belongsTo(models.Category, { foreignKey: 'categoria' });
  };

  return Product;
};