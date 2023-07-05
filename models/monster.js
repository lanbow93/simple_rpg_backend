const mongoose = require("./connection")

const MonsterSchema = new mongoose.Schema({
    monsterName: String,
    monsterType: String,
    weapon: String,
    armor: String,
    health: Number,
    experience: Number,
    gold: Number,
    inventory: [String]
})

const Monsters = mongoose.model("Monsters", MonsterSchema)

module.exports = Monsters