import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import AdoptionQueue from '../AdoptionQueue/adoptionqueue';

export default class AdoptionProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.newAdoption = this.newAdoption.bind(this)
  }
  
  static defaultProps = {
    history: {
      push: () => { }
    },
    onAddAdopt: () => { }
  }

  static contextType = ApiContext;

  componentDidMount() {
    console.log(this.context.people)
  }

  newAdoption() {
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .catch(error  => {
      console.error({ error })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         data: name
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((name) => {
      this.context.addAdopt(name)
    })
    .catch(error => {
      console.error({ error })
    })
    this.props.history.push('/adoptionprocess');
    console.log(name)
    //console.log(this.state.people, this.context.people)
    this.setState({ submitted: true })
  }


  render() {
    const allPeople = this.context.people;
    const firstCat = this.context.cats;
    const firstDog = this.context.dogs;
    console.log(firstCat, 'firstcat')
    console.log(firstDog, 'first dog');
  
    /*const first = allPeople.first.value;
    const second = allPeople.first.next['value'];
    const third = allPeople.first.next.next['value'];
    const fourth = allPeople.first.next.next.next['value'];
    const fifth = allPeople.first.next.next.next.next['value'];*/

    const submission = (this.state.submitted === false) ? (
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>New Adoptive Owner Information</legend>
            <p>Fill out this form to be considered for adopting one of our pets.</p>
            <label htmlFor='name'>Name: </label><br />
            <input type='text' id='name'></input><br /><br />
            <button type='submit' className='submit'>Submit Application to Get in Line</button>
          </fieldset>
        </form>
    ) : (
      <p>Thanks for submitting your name! You will be added to our list.</p>
    )

    return (
      <div className='adoption'>
        <Navigation />
        <h2>Adoption Requirements</h2>
        {submission}
        <AdoptionQueue />
        <button type='button' onClick={() => this.newAdoption()}>Click to delete person</button>
      </div>
    )
  }
}