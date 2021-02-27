import React from 'react';
import { Route } from 'react-router-dom';
import Cats from '../Cats/cats';
import Root from '../root/Root';
import Dogs from '../Dogs/dogs';
import Pets from '../Pets/pets';
import AdoptionProcess from '../AdoptionProcess/adoptionprocess';
import config from '../config';

export default function App() {
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