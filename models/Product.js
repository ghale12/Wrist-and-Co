const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  strapMaterial: { type: DataTypes.STRING },
  dialColor: { type: DataTypes.STRING },
  caseSize: { type: DataTypes.STRING },
  waterResistance: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

module.exports = Product; 