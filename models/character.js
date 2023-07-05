const mongoose = require("./connection")

const CharacterSchema = new mongoose.Schema({
    username: String,
    name: {type: String, unique: true, required: true},
    classType: String,
    weapon: String,
    armor: String,
    health: Number,
    experience: Number,
    gold: Number,
    inventory: [String]
})

const Characters = mongoose.model("Characters", CharacterSchema)

module.exports = Characters