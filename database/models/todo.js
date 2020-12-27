'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      
      Todo.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      Todo.hasMany(models.TodoItem, {
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
  userId: {
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