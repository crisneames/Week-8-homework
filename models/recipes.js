const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String}
  
})

module.exports = mongoose.model('Recipe', recipeSchema)
