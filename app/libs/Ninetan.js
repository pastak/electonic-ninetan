import NinetanDataLoader from './NinetanDataLoader'
import request from 'request-promise'

export default class Ninetan {
  constructor (props) {
    if (typeof props === 'string') {
      this.areaName = props
    }
  }
  load (areaName) {
    let jsFullPath = ''
    if (typeof areaName === 'string') {
      jsFullPath = `http://sx9.jp/weather/${areaName}.js`
      this.areaName = areaName
    } else if (this.areaName) {
      jsFullPath = `http://sx9.jp/weather/${this.areaName}.js`
    }
    return new Promise((resolve, reject) => {
      request(jsFullPath).then((jsString) => {
        const ndl = new NinetanDataLoader()
        let getNinetandata
        /* eslint-disable-line */
        eval(`${jsString}
        getNinetandata = function(data) {
          return update_${this.areaName.replace('-', '_')}(data)
        }`)
        getNinetandata(ndl)
        /* eslint-disable-line */
        resolve(ndl)
      }).catch(reject)
    })
  }
}
