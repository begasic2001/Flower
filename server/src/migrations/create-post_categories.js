"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("post_categories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      cat_name_vn: {
        type: Sequelize.STRING,
      },
      cat_name_en: {
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
		await queryInterface.dropTable("post_categories");
	},
};
