import React from 'react';
import ApiContext from '../ApiContext';
import Navigation from '../Navigation/navigation';
import './choosePets.css';
import config from '../config';
import { Link } from 'react-router-dom';
import PetDisplay from '../PetDisplay/petdisplay';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';
import './choosePets.css';

export default class choosePets extends React.Component {
  static contextType = ApiContext; 

  handleChange(e) {
    e.preventDefault();
    const selection = e.target.value;
    this.context.handlePetSelection(selection)
    const index = e.target.selectedIndex;
    const individualSelection = e.target[index].text
    this.context.handleYourPet(individualSelection)
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const individualSelection = this.context.yourPet;
    fetch(`${config.API_ENDPOINT}/${individualSelection}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleYourSelectedPet(data);
    })
    .catch((error) => {
      console.error({ error })
    })
    //console.log(this.context.yourSelectedPet)
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again.');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleYourAdoption();
    })
    .catch((error) => {
      console.error({ error })
    })
    const selection = this.context.selectedPetType;
    fetch(`${config.API_ENDPOINT}/${selection}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.petGotAdopted(selection);
      //console.log('checking if current is deleted')
    })
    .catch((error) => {
      console.error({ error })
      //console.log('checking once more if current is deleted')
    })
  }



  handleView() {
    const yourChosenPet = this.context.selectedPetType;
    const choice = (yourChosenPet === 'allCats') ? (
      'cats'
    ) : (
      'dogs'
    )
    
    fetch(`${config.API_ENDPOINT}/${choice}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://petful-client-template-grundydarcey.vercel.app/',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      return res.json();
    })
    .then((data) => {
      if (this.context.selectedPetType === 'allCats') {
        this.context.handleFirstCat(data)
        this.context.handleYourNewAdoptedPet(data)
        console.log(this.context.yourNewAdoptedPet, 'yournewadoptedcat')
        console.log(this.context.cats, 'firstcat')
      } else {
        this.context.handleFirstDog(data)
        this.context.handleYourNewAdoptedPet(data)   
        console.log(this.context.yourNewAdoptedPet, 'yournewadopteddog')    
        console.log(this.context.dogs, 'firstdog')
      }
      //his.context.handleYourNewAdoptedPet(data)
    })
    .catch((error) => {
      console.error({ error })
    })
    

    fetch(`${config.API_ENDPOINT}/${choice}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://petful-client-template-grundydarcey.vercel.app/',
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
        this.context.handleFirstCat(data);
        //this.context.handleYourNewAdoptedPet(data)
      } else {
        this.context.handleFirstDog(data);       
      }
      
      //console.log(this.context.yourNewAdoptedPet)
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  render() {
    //console.log(this.context.yourNewAdoptedPet)
    const viewAdoption = (this.context.yourAdoption === true) ? (
      <Link to='/youradoption' onClick={() => this.handleView()}>View Your Pet</Link>
    ) : (
      <p>Please select what animal you'd like.</p>
    )

    return (
      <div className='choosePets'>
        <Navigation />
        <h1>Choose Your Pet</h1><br />
        <p>Now that you're the first in line, you can choose between either getting a cat, a dog or both a a cat and a dog.</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>Make your selections</legend>
            <label htmlFor='petChoice' id='petChoice'>I would like to adopt one of the.... </label>
            <select onChange={(e) => this.handleChange(e)}>
              <option value='select'>Select One</option>
              <option value='allCats'>Cats</option>
              <option value='allDogs'>Dogs</option>
            </select><br /><br />
            <button type='submit'>Adopt Your Pet</button>
            {viewAdoption}
          </fieldset>
        </form>
        <AdoptionQueue />
        <div className='nextUpPets'>
          <PetDisplay />
        </div>
      </div>
    )
  }
}