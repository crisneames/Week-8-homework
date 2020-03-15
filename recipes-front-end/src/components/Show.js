import React, {Component} from 'react';

class Show extends Component {
  render () {
    return (
      <div>
        <h3>Instructions</h3>
        <p>{this.props.recipe.name}</p>
        <p>{this.props.recipe.instructions}</p>
      </div>


    )
  }
}




export default Show
