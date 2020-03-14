import React, {Component} from 'react';


class Form extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      category: '',
      description: ''
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
              body: JSON.stringify({name: this.state.name, category: this.state.category, description: this.state.description}),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          let data = await response.json()
          this.props.handleAddRecipe(data)
            this.setState({
                name: '',
                category: '',
                description: ''
            })
      } catch (error) {
          console.error({'Error': error});
      }
}

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" id="name" onChange={this.handleChange} placeholder="Name"/>
        <input type="text" id="category"  onChange={this.handleChange} placeholder="Category"/>
        <textarea type="text" id="directions"  onChange={this.handleChange} placeholder="Instructions"/>
        <input type="submit" value="Add Recipe" />
      </form>
    )
  }
}


export default Form
