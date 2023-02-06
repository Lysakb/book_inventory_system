const express = require("express");
const {getAllBook, createBook, updateBook, deleteBook} = require("../controller/bookController");
const authenticate = require("../auth")
const bookRoute = express.Router()

bookRoute.get("/", getAllBook);
bookRoute.post("/create",authenticate, createBook);
bookRoute.put("/update/:id", authenticate, updateBook);
bookRoute.delete("/delete/:id", authenticate, deleteBook);

module.exports = bookRoute;