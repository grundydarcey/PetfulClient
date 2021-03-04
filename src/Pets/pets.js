import React from 'react';
import Navigation from '../Navigation/navigation';
import ApiContext from '../ApiContext';

export default class Pets extends React.Component {
  static contextType = ApiContext;

  render() {
    const allCats = this.context.allCats;

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

    return (
      <div className='pets'>
        <Navigation />
        <h1>Petties</h1>
        {generateAllCats()}
      <p></p>
    </div>
  )
}
}