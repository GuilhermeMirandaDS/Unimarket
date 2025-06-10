module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    tag: { type: DataTypes.INTEGER, allowNull: false },
    urlImg: { type: DataTypes.STRING, allowNull: true }
  });

  User.associate = (models) => {
    User.hasMany(models.Product, { foreignKey: 'userId', as: 'products' });
  };

  return User;
};