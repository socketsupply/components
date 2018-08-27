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
      icon-container {
        display: inline-block;
      }

      icon-container .tonic--icon {
        width: 100%;
        height: 100%;
      }
    `
  }

  styles () {
    let {
      color,
      size,
      src
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
      icon: {
        '-webkit-mask-image': `url('${src}')`,
        maskImage: `url('${src}')`,
        backgroundColor: color
      }
    }
  }

  render () {
    let {
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--icon" styles="icon"></div>
      </div>
    `
  }
}

Tonic.add(IconContainer)
