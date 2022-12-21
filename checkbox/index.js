import { Tonic } from '@socketsupply/tonic'

export class TonicCheckbox extends Tonic {
  constructor () {
    super()
    this._modified = false
  }

  get value () {
    const state = this.state
    const props = this.props

    const propsValue = typeof props.checked !== 'undefined' ? props.checked : props.value
    const stateValue = typeof state.checked !== 'undefined' ? state.checked : state.value
    let value

    if (this._modified) {
      value = typeof stateValue !== 'undefined' ? stateValue : propsValue
    } else {
      value = typeof propsValue !== 'undefined' ? propsValue : stateValue
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    this._setValue(value)
  }

  async _setValue (value) {
    this._modified = true
    this.state._changing = true
    const checked = (value === true) || (value === 'true')

    this.state.checked = checked
    this.props.checked = checked
    await this.reRender()
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

      tonic-checkbox > div {
        height: auto;
        padding: 6px;
      }

      tonic-checkbox input[type="checkbox"] {
        display: none;
      }

      tonic-checkbox input:checked + label:after {
        content: '';
        display: block;
        position: absolute;
        top: 2px;
        left: 6px;
        width: 3px;
        height: 8px;
        border: solid var(--tonic-primary);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      tonic-checkbox input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }

      tonic-checkbox label {
        color: var(--tonic-medium, #333);
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline;
        vertical-align: middle;
      }

      tonic-checkbox .tonic--icon {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;
        border: 1px solid var(--tonic-border, #fff);
        background-size: contain;
        background-color: var(--tonic-input-background);
        border-radius: 2px;
        margin: 4px;
      }

      tonic-checkbox input[type="checkbox"][disabled] + .tonic--icon {
        background-color: transparent;
      }

      tonic-checkbox label:nth-of-type(2) {
        display: inline-block;
        line-height: 22px;
        margin: 2px 2px 2px 30px;
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
    this._setValue(!this.value)
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

  async keydown (e) {
    if (e.code === 'Space') {
      await this._setValue(!this.value)
      this.querySelector('.tonic--checkbox--wrapper').focus()
    }
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
      <div tabindex="0" class="tonic--checkbox--wrapper">
        <input ... ${{
          type: 'checkbox',
          id: `tonic--checkbox--${id}`,
          checked,
          disabled: (disabled === true) || (disabled === 'true'),
          title,
          tabindex
        }}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon"
        >
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}
