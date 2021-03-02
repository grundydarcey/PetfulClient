import React from 'react';
import ApiContext from '../ApiContext';
import Navigation from '../Navigation/navigation';
import './choosePets.css';

export default class choosePets extends React.Component {
  static contextType = ApiContext;  
  render() {
    return (
      <div className='choosePets'>
        <Navigation />
        <h1>Choose Your Pet(s)</h1><br />
        <p>Now that you're the first in line, you can choose between either getting a cat, a dog or both a a cat and a dog.</p>
        <form>
          <fieldset>
            <legend>Make your selections</legend>
            <label htmlFor='cats' id='cats'>Would you like to adopt a cat?   </label>
            <select>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select><br /><br />
            <label htmlFor='dogs' id='dogs'>Would you like to adopt a dog?   </label>
            <select>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>        
            </select>
          </fieldset>
        </form>
      </div>
    )
  }
}