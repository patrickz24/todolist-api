'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      
      this.belongsToMany(models.User, {
        through: 'UserTodos',
        as: 'users',
        foreignKey: 'todoId',
       
       
      });
      this.hasMany(models.TodoItem, {
        as: 'todoItems',
        foreignKey: 'todoId'
      });
 
    }
  };
  Todo.init({   
    
  
    title: DataTypes.STRING,
 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};