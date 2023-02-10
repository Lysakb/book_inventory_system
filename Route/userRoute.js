const express = require("express");
const {userSignup, userLogin, getUsers} = require("../controller/userController");
const authenticate = require("../middleware/authentication");
const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login",  userLogin);
userRoute.get("/", getUsers)

module.exports = userRoute;