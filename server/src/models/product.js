"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categories, {
        foreignKey: "categories_id",
        targetKey: "id",
      });
      this.belongsTo(models.Subcategories, {
        foreignKey: "subcat_id",
        targetKey: "id",
      });
      this.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        targetKey: "id",
      });
      this.hasMany(models.Order_details, {
        foreignKey: "product_id",
      });
      this.hasMany(models.Wishlist, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      categories_id: DataTypes.STRING,
      subcat_id: DataTypes.STRING,
      brand_id: DataTypes.STRING,
      pro_name: DataTypes.STRING,
      pro_code: DataTypes.STRING,
      pro_quantity: DataTypes.INTEGER,
      pro_details: DataTypes.STRING,
      pro_color: DataTypes.STRING,
      pro_size: DataTypes.STRING,
      selling_price: DataTypes.INTEGER,
      discount_price: DataTypes.STRING,
      video_link: DataTypes.STRING,
      main_slider: DataTypes.STRING,
      best_rated: DataTypes.STRING,
      hot_new: DataTypes.STRING,
      buyone_getone: DataTypes.STRING,
      trend: DataTypes.STRING,
      img_one: DataTypes.STRING,
      img_two: DataTypes.STRING,
      img_three: DataTypes.STRING,
      status: DataTypes.STRING,
      filename_one: DataTypes.STRING,
      filename_two: DataTypes.STRING,
      filename_three: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
