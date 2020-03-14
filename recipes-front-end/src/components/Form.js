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

  }
  handleChange(event) {
    this.setState ({[event.currentTarget.id]: event.currentTarget.value})

  }
  render () {
    return (
      <form>
        <input type="text" id="name" onChange={this.handleChange} />
        <input type="text" id="category"  onChange={this.handleChange} />
        <textarea type="text" id="directions"  onChange={this.handleChange} />
        <input type="submit" value="Add Recipe" />
      </form>
    )
  }
}


export default Form
