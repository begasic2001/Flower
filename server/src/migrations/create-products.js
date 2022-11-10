"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      categories_id: {
        type: Sequelize.STRING,
      },
      subcat_id: {
        type: Sequelize.STRING,
      },
      brand_id: {
        type: Sequelize.STRING,
      },
      pro_name: {
        type: Sequelize.STRING,
      },
      pro_code: {
        type: Sequelize.STRING,
      },
      pro_quantity: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
      filename_one: {
        type: Sequelize.STRING,
      },
      filename_two: {
        type: Sequelize.STRING,
      },
      filename_three: {
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
