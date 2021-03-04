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
      newAdopterReady: false,
    }
  }
  
  static contextType = ApiContext;

  componentDidMount = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/cats`),
      fetch(`${config.API_ENDPOINT}/dogs`), 
      fetch(`${config.API_ENDPOINT}/people`), {
        method: 'GET',
        header: {
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      }
    ])
    .then(([catsRes, dogsRes, peopleRes]) => {
      if (!catsRes.ok && !dogsRes.ok && !peopleRes.ok) return (catsRes.json().then((e) => Promise.reject(e)), dogsRes.json().then((e) => Promise.reject(e)), peopleRes.json().then((e) => Promise.reject(e)));
      return Promise.all([catsRes.json(), dogsRes.json(), peopleRes.json()]);
    })
    .then(([cats, dogs, people]) => {
      this.setState({ cats, dogs, people });
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
      newAdopterReady: this.state.newAdopterReady,
      gotAdopted: this.gotAdopted,
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