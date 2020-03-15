import React, {Component} from 'react';
import Form from './components/Form.js'
import Show from './components/Show.js'

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
            recipes: [],
            recipe: null
        }
        this.getRecipes = this.getRecipes.bind(this)
        this.handleAddRecipe = this.handleAddRecipe.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
        this.toggleInstructions = this.toggleInstructions.bind(this)
        this.getRecipe = this.getRecipe.bind(this)
        this.toggleHealthy = this.toggleHealthy.bind(this)
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
        await response.json()
        const foundRecipe = this.state.recipes.findIndex(recipe => recipe._id === id)
        const copyRecipes = [...this.state.recipes]
        copyRecipes.splice(foundRecipe, 1)
        this.setState({recipes: copyRecipes})
      } catch (error) {
        console.error(error)
      }
    }

    async toggleHealthy(recipe){
        console.log(recipe)
        try {
            let response = await fetch(baseUrl + '/recipes/' + recipe._id, {
                method: 'PUT',
                body: JSON.stringify({healthy: !recipe.healthy}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let updatedRecipe = await response.json()
            const foundRecipe = this.state.recipes.findIndex(foundItem => foundItem._id === recipe._id)
            const copyRecipes = [...this.state.recipes]
            copyRecipes[foundRecipe].healthy = updatedRecipe.healthy
            console.log(updatedRecipe);
            this.setState({recipes: copyRecipes})
        } catch (e) {
            console.error(e);
        }
    }

      getRecipe (recipe){
      this.setState ({recipe: recipe})
    }

    toggleInstructions(recipe) {
        this.setState({recipe: !recipe})
    }

  render () {
      console.log(this.state.recipe);
      console.log(this.state.recipes);
    return (
      <div className="main-container">
        <h1>Recipes</h1>
        <header>
        </header>
        <Form handleAddRecipe={this.handleAddRecipe} recipes={this.state.recipes} baseUrl={baseUrl} />
        <ul>
            {
                this.state.recipes.map(recipe => {
                    return (
                        <li key={recipe._id} id={recipe._id}>
                        <div className="recipe-name">
                            <h2>{recipe.name}</h2>
                            <h3>Category:
                                <span>
                                    {recipe.category}
                                </span>
                            </h3>
                            <h3>Heathy:
                                <span>
                                    {
                                        recipe.healthy
                                        ? 'Yes'
                                        : 'No'
                                    }
                                </span>
                            </h3>
                            <p onDoubleClick={() => {this.toggleHealthy(recipe)}}>Is This Unhealthy?
                            <br />
                             Double Click to Change</p>
                            <h4 id="delete" onClick={()=> {this.deleteRecipe(recipe._id)}}>X</h4>
                        </div>
                            <button onClick={() => this.getRecipe(recipe)} onDoubleClick={() => this.toggleInstructions(recipe)}>Get Instructions</button>
                            {
                                this.state.view
                                ? <h4>{recipe.instructions}</h4>
                                : null
                            }
                        </li>
                    )
                })
            }
        </ul>
        {
          this.state.recipe
          ? <Show recipe={this.state.recipe} />
        : null
        }

      </div>
    )
  }
}


export default App;
