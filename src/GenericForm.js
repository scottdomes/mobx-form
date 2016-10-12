import React from 'react'
import { observer } from 'mobx-react'

class GenericViewModelFormClass extends React.Component {

  static propTypes = {
    viewModel: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
  }

  handleChange(name, value) {
    this.props.viewModel[name] = value
  }

  handleSave(e) {
    e.preventDefault()
    this.props.onSave(this.props.viewModel)
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        return React.cloneElement(child, {
          onChange: this.handleChange.bind(this),
          value: this.props.viewModel[child.props.name],
        })
      }
    )

    return (
      <form onSubmit={this.handleSave.bind(this)}>
        {childrenWithProps}
      </form>
    )
  }

}

export const GenericViewModelForm = observer(GenericViewModelFormClass)

export class GenericForm extends React.Component {

  static propTypes = {
    values: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = props.values
  }

  handleChange(name, value) {
    this.setState({[name]: value})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.values !== this.props.values) {
      this.setState(nextProps.values)
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        return React.cloneElement(child, {
          onChange: this.handleChange.bind(this),
          value: this.state[child.props.name],
        })
      }
    )

    return (
      <form>
        {childrenWithProps}
      </form>
    )
  }

}

class FieldClass extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  handleChange(e) {
    let val = e.target.value
    if (this.props.setValue) {
      val = this.props.setValue(e.target.value)
    }
    this.props.onChange(this.props.name, val)
  }

  getValue() {
    if (this.props.getValue) {
      return this.props.getValue(this.props.value)
    }
    return this.props.value
  }

  render() {
    const { type } = this.props

    return (
      <input
        type={type || 'text'}
        value={this.getValue() || ''}
        onChange={this.handleChange.bind(this)} />
    )
  }

}

export const Field = observer(FieldClass)
