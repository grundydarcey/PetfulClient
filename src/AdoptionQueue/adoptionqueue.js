import React from 'react';
import ApiContext from '../ApiContext';
import './adoptionqueue.js';

export default class AdoptionQueue extends React.Component {
  constructor(props) {
    super(props)
    //this.determineChosenPet = this.determineChosenPet.bind(this);
    this.generateAllPeople = this.generateAllPeople.bind(this);
    this.generatePeopleWithPet = this.generatePeopleWithPet.bind(this);
    this.generateLastPerson = this.generateLastPerson.bind(this);
  }
  
  static contextType = ApiContext;

  /*determineChosenPet() {
    let chosenPet = (this.context.typeAboutToBeAdopted === 'allCats') ? (
      this.context.allCats
    ) : (
      this.context.allDogs
    )
    return chosenPet.first['value']['name']
  }*/

  generateAllPeople() {
    let current = (this.context.people).first;
    let arr = [];
    while (current) {
      arr.push(current.value)
      current = current.next;
    } 
    const spacedArr = arr.join(', ');
    return spacedArr;
  }

  generatePeopleWithPet() {
    const allThesePeople = this.context.people;
    let current = allThesePeople.first;
    let arr = [];
    if (allThesePeople.first['value'] !== this.context.addedUser) {
      if (this.context.typeAboutToBeAdopted === 'allCats') {
        const chosenPet = this.context.allCats;
        let currentlyAdopted = allThesePeople.first['value'] + ` is adopting ` + chosenPet.first['value']['name'];
        arr.push(currentlyAdopted);
      } else if (this.context.typeAboutToBeAdopted === 'allDogs') {
        const chosenPet = this.context.allDogs;
        let currentlyAdopted = allThesePeople.first['value'] + ` is adopting ` + chosenPet.first['value']['name'];
        arr.push(currentlyAdopted);
      }
    } else {
      let currentlyAdopted = allThesePeople.first['value'];
      arr.push(currentlyAdopted)
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

  generateLastPerson() {
    let allThesePeople = this.context.people;
    let arr = []
    arr.push(allThesePeople.first['value'])
    return arr;
  }

  render() {
  const newAdopter = (this.context.newAdopterAdded === false || this.context.submitted === false) ? (
    <p>People already in line: {this.generateAllPeople()}</p>
  ) : (
    <p>
      People already in line: {this.generatePeopleWithPet()}
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