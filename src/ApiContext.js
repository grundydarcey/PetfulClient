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
})

export default ApiContext;