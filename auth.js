const jwt = require("jsonwebtoken");
const userModel = require("./model/userModel");
require("dotenv").config();

const authenticate = async (req, res, next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token = req.headers.authorization.split("")[1];

            const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

            req.user = await userModel.findById(verifiedToken.id);

            next()
        }catch(error){
            res.status(400).send("Not authorized!")
        }
    }

    if(!token){
        return res.status(400).send("No token!")
    }

}