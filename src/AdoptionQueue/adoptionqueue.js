import React, { useContext } from 'react';
import ApiContext from '../ApiContext';

//const value = useContext(ApiContext)

export default function AdoptionQueue() {
  //static contextType = ApiContext;
  const value = useContext(ApiContext);
    
  /*const allPeople = this.context.people;
  const firstCat = this.context.cats;
  const firstDog = this.context.dogs;
  console.log(allPeople, 'people')
  console.log(firstCat, 'cat')
  console.log(firstDog, 'dog')*/

  //const value = useContext(ApiContext)
  const allThesePeople = value.people;
  console.log(allThesePeople)
  /*const first = allPeople.first['value'];
  const second = allPeople.first.next['value'];
  const third = allPeople.first.next.next['value'];
  const fourth = allPeople.first.next.next.next['value'];
  const fifth = allPeople.first.next.next.next.next['value'];*/
    
  return (
    <div className='queue'>
          <h3>View Others Interested In Adoption</h3>
          <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
          <p>
            First in Line: {allThesePeople.first.value}<br />
            Second in Line: <br />
            Third in Line: <br />
            Fourth in Line: <br />
          </p>
        </div>
      
    )
  }
