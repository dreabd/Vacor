'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      // Owners
      {
        firstName:'Demo',
        lastName:'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'User',
        lastName:'Fakez',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'John',
        lastName:'Smith',
        email: 'jsmith@gmail.com',
        username: 'classicwhiteguy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Brandi',
        lastName:'Yu',
        email: 'byu@gmail.com',
        username: 'brandiyum',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Ezequiel',
        lastName:'Leonard',
        email: 'eleon@gmail.com',
        username: 'eztiger',
        hashedPassword: bcrypt.hashSync('password')
      },
      // Civ's
      {
        firstName:'Charmaine',
        lastName:'Mathis',
        email: 'cmathis@gmail.com',
        username: 'cmathis',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Ramon',
        lastName:'Roy',
        email: 'rroy@gmail.com',
        username: 'royourboy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Angel',
        lastName:'Vega',
        email: 'avega@gmail.com',
        username: 'angel_vega',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Amelia',
        lastName:'Ferrel',
        email: 'aferrel@gmail.com',
        username: 'aferrel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Brittany',
        lastName:'Crueger',
        email: 'bcruegar@gmail.com',
        username: 'bcougar',
        hashedPassword: bcrypt.hashSync('password')
      },
      //

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
