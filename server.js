const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./controllers/auth");
const characterRouter = require("./controllers/character")
const loggedIn = require("./utils/loggedIn")


const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "rpg-of-legends.netlify.app"],
    credentials: true
}))
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())

// Routers
app.use("/auth", authRouter)
app.use("/character", characterRouter)


app.get("/", (request, response) => {
    response.send("Server request was successful")
})

// Testing authorization works
app.get("/verify", loggedIn, (request, response)=> {
    response.send("You are authorized")
})

const {PORT} = process.env || 1111
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})