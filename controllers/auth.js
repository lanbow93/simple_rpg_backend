const express = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {SECRET} = process.env


const router = express.Router()


router.post("/signup", async (request, response) => {
    try {
        // Salting and hashing password 
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(10))
        // Creating user
        const user = await User.create(request.body)
        
        response.status(200).json({status: "User Created", username: user})
    } catch (error) {
        console.log(error.message)
        response.status(400).json({error: error.message})
        
    }
})

router.post("/login", async (request, response) => {
    try {
        const {username, password} = request.body;
        // Check for listed user
        const user = await User.findOne({username})

        if(user){
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (passwordCheck){
                const payload = {username}
                const token = await jwt.sign(payload, SECRET)
                response.cookie("token", token, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: request.hostname === "localhost" ? false : true,}).json({payload, status: "logged in"})
                } else {
                    response.status(400).json({error: "Password does not match"})
                } 
            } else {
                response.status(400).json({error: "User doesn't exist"})
        } 
    } catch(error){
        response.status(400).json({error})
    }
})

router.post("/logout", async (request, response) => {
    response.clearCookie("token",{path:"/", expires: new Date(0), domain:"https://rpg-of-legends.netlify.app/characters"}).json({response: "You are Logged Out"})
})

module.exports = router