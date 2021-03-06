import React from 'react';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';
import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';
import './youradoption.css';
import config from '../config';

export default class YourAdoption extends React.Component {
  static contextType = ApiContext;

  showCorrectPet = () => {
    this.interval = setInterval(() => {
    const yourChosenPet = this.context.selectedPetType;
    const choice = (yourChosenPet === 'allCats') ? (
      'cats'
    ) : (
      'dogs'
    )
    fetch(`${config.API_ENDPOINT}/${choice}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }
      return res.json();
    })
    .then((data) => {
      if (this.context.selectedPetType === 'allCats') {
        this.context.handleFirstCat(data)
      } else {
        this.context.handleFirstDog(data)
      }
      //this.handleYourNewAdoptedPet(data);
      clearInterval(this.interval);
    
    })
    .catch((error) => {
      console.error({ error })
    })
  }, 1000);
  }

  render() {
    const displayPet = this.context.yourNewAdoptedPet;
    console.log(displayPet)
    return (
      <div className='yourAdoption'>
          <Navigation />
          <h2>Meet your new Pet!</h2>
          {console.log(displayPet)}
          <p>Thank you for adopting from our agency and giving this pet a new chance at life! We hope you two have a very happy life together!</p>
          <img src={displayPet['imageURL']} alt='yourPet' /><br />
          <p>Name: {displayPet['name']}<br />
            Gender: {displayPet['gender']}<br />
            Age: {displayPet['age']}<br />
            Description: {displayPet['description']}<br />
            Breed: {displayPet['breed']}<br />
            Story: {displayPet['story']}
          </p>
          <AdoptionQueue />
          <div className='nextUpPets'>
            <div className='cats'>
             <Cats />
            </div>
            <div className='dogs'>
              <Dogs />
            </div>

          </div>
      </div>
    )
  }
}