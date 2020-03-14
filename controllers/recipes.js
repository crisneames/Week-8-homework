const recipes = require('express').Router()
const Recipes = require('../models/recipes.js')

// Index route  - show recipes
recipes.get('/', (req, res) => {
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundRecipes)
  })
})


// Create route
recipes.post('/', async(req, res)  => {
  Recipe.create(req.body, (error, createdRecipe) => {
    if(error) {
      res.status(400).json({error: error.message})

    }
    res.status(200).send(createdRecipe)
  })
})

// Delete route
recipes.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedRecipe)
  })
})
// Update route
recipes.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRecipe) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedRecipe)
  })
})





module.exports = recipes
