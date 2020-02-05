const Tonic = require('@optoolco/tonic')
const mode = require('../mode')

class TonicForm extends Tonic {
  static isNumber (s) {
    return !isNaN(parseInt(s, 10))
  }

  static getPropertyValue (o = {}, path = '') {
    const parts = path.split('.')
    let value = o

    for (const p of parts) {
      if (!value) return false
      value = value[p]
    }

    return value
  }

  static setPropertyValue (o = {}, path = '', v) {
    const parts = path.split('.')
    let value = o

    const last = parts.pop()
    if (!last) return

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      const next = parts[i + 1] || last

      if (!value[p]) {
        value[p] = TonicForm.isNumber(next) ? [] : {}
      }

      value = value[p]
    }

    value[last] = v
    return o
  }

  setData (data) {
    this.value = data
  }

  getData () {
    return this.value
  }

  get value () {
    const elements = [...this.querySelectorAll('[data-key]')]
    const data = {}

    for (const element of elements) {
      TonicForm.setPropertyValue(data, element.dataset.key, element.value)
    }

    return data
  }

  set value (data) {
    if (typeof data !== 'object') return

    for (const key in Object.keys(data)) {
      const el = this.querySelector(`[data-key="${key}"]`)
      if (!el) continue
      el.value = TonicForm.setPropertyValue(data, key)
    }
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-form')
    }

    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = { TonicForm }
