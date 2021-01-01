const express = require("express");
require("express-async-errors");
const models = require("../database/models");
const User = require("../database/models/user");
const TodoItem = require("../database/models/todoitem");


const { OK, CREATED} = require("../helpers/status_codes");
const { BadRequestError}= require("../helpers/errors");

module.exports = {
  addTodo: async function (req, res) {

    const { title, users} = req.body;
    const userId= req.userId;

    if (
      (title === "")
    ) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Le champ description n'est pas renseigné, veuillez recommencer."
      );
    }
 
    const user = await models.User.findByPk(userId);

  
    const todos = await models.Todo.create( {
   include :[{
    model: User, attributes: ['id', 'last_name', 'email'] ,
   }

   ],
     
   userId:user.id,
   title,
  
    });
  
if(users && users.length > 0){
  todos.setUsers(users);
}
    return res.status(OK).json(todos);
  },


  
  getAllTodos: async (req, res) => {
    const todos = await models.Todo.findAll({ 
      include: [
        {
          model: models.User,
          as: 'users',
        
        },{
          model: models.TodoItem,
          as: 'todoItems',
        }],
     
    });
    
    return res.status(CREATED).json(todos);
  },

fetchOne: async ({params}, res) => {    
      const myTodo = await models.Todo.findOne({
        where: { id: params.todoId},
        include: [
          {
            model: models.User,
            as: 'users',
          }, 
         {
          model: models.TodoItem,
          as: 'todoItems',
         }],
      });   
    return res.status(CREATED).json(myTodo);
    
  },


  // async update({ body, decoded, params }, res, next) {
  //   try {
  //     const todo = await Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
  //     if (!todo) {
  //       return res.status(400).send({ error: 'Wrong todo id' });
  //     }
  //     const updatedTodo = await models.Todo.update({ title: body.title || todo.title },
  //       {
  //         where: { id: todo.id },
  //         returning: true,
  //         plain: true
  //       },);
  //     return res.status(200).send(updatedTodo[1]);
  //   } catch (e) {
  //     return next(new Error(e));
  //   }
  // },

  // async delete({ params, decoded }, res, next) {
  //   try {
  //     const todo = await models.Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
  //     if (!todo) {
  //       return res.status(400).send({ error: 'Wrong todo id' });
  //     }
  //     await todo.destroy();
  //     return res.status(200).send({});
  //   } catch (e) {
  //     return next(new Error(e));
  //   }
  // }
};

