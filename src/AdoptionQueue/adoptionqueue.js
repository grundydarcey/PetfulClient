import React, { useContext } from 'react';
import ApiContext from '../ApiContext';
import { v4 as uuidv4 } from 'uuid';

//const value = useContext(ApiContext)

export default function AdoptionQueue() {
  //static contextType = ApiContext;
  const value = useContext(ApiContext);
  const allThesePeople = value.people;
  
  /*const generatePeople = () => {
    return allThesePeople.map((person, idx) => {
      return <p key={uuidv4()}>Person {idx+1} - {person}</p>}
    )}*/

  const generateAllPeople = () => {
    let current = allThesePeople.first;
    let arr = [];
    while (current) {
      console.log(current.value);
      arr.push(current.value)
      current = current.next;
    }
    console.log(arr)
    const spacedArr = arr.join(', ');
    return spacedArr;
  }


  return (
    <div className='queue'>
      <h3>View Others Interested In Adoption</h3>
      <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
      <p>
        People already in line: {generateAllPeople()}
      </p>
    </div>
    )
  }
