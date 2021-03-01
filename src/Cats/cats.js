import React from 'react';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class Cats extends React.Component {   
  static contextType = ApiContext;
  render() {
    const firstCat = this.context.cats;
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <h2>Next cat to Adopt</h2><br />
        <img src={firstCat['imageURL']} alt='nextcat' /><br />
        <p>Name: {firstCat['name']}<br />
        Gender: {firstCat['gender']}<br />
        Age: {firstCat['age']}<br />
        Description: {firstCat['description']}<br />
        Breed: {firstCat['breed']}<br />
        Story: {firstCat['story']}
      </p>
      </div>
    )
  }
}