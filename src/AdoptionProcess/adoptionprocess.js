/* eslint-disable eqeqeq */
import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import PetDisplay from '../PetDisplay/petdisplay';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';
import './adoptionprocess.css';
import { Link } from 'react-router-dom';

export default class AdoptionProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newAdoption = this.newAdoption.bind(this);
    this.randomDogHelper = this.randomDogHelper.bind(this);
    this.randomCatHelper = this.randomCatHelper.bind(this);
    this.stop = this.stop.bind(this);
    this.seedArtUsers = this.seedArtUsers.bind(this);
  }

  timeout = 0;
  adoptionCounter = 0;
  seedTimeout = 0;
  seedCounter = 0;
  
  static defaultProps = {
    history: {
      push: () => { }
    },
    onAddAdopt: () => { }
  }

  static contextType = ApiContext;

  randomDogHelper() {
    fetch(`${config.API_ENDPOINT}/allDogs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleAllDogs(data);
    })
    .catch((error) => {
      console.error({ error })
    })
    fetch(`${config.API_ENDPOINT}/dogs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleFirstDog(data);
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  randomCatHelper() {
    fetch(`${config.API_ENDPOINT}/allCats`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleAllCats(data);
      
    })
    .catch((error) => {
      console.error({ error })
    })
    fetch(`${config.API_ENDPOINT}/cats`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.handleFirstCat(data);
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  seedArtUsers(limit) {
    var i = 0;
    const arr = ['Ed', 'Edd', 'Eddy', 'Rolf', 'Naz'];
    var ref = setInterval(() => {
      fetch(`${config.API_ENDPOINT}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // 'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          data: arr[i]
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Somethign went wrong');
        }
        return res.json();
      })
      .then((data) => {
        this.context.addAdopt(data);
      })
      .catch(error => {
        console.error({ error })
      })
      i++
      if (i === limit) clearInterval(ref);
    }, 5000);
  }

  newAdoption() {
    this.timeout = setInterval(() => {
      this.adoptionCounter += 1;
      this.stop();
      fetch(`${config.API_ENDPOINT}/people`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again');
        }
        return res.json();
      })
      .then((data) => {
        this.context.gotAdopted(data);
      })
      .catch(error  => {
        console.error({ error })
      })
      if (this.context.typeAboutToBeAdopted === 'allCats') {
        this.randomCatHelper();
      } else {
        this.randomDogHelper();
      }
    }, 5000)
    this.seedArtUsers(5);
  }

  stop() {
    if (this.adoptionCounter === 3) {
      clearInterval(this.timeout);
    }  
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        data: name
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((data) => {
      this.context.addAdopt(data);
      this.context.addAdopter();
      this.context.manuallyAddUser(name);
    })
    .catch(error => {
      console.error({ error })
    })
    
    this.props.history.push('/adoptionprocess');
    this.setState({ submitted: true })
    let petChoices = ['allCats', 'allDogs'];
    const randomPetType = petChoices[Math.floor(Math.random() * petChoices.length)];
    this.context.determineTypeToBeAdopted(randomPetType);
    this.newAdoption();
  }
  
  render() {
    const submission = (this.state.submitted === false) ? (
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>New Adoptive Owner Information</legend>
            <p>Fill out this form to be considered for adopting one of our pets.</p>
            <label htmlFor='name'>Name: </label><br />
            <input type='text' id='name'></input><br /><br />
            <button type='submit' className='submit'>Submit Application to Get in Line</button>
          </fieldset>
        </form>
    ) : (
      <p>Thanks for submitting your name! You will be added to our list.</p>
    )
    
    const determineYourTurn = (this.context.people.first['value'] === this.context.addedUser && this.context.addedUser !== []) ? (
      <div className='adoption'>
        <Navigation />
        <h2>Choose Your Pet</h2>
        <p>Click below to choose your pet!</p>
        <Link to='/choosepets'>Make Your Selection</Link>
        <AdoptionQueue />
        <div className='nextUpPets'>
          <PetDisplay />
        </div>
      </div>
    ) : (
      <div className='adoption'>
        <Navigation />
        <h2>Adoption Requirements</h2>
        {submission}
        <AdoptionQueue />
        <div className='nextUpPets'>
          <PetDisplay />
        </div>
      </div>
    )
    return (
      <div className='adoptionPage'>
        {determineYourTurn}
      </div>
    )
  }
}