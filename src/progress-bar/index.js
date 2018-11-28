class TonicProgressBar extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.setProgress = n => this.setProgress(n)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.setProgress(value) }
    })
  }

  get value () {
    if (typeof this.state.progress !== 'undefined') {
      return this.state.progress
    }

    return this.props.progress
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
      tonic-progress-bar {
        display: inline-block;
        user-select: none;
      }

      tonic-progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--background);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
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
      },
      progress: {
        backgroundColor: this.props.color || 'var(--accent)'
      }
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  setProgress (progress) {
    this.setState(state => Object.assign({}, state, {
      progress
    }))

    this.reRender()
  }

  updated () {
    window.requestAnimationFrame(() => {
      const progressBar = this.root.querySelector('.tonic--progress')
      let progress = this.props.progress

      if (typeof this.state.progress !== 'undefined') {
        progress = this.state.progress
      }

      if (progressBar) {
        progressBar.style.width = `${progress}%`
      }
    })
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    this.root.style.width = this.props.width
    this.root.style.height = this.props.height

    return `
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress" styles="progress"></div>
      </div>
    `
  }
}

Tonic.add(TonicProgressBar)
