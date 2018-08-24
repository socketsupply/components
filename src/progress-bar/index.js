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

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  style () {
    return `
      progress-bar {
        display: block;
      }

      progress-bar .tonic--wrapper {
        width: ${this.props.width};
        height: ${this.props.height};
        position: relative;
        background-color: var(--background);
      }

      progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--accent);
        width: 0%;
        height: 100%;
        transition: width 0.2s ease;
      }
    `
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
      <div class="tonic--wrapper">
        <div class="tonic--progress"></div>
      </div>
    `
  }
}

Tonic.add(ProgressBar)
