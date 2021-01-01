'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
   
    static associate(models) {
      TodoItem.belongsTo(models.Todo, {
        as: 'todo',
        foreignKey: 'todoId'
      });
    };
 
  }
  
  TodoItem.init({   
    
  todoId:DataTypes.INTEGER,
 text: DataTypes.STRING,
 isCompleted: DataTypes.BOOLEAN
 
  }, {
    sequelize,
    modelName: 'TodoItem',
  });
  return TodoItem;
};