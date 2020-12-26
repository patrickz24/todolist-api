const express = require("express");
require("express-async-errors");
const userCtrl = require("./controlleurs/userCtrl");

// const sendMailCtrl = require("./controlleurs/sendMailCtrl");
const models= require("../database/models")
const authentification = require("./middlewares/authentification");
const apiRouter = express.Router();

apiRouter.route("/signup").post(userCtrl.signup);
apiRouter.route("/signin").post(userCtrl.signin);
apiRouter.route('/user/me').get( authentification,
    async (req, res) => {
    console.log("request user", req.userId);
      const user = await models.Users.findByPk(req.userId);
      res.status(201).json(user);
    },
  );
  
apiRouter.route("/user/:id").get(userCtrl.getOneUser);
apiRouter.route("/user/:id").put(userCtrl.getUpdateUser);
apiRouter.route("/user/:id").delete(userCtrl.getDeleteUser);

// apiRouter.route("/share").post(sendMailCtrl.sendContact);


module.exports = apiRouter;
