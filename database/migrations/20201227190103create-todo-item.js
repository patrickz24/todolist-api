'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TodoItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      text: {
        type: Sequelize.STRING
      },
      
      isCompleted: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('TodoItems')
  };
  