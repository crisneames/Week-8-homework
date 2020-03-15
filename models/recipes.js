const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  instructions: {type: String}

})

module.exports = mongoose.model('Recipe', recipeSchema)
