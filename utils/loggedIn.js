const jwt = require("jsonwebtoken");
require("dotenv").config()

const {SECRET} = process.env

async function loggedIn(request, response, next){
    try {
        // Check if token is there
        const {token = false} = request.cookies
        if(token){
            // Token verification process
            const payload = await jwt.verify(token, SECRET)
            // Add payload to function and call the Next function
            request.payload = payload
            next()
        } else {
            throw "Not Logged In"
        }
    } catch (error){
        response.status(400).json({error})
    }
}

module.exports = loggedIn