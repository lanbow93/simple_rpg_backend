const mongoose = require("mongoose")
const {MONGOD_URL} = process.env

mongoose.set("strictQuery", false);


mongoose.connect(MONGOD_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection
    .on("open", () => console.log("Mongoose connected"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

module.exports = mongoose