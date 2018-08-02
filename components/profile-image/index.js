const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class ProfileImage extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        position: relative;
        overflow: hidden;
      }
      .wrapper .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      `

    this.defaults = {
      size: '50px',
      src: './default.jpg',
      radius: '5px'
    }
  }

  render () {
    let {
      id,
      name,
      size,
      src,
      radius,
      border
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    let style = []
    if (size) {
      style.push(`width: ${size}`)
      style.push(`height: ${size}`)
    }
    if (border) style.push(`border: ${border}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="wrapper" style="${style}">
        <div
          class="image"
          ${idAttr}
          ${nameAttr}
          style="background-image: url('${src}')">
        </div>
      </div>
    `
  }
}

Tonic.add(ProfileImage, { shadow: true })
