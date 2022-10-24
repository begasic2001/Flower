module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addConstraint("wishlists", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_wishlist",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint("wishlists", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_wishlist",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
