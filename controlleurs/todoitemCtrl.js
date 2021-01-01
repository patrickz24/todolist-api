const express = require("express");
require("express-async-errors");
const models = require("../database/models");
const { OK, CREATED} = require("../helpers/status_codes");
const { BadRequestError}= require("../helpers/errors");
const {TodoItem, Todo} = models;
module.exports = {

    create: async function(req, res) {
  
      const { text, todoId } = req.body;
      // Validation
      if (text === "" || todoId === "") {
        throw new BadRequestError(
          "Mauvaise Requête",
          "Les champs text et/ou todoId ne sont pas renseignés , veuillez recommencer."
        );
      }
      const item = await TodoItem.create({ text, todoId });
      return res.status(CREATED).json(item);
  
  },

  async fetchAll(req, res, next) {
    try {
      const { todoId } = req.params;
      // Validation
      if (!todoId) { return res.status(400).send({ error: 'todoId is required' }); }
      const items = await TodoItem.findAll({
        where: { todoId },
        include: [{
          model: Todo,
          as: 'todo'
        }],
      });
      return res.status(200).send(items);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async fetchOne(req, res, next) {
    try {
      const { todoItemId } = req.params;
      // Validation
      if (!todoItemId) { return res.status(400).send({ error: 'todoItemId is required' }); }
      const items = await TodoItem.findOne({
        where: { id: todoItemId },
        include: [{
          model: Todo,
          as: 'todo'
        }],
      });
      return res.status(200).send(items);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async update(req, res, next) {
    try {
      const { text, isCompleted } = req.body;
      const { todoItemId } = req.params;
      // Validation
      if (!todoItemId) { return res.status(400).send({ error: 'todoItemId is required' }); }
      const item = await TodoItem.findOne({
        where: { id: todoItemId },
      });
      if (!item) {
        return res.status(404).send({ error: 'Item does not exist' });
      }
      const updatedItem = await TodoItem.update(
        { text: text || item.text, isCompleted },
        {
          where: { id: req.params.todoItemId },
          returning: true,
          plain: true,
        }
      );
      return res.status(200).send(updatedItem[1]);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async delete(req, res, next) {
    try {
      const { todoItemId } = req.params;
      // Validation
      if (!todoItemId) { return res.status(400).send({ error: 'todoItemId is required' }); }
      const item = await TodoItem.findOne({
        where: { id: todoItemId },
      });
      if (!item) {
        return res.status(404).send({ error: 'Item does not exist' });
      }
      await item.destroy();
      return res.status(200).send({});
    } catch (e) {
      return next(new Error(e));
    }
  }
};

