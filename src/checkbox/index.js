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

    this.reRender(props => Object.assign(props, {
      checked
    }))

    this.state.checked = checked
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
    this.setState(state => Object.assign({}, state, {
      checked: !state.checked
    }))

    this.reRender()
  }

  styles () {
    return {
      icon: {
        width: this.props.size,
        height: this.props.size
      }
    }
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
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
      label = this.initialChildNodes
    }

    return this.html`<label styles="label" for="tonic--checkbox--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
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

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.root.removeAttribute('tabindex')

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const attributes = [
      disabledAttr,
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
