import Navigation from '../Navigation/navigation';
import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AdoptionProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
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
      headers: {
        'Content-Type': 'plain/text',
        
      },
      body: JSON.stringify(e.target.name.value),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, try again');
      }
      return res.json();
    })
    .then((name) => {
      const addAdopt = [...this.state.people, name]
      this.setState({ people: addAdopt})
    })
    .catch(error => {
      console.error({ error })
    })
    this.props.history.push('/adoptionprocess');
    console.log(name)
    console.log(this.state.people, this.context.people)
    this.setState({ submitted: true })
  }


  render() {
    const allPeople = this.context.people;
    console.log(allPeople)
    const first = allPeople.first.value;
    const second = allPeople.first.next['value'];
    const third = allPeople.first.next.next['value'];
    //const fourth =
    //const fifth = 

    const submission = (this.state.submitted === false) ? (
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>New Adoptive Owner Information</legend>
            <p>Fill out this form to adopt a baby pet.</p>
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