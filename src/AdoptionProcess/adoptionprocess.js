import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import { Link } from 'react-router-dom';
import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';

export default class AdoptionProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newAdoption = this.newAdoption.bind(this);
    this.pickAndDeleteRandomPet = this.pickAndDeleteRandomPet.bind(this);
    this.seedArtificialUsers = this.seedArtificialUsers.bind(this);
  }
  
  static defaultProps = {
    history: {
      push: () => { }
    },
    onAddAdopt: () => { }
  }

  static contextType = ApiContext;

  pickAndDeleteRandomPet() {
    let choices = ['allCats', 'allDogs'];
    const choice = choices[Math.floor(Math.random() * choices.length)]
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
      this.context.petGotAdopted(data);
    })
    .catch(error => {
      console.error({ error })
    })
  }

  seedArtificialUsers() {
    const artificialUsers = ['Ed', 'Edd', 'Eddy', 'Naz', 'Rolf'];
    while (this.context.addedArtificialUsers === false) {
    artificialUsers.forEach((user) => {
      fetch(`${config.API_ENDPOINT}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: user
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, try again');
        }
        return res.json();
      })
      .then((data) => {
        this.context.addAdopt(data);
        this.context.addAdopter();
        this.context.addArtificials();
      })
      .catch(error => {
        console.error({ error })
      })
      //this.context.addArtificials();
      return;
    })  
    return;
    }
  }

  newAdoption() {
    fetch(`${config.API_ENDPOINT}/people`, {
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
      this.context.gotAdopted(data);
    })
    .catch(error  => {
      console.error({ error })
    })
    this.pickAndDeleteRandomPet();
    const recentlyAddedUser = this.context.addedUser;
    const peopleRemaining = this.context.people;
    let current = peopleRemaining.first;
    current = current.next;
    if (current.value === recentlyAddedUser) {
      this.seedArtificialUsers();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: name
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((name) => {
      this.context.addAdopt(name)
      this.context.addAdopter();
      
    })
    .catch(error => {
      console.error({ error })
    })
    this.props.history.push('/adoptionprocess');
    this.setState({ submitted: true });
    this.context.manuallyAddUser(name);
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

    const conditionalButton = (this.context.addedArtificialUsers === true) ? (
      <Link to='/choosepets'>Select your Pet</Link>
    ) : (
      <button type='button' onClick={() => this.newAdoption()}>Click to delete person</button>
    )

    return (
      <div className='adoption'>
        <Navigation />
        <h2>Adoption Requirements</h2>
        {submission}
        <AdoptionQueue />
        {conditionalButton}
        <div className='nextUpPets'>
          <div className='pets'>
          <Cats />
          <Dogs />
          </div>
        </div>
      </div>
    )
  }
}