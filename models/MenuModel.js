const mongoose = require("mongoose");

//atributes of the User
const MenuSchema = mongoose.Schema({
    tittle: String,
    path: String,
    order: Number,
    active: Boolean
});
 
module.exports = mongoose.model("Menu", MenuSchema);