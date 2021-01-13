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

  setData (data) {
    this.state = data
  }

  getData () {
    return this.state
  }

  getElements () {
    return [...this.querySelectorAll('[data-key]')]
  }

  get value () {
    const elements = this.getElements()
    const data = this.state

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

    this.state = data
  }

  validate () {
    const elements = this.getElements()
    let isValid = true

    for (const el of elements) {
      if (!el.setInvalid) continue
      if (el.setValid) el.setValid()

      let selector = ''

      if (el.tagName === 'TONIC-INPUT') {
        selector = 'input'
      } else if (el.tagName === 'TONIC-TEXTAREA') {
        selector = 'textarea'
      } else if (el.tagName === 'TONIC-SELECT') {
        selector = 'select'
      } else if (el.tagName === 'TONIC-CHECKBOX') {
        selector = 'checkbox'
      } else if (el.tagName === 'TONIC-TOGGLE') {
        selector = 'checkbox'
      }

      const input = selector ? el.querySelector(selector) : el
      if (!input.checkValidity) continue

      input.checkValidity()

      for (const key in input.validity) {
        if (!input.validity[key] || key === 'valid') continue

        const customMessage = el.props.errorMessage || 'Required'
        const message = key === 'customError' ? customMessage : key
        el.setInvalid(message)
        isValid = false
      }
    }

    return isValid
  }

  connected () {
    if (!this.props.fill) return

    const elements = this.getElements()

    for (const element of elements) {
      const key = element.dataset.key
      const value = TonicForm.getPropertyValue(this.state, key)
      element.value = value || element.value || ''
    }
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = { TonicForm }
