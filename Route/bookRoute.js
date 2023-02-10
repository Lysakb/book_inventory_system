const express = require("express");
const {getAllBook, createBook, updateBook, deleteBook} = require("../controller/bookController");
const authenticate = require("../middleware/authentication");
const authorization = require("../middleware/authorization")
const bookRoute = express.Router()

bookRoute.get("/", getAllBook);
bookRoute.post("/create", authenticate, authorization, createBook);
bookRoute.put("/update/:id", authenticate, updateBook);
bookRoute.delete("/delete/:id", authenticate, deleteBook);

module.exports = bookRoute;