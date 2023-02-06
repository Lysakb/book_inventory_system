const express = require("express");
const {getAllBook, createBook, updateBook} = require("../controller/bookController");
const authenticate = require("../auth")
const bookRoute = express.Router()

bookRoute.get("/", getAllBook);
bookRoute.post("/create",authenticate, createBook);
bookRoute.put("/update/:id", authenticate, updateBook);

module.exports = bookRoute;