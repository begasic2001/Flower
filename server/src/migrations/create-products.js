"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			categories_id: {
				type: Sequelize.INTEGER,
			},
			subcat_id: {
				type: Sequelize.INTEGER,
			},
			brand_id: {
				type: Sequelize.INTEGER,
			},
			pro_name: {
				type: Sequelize.STRING,
			},
			pro_code: {
				type: Sequelize.STRING,
			},
			pro_quantity: {
				type: Sequelize.STRING,
			},
			pro_details: {
				type: Sequelize.STRING,
			},
			pro_color: {
				type: Sequelize.STRING,
			},
			pro_size: {
				type: Sequelize.STRING,
			},
			selling_price: {
				type: Sequelize.STRING,
			},
			discount_price: {
				type: Sequelize.STRING,
			},
			video_link: {
				type: Sequelize.STRING,
			},
			main_slider: {
				type: Sequelize.STRING,
			},
			hot_new: {
				type: Sequelize.STRING,
			},
			buyone_getone: {
				type: Sequelize.STRING,
			},
			trend: {
				type: Sequelize.STRING,
			},
			img_one: {
				type: Sequelize.STRING,
			},
			img_two: {
				type: Sequelize.STRING,
			},
			img_three: {
				type: Sequelize.STRING,
			},
			status: {
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
		await queryInterface.dropTable("products");
	},
};
