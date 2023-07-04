const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
require("dotenv").config()


const app = express()

app.use(cors({}))
app.use(morgan("tiny"))


app.get("/", (request, response) => {
    response.send("Server request was successful")
}) 

const {PORT} = process.env || 1111
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})