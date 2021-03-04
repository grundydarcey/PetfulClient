import React, { useContext } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default function AdoptionQueue() {
  const value = useContext(ApiContext);
  const allThesePeople = value.people;

  const artificialUsers = ['Ed', 'Edd', 'Eddy', 'Naz', 'Rolf'];

  const seedArtificialUsers = () => {

    for (let i = 0; i < artificialUsers.length; i++) {
    //artificialUsers.map(user => 
      fetch(`${config.API_ENDPOINT}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: i 
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, try again');
        }
        return res.json();
      })
      .then((data) => {
        value.addAdopt(data);
        value.addAdopter();
      })
      .catch(error => {
        console.error({ error })
      })
      break;
    //)
    }
  }

  const generateAllPeople = () => {
    let current = allThesePeople.first;
    let arr = [];
    while (current) {
      arr.push(current.value)
      current = current.next;
    }
    
    const spacedArr = arr.join(', ');
    return spacedArr;
  }

  console.log(value.newAdopterAdded);
  const allCats = value.allCats;
  //const allDogs = value.allDogs;

  const generatePeopleWithPet = () => {
    let current = allThesePeople.first
    let arr = [];
    let currentAdoption = allThesePeople.first['value'] + ` is adopting ` + allCats.first['value']['name'];
    arr.push(currentAdoption);
    let nextCurrent = allThesePeople.first['next']['value']
    console.log(nextCurrent);
    current = current.next;
    if (current !== allThesePeople.first) {
      while (current) {
        arr.push(current.value)
        current = current.next;
      }
    }
    /*
    while (current) {
      arr.push(current.value)
      current = current.next;
     */
  
    const spacedArr = arr.join(', ');
    return spacedArr;
  }

  const newAdopter = (value.newAdopterAdded === false || value.submitted === false ) ? (
    <p>People already in line: {generateAllPeople()}</p>
  ) : (
    <p>
      Adoption Began People already in line: {generatePeopleWithPet()}
    </p>
  )
  console.log(value.people);
  return (
    <div className='queue'>
      <h3>View Others Interested In Adoption</h3>
      <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
      
        {newAdopter}
        {seedArtificialUsers()}
    
    </div>
    )
  }
