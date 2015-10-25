import React from 'react'
import ReactDOM from 'react-dom'
import SettingsApp from './components/SettingsApp'

;(() => {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<SettingsApp />, document.querySelector('#settingsApp'))
  })
})()
