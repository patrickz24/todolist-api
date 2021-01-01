const express = require("express");
require("express-async-errors");
const userCtrl = require("./controlleurs/userCtrl");
const todoCtrl = require("./controlleurs/todoCtrl");
const todoItemCtrl = require("./controlleurs/todoitemCtrl");

// const sendMailCtrl = require("./controlleurs/sendMailCtrl");
const models= require("./database/models")
const authentification = require("./middlewares/authentification");
const apiRouter = express.Router();

apiRouter.route("/signup").post(userCtrl.signup);
apiRouter.route("/signin").post(userCtrl.signin);
apiRouter.route('/user/me').get( authentification,
    async (req, res) => {
    console.log("request user", req.userId);
      const user = await models.User.findByPk(req.userId);
      res.status(201).json(user);
    },
  );
apiRouter.route("/users").get(userCtrl.getAllUsers);
apiRouter.route("/user/:id").get(userCtrl.getOneUser);
apiRouter.route("/user/:id").put(userCtrl.getUpdateUser);
apiRouter.route("/user/:id").delete(userCtrl.getDeleteUser);

apiRouter.route('/todos').post(authentification, todoCtrl.addTodo);
apiRouter.route('/todos').get( authentification, todoCtrl.getAllTodos);
apiRouter.route('/todos/:todoId').get( authentification, todoCtrl.fetchOne);
// apiRouter.route('/todos/:todoId').put(authentification, todoCtrl.update);
// apiRouter.route('/todos/:todoId').delete(authentification, todoCtrl.delete);


apiRouter.route('/todoItems').post(todoItemCtrl.create);
apiRouter.route('/todos/:todoId/todoItems').get(authentification, todoItemCtrl.getAllTodoItems);
apiRouter.route('/todoItems/:todoItemId').get( todoItemCtrl.fetchOne);
// apiRouter.route('/todoItems/:todoItemId').put(todoItemCtrl.update);
// apiRouter.route('/todoItems/:todoItemId').delete(todoItemCtrl.delete); 

  
// apiRouter.route("/share").post(sendMailCtrl.sendContact);


module.exports = apiRouter;
