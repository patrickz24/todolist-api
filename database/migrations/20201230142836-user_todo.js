'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UserTodos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
      },
   userId: {
    
    type: Sequelize.INTEGER,
    
        references: {model:'Users', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
   },
   todoId: {
    type: Sequelize.INTEGER,
        references: {model:'Todos', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
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