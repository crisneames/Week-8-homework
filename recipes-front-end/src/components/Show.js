import React, {Component} from 'react';

class Show extends Component {
  render () {
    return (
      <div className="instructions">
        <h3>Instructions</h3>
        <h5>{this.props.recipe.name}</h5>
        <h5>{this.props.recipe.instructions}</h5>
      </div>


    )
  }
}




export default Show
