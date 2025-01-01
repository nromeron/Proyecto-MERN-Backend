const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

//atributes of the newsletter
const newsletterSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
});

newsletterSchema.plugin(mongoosePaginate);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;