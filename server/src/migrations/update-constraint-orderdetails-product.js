module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("Order_details", {
      fields: ["product_id"],
      type: "foreign key",
      name: "products_orderdetails",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Order_details", {
      fields: ["product_id"],
      type: "foreign key",
      name: "products_orderdetails",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
