import React from 'react';
import ApiContext from '../ApiContext';
//import Navigation from '../Navigation/navigation';
import './dogs.css';

export default class Dogs extends React.Component {   
  static contextType = ApiContext;
  render() {
    const firstDog = this.context.dogs;
    return (
      <div className='dogs'>
        <h1>Next dog to Adopt</h1><br />
        <img src={firstDog['imageURL']} alt='nextdog' className='nextdog' /><br />
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