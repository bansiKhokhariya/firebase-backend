const express = require("express");
const routes = express.Router();
const authenticationController = require("../../Controllers/authenticationController");

// firebase config get route
routes.get("/adminSeed", authenticationController.adminUserSeed);



module.exports = routes;
