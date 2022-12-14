"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: "ship_id",
      });
    }
  }
  Shipping.init(
    {
      ship_name: DataTypes.STRING,
      ship_phone: DataTypes.STRING,
      ship_email: DataTypes.STRING,
      ship_address: DataTypes.STRING,
      ship_city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );

  return Shipping;
};
