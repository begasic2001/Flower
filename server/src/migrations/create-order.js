"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			payment_id: {
				type: Sequelize.STRING,
			},
			payment_type: {
				type: Sequelize.STRING,
			},
			amount: {
				type: Sequelize.STRING,
			},
			stripe_id: {
				type: Sequelize.STRING,
			},
			subtotal: {
				type: Sequelize.STRING,
			},
			vat: {
				type: Sequelize.STRING,
			},
			total: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
			},
			status_code: {
				type: Sequelize.STRING,
			},
			return_order: {
				type: Sequelize.STRING,
			},
			date_order: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("orders");
	},
};
