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
        </div>
      </ApiContext.Provider>
    )
  }
}