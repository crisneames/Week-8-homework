import React, {Component} from 'react';


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
    }
    componentDidMount(){
        this.getRecipes()
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
  render () {
      console.log(this.state.recipes);
    return (
      <div>
        <h1>Recipes</h1>
        <ul>
            {
                this.state.recipes.map(recipe => {
                    return (
                        <li key={recipe._id}>
                            <h2>{recipe.name}</h2>
                            <h3>Category: {recipe.category}</h3>
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
