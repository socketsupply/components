class ProgressBar extends Tonic { /* global Tonic */
  defaults () {
    return {
      width: '300px',
      height: '15px'
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  style () {
    return `%style%`
  }

  render () {
    let {
      width,
      height,
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    style = style.join('; ')

    return `
      <div class="wrapper" style="${style}">
        <div class="progress"></div>
      </div>
    `
  }
}

Tonic.add(ProgressBar)
