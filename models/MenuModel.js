const mongoose = require("mongoose");

//atributes of the User
const MenuSchema = mongoose.Schema({
    title: String,
    description: String,
    path: String,
    order: Number,
    active: Boolean
    
});
 
module.exports = mongoose.model("Menu", MenuSchema);