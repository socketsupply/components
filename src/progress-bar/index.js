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
      width: '280px',
      height: '15px',
      progress: 0
    }
  }

  stylesheet () {
    return `
      progress-bar {
        display: inline-block;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--background);
      }

      progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--accent);
        width: 0%;
        height: 100%;
      }
    `
  }

  styles () {
    return {
      wrapper: {
        width: this.props.width,
        height: this.props.height
      }
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  setProgress (progress) {
    this.reRender(props => Object.assign({}, props, {
      progress
    }))
  }

  updated () {
    window.requestAnimationFrame(() => {
      const progressBar = this.root.querySelector('.tonic--progress')
      if (progressBar) progressBar.style.width = `${this.props.progress}%`
    })
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return `
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress"></div>
      </div>
    `
  }
}

Tonic.add(ProgressBar)
