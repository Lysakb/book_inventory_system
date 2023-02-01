const express = require("express");
const {connectToMongodb} = require("./database");
require("dotenv").config();

connectToMongodb()

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.status(200).send("Home page!")
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port:${PORT}`)
})