"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("contacts", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			message: {
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
		await queryInterface.dropTable("contacts");
	},
};
