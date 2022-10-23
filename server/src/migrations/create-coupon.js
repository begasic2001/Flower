"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("coupons", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			coupon: {
				type: Sequelize.STRING,
			},
			discount: {
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
		await queryInterface.dropTable("coupons");
	},
};
