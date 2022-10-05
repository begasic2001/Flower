"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Shipping extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Shipping.init(
		{
			order_id: DataTypes.INTEGER,
			ship_name: DataTypes.STRING,
            ship_phone:DataTypes.STRING,
            ship_email:DataTypes.STRING,
            ship_address:DataTypes.STRING,
            ship_city:DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Shipping",
		},
	);

	
	return Shipping;
};
