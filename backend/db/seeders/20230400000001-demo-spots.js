'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
let spots = [
  // 1
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
  // 2
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
  // 3
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
  // 4
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
  // 5
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
  // 6
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
  // 7
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
  // 8
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
  // 9
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
  // 10
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
  // 11
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
  // 12
  {
    ownerId: 2,
    address: "51 Zion Shadow Cir",
    city: "Springdale",
    state: "UT",
    country: "USA",
    lattitude: 37.1916889,
    longitude: -112.9937058,
    name: "Zion Canyon BnB Room-4",
    description: `The home is located only .6 miles to the entrance of Zion National Park and is Situated on 2.5 acres of green lawn and desert landscaping that offer stunning views of the canyon from any one of our many balconies and sitting areas. Included in your stay are hearty, homemade breakfast burritos to-go and coffee to fuel your day of hiking and adventure. The house is decorated with art from local artisans, native decor, and charming antiques acquired over 20 years of operation.`,
    price: 271,
  },
  // 13
  {
    ownerId: 3,
    address: "21253 Geyserville Ave",
    city: "Geyersville",
    state: "CA",
    country: "USA",
    lattitude: 38.7084854,
    longitude: -122.9079509,
    name: "Luxurious Wine Country Estate",
    description: `Fully renovated Victorian resort built in 1870. Situated on a level acre, short walk to some of the finest dining and wine tasting. The estate has a resort size pool/spa area, a small vineyard, and “The Barn” for exercise or recreational activities. The perfect resort property for your next wine country vacation, suitable for family vacations, corporate retreats, wedding parties, yoga retreats or family reunions! Your own private resort We can offer breakfast and daily maid service upon request.`,
    price: 2043,
  },
  // 14
  {
    ownerId: 4,
    address: "1515 Main St",
    city: "Saint Helena",
    state: "CA",
    country: "USA",
    lattitude: 38.5062454,
    longitude: -122.475011,
    name: "Get spoiled at this Historic House with Breakfast",
    description: `This is a historic, spacious home with 5 bedrooms and 4 bathrooms that includes an incredible breakfast each morning! We offer first class amenities like a romantic fireplace in the upstairs guest room, cable television in each room, and daily maid service, and a beautiful front garden and wood floor reading room.Our goal at the Ambrose Bierce House, Inn St Helena is to offer you the finest combination of luxury, hospitality, and history.`,
    price: 1794,
  },
  // 15
  {
    ownerId: 5,
    address: "1880 W 4640 N",
    city: "Helper",
    state: "UT",
    country: "USA",
    lattitude: 39.6663787,
    longitude: -110.8529922,
    name: "Open House Accommodations in Wyoming Bedroom",
    description: `The WYOMING BEDROOM has a Woodsy theme & has it's own Private Bath behind the bedroom and also a private deck. It is by far the "Favorite" of our rooms.
    At The Winchester House we serve a Pastry of some sort, Fruit and coffee or Juice ( Served in our newly remodeled Dining Room)
    In St. George there is ALWAYS something fun happening.
    You will be glad you chose to come and stay with us.
    Near the Winchester House is Hiking, Biking with many trails. Also, we are across from Snow Canyon State Park.`,
    price: 77,
  },
  // 16
  {
    ownerId: 1,
    address: "8940 Johnson Dr",
    city: "La Mesa",
    state: "CA",
    country: "USA",
    lattitude: 32.7665805,
    longitude: -117.0062027,
    name: "Ocean View Estate with Pool, Hot Tub & Playground",
    description: `Enjoy a cold drink on a shaded terrace with expansive views of your private pool, soaring palm trees, and distant mountains and ocean. All ages will be entertained at this private, gated two-acre hilltop estate. Located just 15-20 minutes from downtown and local beaches, this custom, single story home encompasses over 4,300 sf of comfort with 5 bed, 5 ½ bathrooms and views from every room.`,
    price: 973,
  },
  // 17
  {
    ownerId: 2,
    address: "40852 Blossom Drive",
    city: "Three Rivers",
    state: "CA",
    country: "USA",
    lattitude: 36.4162309,
    longitude: -118.9091231,
    name: "The River Island- Sequoia's Dream Property",
    description: `The River Island was created as an homage to the love story of G&G, their wedding at an Italian Castle, and their dream to raise a river child. The house once served as settlement for Yokut tribes at the foothills of the National Sequoia and Mineral King Parks.`,
    price: 816,
  },
  // 18
  {
    ownerId: 3,
    address: "40852 Blossom Drive",
    city: "Three Rivers",
    state: "CA",
    country: "USA",
    lattitude: 36.4162309,
    longitude: -118.9091231,
    name: "The River Island- Sequoia's Dream Property",
    description: `The River Island was created as an homage to the love story of G&G, their wedding at an Italian Castle, and their dream to raise a river child. The house once served as settlement for Yokut tribes at the foothills of the National Sequoia and Mineral King Parks.`,
    price: 816,
  },
  // 19
  {
    ownerId: 4,
    address: "391 Duboise Ave",
    city: "Nogal",
    state: "NM",
    country: "USA",
    lattitude: 34.24876193451199,
    longitude: -105.59830162879811,
    name: "El Comalito",
    description: `The house was designed by the singer Lila Downs and her husband, saxophonist Paul Cohen, who welcome people who are interested in experiencing the amazing culture of Oaxaca in a special setting.`,
    price: 640,
  },
  // 20
  {
    ownerId: 5,
    address: "21390 Rambla Vista",
    city: "Malibu",
    state: "CA",
    country: "USA",
    lattitude: 34.038692964780054,
    longitude: -118.6407219818038,
    name: "EAGLE'S WATCH MALIBU- Architectural w/ Ocean View",
    description: `Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving the Pacific Coast Highway and designed by legendary architect Harry Gesner. Perched above the Pacific Ocean, Eagle's Watch has the best unobstructed panoramic view in Malibu. Perfect for entertaining with dramatic outdoor and indoor spaces, the views from every location are simply stunning. Stay in ultimate luxury in this one of a kind serene modern marvel.`,
    price: 965,
  },
  // 21
  {
    ownerId: 1,
    address: "41178 Camino Norte",
    city: "Temecula",
    state: "CA",
    country: "USA",
    lattitude: 33.52840734554109,
    longitude: -117.03892591188755,
    name: "Peaceful & Spacious Wine Country Oasis on Vineyard",
    description: `We are pleased to introduce our Peaceful & Spacious Wine Country Oasis! The 5 acre country estate and vineyard is located in the rolling hills and heart of Temecula wine country, right in the center of Temecula's array of award winning wineries and vineyards. Temecula and its surrounding areas have so much to offer and our Oasis is a perfect home-base location.`,
    price: 495,
  },
  // 22
  {
    ownerId: 2,
    address: "4150 Rock Mountain Rd",
    city: "Temecula",
    state: "CA",
    country: "USA",
    lattitude: 33.445903641239305,
    longitude: -117.24160839039756,
    name: "Vineyard Vista: Modern • Renovated • Views",
    description: `Set atop a hillside overlooking the vineyards and mountains with a private pool, hot tub, multiple outdoor lounging spaces, and no immediate neighbors. Premium finishes and a modern Mediterranean aesthetic, you'll enjoy a fully renovated, luxury home. 5 minutes to town in one direction and over 30 wineries in the other, with breathtaking views including our own private vineyards.`,
    price: 788,
  },
  // 23
  {
    ownerId: 3,
    address: "44473 Lakeview Dr",
    city: "Shaver Lake",
    state: "CA",
    country: "USA",
    lattitude: 37.13678156024397,
    longitude: -119.30356711600157,
    name: "Creekside Cabin Pup-Friendly with AC*",
    description: `Shaver Lake is the perfect place to vacation. The climate is ideal with cool summers and mild winters. The list of activities is long and includes, hiking, fishing, skiing, sledding, boating, snowmobiling, horseback riding, and more!`,
    price: 142,
  },
  // 24
  {
    ownerId: 4,
    address: "22293 Gros Ventre St",
    city: "Alcova",
    state: "WY",
    country: "USA",
    lattitude: 42.5517425517274,
    longitude: -106.71538497958844,
    name: "Boatel in Alcova Reservoir",
    description: `Experience the ultimate waterfront getaway at our unique Boat-el room in Alcova Reservoir. Unwind in style on the water, with a private room and bathroom. Immerse yourself in nature and indulge in breathtaking views.Your unforgettable floating retreat awaits!`,
    price: 350,
  },
  // 25
  {
    ownerId: 4,
    address: "25252 Piuma Rd",
    city: "Calabasas",
    state: "CA",
    country: "USA",
    lattitude: 34.07395094366695,
    longitude: -118.68762101578285,
    name: "*NEW* Rumps Ahead - Deluxe Coastal Cottage for 2",
    description: `Created just-for-two, and ideal for pets, Rumps Ahead is the perfect bolt-hole for a relaxing and indulgent getaway. Privately situated within its own grounds, this single-storey barn conversion enjoys unobstructed views over open countryside and down to the sea at Port Quin, framed by 'The Rumps' headland and Doyden Castle. Fully equipped for an indulgent getaway, the property enjoys a log burning stove for cozy evenings and sea-facing terraces for al fresco dining in the sunshine.`,
    price: 200,
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
