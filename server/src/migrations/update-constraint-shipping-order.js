module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("shippings", {
      fields: ["order_id"],
      type: "foreign key",
      name: "shipping_order",
      references: {
        table: "orders",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Shipping", {
      fields: ["order_id"],
      type: "foreign key",
      name: "shipping_order",
      references: {
        table: "orders",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
