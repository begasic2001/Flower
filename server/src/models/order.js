"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.hasMany(models.Order_details, { foreignKey: "order_id" });
      this.hasMany(models.Shipping, { foreignKey: "order_id" });
      this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
      this.belongsTo(models.Shipping, {
        foreignKey: "ship_id",
        targetKey: "id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.STRING,
      total: DataTypes.STRING,
      date_order: DataTypes.STRING,
      ship_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
