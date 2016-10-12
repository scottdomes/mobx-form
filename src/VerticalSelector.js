import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {extendObservable} from 'mobx'

class VerticalSelector extends Component{
  constructor(props) {
    super(props)
    extendObservable(this, {
      newVertical: ''
    });
  }

  handleAddVertical(e) {
    this.props.verticals.push(this.newVertical)
    this.newVertical = ''
    console.log(this.props.verticals)
  }

  handleClickVertical(vert) {
    let index = this.props.verticals.indexOf(vert)
    this.props.verticals.splice(index, 1)
  }

  render() {
    return ( 
      <div>
        <input type="text" value={this.newVertical} placeholder="Add vertical..." onChange={(e) => { this.newVertical = e.target.value }}/>
        <button type="button" onClick={this.handleAddVertical.bind(this)}>Add</button>
         {
           this.props.verticals.map((vert) => {
             return <p key={vert + '2'} onClick={this.handleClickVertical.bind(this, vert)}>{vert}</p>
           })
        }
      </div>
    )
  }
}

VerticalSelector.propTypes = {
  verticals: React.PropTypes.object.isRequired
}

export default observer(VerticalSelector)