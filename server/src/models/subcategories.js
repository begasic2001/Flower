"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categories, {
        foreignKey: categories_id,
        targetKey: id,
      });
      this.hasMany(models.Product, {
        foreignKey: subcat_id,
      });
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
    }
  );

  return Subcategories;
};
