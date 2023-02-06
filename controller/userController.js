const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSignup = async (req, res)=>{
    
    try {
        const {first_name, last_name, email, password, userType} = req.body;

        if(!first_name || !last_name || !email || !password || !userType){
        return res.status(500).send("Please input all fields!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            userType: userType,
            book: []
        })

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(500).send("User already exists, please login!")
        }
        await user.save()
        res.status(200).send({message:"Signup successful!", user})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const userLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(500).send("user not found, please signup!")
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(500).send("Incorrect password!")
        }

        const userId = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(userId, process.env.SECRET_KEY, {expiresIn: '1h'} )

        res.status(200).send({
            message:"Login successful!",
            user: user.first_name +" " + user.last_name,
            token
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {userSignup, userLogin}