class ProfileImage extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '50px',
      src: './default.jpg',
      radius: '5px'
    }
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      id,
      name,
      size,
      src,
      radius,
      border,
      theme,
      editable
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

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

Tonic.add(ProfileImage)
