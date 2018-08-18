class ProgressBar extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.setProgress = n => this.setProgress(n)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.props.progress }
    })
  }

  defaults () {
    return {
      width: '300px',
      height: '15px',
      progress: 0
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  style () {
    return `%style%`
  }

  setProgress (progress) {
    this.reRender(props => Object.assign({}, props, {
      progress
    }))
  }

  updated () {
    window.requestAnimationFrame(() => {
      const progressBar = this.root.querySelector('.progress')
      if (progressBar) progressBar.style.width = `${this.props.progress}%`
    })
  }

  render () {
    let {
      width,
      height,
      theme,
      progress
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    style = style.join('; ')

    return `
      <div class="wrapper" style="${style}">
        <div class="progress" style="width: ${progress}%"></div>
      </div>
    `
  }
}

Tonic.add(ProgressBar)
