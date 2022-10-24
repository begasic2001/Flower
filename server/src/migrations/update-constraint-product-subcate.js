module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("products", {
      fields: ["subcat_id"],
      type: "foreign key",
      name: "products_subCategories",
      references: {
        table: "subCategories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("products", {
      fields: ["subcat_id"],
      type: "foreign key",
      name: "products_subCategories",
      references: {
        table: "subCategories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
