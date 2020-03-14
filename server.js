const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose')
const recipesController = require('./controllers/recipes.js')

// Middleware
app.use(express.json())

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true,
useUnifiedTopology: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})



app.use('/recipes', recipesController)

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
})
