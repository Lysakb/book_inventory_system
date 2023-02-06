const express = require("express");
const {getAllBook, createBook} = require("../controller/bookController");
const authenticate = require("../auth")
const bookRoute = express.Router()

bookRoute.get("/", getAllBook);
bookRoute.post("/create",authenticate, createBook);

module.exports = bookRoute;