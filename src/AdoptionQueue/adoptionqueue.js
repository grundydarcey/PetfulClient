import React from 'react';
import ApiContext from '../ApiContext';

export default class AdoptionQueue extends React.Component {
  /*constructor(props) {
    super(props)
    this.state = {
      addedArtificialUsers: false,
    }
  }*/
  
  static contextType = ApiContext;

  render() {
  const allThesePeople = this.context.people;
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
  
  const chosenPets = (this.context.currentAdoption === 'allCats') ? (this.context.allCats) : (this.context.allDogs)
  //console.log(this.context.currentAdoption)
  const generatePeopleWithPet = () => {
    const allThesePeople = this.context.people;
    let current = allThesePeople.first;
    let arr = [];
    if (allThesePeople.first['value'] === this.context.addedUser) {
      let currentAdoption = allThesePeople.first['value'];
      arr.push(currentAdoption)
    } else {
      let currentAdoption = allThesePeople.first['value'] + ` is adopting ` + chosenPets.first['value']['name'];
      arr.push(currentAdoption)
    }
    current = current.next;
    if (current !== allThesePeople.first) {
      while (current) {
        arr.push(current.value)
        current = current.next;
      }
    }
    const spacedArr = arr.join(', ');
    return spacedArr;
  }
   console.log(this.context.addedUser, 'addeduser')
  const newAdopter = (this.context.newAdopterAdded === false || this.context.submitted === false) ? (
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
}
