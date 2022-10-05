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
			// define association here
		}
	}
	Subcategories.init(
		{
			categories_id: DataTypes.INTEGER,
			subcategories_name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Subcategories",
		},
	);

	
	return Subcategories;
};
