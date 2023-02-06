const express = require("express");
const {userSignup, userLogin} = require("../controller/userController");
const authenticate = require("../auth");
const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login",  userLogin);

module.exports = userRoute;