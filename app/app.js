import {app, Tray, Menu, shell, BrowserWindow} from 'electron'
import Ninetan from './libs/Ninetan'
import mkdirp from 'mkdirp'
import { LocalStorage } from 'node-localstorage'
import forEachPromise from './libs/forEachPromise'

const lsDir = app.getPath('appData') + '/electonic-ninetan/Local Storage/node'
mkdirp.sync(lsDir)
const ls = new LocalStorage(lsDir)

if (process.platform === 'darwin') {
  app.dock.hide()
}
let appIcon = null
const areas = JSON.parse(ls.getItem('areas'))

const areaNameClick = (areaName) => {
  return () => {
    const area = areaName.split('-')[0]
    shell.openExternal(`http://sx9.jp/weather/${area}.html`)
  }
}

const updateMenu = () => {
  let menuItems = []
  let isRainNear = false
  forEachPromise(areas, (next, areaName) => {
    let ninetan = new Ninetan(areaName)
    menuItems.push({
      type: 'normal',
      label: areaName,
      click: areaNameClick(areaName)
    })
    ninetan.load().then((data) => {
      const sooner = data.sooner
      if (sooner.start) {
        if (sooner.start <= 15) {
          // 15min
          isRainNear = true
        }
        menuItems.push(data.menuItemFromRow('start'))
        menuItems.push(data.menuItemFromRow('peak'))
        menuItems.push(data.menuItemFromRow('end'))
        const nextItem = data.menuItemFromRow('next')
        if (nextItem) {
          menuItems.push(nextItem)
        }
      } else {
        const lastRow = data.rows.pop()
        menuItems.push({type: 'normal', label: `no rain until ${lastRow.date} at least`})
      }
      menuItems.push({type: 'separator'})
      next()
    }).catch((error) => {
      console.error(error)
      menuItems.push({type: 'normal', label: 'failed to connect'})
      menuItems.push({type: 'separator'})
      next()
    })
  }).then(() => {
    menuItems.push({type: 'normal', label: 'settings', click: () => {
      const bw = new BrowserWindow({height: 630})
      bw.loadURL(`file://${require('path').resolve(__dirname,'renderer/settings.html')}`)
      bw.show()
    }})
    menuItems.push({type: 'normal', label: 'quit', click: app.quit})
    const _m = Menu.buildFromTemplate(menuItems)
    appIcon.setContextMenu(_m)
    if (isRainNear) {
      appIcon.setImage(`${__dirname}/data/img/umbrella.png`)
    } else {
      appIcon.setImage(`${__dirname}/data/img/sun.png`)
    }
  })
}

app.on('ready', () => {
  appIcon = new Tray(`${__dirname}/data/img/sun.png`)
  updateMenu()
  setInterval(updateMenu, 1000 * 60)
})
