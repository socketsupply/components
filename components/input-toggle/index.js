const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputToggle extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        height: 30px;
        width: 47px;
        position: relative;
      }
      .wrapper > label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 9px;
        display: block;
      }
      .switch {
        position: absolute;
        left: 0;
        top: 0;
      }
      .switch label:before {
        font: bold 12px 'Poppins', sans-serif;
        text-transform: uppercase;
      }
      .switch input.toggle {
        position: absolute;
        outline: none;
        user-select: none;
        z-index: 1;
        display: none;
      }
      .switch input.toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--border);
        border-radius: 60px;
        transition: background 0.4s;
        cursor: default;
      }
      .switch input.toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        bottom: 1px;
        right: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--border);
      }
      .switch input.toggle + label:after {
        content: ' ';
        width: 20px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: #fff;
        border-radius: 52px;
        transition: margin 0.4s, background 0.4s;
        display: block;
        z-index: 2;
      }
      .switch input.toggle:disabled {
        cursor: default;
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label {
        cursor: default;
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label:before {
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label:after {
        background-color: #fff;
      }
      .switch input.toggle:checked + label {
        background-color: var(--accent);
      }
      .switch input.toggle:checked + label:before {
        content: ' ';
        background-color: var(--accent);
        color: var(--background);
      }
      .switch input.toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--background);
      }
      `

    this.defaults = {
      checked: false
    }
  }

  change (e) {
    this.props.checked = !this.props.checked
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
      checked
    } = { ...this.defaults, ...this.props }

    const nameAttr = name ? `name="${name}"` : ''

    return `
      <div class="wrapper">
        <div class="switch">
          <input
            type="checkbox"
            class="toggle"
            id="${id}"
            ${nameAttr}
            ${disabled ? 'disabled' : ''}
            ${checked ? 'checked' : ''}>
          <label for="${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputToggle, { shadow: true })
