
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TodoItems', {
      id: {
        allowNull: false,
    
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      text: {
        type: Sequelize.STRING
      },
      todoId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
          model: 'Todos',
          key: 'id'
       
        },
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('TodoItems');
  }
};