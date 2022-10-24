module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("products", {
      fields: ["categories_id"],
      type: "foreign key",
      name: "products_categories",
      references: {
        table: "categories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("products", {
      fields: ["categories_id"],
      type: "foreign key",
      name: "products_categories",
      references: {
        table: "categories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
