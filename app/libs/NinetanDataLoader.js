// Class has Interface like Google Chart API
const precipitations = [0.1, 1, 5, 10, 20, 50, 100, 'unknown']
export default class NinetanDataLoader {
  constructor() {
    this.rows = [] // Each row is array of percentage of rain at same date
    // set row number not values
    this.sooner = {
      start: null,
      peak: null,
      end: null
    }
    this.next = {
      start: null
    }
  }
  addRows(number) {}
  setValue(r, type, value) {
    if (!this.rows[r]) {
      this.rows[r] = {}
    }
    let row = this.rows[r]
    if (type === 0) {
      // Row about date
      row.date = value.replace(/\d{1,2}月\d{1,2}日 (\d{1,2})時(\d{1,2})分/, '$1:$2')
      return
    }
    // Row about precipitation : type: precipitation, value: percentage(%)
    const precipitation = precipitations[type - 1]
    if (type === 1) {
      row.precipitations = []
    }
    row.precipitations.push({precipitation: precipitation, percentage: value})
    if (this.sooner.start === r || this.sooner.peak === r || this.sooner.end === r) {
      return
    }
    if (value > 0 && !this.sooner.end) {
      // Raining
      if (!this.sooner.start) {
        this.sooner.start = r
      } else if (this._maxPrecipitation(this.sooner.peak).precipitation <= precipitation && this._maxPrecipitation(this.sooner.peak).percentage <= value) {
        this.sooner.peak = r
      }
    } else if (type === 1 && value === 0 && !this.sooner.end && this.sooner.start) {
      this.sooner.end = r
    } else if (value > 0 && this.sooner.end) {
      this.next.start = r
    }
  }
  _maxPrecipitation(r) {
    if (!r) {
      return {
        precipitation: 0,
        percentage: 0
      }
    }
    const row = this.rows[r]
    let precipitation = null
    let percentage = null
    for (const p of row.precipitations){
    if (p.percentage === 0) {
      break
    }
    precipitation = p.precipitation
    percentage = p.percentage
    }
    return {
      precipitation: precipitation,
      percentage: percentage
    }
  }
  menuItemFromRow(type) {
    const COLORS = ['9ff', '039', '390', 'ff0', 'd98d40', 'f00', '90c', '888']
    let r = null
    if (type === 'next') {
      r = this.next.start
      if (!r) {
        if (this.sooner.end) {
          const lastRow = this.rows[this.rows.length - 1]
          return {type: 'normal', label: `no next rain until ${lastRow.date} at least`}
        } else {
          return null
        }
      }
    } else if (type in this.sooner) {
      r = this.sooner[type]
      if (type === 'end' && !r) {
        const lastRow = this.rows[this.rows.length - 1]
        return {
          label: `It rails until ${lastRow.date}`,
          type: 'normal'
        }
      }
    } else {
      return null
    }
    const row = this.rows[r]
    return {
      label: `${type} :${row.date}`,
      submenu: row.precipitations.map((item, index) => {
        return {
          type: 'normal',
          label: `${item.precipitation}(mm/h): ${item.percentage}%`,
          icon: `./app/data/img/${COLORS[index]}.png`
        }
      })
    }
  }
}
