'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3765&q=80",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8VmFjYXRpb24lMjBIb3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://images.unsplash.com/photo-1604014237744-2f4ab6bfbcc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://images.unsplash.com/photo-1514237487632-b60bc844a47d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fEhvdXNlJTIwSW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.unsplash.com/photo-1560185127-59e4420e2c93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fEhvdXNlJTIwSW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIxfHxIb3VzZSUyMEludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://images.unsplash.com/photo-1587716839025-07c325222549?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFja3lhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1592422006049-d863b5166e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2t5YXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        preview: true,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2] }
    }, {});
  }
};
