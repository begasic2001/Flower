module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("products", {
      fields: ["brand_id"],
      type: "foreign key",
      name: "products_brands",
      references: {
        table: "brands",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("products", {
      fields: ["brand_id"],
      type: "foreign key",
      name: "products_brands",
      references: {
        table: "brands",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
