const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRouter = require("./controllers/auth");


const app = express()

app.use(cors({}))
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())

// Routers
app.use("/auth", authRouter)


app.get("/", (request, response) => {
    response.send("Server request was successful")
}) 

const {PORT} = process.env || 1111
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})