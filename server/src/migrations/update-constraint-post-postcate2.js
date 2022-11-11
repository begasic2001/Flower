module.exports = {
  up: async function (queryInterface, Sequelize) {
    // logic for transforming into the new state
      return queryInterface.addConstraint("posts", {
        fields: ["categories_id"],
        type: "foreign key",
        name: "categories_post_lang",
        references: {
          table: "post_categories",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
  },

  down: async function (queryInterface, Sequelize) {
   
  },
};
