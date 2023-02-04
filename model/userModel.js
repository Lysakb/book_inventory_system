const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    userType:{
        type: String,
        enum:["admin", "user"]
    },

    book:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }]
 })


 const userModel = mongoose.model("user", userSchema)
module.exports = userModel