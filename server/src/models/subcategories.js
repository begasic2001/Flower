"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategories extends Model {
    static associate(models) {
      Subcategories.belongsTo(models.Categories, {
        foreignKey: "categories_id",
        targetKey: "id",
      });
      // targetKey: id,
      // this.hasMany(models.Product, {
      //   foreignKey: subcat_id,
      // });
    }
  }
  Subcategories.init(
    {
      categories_id: DataTypes.STRING,
      subcategory_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Subcategories",
    },
  );

  return Subcategories;
};
