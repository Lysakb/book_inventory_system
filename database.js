const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function connectToMongodb (){
    mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

    mongoose.connection.on("connected", ()=>{
        console.log("Database connected successfully");

    mongoose.connection.on("error", (err)=>{
        console.log("Error in connection!")
    })
    })
}

module.exports = {connectToMongodb}