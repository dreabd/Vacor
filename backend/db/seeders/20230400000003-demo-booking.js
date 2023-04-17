'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: "2023-06-13",
        endDate: "2023-06-23",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-06-13",
        endDate: "2023-06-23",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-06-13",
        endDate: "2023-06-23",
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2023-06-13",
        endDate: "2023-06-23",
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
