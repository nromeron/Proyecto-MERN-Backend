const express = require("express");
const userController = require("../controllers/user");
const mdAuth = require("../midellwares/authenticated");
const multiparty = require("connect-multiparty");

const api = express.Router();
const mdUpload = multiparty({ uploadDir: "./uploads/avatar"})

api.get("/user/me", [mdAuth.asureAuth] , userController.getUser);
api.get("/user/all", [mdAuth.asureAuth] , userController.getAllUsers);
api.post("/user/createUser", [mdAuth.asureAuth, mdUpload] , userController.createUser);
api.patch("/user/:id", [mdAuth.asureAuth, mdUpload] , userController.updateUser);
api.delete("/user/:id", [mdAuth.asureAuth] , userController.deleteUser);

module.exports = api;

