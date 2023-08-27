'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
let spots = [
  {
    ownerId: 1,
    address: "2212 W Oceanfront",
    city: "Newport",
    state: "CA",
    country: "USA",
    lattitude: 33.6093883,
    longitude: -117.9301587,
    name: "Newport Beach Pier View II - Newport Beach, CA",
    description: "This incredible newly furnished home is perfectly located on the Newport Beach boardwalk, a short walk to the Newport Beach Pier, Blackie's Surf Spot, and a whole host of shops, restaurants, and parks. The rooftop deck features amazing views of the Pacific Ocean, where on a clear day you can see Rancho Palos Verdes, the Newport Pier, the Balboa Pier, and Catalina Island! This private deck has a grill and a dining table with other chairs so the entire family can relax together. This is truly a unique gem.",
    price: 656,
  },
  {
    ownerId: 2,
    address: "1220 Bee Tree Rd",
    city: "Swannanoa",
    state: "NC",
    country: "USA",
    lattitude: 35.632099,
    longitude: -82.407589,
    name: "The Roost- A tiny home in the Blue Ridge Mountains",
    description: "Inspired by the Iroquoi longhouse and Ryan's off-the-grid childhood, The Roost is a rustic arched tiny home, framed with birch saplings. High atop a ridge, you can enjoy year-round views of the mountains from the porch. Hike up the ridge or cozy up by the wood stove with a book. Grill out, start a campfire or just relax in the hammock. Nightlife, food, coffee and breweries in Asheville and Black mountain are 15 minutes away. It's an hour to Great Smokey Mountains National Park!",
    price: 70,
  },
  {
    ownerId: 3,
    address: "1726 W Oceanfront",
    city: "Newport",
    state: "CA",
    country: "USA",
    lattitude: 33.6070203,
    longitude: -117.925657,
    name: "Beautiful 2BR Oceanfront | Balcony",
    description: `Get away from it all and indulge in that long-awaited beach vacation! This beautiful rental is located on the upstairs level of a two-story, waterfront home. Enjoy the beautiful ocean and beach views, a fully-equipped kitchen for easy meal preparation, and complimentary internet access! Gather with your group in the inviting living area and plan out your vacation days or watch some TV. This rental also features a furnished deck equipped with an umbrella-covered table.`,
    price: 1830,
  },
  {
    ownerId: 4,
    address: "32291 Pine Cone Ln",
    city: "Running Springs",
    state: "CA",
    country: "USA",
    lattitude: 34.2000634,
    longitude: -117.1006418,
    name: "Castle in the Sky -- An Enchanted Getaway",
    description: `With Disney-inspired architecture and peaceful forested location, the Castle in the Sky is the enchanted mountain getaway you've always dreamt of. Relax by the koi pond, or enjoy the mountain scenery from the Keep or many viewing decks. The Castle not only provides the rustic cabin feel but also shares the comforts of a modern home: highspeed Wifi, TV streaming, smart thermostats, and more. We are excited to share our home with you and hope you will join us for an unforgettable experience!`,
    price: 499,
  },
  {
    ownerId: 5,
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
    ownerId: 1,
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
  {
    ownerId: 2,
    address: "63140 Pole Rd",
    city: "Joshua Tree",
    state: "CA",
    country: "USA",
    lattitude: 34.2293921,
    longitude: -116.286943,
    name: "Jackalope Cabin | Views, Hot Tub, Fire Pit, + More",
    description: `Newly restored, expertly curated desert dream home in North Joshua Tree outfitted with 2 bedrooms and spectacular views out every window. The perfect getaway for a romantic trip, work trip, or an intimate small group of friends. Jackalope Cabin is a 1955 homestead that has been lovingly restored and thoughtfully remodeled to evoke American Southwest and Rustic Scandinavian cabin vibes. The 2 bedroom house sleeps 4 guests. Jackalope Cabin is the perfect haven for those seeking a romantic getawa`,
    price: 259,
  },
  {
    ownerId: 3,
    address: "8584 Rock Haven Rd",
    city: "Joshua Tree",
    state: "CA",
    country: "USA",
    lattitude: 34.0991938,
    longitude: -116.2694142,
    name: "On the Rocks Joshua Tree, Conde Nast Traveller",
    description: `On the Rocks! is a stunning modern home artfully tucked on five spectacular acres of open desert and right next to the National Park! It's perfect for friends or families seeking the tranquility of the desert and easy access (10-minute drive) to Joshua Tree Village. With incredible views of rugged boulders and jagged mountains throughout, you'll look forward to coming home to this peaceful paradise to enjoy the sunset in the hot tub, stargaze around the fire pit, and absorb the surroundings.`,
    price: 261,
  },
  {
    ownerId: 4,
    address: "48799 Artesia Way",
    city: "Morongo Valley",
    state: "CA",
    country: "USA",
    lattitude: 34.0462197,
    longitude: -116.6022387,
    name: "Hilltop Haven: Majestic Views & Tranquil Pool",
    description: `"Top of the World" Desert Oasis on 5 acres. Enjoy unmatched mountain and Palm Springs city skyline views from the split-level pool, BBQ, fire pit, and fully-shaded al fresco dining area. Take a morning hike at Joshua Tree National Park, explore the Palm Springs dining scene, or simply unwind by the pool and bask in the breathtaking watercolor sunset that turns into the Milky Way at night.`,
    price: 348,
  },
  {
    ownerId: 5,
    address: "1095 Garden Ln",
    city: "Beverly Hills",
    state: "CA",
    country: "USA",
    lattitude: 34.0899693,
    longitude: -118.4173395,
    name: "Chateau de Laurel",
    description: `Just off North Beverly Hills Drive, this classical French style estate is in prime location for enjoying all this iconic area has to offer. With an incredible amount of indoor and outdoor space, it's perfect for large scale entertaining, extended family vacations, and maybe even a romantic wedding ceremony.`,
    price: 15840,
  },
  {
    ownerId: 1,
    address: "42280 Calle Contento",
    city: "Temecula",
    state: "CA",
    country: "USA",
    lattitude: 33.5099519,
    longitude: -117.0642714,
    name: "Wine Country estate with 360 view of Temecula",
    description: `Private 6000 sqt Wine Country estate with 360 degree view of Temecula Valley. On a Hill top in a great location in Wine Country with Incredible views! Awesome game room with Pool table, Ping Pong table, foosball table, shuffle board, corn hole and a bar area. Then you step outside and find a Rock water fall pool with a slide, grotto pool with a jacuzzi!! This home is a must see!!`,
    price: 1000,
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
      ownerId: { [Op.in]: [1, 2] }
    }, {});
  }
};
