const router = require("express").Router()
const Character = require("../models/character")
const loggedIn = require("../utils/loggedIn")

// Index
router.get("/", loggedIn, async(request, response) => {
    try {
        const username = request.payload.username
        const characters = await Character.find({username})
        response.status(200).json(characters)
    } catch (error) {
        response.status(400).json(error)
    }
} )

// Destroy
router.delete("/:id", loggedIn, async(request, response) => {
    try {
        username = request.payload.username        
        const deletedProfile = await Character.findOneAndDelete({_id: request.params.id,username})
        response.status(200).json({deleted: deletedProfile, status:"Character Deleted Successfully"})
    } catch (error) {
        response.status(400).json(error)
    }
})

//Update
router.put("/:id", loggedIn, async (request, response)=> {
    try {
        const character = {
            username: request.payload.username,
            name: request.body.name,
            classType: request.body.classType,
            weapon: request.body.weapon,
            armor: request.body.armor,
            health: request.body.health,
            experience: request.body.experience,
            gold: request.body.gold,
            inventory: request.body.inventory
        }
    
        const updatedCharacter = await Character.findByIdAndUpdate(request.params.id, character)
        response.status(200).json(updatedCharacter)
    } catch (error) {
        response.status(400).json(error)
    }
})

// Create

router.post("/", loggedIn, async (request, response) => {
    try{
        const character = {
            username: request.payload.username,
            name: request.body.name,
            classType: request.body.classType,
            weapon: request.body.weapon,
            armor: request.body.armor,
            health: request.body.health,
            experience: request.body.experience,
            gold: request.body.gold,
            inventory: request.body.inventory
        }
        response.status(200).json(await Character.create(character))
    } catch (error) {
        response.status(400).json(error)
    }
})

//Show

router.get("/:id", loggedIn, async(request, response) => {
    try{
        const character = await Character.findById(request.params.id)
        response.status(200).json(character)
    } catch (error) {
        response.status(400).json(error)
    }
})


module.exports = router