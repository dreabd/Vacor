'use strict';

/** @type {import('sequelize-cli').Migration} */

function massProduceImageObjects() {
  let spotArr = []
  let idCounter = 1;
  let imageCounter = 1;
  // og is 40
  while (idCounter <= 25) {
    // console.log(idCounter)

    while (imageCounter < 6) {
      let spotObj = {
        spotId: idCounter,
        url: `https://vacorphotobucket.s3.us-west-1.amazonaws.com/h${idCounter}p${imageCounter - 1}.jpg`,
        preview: false
      }

      if (imageCounter === 1) {
        spotObj.url = `https://vacorphotobucket.s3.us-west-1.amazonaws.com/h${idCounter}m.jpg`
        spotObj.preview = true
        spotArr.push(spotObj)
        imageCounter++
      } else {
        spotArr.push(spotObj)
        imageCounter++
      }

    }
    imageCounter = 1
    idCounter++
  }

  return spotArr
}


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, massProduceImageObjects(), {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    }, {});
  }
};
