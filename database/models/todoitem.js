'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
   
    static associate(models) {
      this.belongsTo(models.Todo, {
    
        foreignKey: 'todoId',
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
    modelName: 'TodoItem',
  });
  return TodoItem;
};