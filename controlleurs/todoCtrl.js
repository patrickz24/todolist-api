const express = require("express");
require("express-async-errors");
const models = require("../database/models");


const { OK, CREATED} = require("../helpers/status_codes");
const { BadRequestError}= require("../helpers/errors");

module.exports = {
  addTodo: async function (req, res) {

console.log("addTodo");
    const { title} = req.body;
    const userId = req.userId;

    if (
      (title === "")
    ) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Le champ description n'est pas renseigné, veuillez recommencer."
      );
    }
    console.log("adddddddd");
    const user = await models.User.findByPk(userId);
    console.log("adddddddd");
    const todos = await models.Todo.create({
      userId: user.id,
     title,
  
    });

    return res.status(OK).json(todos);
  },


  getAllTodos: async function (req, res) {  
    console.log(req.userId);
  
    const userId = req.userId;
    const user = await models.User.findByPk(userId);
 user.id = id;
    const findTodo = await models.Todo.findAll({
      where: { userId: req.userId },
  
    });
   
    return res.status(OK).json(findTodo);
  },

  async fetchOne({ params, decoded }, res, next) {
    try {
      const myTodo = await models.Todo.findOne({
        where: { id: params.todoId, userId: decoded.userId },
        include: [{
          model: models.TodoItem,
          as: 'todoItems'
        }],
      });
      if (!myTodo) {
        return res.status(404).send({ error: 'Todo not found' });
      }
      return res.status(200).send(myTodo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async update({ body, decoded, params }, res, next) {
    try {
      const todo = await Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
      if (!todo) {
        return res.status(400).send({ error: 'Wrong todo id' });
      }
      const updatedTodo = await models.Todo.update({ title: body.title || todo.title },
        {
          where: { id: todo.id },
          returning: true,
          plain: true
        },);
      return res.status(200).send(updatedTodo[1]);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async delete({ params, decoded }, res, next) {
    try {
      const todo = await models.Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
      if (!todo) {
        return res.status(400).send({ error: 'Wrong todo id' });
      }
      await todo.destroy();
      return res.status(200).send({});
    } catch (e) {
      return next(new Error(e));
    }
  }
};

