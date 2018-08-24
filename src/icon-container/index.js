class IconContainer extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      color: 'var(--primary)',
      src: './sprite.svg#example'
    }
  }

  stylesheet () {
    return `
      icon-container svg {
        width: 100%;
        height: 100%;
      }
    `
  }

  styles () {
    let {
      color,
      size
    } = this.props

    // TODO this could be improved
    if (color === 'undefined' || color === 'color') {
      color = this.defaults.color
    }

    return {
      wrapper: {
        width: size,
        height: size
      },
      use: {
        fill: color,
        color
      }
    }
  }

  render () {
    let {
      theme,
      src
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `
      <div class="tonic--wrapper" styles="wrapper">
        <svg>
          <use xlink:href="${src}" styles="use">
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer)
