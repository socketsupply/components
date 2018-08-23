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

  connected () {
    let {
      color,
      size
    } = this.props

    // TODO this could be improved
    if (color === 'undefined' || color === 'color') {
      color = this.defaults.color
    }

    const wrapper = this.root.querySelector('.tonic--wrapper')
    wrapper.style.width = size
    wrapper.style.height = size

    const use = this.root.querySelector('use')
    use.style.fill = color
    use.style.color = color
  }

  render () {
    let {
      theme,
      src
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `
      <div class="tonic--wrapper">
        <svg>
          <use xlink:href="${src}">
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer)
