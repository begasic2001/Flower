"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("brands", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("brands");
  },
};
