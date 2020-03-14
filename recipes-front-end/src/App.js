import React, {Component} from 'react';
import Form from './components/Form.js'

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku app'
}

console.log('current base URL:', baseUrl)

class App extends Component {
    constructor (props){
        super(props)
        this.state = {
            recipes: []
        }
        this.getRecipes = this.getRecipes.bind(this)
        this.handleAddRecipe = this.handleAddRecipe.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
    }
    componentDidMount(){
        this.getRecipes()
    }
    handleAddRecipe(recipe) {
        const copyRecipes = [recipe, ...this.state.recipes]
        this.setState({
            recipes: copyRecipes,
        })
    }
    async getRecipes(){
        try {
            let response = await fetch(`${baseUrl}/recipes`)
            let data = await response.json()
            this.setState({recipes: data})
        }catch(e){
            console.error(e);
        }
    }

    async deleteRecipe(id) {
      console.log(`I made a delete request to here: ${baseUrl}/recipes/${id}`)
      try {
        let response = await fetch(baseUrl + '/recipes/' + id, {
          method: 'DELETE'
        })
        let data = await response.json()
        const foundRecipe = this.state.recipes.findIndex(recipe => recipe._id === id)
        const copyRecipes = [...this.state.recipes]
        copyRecipes.splice(foundRecipe, 1)
        this.setState({recipes: copyRecipes})
      } catch (error) {
        console.error(error)
      }
    }
  render () {
      console.log(this.state.recipes);
    return (
      <div>
        <h1>Recipes</h1>
        <Form handleAddRecipe={this.handleAddRecipe} recipes={this.state.recipes} baseUrl={baseUrl} />
        <ul>
            {
                this.state.recipes.map(recipe => {
                    return (
                        <li key={recipe._id} id={recipe._id}>
                            <h2>{recipe.name}</h2>
                            <h3>Category: {recipe.category}</h3>
                            <h4 onClick={()=> {this.deleteRecipe(recipe._id)}}>X</h4>
                        </li>
                    )
                })
            }
        </ul>
      </div>
    )
  }
}


export default App;
