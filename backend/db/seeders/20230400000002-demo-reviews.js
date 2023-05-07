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
        userId: 3,
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
        userId: 1,
        spotId: 2,
        review: "I lvoe the randomness",
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: "It was fun for the kids but it was kinda hard to put them down afterwards.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 2,
        review: "An eclectic and unique experience, perfect for the adventurous traveler.",
        stars: 4
      },
      {
        userId: 1,
        spotId: 3,
        review: "Nice location but there are leaks all over the house and since we are all sandy from the beach it makes the place a mess",
        stars: 2
      },
      {
        userId: 2,
        spotId: 4,
        review: "Great place to just get away from the police",
        stars: 5
      },
      {
        userId: 3,
        spotId: 5,
        review: "Bugs every where, I went back home coverd in mosquito bites!!!",
        stars: 5
      },
      {
        userId: 2,
        spotId: 6,
        review: "Why are there tress in front of the sun!! I wanted to enjoy the sunset but the trees kept blocking the way!",
        stars: 2
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
