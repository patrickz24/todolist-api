'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
   
    static associate(models) {
      
      this.belongsTo(models.Todo, {
        as:'todo',
        foreignKey: "todoId",
      });
    }
  };
  TodoItem.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: true,
        isUUID: 4,
      },
    },
    text: DataTypes.STRING,
  
    isCompleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TodoItem',
  });
  return TodoItem;
};