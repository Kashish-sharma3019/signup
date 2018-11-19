const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
app.get(`${baseUrl}/view/all`, userController.getAllUser);
app.get(`${baseUrl}/:userId/details`, userController.getSingleUser);
app.post(`${baseUrl}/signup`, userController.signUpFunction);

app.put(`${baseUrl}/:userId/edit`, userController.editUser);
app.post(`${baseUrl}/:userId/delete`,  userController.deleteUser);
   

}