'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      
      this.belongsToMany(models.User, {
        through: 'UserTodos',
        otherKey: 'userId',
        foreignKey: 'todoId',
        as: 'users',
       
      });
      this.hasMany(models.TodoItem, {
        as: 'todoItems',
        foreignKey: 'todoId'
      });
 
    }
  };
  Todo.init({   
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
  
    title: DataTypes.STRING,
 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};