const express = require("express");
const {userSignup, userLogin, getUsers, updateProfile} = require("../controller/userController");
const authenticate = require("../middleware/authentication");
const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login",  userLogin);
userRoute.get("/", getUsers);
userRoute.put("/edit/:id", authenticate, updateProfile)

module.exports = userRoute;