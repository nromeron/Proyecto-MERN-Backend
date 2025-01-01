const express = require("express");
const postController = require("../controllers/post");
const multiParty = require("connect-multiparty")
const mdAuth = require("../midellwares/authenticated");
const mdUpload = multiParty({ uploadDir: "./uploads/blog"});

const api = express.Router();

api.post("/post/createPost", [mdAuth.asureAuth, mdUpload] , postController.createPost);
api.get("/post/getPost", postController.getPost);
api.patch("/post/:id", [mdAuth.asureAuth, mdUpload], postController.updatePost);
api.delete("/post/:id", [mdAuth.asureAuth], postController.deletePost);
api.get("/post/:path", postController.getOnePost);

module.exports = api; 