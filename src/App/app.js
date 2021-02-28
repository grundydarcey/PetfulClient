import React from 'react';
import { Route } from 'react-router-dom';
import Cats from '../Cats/cats';
import Root from '../root/Root';
import Dogs from '../Dogs/dogs';
import Pets from '../Pets/pets';
import AdoptionProcess from '../AdoptionProcess/adoptionprocess';
import config from '../config';
import ApiContext from '../ApiContext';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cats: [],
      dogs: [],
      pets: [],
      people: [],
    }
  }
  
  static contextType = ApiContext;

  componentDidMount = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/cats`, {
        method: 'GET',
      })
    ])
    .then(([catsRes]) => {
      if (!catsRes.ok) return catsRes.json().then((e) => Promise.reject(e));
      return Promise.all([catsRes.json()]);
    })
    .then(([cats]) => {
      this.setState({ cats });
    })
    .catch((error) => {
      console.error({ error })
    })
  }

  render() {

    return (
      <div className='route'>
        <Route exact path='/' component={Root} />
        <Route exact path='/cats' component={Cats} />
        <Route exact path='/dogs' component={Dogs} />
        <Route exact path='/pets' component={Pets} />
        <Route exact path='/adoptionprocess' component={AdoptionProcess} />
      </div>
    )
  }
}