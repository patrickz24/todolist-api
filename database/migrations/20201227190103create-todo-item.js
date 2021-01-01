'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TodoItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,

      },
      todoId: {
        type: Sequelize.INTEGER,
        references: {model:'Todos', key: 'id'},
        allowNull: false,
      

      },
      text: {
        type: Sequelize.STRING
      },
      
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  