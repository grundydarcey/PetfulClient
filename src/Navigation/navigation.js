import React from 'react';
import { Link } from 'react-router-dom';
/*import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';
import Pets from '../Pets/pets';*/
import './navigation.css';

export default function Navigation() {
  return (
    <div className='title'>
      <h1>Petful</h1>
    <div className='nav'>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/cats'>View Cats</Link><br />
        <Link to='/dogs'>View Dogs</Link><br />
        <Link to='/pets'>View All Pets</Link><br /> 
      </div>
    </div>
    </div>
  )
}