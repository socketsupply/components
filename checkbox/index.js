const Tonic = require('@optoolco/tonic')

class TonicCheckbox extends Tonic {
  get value () {
    const state = this.state
    let value

    if ('checked' in this.props) {
      value = this.props.checked
    } else {
      value = state.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')

    this.state.checked = checked
    this.props.checked = checked
    this.reRender()
  }

  defaults () {
    return {
      disabled: false,
      size: '18px'
    }
  }

  static stylesheet () {
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
        color: var(--tonic-primary, #333);
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
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
    if (
      this.props.virtual === true ||
      this.props.virtual === 'true'
    ) {
      return
    }
    if (this.state._changing) return

    e.stopPropagation()

    const currentState = this.value
    this.state._changing = true
    this.value = !currentState

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
    const checked = this.value
    const iconState = checked ? 'checked' : 'unchecked'

    return this.html`
      <svg>
        <use ... ${{
          href: `#${iconState}`,
          'xlink:href': `#${iconState}`,
          color: 'var(--tonic-primary, #333)',
          fill: 'var(--tonic-primary, #333)'
        }}>
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

    return this.html`
      <label
        styles="label"
        for="tonic--checkbox--${id}"
      >${label}</label>
    `
  }

  render () {
    const {
      id,
      disabled,
      theme,
      title,
      tabindex
    } = this.props

    const checked = this.value
    if (typeof this.state.checked === 'undefined') {
      this.state.checked = checked
    }

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--checkbox--wrapper">
        <input ... ${{
          type: 'checkbox',
          id: `tonic--checkbox--${id}`,
          checked,
          disabled: disabled === 'true',
          title,
          tabindex
        }}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon"
        >
          ${this.renderIcon()}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicCheckbox }
