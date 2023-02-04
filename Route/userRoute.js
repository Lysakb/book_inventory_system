const express = require("express");
const {userSignup} = require("../controller/userController");
const userRoute = express.Router();

userRoute.post("/signup", userSignup);

module.exports = userRoute;