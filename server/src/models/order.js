"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Order.init(
		{
			user_id: DataTypes.INTEGER,
			payment_id: DataTypes.INTEGER,
            payment_type:DataTypes.STRING,
            amount:DataTypes.STRING,
            stripe_id:DataTypes.STRING,
            subtotal:DataTypes.STRING,
            vat:DataTypes.STRING,
            total:DataTypes.STRING,
            status:DataTypes.STRING,
            status_code:DataTypes.STRING,
            return_order:DataTypes.STRING,
            date_order:DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Order",
		},
	);

	
	return Order;
};
