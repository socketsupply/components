class IconContainer extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      color: 'var(--primary)',
      src: './sprite.svg#example'
    }
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      color,
      size,
      theme,
      src
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

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

Tonic.add(IconContainer)
