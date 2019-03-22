class TonicProgressBar extends Tonic { /* global Tonic */
  set value (value) {
    this.setProgress(value)
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
        background-color: var(--tonic-background);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--tonic-accent);
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
        width: this.state.progress + '%',
        backgroundColor: this.props.color || 'var(--tonic-accent)'
      }
    }
  }

  setProgress (progress) {
    this.setState(state => Object.assign({}, state, {
      progress
    }))

    this.reRender()
  }

  render () {
    if (this.props.theme) {
      this.classList.add(`tonic--theme--${this.props.theme}`)
    }

    this.style.width = this.props.width
    this.style.height = this.props.height

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress" styles="progress"></div>
      </div>
    `
  }
}

Tonic.add(TonicProgressBar)
