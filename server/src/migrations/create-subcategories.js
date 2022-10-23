"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("subCategories", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			categories_id: {
				type: Sequelize.STRING,
			},
			subcategory_name: {
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
		await queryInterface.dropTable("subCategories");
	},
};
