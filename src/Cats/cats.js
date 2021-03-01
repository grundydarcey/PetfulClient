import React from 'react';
//import config from '../config';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';
//import queueInformation from '../queueInformation';

export default class Cats extends React.Component {

   
  static contextType = ApiContext;

  
  render() {
    const firstCat = this.context.cats;
 
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <p>Next cat to Adopt<br />
        Name: {firstCat['name']}<br />
        Gender: {firstCat['gender']}<br />
        Age: {firstCat['age']}<br />
        Description: {firstCat['description']}<br />
        Breed: {firstCat['breed']}<br />

          
      </p>
      </div>
    )
  }
}