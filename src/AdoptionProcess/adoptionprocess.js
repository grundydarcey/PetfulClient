import Navigation from '../Navigation/navigation';
import React from 'react';

export default function AdoptionProcess() {
  return (
    <div className='adoption'>
      <Navigation />
      <h2>Adoption Requirements</h2>
      <form>
        <fieldset>
          <legend>New Adoptive Owner Information</legend>
          <p>Fill out this form to adopt a baby pet.</p>
          <label htmlFor='name'>Name: </label><br />
          <input type='text' id='name'></input>
        </fieldset>
      </form>
      <h3>View Others Interested In Adoption</h3>
      <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p>
    </div>
  )
}