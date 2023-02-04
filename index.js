const express = require("express");
const {connectToMongodb} = require("./database");
const userRoute = require("./Route/userRoute");
const bookRoute = require("./Route/bookRoute");
require("dotenv").config();

connectToMongodb()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/user", userRoute);
app.use("/book", bookRoute);

app.get("/", (req, res)=>{
    res.status(200).send("Home page!")
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port:${PORT}`)
})