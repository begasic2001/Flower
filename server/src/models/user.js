"use strict";
import bcrypt from "bcrypt";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		},
	);

	User.beforeCreate(async function (user) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
		} catch (error) {
			console.log(error);
		}
	});
	User.prototype.comparePassword = async function (password) {
		try {
			return await bcrypt.compare(password, this.password);
		} catch (error) {
			console.log(error);
		}
	};
	return User;
};
