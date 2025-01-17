const express = require("express");
const courseController = require("../controllers/course");
const multiParty = require("connect-multiparty")
const mdAuth = require("../midellwares/authenticated");
const mdUpload = multiParty({ uploadDir: "./uploads/course"});

const api = express.Router();


api.post("/course/create", [mdAuth.asureAuth, mdUpload] , courseController.createCurse);
api.get("/course/all", courseController.getAllcourses);
api.patch("/course/update/:id",[mdAuth.asureAuth, mdUpload], courseController.updateCourse);
api.delete("/course/delete/:id",[mdAuth.asureAuth], courseController.deleteCourse);



module.exports = api;