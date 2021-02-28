import React from 'react';
//import config from '../config';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class Cats extends React.Component {
  static contextType = ApiContext;
  
  render() {
    const allCats = this.context.cats;
    const jsonString = JSON.stringify(allCats)
    console.log(allCats)
    //const parsed = JSON.parse(allCats)
    const stringed = JSON.stringify(allCats)

    console.log(stringed['breed'])
    const cats = Object.entries(allCats);
    console.log(cats)
    const theArray = []
    theArray.push(cats)
    console.log(theArray)
    const result = Object.keys(allCats).map(e=>allCats[e]);

    console.log(result)

  
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <p>Here are all our cats!</p>
        <ul>
          <li>Next cat to Adopt<br />
          {jsonString}
          {stringed}
          
        </li>        
        </ul>
      </div>
    )
  }
}