import React from 'react';
import Paperwork from '../Images/paperwork.jpg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/navigation';
import './root.css';
import Cats from '../Cats/cats';
import Dogs from '../Dogs/dogs';

function Root() {
  
  return (
    <div className='root'>
      <Navigation />
      <h2>Are you considering pet adoption? It's a big responsibility with so many purrks. Here at the Petful animal shelter, we take the health and safety of our animals very seriously.</h2>
      <h2>If you would like to move forward with the adoption process you can begin the 'Start Adoption' form below and see what it takes to become the owner of one of our amazing pets.</h2>
      <p>You will have to provide your name so that we may review your eligibility for adopting one of our pets.</p>
      <div className='linksimages'>
        <Link to='/adoptionprocess'>Start Adoption</Link><br /><br />
        <p>Feel free to visit some of the navigation links up top to see the animals currently up for adoption!</p>
        <img src={Paperwork} alt='paperwork' />
        <div className='availablepets'>
          <div className='availablecats'>
            <Cats />
          </div>
          <div className='availabledogs'>
            <Dogs />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Root
