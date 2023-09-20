const express = require("express");
const routes = express.Router();
const authenticationController = require("../../Controllers/authenticationController");

routes.post("/auth/login", authenticationController.login);

module.exports = routes;
