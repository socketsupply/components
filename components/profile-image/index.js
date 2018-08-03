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
      .wrapper .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        -webkit-transition: opacity 0.2s ease-in-out;
        -moz-transition: opacity 0.2s ease-in-out;
        -ms-transition: opacity 0.2s ease-in-out;
        -o-transition: opacity 0.2s ease-in-out;
        transition: opacity 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
        display: flex;
      }
      .wrapper .overlay svg {
        margin: auto;
      }
      .wrapper.editable:hover .overlay {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
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
      border,
      editable
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
      <div class="wrapper ${editable ? 'editable' : ''}" style="${style}">
        <div
          class="image"
          ${idAttr}
          ${nameAttr}
          style="background-image: url('${src}')">
        </div>
        <div class="overlay">
          <svg style="width: 40px; height: 40px;">
            <use xlink:href="./sprite.svg#edit" style="fill: #fff; color: #fff;">
          </svg>
        </div>
      </div>
    `
  }
}

Tonic.add(ProfileImage, { shadow: true })
