import React from 'react';
//import config from '../config';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class Cats extends React.Component {
  static contextType = ApiContext;
  
  render() {
    const allCats = this.context.cats;
    const jsonString = JSON.stringify(allCats)
    //const catString = allCats.toString();
    //const parseCat = JSON.parse(catString);
    console.log(jsonString)
  
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <p>Here are all our cats!</p>
        <ul>
          <li>Cats are here</li>
          {jsonString}
        </ul>

      </div>
    )
  }
}