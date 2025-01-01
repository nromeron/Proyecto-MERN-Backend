const express = require("express");
const courseController = require("../controllers/course");
const multiParty = require("connect-multiparty")
const mdAuth = require("../midellwares/authenticated");
const mdUpload = multiParty({ uploadDir: "./uploads/course"});

const api = express.Router();


api.post("/course/createCourse", [mdAuth.asureAuth, mdUpload] , courseController.createCurse);
api.get("/course/getAll", courseController.getAllcourses);
api.patch("/course/:id",[mdAuth.asureAuth, mdUpload], courseController.updateCourse);
api.delete("/course/:id",[mdAuth.asureAuth], courseController.deleteCourse);



module.exports = api;