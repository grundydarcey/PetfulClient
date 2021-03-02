import React from 'react';

export default class AdoptionQueue extends React.Component {
  render() {
    const allPeople = this.context.people;
    console.log(allPeople)
    return (
      <div className='queue'>
        <h3>View Others Interested In Adoption</h3>
        <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
      </div>
    )
  }
}