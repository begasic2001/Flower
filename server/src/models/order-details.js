"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order_details extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Order_details.init(
		{
			order_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            color:DataTypes.STRING,
            size:DataTypes.STRING,
            quantity:DataTypes.STRING,
            single_price:DataTypes.STRING,
            total_price:DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Order_details",
		},
	);

	
	return Order_details;
};
