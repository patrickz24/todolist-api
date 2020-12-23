'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};


