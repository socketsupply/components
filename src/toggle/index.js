class TonicToggle extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return (that.value === true) || (that.value === 'true') },
      set (value) { that.value = (value === true) || (value === 'true') }
    })
  }

  defaults () {
    return {
      checked: false
    }
  }

  get value () {
    const state = this.getState()

    if (typeof state.checked !== 'undefined') {
      return state.checked
    }

    return this.props.checked
  }

  set value (checked) {
    this.state.checked = checked

    this.reRender(props => Object.assign(props, {
      checked
    }))
  }

  stylesheet () {
    return `
      tonic-toggle .tonic--toggle--wrapper {
        height: 30px;
        position: relative;
      }

      tonic-toggle .tonic--toggle--wrapper > label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 6px;
        display: block;
        user-select: none;
      }

      tonic-toggle .tonic--switch {
        position: absolute;
        left: 0;
        top: 0;
      }

      tonic-toggle .tonic--switch label:before {
        font: bold 12px var(--subheader);
        text-transform: uppercase;
      }

      tonic-toggle .tonic--toggle {
        position: absolute;
        display: none;
        outline: none;
        user-select: none;
        z-index: 1;
      }

      tonic-toggle .tonic--toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--border);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }

      tonic-toggle .tonic--toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--border);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--window);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }

      tonic-toggle .tonic--toggle:disabled {
        cursor: default;
        background-color: var(--background);
      }

      tonic-toggle .tonic--toggle:disabled + label {
        cursor: default;
        background-color: var(--background);
      }

      tonic-toggle .tonic--toggle:disabled + label:before {
        content: '';
        background-color: var(--background);
      }

      tonic-toggle .tonic--toggle:disabled + label:after {
        background-color: var(--window);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--accent);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--accent);
        color: var(--background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--background);
      }
    `
  }

  change (e) {
    this.setState(state => Object.assign({}, state, {
      checked: e.target.checked
    }))
  }

  renderLabel () {
    const {
      id,
      label
    } = this.props

    if (!label) return ''

    return `<label for="tonic--toggle--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    let checked

    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      checked = this.props.checked === 'true'
    }

    this.state.checked = checked
    checked = checked ? 'checked' : ''

    return `
      <div class="tonic--toggle--wrapper">
        <div class="tonic--switch">
          <input
            type="checkbox"
            class="tonic--toggle"
            id="tonic--toggle--${id}"
            ${disabled}
            ${checked}/>
          <label for="tonic--toggle--${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(TonicToggle)
