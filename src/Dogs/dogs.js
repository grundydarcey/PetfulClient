import React from 'react';
import ApiContext from '../ApiContext';
import Navigation from '../Navigation/navigation';

export default class Dos extends React.Component {   
  static contextType = ApiContext;
  render() {
    const firstDog = this.context.dogs;
    return (
      <div className='dogs'>
        <Navigation />
        <h1>Woof</h1>
        <h2>Next dog to Adopt</h2><br />
        <img src={firstDog['imageURL']} alt='nextdog' /><br />
        <p>Name: {firstDog['name']}<br />
        Gender: {firstDog['gender']}<br />
        Age: {firstDog['age']}<br />
        Description: {firstDog['description']}<br />
        Breed: {firstDog['breed']}<br />
        Story: {firstDog['story']}
      </p>
      </div>
    )
  }
}