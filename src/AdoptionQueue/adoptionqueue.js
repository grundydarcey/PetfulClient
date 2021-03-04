import React, { useContext } from 'react';
import ApiContext from '../ApiContext';

export default function AdoptionQueue() {
  const value = useContext(ApiContext);
  const allThesePeople = value.people;

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
/*  const allDogs = value.allDogs;

  const generateAllCats = () => {
    let current = allCats.first;
    let arr = [];
    while (current) {
      arr.push(current.value['name'])
      current = current.next
    }
    const spacedArr = arr.join(', ')
    return spacedArr
  }

  const generateAllDogs = () => {
    let current = allDogs.first;
    let arr = [];
    while (current) {
      arr.push(current.value['name'])
      current = current.next
    }
    const spacedArr = arr.join(', ')
    return spacedArr
  }
  */
  const generatePeopleWithPet = () => {
    let current = allThesePeople.first
    let arr = [];
    let currentAdoption = allThesePeople.first['value'] + ` is adopting ` + allCats.first['value']['name'];
    arr.push(currentAdoption);
    while (current) {
  
      arr.push(current.value)
      current = current.next;
      
    }
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

  return (
    <div className='queue'>
      <h3>View Others Interested In Adoption</h3>
      <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
      
        {newAdopter}
    
    </div>
    )
  }
