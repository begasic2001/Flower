module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("Order_details", {
      fields: ["order_id"],
      type: "foreign key",
      name: "order_orderdetails",
      references: {
        table: "orders",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Order_details", {
      fields: ["order_id"],
      type: "foreign key",
      name: "order_orderdetails",
      references: {
        table: "orders",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
