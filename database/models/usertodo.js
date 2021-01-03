'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTodo extends Model {
   
    static associate(models) {
      this.belongsTo(models.Todo, {
       
        foreignKey: 'todoId'
      });
      this.belongsTo(models.User, {
      
        foreignKey: 'userId'
      });
    };
 
  }
  
  UserTodo.init({   
    
  todoId:DataTypes.INTEGER,
userId:DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'UserTodo',
  });
  return UserTodo;
};