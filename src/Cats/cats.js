import React from 'react';
//import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';
import './cats.css';

export default class Cats extends React.Component {   
  static contextType = ApiContext;
  render() {
    const firstCat = this.context.cats;
    return (
      <div className='cats'>
        <h1>Next cat to Adopt</h1><br />
        <img src={firstCat['imageURL']} alt='nextcat' className='nextcat' /><br />
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