"use strict";
import bcrypt from "bcrypt";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Brand extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Wishlist.init(
		{
			user_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Wishlist",
		},
	);

	
	return Wishlist;
};
