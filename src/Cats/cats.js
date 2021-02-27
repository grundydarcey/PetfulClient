import React from 'react';
import config from '../config';
import Navigation from '../Navigation/navigation';

export default class Cats extends React.Component {
  
  render() {  
  
    return (
      <div className='cats'>
        <Navigation />
        <h1>Meow</h1>
        <p>Here are all our cats!</p>
      </div>
    )
  }
}