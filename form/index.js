const Tonic = require('@optoolco/tonic')

class TonicForm extends Tonic {
  static isNumber (s) {
    return !isNaN(Number(s))
  }

  static getPropertyValue (o, path) {
    if (!path) return null

    const parts = path.split('.')
    let value = o

    for (const p of parts) {
      if (!value) return null
      value = value[p]
    }

    return value
  }

  static setPropertyValue (o, path, v) {
    if (!path) return

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

  validate () {
    const elements = this.getElements()

    for (const el of elements) {
      if (!el.setInvalid) continue
      if (el.setValid) el.setValid()

      for (const key in el.validity) {
        if (!el.validity[key]) el.setInvalid(key)
      }
    }
  }

  setData (data) {
    this.value = data
  }

  getData () {
    return this.value
  }

  getElements () {
    return [...this.querySelectorAll('[data-key]')]
  }

  get value () {
    const elements = this.getElements()
    const data = {}

    for (const element of elements) {
      TonicForm.setPropertyValue(data, element.dataset.key, element.value)
    }

    return data
  }

  set value (data) {
    if (typeof data !== 'object') return

    const elements = this.getElements()

    for (const element of elements) {
      const value = TonicForm.getPropertyValue(data, element.dataset.key)
      if (!value) continue

      element.value = value
    }
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = { TonicForm }
