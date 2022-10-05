"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("brand", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			brand_name: {
				type: Sequelize.STRING,
			},
			brand_logo: {
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
		await queryInterface.dropTable("brand");
	},
};
