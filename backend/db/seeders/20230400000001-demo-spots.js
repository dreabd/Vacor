'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Champion Rd",
        city: "Peabody",
        state: "MA",
        country: "USA",
        lattitude:42.536457,
        longitude: -70.985786,
        name: "Funland",
        description: " A perfect place for kids to have fun and for the adults to relax",
        price: 1200,
      },
      {
        ownerId: 2,
        address: "578 Lamp Ave",
        city: "Cambridge",
        state: "MD",
        country: "USA",
        lattitude: 38.563461,
        longitude: -76.085251,
        name: "Random Name",
        description: "Looking for a place where you can not expect the expected? Well we have the perfect spot for you",
        price: 500,
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
