const express = require("express");
const routes = express.Router();
const dynamicLinkController = require("../../Controllers/dynamicLinkController");
const auth = require("../../Middleware/checkAuth");

routes
    .route("/dynamicLink")
    .get(auth, dynamicLinkController.getLink)
    .post(auth, dynamicLinkController.createLink)
    .put(auth, dynamicLinkController.updateLink)
    .delete(auth, dynamicLinkController.deleteLink);

module.exports = routes;