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
			// define association here
		}
	}
	Product.init(
		{
			categories_id: DataTypes.INTEGER,
	        subcat_id: DataTypes.INTEGER,
            brand_id:DataTypes.INTEGER,
            pro_name:DataTypes.STRING,
            pro_code:DataTypes.STRING,
            pro_quantity:DataTypes.STRING,
            pro_details:DataTypes.STRING,
            pro_color:DataTypes.STRING,
            pro_size:DataTypes.STRING,
            selling_price:DataTypes.STRING,
            discount_price:DataTypes.STRING,
            video_link:DataTypes.STRING,
            main_slider:DataTypes.STRING,
            hot_new:DataTypes.STRING,
            buyone_getone:DataTypes.STRING,
            trend:DataTypes.STRING,
            img_one:DataTypes.STRING,
            img_two:DataTypes.STRING,
            img_three:DataTypes.STRING,
            status:DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Product",
		},
	);

	
	return Product;
};
