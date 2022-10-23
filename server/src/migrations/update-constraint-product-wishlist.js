module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("wishlists", {
      fields: ["product_id"],
      type: "foreign key",
      name: "products_wishlists",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("products", {
      fields: ["product_id"],
      type: "foreign key",
      name: "products_wishlists",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
