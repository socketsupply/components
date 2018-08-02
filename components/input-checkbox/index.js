const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputCheckbox extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }
      label {
        color: var(--primary);
        font: 12px 'Poppins', sans-serif;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline-block;
        vertical-align: middle;
      }
      label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.props = {
      checked: false,
      changed: false
    }

    this.defaults = {
      disabled: false,
      checked: false,
      color: 'var(--primary)',
      size: '18px',
      on: './sprite.svg#checkbox_on',
      off: './sprite.svg#checkbox_off'
    }
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const props = { ...this.defaults, ...this.props }
    const file = props[state ? 'on' : 'off']
    const ns = 'http://www.w3.org/1999/xlink'
    this.root.querySelector('use').setAttributeNS(ns, 'xlink:href', file)
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      checked,
      color,
      on,
      off,
      size
    } = { ...this.defaults, ...this.props }

    const state = checked ? on : off
    const nameAttr = name ? `name="${name}"` : ''
    const style = `fill: ${color}; color: ${color};`

    return `
      <div class="wrapper">
        <input
          type="checkbox"
          id="${id}"
          ${nameAttr}
          ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}/>
        <label
          for="${id}"
          style="width: ${size}; height: ${size};">
          <svg>
            <use xlink:href="${state}" style="${style}">
          </svg>
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputCheckbox, { shadow: true })
