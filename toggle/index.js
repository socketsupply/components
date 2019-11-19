const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicToggle extends Tonic {
  defaults () {
    return {
      checked: false
    }
  }

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
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
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
        font: bold 12px var(--tonic-subheader);
        text-transform: uppercase;
      }

      tonic-toggle .tonic--toggle {
        position: absolute;
        opacity: 0;
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
        background-color: var(--tonic-border);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }

      tonic-toggle .tonic--toggle:focus + label {
        outline: -webkit-focus-ring-color auto 5px;
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
        background-color: var(--tonic-border);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--tonic-window);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }

      tonic-toggle .tonic--toggle:disabled {
        cursor: default;
      }

      tonic-toggle .tonic--toggle:disabled + label {
        cursor: default;
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:before {
        content: '';
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:after {
        background-color: var(--tonic-window);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--tonic-accent);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--tonic-accent);
        color: var(--tonic-background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--tonic-background);
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
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-toggle')
    }

    const {
      id,
      disabled,
      theme,
      tabindex
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? 'disabled' : ''

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.removeAttribute('tabindex')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    let checked

    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      checked = this.props.checked === 'true'
    }

    this.state.checked = checked
    checked = checked ? 'checked' : ''

    const attributes = [
      disabledAttr,
      checked
    ].join(' ')

    return `
      <div class="tonic--toggle--wrapper">
        <div class="tonic--switch">
          <input
            ${tabAttr}
            type="checkbox"
            class="tonic--toggle"
            id="tonic--toggle--${id}"
            ${attributes}/>
          <label for="tonic--toggle--${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicToggle }
