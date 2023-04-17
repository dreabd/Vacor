'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    id: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lattitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};