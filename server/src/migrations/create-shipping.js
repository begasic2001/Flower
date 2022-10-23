"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("shippings", {
			id: {
				allowNull: false,
				
				primaryKey: true,
				type: Sequelize.STRING,
			},
			order_id: {
				type: Sequelize.INTEGER,
			},
			ship_name: {
				type: Sequelize.STRING,
			},
			ship_phone: {
				type: Sequelize.STRING,
			},
			ship_email: {
				type: Sequelize.STRING,
			},
			ship_address: {
				type: Sequelize.STRING,
			},
			ship_city: {
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
		await queryInterface.dropTable("shippings");
	},
};
