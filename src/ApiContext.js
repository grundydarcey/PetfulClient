import React from 'react';

const ApiContext = React.createContext({
  cats: [],
  dogs: [],
  pets: [],
  people: [],
  newAdopterReady: false,
})

export default ApiContext;