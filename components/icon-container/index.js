const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.defaults = {
      size: '25px',
      color: 'var(--primary)',
      src: './sprite.svg#example'
    }
  }

  render () {
    let {
      color,
      size,
      src
    } = { ...this.defaults, ...this.props }

    if (color === 'undefined' || color === 'color') {
      color = this.defaults.color
    }

    const style = `fill: ${color}; color: ${color};`

    return `
      <div class="wrapper" style="width: ${size}; height: ${size};">
        <svg>
          <use xlink:href="${src}" style="${style}">
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer, { shadow: true })
