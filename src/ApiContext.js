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
})

export default ApiContext;