import React from 'react'
import ReactDOM from 'react-dom'

export default class AreaList extends React.Component {
  constructor(props) {
    super(props)
  }
  areaOptions() {
    return this.props.areas.map((areaName) => {
      return (
      <option
      value={areaName}
      key={areaName}
      onDoubleClick={(event) => {
        this.props.selectAreaFunc(event.target.value)
      }}
      >
          {areaName}
        </option>
      )
    })
  }
  buttonClick() {
    const select = ReactDOM.findDOMNode(this.refs.select)
    this.props.selectAreaFunc(Array.from(select.options)
      .filter((item) => {
        return item.selected
      })
      .map((item) => {
        return item.value
      })
    )
  }
  button() {
    return (
    <button onClick={this.buttonClick.bind(this)}>
        {this.props.buttonText}
      </button>
    )
  }
  render() {
    return (
    <div className='arealist-wrapper'>
        <select ref='select' multiple='true' size='21'>
          {this.areaOptions()}
        </select>
        <br />
        {this.button()}
      </div>
    )
  }
}
