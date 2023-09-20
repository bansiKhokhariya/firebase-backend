const express = require("express");
const routes = express.Router();
const firebaseController = require("../../Controllers/firebaseController");
const auth = require("../../Middleware/checkAuth");

// firebase config get route
routes.get("/firebase/get", auth, firebaseController.getRemoteConfig);

// firebase remote config update parameter route
routes.post("/firebase/update", auth, firebaseController.setRemoteConfig);

module.exports = routes;
