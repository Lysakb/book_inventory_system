const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getUsers = async(req, res)=>{
    let user = {}
    try{
        let user = await userModel.find()
        res.status(200).send(user)
    }catch(error){
        res.status(400).send(error.message)
    }

    if(!user){
        return res.status(500).send("User not found!")
    }
}

const userSignup = async (req, res)=>{
    
    try {
        const {first_name, last_name, email, password, role} = req.body;

        if(!first_name || !last_name || !email || !password || !role){
        return res.status(500).send("Please input all fields!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            role: role,
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

const updateProfile = async(req, res)=>{
    const {first_name, last_name, email} = req.body;
    const id = req.params.id;
    const user = req.user;
        try{
            const update = await userModel.findById(id);
            if(user._id.toString() === update.id.toString()){
            const UpdateUser = await userModel.findByIdAndUpdate(id,{ 
            $set: {
                first_name: first_name,
                last_name: last_name,
                email: email
            },
            },
            {new: true});
        
        await user.save();
            res.status(200).send({message: "profile is updated", UpdateUser})
            }
            return res.status(400).send({message: "You are not authorized!"})
        }catch(error){
            res.status(400).send(error.message)
        }
    
   
}

module.exports = {userSignup, userLogin, getUsers, updateProfile}