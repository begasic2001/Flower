"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			this.hasMany(models.Order_details, { foreignKey: order_id });
			this.hasMany(models.Shipping, { foreignKey: order_id });
			this.belongsTo(models.User, { foreignKey: user_id,targetKey:id });
		}
	}
	Order.init(
		{
			user_id: DataTypes.STRING,
			payment_id: DataTypes.STRING,
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
