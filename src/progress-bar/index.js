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
    const {
      width,
      height
    } = this.props

    return {
      '': {
        display: 'block'
      },

      '.tonic--wrapper': {
        backgroundColor: 'var(--background)',
        width,
        height,
        position: 'relative'
      },

      '.tonic--progress': {
        backgroundColor: 'var(--accent)',
        width: this.props.progress + '%',
        height: '100%',
        transition: 'width 0.2s ease'
      }
    }
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
