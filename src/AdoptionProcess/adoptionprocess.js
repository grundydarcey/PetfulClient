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
    </div>
  )
}