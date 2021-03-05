import React from 'react';
import ApiContext from '../ApiContext';
import Navigation from '../Navigation/navigation';
import './choosePets.css';
import config from '../config';
import { Link } from 'react-router-dom';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';

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
        'Content-type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleYourSelectedPet(data);
    })
    .catch((error) => {
      console.error({ error })
    })

    const selection = this.context.selectedPetType;
    console.log(this.context.selectedPetType);

    Promise.all([
      fetch(`${config.API_ENDPOINT}/${selection}`), 
      fetch(`${config.API_ENDPOINT}/people`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ])
    .then(([selectionRes, peopleRes]) => {
      if (!selectionRes.ok && !peopleRes.ok) return (selectionRes.json().then((e) => Promise.reject(e), peopleRes.json().then((e) => Promise.reject(e))));
      return Promise.all([selectionRes.json(), peopleRes.json()]);
    })
    .then(([selection, people]) => {
      this.context.petGotAdopted(selection);
      this.context.handleYourAdoption();
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  render() {
    const viewAdoption = (this.context.yourAdoption === true) ? (
      <Link to='/youradoption'>View Your Pet</Link>
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
      </div>
    )
  }
}