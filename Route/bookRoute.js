const express = require("express");
const {getAllBook, createBook} = require("../controller/bookController");
const bookRoute = express.Router()

bookRoute.get("/", getAllBook);
bookRoute.post("/create", createBook);

module.exports = bookRoute;