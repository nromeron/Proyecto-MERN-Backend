const express = require("express");
const menuController = require("../controllers/menu");
const mdAuth = require("../midellwares/authenticated");

const api = express.Router();


api.post("/menu", [mdAuth.asureAuth] , menuController.createMenu);
api.get("/menu", menuController.getAllmenus);
api.patch("/menu/:id", [mdAuth.asureAuth] , menuController.updateMenu);
api.delete("/menu/:id", [mdAuth.asureAuth], menuController.deleteMenu )




module.exports = api;
