import React from 'react';
//import config from '../config';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class Cats extends React.Component {
  static contextType = ApiContext;
  
  render() {
    const allCats = this.context.cats;
    console.log(allCats)
  
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <p>Here are all our cats!</p>
        <ul>
          <li>Cats are here</li>
          {allCats.map(cat =>
            <li key={cat.id} className='cats'>
              Name: {cat.name}<br />
              Age: {cat.age}
            </li>)}
        </ul>

      </div>
    )
  }
}