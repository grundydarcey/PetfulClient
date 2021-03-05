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
        <Link to='/adoptionprocess'>Start Adoption Process</Link><br /> 
      </div>
    </div>
    </div>
  )
}