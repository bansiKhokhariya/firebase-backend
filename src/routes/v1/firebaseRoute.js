const express = require("express");
const routes = express.Router();
const firebaseController = require("../../Controllers/firebaseController");
const serviceAccountController = require("../../Controllers/serviceAccountController");
const auth = require("../../Middleware/checkAuth");

// firebase config get route
routes.get("/firebase/get", auth, firebaseController.getRemoteConfig);

// firebase remote config update parameter route
routes.post("/firebase/update", auth, firebaseController.setRemoteConfig);

// firebase service account upload
routes.post("/appConfigure", auth, serviceAccountController.appConfigure);

// get application configure 
routes.get("/getAppConfigure", auth, serviceAccountController.getAppConfigure);

// delete config parameter 
routes.delete('/firebase/delete-parameter', firebaseController.deleteRemoteConfigParameter);

// add config parameter 
routes.post("/firebase/add",  firebaseController.addOrUpdateRemoteConfigParameters);


module.exports = routes;
