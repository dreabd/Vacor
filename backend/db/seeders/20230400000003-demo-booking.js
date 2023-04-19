'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookingDemo = [
  {
    spotId: 1,
    userId: 3,
    startDate: new Date(Date.UTC(2023,6,13)),
    endDate: new Date(Date.UTC(2023,6,23)),
  },
  {
    spotId: 2,
    userId: 1,
    startDate: new Date(Date.UTC(2023,6,13)),
    endDate: new Date(Date.UTC(2023,6,23)),
  },
  {
    spotId: 2,
    userId: 3,
    startDate: new Date(Date.UTC(2023,6,13)),
    endDate: new Date(Date.UTC(2023,6,23)),
  },
  {
    spotId: 1,
    userId: 3,
    startDate: new Date(Date.UTC(2023,6,13)),
    endDate: new Date(Date.UTC(2023,6,23)),
  }
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, bookingDemo, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ["2023-06-13"] }
    }, {});
  }
};
