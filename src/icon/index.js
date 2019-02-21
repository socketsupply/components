class TonicIcon extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      fill: 'var(--primary)'
    }
  }

  stylesheet () {
    return `
      icon {
        display: inline-block;
      }
      svg path {
        fill: inherit;
      }
    `
  }

  styles () {
    let {
      size
    } = this.props

    return {
      icon: {
        width: size,
        height: size
      }
    }
  }

  render () {
    let {
      symbolId,
      size,
      fill,
      theme,
      src,
      tabindex
    } = this.props

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.root.removeAttribute('tabindex')

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <svg
        ${tabAttr}
        styles="icon">
        <use
          href="${src}#${symbolId}"
          xlink:href="${src}#${symbolId}"
          width="${size}"
          ${fill ? `fill="${fill}" color="${fill}"` : ''}
          height="${size}">
      </svg>
    `
  }
}

Tonic.add(TonicIcon)
