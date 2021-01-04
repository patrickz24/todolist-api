const express = require("express");
require("express-async-errors");
const models = require("../database/models");
const { OK, CREATED} = require("../helpers/status_codes");
const { BadRequestError}= require("../helpers/errors");
const {TodoItem, Todo} = models;
module.exports = {

    create: async function(req, res) {  
      const { text , todoId } = req.body;      
      if (text === "" ) {
        throw new BadRequestError(
          "Mauvaise Requête",
          "Les champs text et/ou todoId ne sont pas renseignés , veuillez recommencer."
        );
      }
      if (todoId === "") {
        throw new BadRequestError(
          "Mauvaise Requête",
          "Nous avons besoin de todoId!"
        );
      }
      const item = await TodoItem.create({ text, todoId });
      return res.status(CREATED).json(item);
  
  },

  getAllTodoItems: async function (req, res) {
      const { todoId } = req.params;      
      if (todoId === "") {
        throw new BadRequestError(
          "Mauvaise Requête",
          "Nous avons besoin de todoId!"
        );
      }
      const items = await TodoItem.findAll({
        where: { todoId },
        include: [
          {
          model: Todo,
          as: 'todo'
        }],
      });
      return res.status(CREATED).json(items);
  
  },

update: async (req, res) => {    
      const { text, isCompleted } = req.body;
      const  id = req.params.todoItemId;
      
      if (
        (!id)
      ) {
        throw new BadRequestError(
          "Mauvaise Requête",
          "On a besoin du todoItemId"
        );
      }
      
      const item = await TodoItem.findOne({
        where: { id: id },
      });

      if (
        (!item)
      ) {
        throw new BadRequestError(
          "Mauvaise Requête",
          "La tâche n' existe pas"
        );
      }

      const updatedItem = await TodoItem.update(
        { text: text || item.text, isCompleted },
        {
          where: { id: id},
          returning: true,
          plain: true,
        }
      );
      return res.status(OK).json(updatedItem[1]);
      
  },  
};

