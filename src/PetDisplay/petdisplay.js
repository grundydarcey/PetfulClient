import React from 'react';
import './petdisplay.css';
import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';

export default function PetDisplay() {
  return (
    <div className='nextUpPets'>
      <div className='cats'>
        <Cats />
      </div>
      <div className='dogs'>
        <Dogs />
      </div>
    </div>
  )
}