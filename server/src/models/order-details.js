"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {
    static associate(models) {
      Order_details.belongsTo(models.Order, {
        foreignKey: 'order_id',
        targetKey: 'id',
      });
      Order_details.belongsTo(models.Product, {
        foreignKey: 'product_id',
        targetKey: 'id',
      });
    }
  }
  Order_details.init(
    {
      order_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      product_name: DataTypes.STRING,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
      quantity: DataTypes.STRING,
      single_price: DataTypes.STRING,
      total_price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order_details",
    }
  );

  return Order_details;
};
