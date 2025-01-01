const express = require("express");
const newsletterController = require("../controllers/newsletter");
const mdAuth = require("../midellwares/authenticated");

const api = express.Router();

api.post("/newsletter", newsletterController.registerEmail);
api.get("/newsletter/getNewsletter", [mdAuth.asureAuth], newsletterController.getEmail);
api.delete("/newsletter/:id", [mdAuth.asureAuth], newsletterController.deleteEmail);


module.exports = api; 