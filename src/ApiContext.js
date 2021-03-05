import React from 'react';

const ApiContext = React.createContext({
  cats: [],
  dogs: [],
  pets: [],
  people: [],
  newAdopterAdded: false,
  allCats: [],
  allDogs: [],
  addedUser: [],
  artificialUsers: [],
  addedArtificialUsers: [],
  yourAdoption: false,
  selectedPetType: [],
  yourPetType: [],
  yourSelectedPet: [],
  petType: [],
  currentAdoption: [],
  //adoptionBegan: false,
  typeAboutToBeAdopted: [],
  yourNewAdoptedPet: [],
})

export default ApiContext;