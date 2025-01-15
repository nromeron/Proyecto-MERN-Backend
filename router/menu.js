const express = require("express");
const menuController = require("../controllers/menu");
const mdAuth = require("../midellwares/authenticated");

const api = express.Router();


api.post("/menu/create", [mdAuth.asureAuth] , menuController.createMenu);
api.get("/menu/all", menuController.getAllmenus);
api.patch("/menu/update/:id", [mdAuth.asureAuth] , menuController.updateMenu);
api.delete("/menu/delete/:id", [mdAuth.asureAuth], menuController.deleteMenu);




module.exports = api;
