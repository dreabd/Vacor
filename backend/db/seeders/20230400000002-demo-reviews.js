'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 2,
        review: "Too random for me",
        stars: 3
      },
      {
        userId: 3,
        spotId: 1,
        review: "My kids loved it! Looking forward to coming back",
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: "I lvoe the randomness",
        stars: 5
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
