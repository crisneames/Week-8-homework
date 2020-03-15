import React, {Component} from 'react';


class Form extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      category: '',
      instructions: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState ({[event.currentTarget.id]: event.currentTarget.value})
  }
  async handleSubmit(event){
      event.preventDefault()
      try {
          let response = await fetch(this.props.baseUrl + '/recipes', {
              method: 'POST',
              body: JSON.stringify({name: this.state.name, category: this.state.category, instructions: this.state.instructions}),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          let data = await response.json()
          this.props.handleAddRecipe(data)
            this.setState({
                name: '',
                category: '',
                instructions: ''
            })
      } catch (error) {
          console.error({'Error': error});
      }
}

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" id="name" onChange={this.handleChange} placeholder="Name" value={this.state.name}/>
        <input type="text" id="category"  onChange={this.handleChange} placeholder="Category" value={this.state.category}/>
        <textarea type="text" id="instructions"  onChange={this.handleChange} placeholder="Instructions" value={this.state.instructions}/>
        <input type="submit" value="Add Recipe" />
      </form>
    )
  }
}


export default Form
