import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AdoptionProcess extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
    onAddAdopt: () => { }
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      body: JSON.stringify({
        "value": name,
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((name) => {
      this.context.addAdopt(name);
    })
    .catch(error => {
      console.error({ error })
    })
    this.props.history.push('/adoptionprocess');
    console.log(name)
  }


  render() {
    const allPeople = this.context.people;
    console.log(allPeople)
    const first = allPeople.first.value;
    const second = allPeople.first.next['value'];
    const third = allPeople.first.next.next['value'];
    //const fourth =
    //const fifth = 
    return (
      <div className='adoption'>
        <Navigation />
        <h2>Adoption Requirements</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>New Adoptive Owner Information</legend>
            <p>Fill out this form to adopt a baby pet.</p>
            <label htmlFor='name'>Name: </label><br />
            <input type='text' id='name'></input><br /><br />
            <button type='submit' className='submit'>Submit Application to Get in Line</button>
          </fieldset>
        </form>
        <h3>View Others Interested In Adoption</h3>
        <p>We have a system of adopting to the interested parties on a first-come-first-serve basis. The people in this list below will be the next to get a pet.</p><br />
        <p>Next in Line: {first} <br />
        Second in Line: {second}<br />
        Third in Line: {third}<br />
        
        </p>
      </div>
    )
  }
}