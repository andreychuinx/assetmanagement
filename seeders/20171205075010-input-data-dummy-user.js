'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email       : 'admin@admin.com',
      password    : '$2a$10$znP7XIKCqJJShW96.ls9buAl5NQEUGUegQj/5POFWOO.HaCTgNWkW',
      role        : 'admin',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_1@user.com',
      password    : '$2a$10$znP7XIKCqJJShW96.ls9buAl5NQEUGUegQj/5POFWOO.HaCTgNWkW',
      role        : 'user',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_2@user.com',
      password    : '$2a$10$znP7XIKCqJJShW96.ls9buAl5NQEUGUegQj/5POFWOO.HaCTgNWkW',
      role        : 'user',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
