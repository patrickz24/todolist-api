const express = require("express");
require("express-async-errors");
const models = require("../database/models");
const User = require("../database/models/user");



const { OK, CREATED} = require("../helpers/status_codes");
const { BadRequestError}= require("../helpers/errors");

module.exports = {
  addTodo: async function (req, res) {
    const {title} = req.body;
    const {userId} = req;
    if (
      (title === "")
    ) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Le champ description n'est pas renseigné, veuillez recommencer."
      );
    }

    const todos = await models.Todo.create( {
   include :[{
    model: User, attributes: ['id', 'last_name', 'email'] ,
   }],
   title,  
    });
  await models.UserTodo.create({
    userId,
    todoId:todos.id,
  })

    return res.status(OK).json(todos);
  },

  getAllTodos: async (req, res) => {

    const findTodoAllTodoId = await models.UserTodo.findAll({
      where: {userId: req.userId},
    })
  
   const todoId = findTodoAllTodoId.map((todo)=> {
    return todo.id;
   })
   
   
     
       const todos = await models.Todo.findAll({ 
         where: {id: todoId},
     
         include: [
           {
             model: models.User,
             as: 'users',
             through: { attributes: [] },
           },{
             model: models.TodoItem,
             as: 'todoItems',
             
           }],
        
       });
     
       
       return res.status(CREATED).json(todos);
     },

  delete: async (req, res) => {    
    const { todoId} = req.params;
      const todo = await models.Todo.findOne({ where: { id: todoId}});
      if (
        (!todo)
      ) {
        throw new BadRequestError(
          "Mauvaise Requête",
          "Cette liste n'existe pas"
        );
      }
      await todo.destroy();
      return res.status(OK).json({});
  },
};

