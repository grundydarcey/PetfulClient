import React from 'react';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';
import PetDisplay from '../PetDisplay/petdisplay';
import './youradoption.css';

export default class YourAdoption extends React.Component {
  static contextType = ApiContext;

  render() {
    const displayPet = this.context.yourSelectedPet;
    return (
      <div className='yourAdoption'>
          <Navigation />
          <h2>Meet your new Pet!</h2>
          <p>Thank you for adopting from our agency and giving this pet a new chance at life! We hope you two have a very happy life together!</p>
          <img src={displayPet['imageURL']} alt='yourPet' className='yourPet' /><br />
          <p>Name: {displayPet['name']}<br />
            Gender: {displayPet['gender']}<br />
            Age: {displayPet['age']}<br />
            Description: {displayPet['description']}<br />
            Breed: {displayPet['breed']}<br />
            Story: {displayPet['story']}
          </p>
          <AdoptionQueue />
          <div className='nextUpPets'>
            <PetDisplay />
          </div>
      </div>
    )
  }
}