const express = require("express");
const routes = express.Router();
const firebaseController = require("../../Controllers/firebaseController");

// firebase config get route
routes.get("/firebase/get", firebaseController.getRemoteConfig);

// firebase remote config update parameter route 
routes.post("/firebase/update", firebaseController.setRemoteConfig);

module.exports = routes;
