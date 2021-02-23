import React from 'react';
import Paperwork from '../Images/paperwork.jpg';
import { Link } from 'react-router-dom';

function Root() {
  return <div>
    <h1>Petful</h1>
    <h2>Are you considering pet adoption? It's a big responsibility with so many purrks. Here at the Petful animal shelter, we take the health and safety of our animals very safely.</h2>
    <h2>If you would like to move forward with the adoption process you can begin the 'Start Adoption' form below and see what it takes to become our lucky, newest pet owner.</h2>
    <p>You will have to provide your name, your address, ... so that we may review your eligibility for adopting one of our pets.</p>
    
    <img src={Paperwork} alt='paperwork' />
  </div>
}

export default Root
