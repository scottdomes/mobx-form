import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {toJS, isObservableObject} from 'mobx'

class Form extends Component{
  constructor(props) {
    super(props)
    let {influencer} = this.props
    // We are forced to explicitly defined which fields we want to load in from the influencer object.
    // This acts an easy form of documentation.
    this.state = {
      name: influencer.name,
      surname: influencer.surname,
      // Since if we just loaded influencer.verticals, it would still be a reference to the
      // same observable array, we need to copy it using toJS
      verticals: toJS(influencer.verticals),
      newVertical: ''
    }
  }

  handleAddVertical(e) {
    console.log('adds')
    this.setState({ verticals: this.state.verticals.concat(this.state.newVertical), newVertical: '' })
  }

  handleClickVertical(vert) {
    let index = this.state.verticals.indexOf(vert)
    let newVerticals = this.state.verticals
    newVerticals.splice(index, 1)
    this.setState({ verticals: newVerticals })
  }

  handleSubmit(e) {
    // We explicitly define which fields we want to send to be saved- we could just send this.state,
    // but this would include the newVertical field, and is thus messier
    e.preventDefault()
    this.props.onSubmit({
      name: this.state.name,
      surname: this.state.surname,
      verticals: toJS(this.state.verticals)
    })
  }

  componentWillReceiveProps(nextProps) {
    // If we switch the influencer completely, we want the form to repopulate
    // Note that modifying the influencer.name directly via the input field in the App component
    // does not pass the below if statement. If we did want this behaviour, we could do a deeper
    // comparison between nextProps.influencer and this.props.influencer to see if any value has changed,
    // and load in the new values accordingly. The important thing is to keep our state completely
    // decoupled from the observable influencer, so there are zero side effects.
    if (nextProps.influencer !== this.props.influencer) {
      let {influencer} = nextProps
      this.setState({
        name: influencer.name,
        surname: influencer.surname,
        verticals: toJS(influencer.verticals),
        newVertical: ''
      })
    }
  }

  render() {
    return ( 
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" value={this.state.name} placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }) }}/>
        <input type="text" value={this.state.surname} placeholder="Surname" onChange={(e) => { this.setState({ surname: e.target.value }) }}/>
        <input type="text" value={this.state.newVertical} placeholder="Add vertical..." onChange={(e) => { this.setState({ newVertical: e.target.value }) }}/>
        <button type="button" onClick={this.handleAddVertical.bind(this)}>Add</button>
        {
          this.state.verticals.map((vert) => {
            return <p key={vert + '2'} onClick={this.handleClickVertical.bind(this, vert)}>{vert}</p>
          })
        }
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// The Form simply takes an object to modify, and returns a new object onSubmit.
// This makes the Form component completely reuseable, with zero side effects.
Form.propTypes = {
  influencer: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
}

export default observer(Form)