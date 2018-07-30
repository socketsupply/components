const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  render () {
    return `<div></div>`
  }
}

Tonic.add(IconContainer)
