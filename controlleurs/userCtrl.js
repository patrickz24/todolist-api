const express = require("express");
require("express-async-errors");
const bcrypt = require("bcrypt");
const models = require("../database/models");
const Todo = require("../database/models/todo");
const jwtUtils = require("../utils/jwt.utils");
const { OK, CREATED } = require("../helpers/status_codes");
const {
  BadRequestError,
  ServerError,
  ConflictError,
  ForbiddenError,
} = require("../helpers/errors");


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

module.exports = {
  signup: async function (req, res) {
  
    const { first_name, last_name, email, password} = req.body;

    if (first_name === "" || last_name === "") {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Les champs first name et/ou name ne sont pas renseignés , veuillez recommencer."
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "L'e-mail n'est pas valide, veuillez recommencer."
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Mot de passe invalide (doit avoir une longueur de 4 à 8 caractères et inclure au moins un chiffre), veuillez recommencer."
      );
    }
 

    const userFound = await models.User.findOne({
     
      attributes: ["email"],
      where: { email: email },
    });
    if (!userFound) {
      bcrypt.hash(password, 5, async (err, bcryptedPassword) => {
        const newUser = await models.User.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: bcryptedPassword,
       
        });
       
        if (!newUser) {
          throw new ServerError(
            "Erreur Serveur",
            "Impossible d'ajouter cet utilisateur."
          );
        } else {
          return res.status(OK).json({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
          
          });
        }
      });
    } else {
   
      const error = new ConflictError(
        "Conflit",
        "Cet utilisateur existe déjà."
      );
      throw error;
    }
  },

  signin: async function (req, res) {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Les champs e-mail et/ou mot de passes sont manquants, veuillez recommencer."
      );
    }
    const userFound = await models.User.findOne({
      where: { email: email },
    });
    if (!userFound) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Cet utilisateur n'existe pas"
      );
    }
    const pass = await bcrypt.compare(password, userFound.password);
    if (!pass) {
      throw new ForbiddenError(
        "Accès refusé",
        "Le mot de passe est incorrect, veuillez recommencer."
      );
    } 
  


    return res.status(OK).json({
      user: {
        id: userFound.id,

        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email,
              },
      token: jwtUtils.generateTokenForUser(userFound),
    });
  },

  getAllUsers: async (req, res) => {
    
      const users = await models.User.findAll({
        include: [
          {
            model: models.Todo,
            as: 'todos',
            through: { attributes: [] },
          },
        ],
      });
  console.log(users);
      return res.status(OK).json(users);
    },



  getAllTodoFromUser: async (req, res) => {
    const userId = req.params.id;

    const users = await models.User.findOne({
      where: { id: userId },
      include: [
        {
          model: models.Todo,
          as: 'todos',
          through: { attributes: [] },
        }], 
    });
console.log(users);
   

   
    return res.status(CREATED).json(users);
  },





  getUpdateUser: async function (req, res) {
    const { first_name, last_name, email, password } = req.body;
    if (first_name === "" || last_name === "") {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Les champs first name et/ou name ne sont pas renseignés , veuillez recommencer."
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "L'e-mail n'est pas valide, veuillez recommencer."
      );
    }
    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Mot de passe invalide (doit avoir une longueur de 4 à 8 caractères et inclure au moins un chiffre), veuillez recommencer."
      );
    }
    if (!FIRSTNAME_REGEX.test(first_name)) {
      throw new BadRequestError(
        "Mauvaise Requête",
        "Le champ first name doit être une chaîne de caractères"
      );
    }
    const userId = req.params.id;
     bcrypt.hash(req.body.password, 5, async function (err, hash) {
      req.body.password = hash;

      const newData = req.body;
      newData.id = userId;
      await models.User.update(newData, {
        where: { id: userId },
        raw: true,
        attributes: ["first_name", "last_name", "email", "password"],
      });
      return res
        .status(OK)
        .json(newData);
    });
  },

  getDeleteUser: async function (req, res) {
    const id = req.params.id;

    const deleted = await models.User.destroy({
      where: { id: id},
    });
    if (deleted) {
      return res.status(OK).json({ succes: `Profil deleted` });
    } else {
      return res.status(NOT_FOUND).json({ err: "profil deja supprimé" });
    }
  },
 



};
