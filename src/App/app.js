import React from 'react';
import { Route } from 'react-router-dom';
import Cats from '../Cats/cats';
import Root from '../root/Root';
import Dogs from '../Dogs/dogs';
import Pets from '../Pets/pets';
import AdoptionProcess from '../AdoptionProcess/adoptionprocess';
import config from '../config';
import ApiContext from '../ApiContext';
import ChoosePets from '../ChoosePets/choosePets';
import YourAdoption from '../YourAdoption/youradoption';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cats: [],
      dogs: [],
      pets: [],
      people: [],
      newAdopterAdded: false,
      allCats: [],
      allDogs: [],
      addedUser: [],
      artificialUsers: [],
      addedArtificialUsers: false,
      yourAdoption: false,
      selectedPetType: [],
      yourPet: [],
      yourSelectedPet: [],
      petType: [],
      currentAdoption: [],
      //adoptionBegan: false,
      typeAboutToBeAdopted: [],
      yourNewAdoptedPet: [],
      yourFinalPet: [],
      adoptionTimer: 0,
      seedTimer: 0,
      adoptionCounter: 0,
    }
  }
  
  static contextType = ApiContext;

  componentDidMount = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/cats`),
      fetch(`${config.API_ENDPOINT}/dogs`), 
      fetch(`${config.API_ENDPOINT}/allCats`),
      fetch(`${config.API_ENDPOINT}/allDogs`),
      fetch(`${config.API_ENDPOINT}/people`), {
        method: 'GET',
        header: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
      }
    ])
    .then(([catsRes, dogsRes, allCatsRes, allDogsRes, peopleRes]) => {
      if (!catsRes.ok && !dogsRes.ok && !allCatsRes.ok && !allDogsRes.ok && !peopleRes.ok) return (catsRes.json().then(() => Promise.reject()), dogsRes.json().then(() => Promise.reject()), allCatsRes.json().then(() => Promise.reject()), allDogsRes.json().then(() => Promise.reject()), peopleRes.json().then(() => Promise.reject()));
      return Promise.all([catsRes.json(), dogsRes.json(), allCatsRes.json(), allDogsRes.json(), peopleRes.json()]);
    })
    .then(([cats, dogs, allCats, allDogs, people]) => {
      this.setState({ cats, dogs, allCats, allDogs, people });
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  addAdopt = (newAdopt) => {
    this.setState({ people : newAdopt })
  }

  gotAdopted = (newData) => {
    this.setState({ people: newData })
  }

  addAdopter = () => {
    this.setState({ newAdopterAdded: true })
  }

  petGotAdopted = (newData) => {
    this.setState({ allCats: newData })
    this.setState({ allDogs: newData })
  }

  determinePetType = (newPet) => {
    this.setState({ petType : newPet })
  }

  petTypeGotAdopted = (newData) => {
    if (this.context.petType === 'allDogs') {
      this.setState({ dogs: newData})
    } else {
      this.setState({ cats: newData })
    }
  }

  manuallyAddUser = (newUser) => {
    this.setState({ addedUser: newUser })
  }

  addArtificials = () => {
    this.setState({ addedArtificialUsers: true })
  }

  handleYourAdoption = () => {
    this.setState({ yourAdoption: true })
  }

  handlePetSelection = (chosenPet) => {
    this.setState({ selectedPetType: chosenPet })
  }
  
  handleYourPet = (chosenPet) => {
    this.setState({ yourPet: chosenPet })
  }

  handleYourSelectedPet = (chosenPet) => {
    this.setState({ yourSelectedPet: chosenPet })
  }

  handleCurrentAdoption = (currentAdoptee) => {
    this.setState({ currentAdoption: currentAdoptee})
  }

  handleAllCats = (allNewCats) => {
    this.setState({ allCats: allNewCats })
  }

  handleAllDogs = (allNewDogs) => {
    this.setState({ allDogs: allNewDogs })
  }

  handleFirstCat = (firstCat) => {
    this.setState({ cats: firstCat })
  }

  handleFirstDog = (firstDog) => {
    this.setState({ dogs: firstDog })
  }

  handleYourNewAdoptedPet = (yourPet) => {
    this.setState({ yourNewAdoptedPet: yourPet })
  }

  determineTypeToBeAdopted = (newType) => {
    this.setState({ typeAboutToBeAdopted: newType })
  }

  handleYourFinalPet = (yourPet) => {
    this.setState({ yourFinalPet: yourPet })
  }

  render() {
    const value = {
      cats: this.state.cats,
      dogs: this.state.dogs,
      pets: this.state.pets,
      people: this.state.people,
      addAdopt: this.addAdopt,
      newAdopterAdded: this.state.newAdopterAdded,
      gotAdopted: this.gotAdopted,
      allCats: this.state.allCats,
      allDogs: this.state.allDogs,
      addAdopter: this.addAdopter,
      petGotAdopted: this.petGotAdopted,
      addedUser: this.state.addedUser,
      manuallyAddUser: this.manuallyAddUser,
      artificialUsers: this.state.artificialUsers,
      addArtificials: this.addArtificials,
      addedArtificialUsers: this.state.addedArtificialUsers,
      yourAdoption: this.state.yourAdoption,
      handleYourAdoption: this.handleYourAdoption,
      selectedPetType: this.state.selectedPetType,
      handlePetSelection: this.handlePetSelection,
      yourPet: this.state.yourPet,
      handleYourPet: this.handleYourPet,
      yourSelectedPet: this.state.yourSelectedPet,
      handleYourSelectedPet: this.handleYourSelectedPet,
      petType: this.state.petType,
      petTypeGotAdopted: this.petTypeGotAdopted,
      determinePetType: this.determinePetType,
      currentAdoption: this.state.currentAdoption,
      handleCurrentAdoption: this.handleCurrentAdoption,
      handleAllCats: this.handleAllCats,
      handleAllDogs: this.handleAllDogs,
      handleFirstCat: this.handleFirstCat,
      handleFirstDog: this.handleFirstDog,
      //adoptionBegan: this.state.adoptionBegan,
      handleBeginAdoption: this.handleBeginAdoption,
      typeAboutToBeAdopted: this.state.typeAboutToBeAdopted,
      determineTypeToBeAdopted: this.determineTypeToBeAdopted,
      yourNewAdoptedPet: this.state.yourNewAdoptedPet,
      handleYourNewAdoptedPet: this.handleYourNewAdoptedPet,
      yourFinalPet: this.state.yourFinalPet,
      handleYourFinalPet: this.handleYourFinalPet,
      adoptionTimer: this.state.adoptionTimer,
      seedTimer: this.state.seedTimer,
      adoptionCounter: this.state.adoptionCounter,
    }

    return (
      <ApiContext.Provider value={value}>
       <div className='route'>
          <Route exact path='/' component={Root} />
          <Route exact path='/cats' component={Cats} />
          <Route exact path='/dogs' component={Dogs} />
          <Route exact path='/pets' component={Pets} />
          <Route exact path='/adoptionprocess' component={AdoptionProcess} />
          <Route exact path='/choosepets' component={ChoosePets} />
          <Route exact path='/youradoption' component={YourAdoption} />
        </div>
      </ApiContext.Provider>
    )
  }
}