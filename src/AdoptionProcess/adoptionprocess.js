import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';
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
    this.seedArtificialUsers = this.seedArtificialUsers.bind(this);
    this.randomDogHelper = this.randomDogHelper.bind(this);
    this.randomCatHelper = this.randomCatHelper.bind(this);
    this.stop = this.stop.bind(this);
    this.seedStop = this.seedStop.bind(this);
  }

  timeout = 0;
  adoptionCounter = 0;
  
  static defaultProps = {
    history: {
      push: () => { }
    },
    onAddAdopt: () => { }
  }

  static contextType = ApiContext;

  static adoptionTimer = 0;
  static seedTimer = 0;

 // componentDidMount() {
   // this.timeout = setInterval((this.newAdoption = () => {
    //  this.adoptionCounter += 1;
     // this.stop();
    //}, 5000));
    //this.context.adoptionTimer = setInterval(() => {
    //  this.context.adoptionCounter += 1;
     // if (this.context.adoptionCounter === 3) {
      //  clearInterval(this.context.adoptionTimer)
     // }
  //}

  // componentWillUnmount() {
  //   if (this.adoptionCounter === 3) {
  //     clearInterval(this.timeout);
  //   }
  // }
  

  randomDogHelper() {
    fetch(`${config.API_ENDPOINT}/allDogs`, {
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
      this.context.handleAllDogs(data);
    })
    .catch((error) => {
      console.error({ error })
    })
    fetch(`${config.API_ENDPOINT}/dogs`, {
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
      this.context.handleAllCats(data);
      
    })
    .catch((error) => {
      console.error({ error })
    })
    fetch(`${config.API_ENDPOINT}/cats`, {
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
      this.context.handleFirstCat(data);
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  seedArtificialUsers() {
    this.context.seedTimer = setInterval(() => {
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
        clearInterval(this.context.seedTimer);
        this.seedStop();
      })
      .catch(error => {
        console.error({ error })
      })
      //clearInterval(this.context.seedTimer);
      //this.seedStop();
      return;
    })  
    return;
    }
//    clearInterval(this.seedTimer);
  //  this.seedStop();
    }, 5000);
  }

  seedStop() {
    clearInterval(this.context.seedTimer);
  }

  newAdoption() {
   // this.timeout = setInterval((this.newAdoption = () => {
    //  this.adoptionCounter += 1;
    this.timeout = setInterval(() => {
        this.adoptionCounter += 1;
        this.stop();
   // this.context.adoptionTimer = setInterval(() => {
    //  this.context.adoptionCounter += 1;
     // if (this.context.adoptionCounter === 3) {
      //  clearInterval(this.context.adoptionTimer)
     // }
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
     // clearInterval(this.context.adoptionTimer) 
      //this.stop(); 
    })
    .catch(error  => {
      console.error({ error })
    })
    if (this.context.typeAboutToBeAdopted === 'allCats') {
      this.randomCatHelper();
    } else {
      this.randomDogHelper();
    }
    /*if (this.context.addedUser.length > 0) {
      this.stop();
    }*/
    //clearInterval(this.context.adoptionTimer)
     const recentlyAddedUser = this.context.addedUser;
     const peopleRemaining = this.context.people;
     let current = peopleRemaining.first;
     if (current.value === recentlyAddedUser) {
      //clearInterval(this.context.adoptionTimer)
      //this.stop();
     // this.seedArtificialUsers();
      // clearInterval(this.adoptionTimer)
       
     }
     //this.seedArtificialUsers();
    }, 5000)
  }
 


   stop() {
     //clearInterval(this.context.addedUseradoptionTimer);
     //this.seedArtificialUsers();
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
      this.context.manuallyAddUser(name.last);
      console.log(this.context.addedUser);
    })
    .catch(error => {
      console.error({ error })
    })
    this.props.history.push('/adoptionprocess');
    this.setState({ submitted: true })
    let petChoices = ['allCats', 'allDogs'];
    const randomPetType = petChoices[Math.floor(Math.random() * petChoices.length)];
    this.context.determineTypeToBeAdopted(randomPetType);
    this.newAdoption()
    // this.context.adoptionTimer = setInterval(this.newAdoption = () => {
    //   this.context.adoptionCounter += 1;
    //   if (this.context.adoptionCounter === 3) {
    //     clearInterval(this.context.adoptionTimer)
    //   }
    // }, 5000)
    console.log(this.context.addedUser)
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
    
    const determineYourTurn = (this.context.people.first['value'] === this.context.addedUser['value']) ? (
      <div className='adoption'>
        <Navigation />
        <h2>Choose Your Pet</h2>
        <p>Click below to choose your pet!</p>
        <Link to='/choosepets'>Make Your Selection</Link>
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
    ) : (
      <div className='adoption'>
        <Navigation />
        <h2>Adoption Requirements</h2>
        {submission}
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
    return (
      <div className='adoptionPage'>
        {determineYourTurn}
      </div>
    )
  }
}