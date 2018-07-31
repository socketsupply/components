const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      `
  }
  render () {
    return `<div></div>`
  }
}

Tonic.add(IconContainer)
