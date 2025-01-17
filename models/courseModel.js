const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

//atributes of the course
const courseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
    active: Boolean
});

courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;