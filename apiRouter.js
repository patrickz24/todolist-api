const express = require("express");
require("express-async-errors");
const userCtrl = require("./controlleurs/userCtrl");
const todoCtrl = require("./controlleurs/todoCtrl");
const todoItemCtrl = require("./controlleurs/todoitemCtrl");
const authentification = require("./middlewares/authentification");
const apiRouter = express.Router();

apiRouter.route("/signup").post(userCtrl.signup);
apiRouter.route("/signin").post(userCtrl.signin);

apiRouter.route('/todos').post(authentification, todoCtrl.addTodo);
apiRouter.route('/todos').get( authentification, todoCtrl.getAllTodos);
apiRouter.route('/todos/:todoId').delete(authentification, todoCtrl.delete);

apiRouter.route('/todoItems').post(authentification, todoItemCtrl.create);
apiRouter.route('/todoItems/:todoItemId').put(todoItemCtrl.update);


module.exports = apiRouter;
