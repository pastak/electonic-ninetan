import remote from 'remote'
import React from 'react'
import { LocalStorage } from 'node-localstorage'
import AreasList from './AreasList'
import SelectedList from './SelectedList'

const app = remote.require('app')

const lsDir = app.getPath('appData') + '/electonic-ninetan/Local Storage/node'
const ls = new LocalStorage(lsDir)

const areas = require('../../data/areas.json')

export default class SettingsApp extends React.Component {
  constructor (props) {
    super(props)
    const selected = JSON.parse(ls.getItem('areas')) || []
    console.log(selected)
    this.state = {
      selectedArea: selected,
      unselectedArea: areas.filter((item) => {
        return selected.indexOf(item) < 0
      })
    }
  }
  saveSelectedArea(newSelectedAreas) {
    ls.setItem('areas', JSON.stringify(newSelectedAreas))
  }
  addArea (_areas) {
    const _selected = this.state.selectedArea.concat(_areas).sort()
    const _unselected = areas.filter((item) => {
      return _selected.indexOf(item) < 0
    }).sort()
    this.setState({
      selectedArea: _selected,
      unselectedArea: _unselected
    })
    this.saveSelectedArea(_selected)
  }
  removeArea (_areas) {
    const _unselected = this.state.unselectedArea.concat(_areas).sort()
    const _selected = areas.filter((item) => {
      return _unselected.indexOf(item) < 0
    }).sort()
    this.setState({
      selectedArea: _selected,
      unselectedArea: _unselected
    })
    this.saveSelectedArea(_selected)
  }
  render () {
    return (
    <div>
        <AreasList
    selectAreaFunc={ this.addArea.bind(this) }
    areas={ this.state.unselectedArea }
    buttonText='+'
    />
        <SelectedList
    selectAreaFunc={ this.removeArea.bind(this) }
    areas={ this.state.selectedArea }
    buttonText='-'
    />
      </div>
    )
  }
}
