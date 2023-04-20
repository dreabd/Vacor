'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User,{
        foreignKey:"userId"
      })
      Booking.belongsTo(models.Spot,{
        foreignKey:"spotId"
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type:DataTypes.DATE,
      validate:{
        isBeforeToday(value){
          let today = new Date().toISOString()
          if(value.toISOString() < today){
            throw new Error("Date must be made in the present")
          }
        }
      }
    },
    endDate: {
      type:DataTypes.DATE,
      validate:{
        isBefore(value){
          if(value <= this.startDate){
            throw new Error("End Date cannot be on or before Start Date ")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
