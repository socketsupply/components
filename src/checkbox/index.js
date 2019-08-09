class TonicCheckbox extends Tonic { /* global Tonic */
  get value () {
    const state = this.getState()
    let value

    if (typeof state.checked !== 'undefined') {
      value = state.checked
    } else {
      value = this.props.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')

    this.state.checked = checked
    this.reRender()
  }

  defaults () {
    return {
      disabled: false,
      checked: false,
      size: '18px'
    }
  }

  stylesheet () {
    return `
      tonic-checkbox .tonic--checkbox--wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      tonic-checkbox input[type="checkbox"] {
        display: none;
      }

      tonic-checkbox input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }

      tonic-checkbox label {
        color: var(--tonic-primary);
        font: 12px var(--tonic-subheader);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline;
        vertical-align: middle;
      }

      tonic-checkbox .tonic--icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      tonic-checkbox .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-checkbox label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
    `
  }

  change (e) {
    if (this.state._changing) return

    e.stopPropagation()

    this.setState(state => Object.assign({}, state, {
      checked: !state.checked,
      _changing: true
    }))

    this.reRender()
  }

  updated () {
    if (this.state._changing) {
      const e = new window.Event('change', { bubbles: true })
      this.dispatchEvent(e)
      delete this.state._changing
    }
  }

  styles () {
    return {
      icon: {
        width: this.props.size,
        height: this.props.size
      }
    }
  }

  renderIcon () {
    let checked = this.state.checked
    if (typeof checked === 'undefined') {
      checked = this.state.checked = this.props.checked
    }

    const iconState = checked ? 'checked' : 'unchecked'

    return this.html`
      <svg>
        <use
          href="#${iconState}"
          xlink:href="#${iconState}"
          color="var(--tonic-primary)"
          fill="var(--tonic-primary)">
        </use>
      </svg>
    `
  }

  renderLabel () {
    let {
      id,
      label
    } = this.props

    if (!this.props.label) {
      label = this.nodes
    }

    return this.html`<label styles="label" for="tonic--checkbox--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
      title,
      tabindex
    } = this.props

    let checked = (this.props.checked === true) || (this.props.checked === 'true')

    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      this.setState(state => Object.assign(state, {
        state,
        checked
      }))
    }

    const checkedAttr = checked ? 'checked' : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''

    const titleAttr = title ? `title="${title}"` : ''

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.removeAttribute('tabindex')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const attributes = [
      disabledAttr,
      titleAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--checkbox--wrapper">
        <input
          type="checkbox"
          id="tonic--checkbox--${id}"
          ${checkedAttr}
          ${attributes}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon">
          ${this.renderIcon()}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(TonicCheckbox)
