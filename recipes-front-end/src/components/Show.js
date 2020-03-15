import React, {Component} from 'react';

class Show extends Component {
  render () {
    return (
      <div>
        <h3>Show page</h3>
        <p>{this.props.recipe.name}</p>
      </div>


    )
  }
}




export default Show
