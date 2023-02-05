const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    isbn:{
        type: Number,
        required: true,
        unique: true
    },

    body: {
        type: String,
        required: true
    },

    readingTime:{
        type: String,
        required: true
    },

    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }]
},
{timestamps: true}
)

const bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;