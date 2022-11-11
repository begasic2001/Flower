"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_categories.init(
    {
      cat_name_vn: DataTypes.STRING,
      cat_name_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post_categories",
    },
  );

  return post_categories;
};
