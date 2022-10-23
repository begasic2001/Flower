"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("posts", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			categories_id: {
				type: Sequelize.STRING,
			},
			post_en: {
				type: Sequelize.STRING,
			},
			post_vn: {
				type: Sequelize.STRING,
			},
			post_image: {
				type: Sequelize.STRING,
			},
			details_en: {
				type: Sequelize.STRING,
			},
			details_vn: {
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
		await queryInterface.dropTable("posts");
	},
};
