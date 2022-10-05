"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Admin.init(
		{
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
            email_verified_at:DataTypes.STRING,
            category:DataTypes.STRING,
            coupon:DataTypes.STRING,
            product:DataTypes.STRING,
            blog:DataTypes.STRING,
            order:DataTypes.STRING,
            other:DataTypes.STRING,
            report:DataTypes.STRING,
            return_order:DataTypes.STRING,
            contact:DataTypes.STRING,
            comment:DataTypes.STRING,
            setting:DataTypes.STRING,
            type:DataTypes.INTEGER,
            role:DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Admin",
		},
	);


	return Admin;
};
