import React from 'react';

const ApiContext = React.createContext({
  cats: [],
  dogs: [],
  pets: [],
  people: [],
})

export default ApiContext;