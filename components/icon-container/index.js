const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.defaults = {
      size: '30px',
      color: '#000'
    }
  }

  render () {
    const {
      color,
      size
    } = { ...this.defaults, ...this.props }

    return `
      <div class="wrapper" style="width: ${size}; height: ${size};">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
          <path fill="${color}" d="M59.5,10H17.2v80.3h65.2V32L59.5,10z M60.2,19l13.2,12.7H60.2V19z M23.2,84.3V16h31v21.7h22.1v46.6H23.2z"/>
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer)
