const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

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

module.exports = {userSignup}