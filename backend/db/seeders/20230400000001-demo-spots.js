'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
let spots = [
    {
      ownerId: 1,
      address: "578 Lamp Ave",
      city: "Cambridge",
      state: "CA",
      country: "USA",
      lattitude: 33.5823032,
      longitude: -117.6792358,
      name: "Castle in the Sky -- An Enchanted Getaway",
      description: "With Disney-inspired architecture and peaceful forested location, the Castle in the Sky is the enchanted mountain getaway you've always dreamt of. Relax by the koi pond, or enjoy the mountain scenery from the Keep or many viewing decks. The Castle not only provides the rustic cabin feel but also shares the comforts of a modern home: highspeed Wifi, TV streaming, smart thermostats, and more. We are excited to share our home with you and hope you will join us for an unforgettable experience!",
      price: 499,
    },
    {
      ownerId: 2,
      address: "578 Lamp Ave",
      city: "Cambridge",
      state: "CA",
      country: "USA",
      lattitude: 33.376419,
      longitude: -117.251144,
      name: `Tranquil, Private, Spa Casita, Outside of Town`,
      description: `The entire home and spa is yours for a relaxing getaway. It's nestled on a 50-acre avocado grove; 10-15 minutes (approx. 5-6 mi) from Fallbrook; 30 min from Temecula's wine country, 40 min from the beach. It is off the beaten path, a unique one of a kind experience, well worth the drive. Great Views! You won't want to leave! Private, peaceful, pristine chaparral, surrounded by avocados! The stars are amazing. A comfortable "nature" experience all rolled into a get-away`,
      price: 239,
    },
    {
      ownerId: 3,
      address: "63140 Pole Rd",
      city: "Joshua Tree",
      state: "CA",
      country: "USA",
      lattitude: 34.2293921,
      longitude: -116.286943,
      name: `Newly restored, expertly curated desert dream home in North Joshua Tree outfitted with 2 bedrooms and spectacular views out every window. The perfect getaway for a romantic trip, work trip, or an intimate small group of friends.

      Jackalope Cabin is a 1955 homestead that has been lovingly restored and thoughtfully remodeled to evoke American Southwest and Rustic Scandinavian cabin vibes. The 2 bedroom house sleeps 4 guests. Jackalope Cabin is the perfect haven for those seeking a romantic getawa`,
      price: 259,
    },
    {
      ownerId: 4,
      address: "1012 Robinhood Blvd",
      city: "Big Bear",
      state: "CA",
      country: "USA",
      lattitude: 34.259288,
      longitude: -116.862141,
      name: `Walk to Oktoberfest, Hot Tub, Poker Room, Dogs ok`,
      description: `NOW PET-FRIENDLY! Rainbow Forest Retreat offers an entire cabin with 1800 sq ft of ample space and plenty of outdoor living. Forest views with a warm mountain decor. Kitchen is fully equipped. Cabin is close proximity to a variety of restaurants, two ski resorts and village. You can enjoy relaxing with a huge selection of movies and Smart TV. Light the wood burning stove and get cozy! For entertainment, pick from playing pool, Wii, (safe) axe throwing, board games or enjoy the poker room.`,
      price: 239,
    },
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, spots, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2] }
    }, {});
  }
};
