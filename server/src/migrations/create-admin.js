"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin", {
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
      password: {
        type: Sequelize.STRING,
      },
      email_verified_at: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      coupon: {
        type: Sequelize.STRING,
      },
      product: {
        type: Sequelize.STRING,
      },
      blog: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.STRING,
      },
      other: {
        type: Sequelize.STRING,
      },
      report: {
        type: Sequelize.STRING,
      },
      return_order: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
      setting: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      role: {
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
    await queryInterface.dropTable("admin");
  },
};
