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
      },
      {
        ownerId: 3,
        address: "9537 Somerset Lane",
        city: "West Bloomfield",
        state: "MI",
        country: "USA",
        lattitude: 42.272665,
        longitude: 83.585038,
        name: "Seaside Serenity",
        description: "This charming beach house is located just steps from the ocean and offers breathtaking views of the water. Relax in the cozy living room or on the sun-drenched patio and enjoy the tranquil sounds of the waves.",
        price: 300,
      },
      {
        ownerId: 1,
        address: "17 Bedford Dr.",
        city: "Palm Harbor",
        state: "FL",
        country: "USA",
        lattitude: 43.384328,
        longitude: -115.67683,
        name: "Mountain Escape",
        description: "Nestled in the heart of the mountains, this rustic cabin offers the perfect retreat from city life. Enjoy hiking, skiing, and other outdoor activities during the day and cozy up by the fire in the evenings.",
        price: 223,
      },
      {
        ownerId: 2,
        address: "838 Hilldale St.",
        city: "Brighton",
        state: "MA",
        country: "USA",
        lattitude: 48.38533,
        longitude: -112.55496,
        name: "Lakeside Haven",
        description: "This stunning lakeside home boasts panoramic views of the water and mountains. Spend your days fishing, boating, and swimming, and your nights enjoying a barbecue on the deck.",
        price: 320,
      },
      {
        ownerId: 3,
        address: "86 Monroe Ave.",
        city: "Miami Beach",
        state: "FL",
        country: "USA",
        lattitude: 43.39430,
        longitude: -88.51616,
        name: "Sunset Retreat",
        description: "Enjoy breathtaking sunsets over the ocean from this luxurious beach house. With an open floor plan and high-end finishes, this home offers the perfect blend of modern elegance and seaside charm.",
        price: 167,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2] }
    }, {});
  }
};
