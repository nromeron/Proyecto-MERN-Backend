const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

//atributes of the post
const postSchema = mongoose.Schema({
    tittle: String,
    miniature: String,
    content: String,
    path:{
        type: String,
        unique: true
    },
    createdAt: Date
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;