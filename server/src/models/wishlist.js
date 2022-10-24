"use strict";
import bcrypt from "bcrypt";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: product_id,
        targetKey: id,
      });
      this.belongsTo(models.User, {
        foreignKey: user_id,
        targetKey: id,
      });
    }
  }
  Wishlist.init(
    {
      user_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );

  return Wishlist;
};
