"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.post_categories, {
          foreignKey: "categories_id",
          targetKey: "id",
        });
    }
  }
  Post.init(
    {
      categories_id: DataTypes.STRING,
      post_en: DataTypes.STRING,
      post_vn: DataTypes.STRING,
      post_image: DataTypes.STRING,
      details_en: DataTypes.STRING,
      details_vn: DataTypes.STRING,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
