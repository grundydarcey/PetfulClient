import React from 'react';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class YourAdoption extends React.Component {
  static contextType = ApiContext;
  render() {
    const yourDog = this.context.yourSelectedPet;
    return (
      <div className='yourAdoption'>
          <Navigation />
          <h2>Meet your new Pet!</h2>
          <p>Thank you for adopting from our agency and giving this pet a new chance at life! We hope you two have a very happy life together!</p>
          <img src={yourDog['imageURL']} alt='yourDog' /><br />
          <p>Name: {yourDog['name']}<br />
          Gender: {yourDog['gender']}<br />
          Age: {yourDog['age']}<br />
          Description: {yourDog['description']}<br />
          Breed: {yourDog['breed']}<br />
          Story: {yourDog['story']}
          </p>
        <p>Here's your pet!</p>
      </div>
    )
  }
}