import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to='/pets'>View All Pets</Link>
        <Link to='/adoptionprocess'>Begin Adoption Process</Link><br /> 
      </div>
    </div>
    </div>
  )
}