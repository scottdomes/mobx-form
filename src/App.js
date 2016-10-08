import React, { Component } from 'react';
import './App.css';
import {extendObservable} from 'mobx'
import Form from './Form'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'

class App extends Component {
  // Equivalent of @observer influencer = { ... etc }
  constructor(props) {
    super(props)
    extendObservable(this, {
      influencer: {
        name: 'Scott',
        surname: 'Domes',
        verticals: ['Health', 'Plaid', 'Farming']
      }
    });
  }



  handleSaveInfluencer(influencer) {
    // Here we would send the data to the API and (crucially) reload it, so that our original influencer object
    // can be updated to reflect the new values
    // InfluencerStore.saveInfluencer(influencer)
    //   .then(() => {
    //     InfluencerStore.reloadInfluencers()
    //   }) 
    // For example purposes, we'll just do this:
    this.influencer = {
      name: influencer.name,
      surname: influencer.surname,
      verticals: toJS(influencer.verticals)
    }
  }

  switchInfluencer(e) {
    // Note that this method changes the influencer object completely- thus passing the test
    // within Form.componentWillReceiveProps
    this.influencer = {
      name: 'Colin',
      surname: 'Tallin',
      verticals: ['Swearing', 'Philosophy', 'Philosophy of Swearing']
    }
  }

  render() {
    return (
      <div className="App">
        <Form influencer={this.influencer} onSubmit={this.handleSaveInfluencer.bind(this)}/>
        <h1>The Original Observable Object- No Side Effects</h1>
        <p>{this.influencer.name}</p>
        <p>{this.influencer.surname}</p>
        {
          this.influencer.verticals.map((vert) => {
            return <p key={vert}>{vert}</p>
          })
        }
        { // Input to directly modify observable object- which affects the above, but NOT the form
        }
        <input type="text" value={this.influencer.name} onChange={(e) => { this.influencer.name = e.target.value }}/>
        <button type="button" onClick={this.switchInfluencer.bind(this)}>Switch</button>
      </div>
    );
  }
}

export default observer(App);
