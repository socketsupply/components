const Tonic = require('@optoolco/tonic')

class TonicInput extends Tonic {
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      color: 'var(--tonic-primary)',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      position: 'left'
    }
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    this.querySelector('input').value = value
    this.state.value = value
  }

  setValid () {
    this.reRender(props => Object.assign({}, props, {
      invalid: false
    }))
  }

  setInvalid (msg) {
    this.reRender(props => Object.assign({}, props, {
      invalid: true,
      errorMessage: msg
    }))
  }

  stylesheet () {
    return `
      tonic-input .tonic--wrapper {
        position: relative;
      }

      tonic-input[src] .tonic--right tonic-icon {
        right: 10px;
      }

      tonic-input[src] .tonic--right input {
        padding-right: 40px;
      }

      tonic-input[src] .tonic--left tonic-icon {
        left: 10px;
      }

      tonic-input[src] .tonic--left input {
        padding-left: 40px;
      }

      tonic-input[src] tonic-icon {
        position: absolute;
        bottom: 7px;
      }

      tonic-input label {
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
        color: var(--tonic-primary);
        font: 14px var(--tonic-monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-input input:invalid {
        border-color: var(--tonic-error);
      }

      tonic-input input:invalid:focus {
        border-color: var(--tonic-error);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--tonic-primary);
      }

      tonic-input input[disabled] {
        background-color: var(--tonic-background);
      }

      tonic-input[label] .tonic--invalid {
        margin-bottom: -13px;
      }

      tonic-input .tonic--invalid {
        font-size: 14px;
        text-align: center;
        margin-bottom: 13px;
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s;
        visibility: hidden;
        opacity: 0;
      }

      tonic-input .tonic--invalid span {
        color: white;
        padding: 2px 6px;
        background-color: var(--tonic-error);
        border-radius: 2px;
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }

      tonic-input .tonic--invalid span:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--tonic-error);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="tonic--input_${this.props.id}">${this.props.label}</label>`
  }

  renderIcon () {
    if (!this.props.src) return ''

    return `
      <tonic-icon
        src="${this.props.src}"
        color="${this.props.color}">
      </tonic-icon>
    `
  }

  setupEvents () {
    const input = this.querySelector('input')

    const set = (k, v, event) => {
      this.setState(state => Object.assign({}, state, { [k]: v }))
    }

    const relay = name => {
      this.dispatchEvent(new window.Event(name))
    }

    input.addEventListener('focus', e => {
      set('focus', true)
      relay('focus')
    })

    input.addEventListener('blur', e => {
      set('focus', false)
      relay('blur')
    })

    input.addEventListener('keyup', e => {
      set('value', e.target.value)
      set('pos', e.target.selectionStart)
      relay('input')
    })

    const state = this.getState()
    if (!state.focus) return

    input.focus()

    try {
      input.setSelectionRange(state.pos, state.pos)
    } catch (err) {
      console.warn(err)
    }
  }

  updated () {
    const input = this.querySelector('input')

    setTimeout(() => {
      if (this.props.invalid) {
        input.setCustomValidity(this.props.errorMessage)
      } else {
        input.setCustomValidity('')
      }
    }, 32)

    this.setupEvents()
  }

  connected () {
    this.updated()
  }

  styles () {
    const {
      width,
      height,
      radius,
      padding
    } = this.props

    return {
      wrapper: {
        width
      },
      input: {
        width: '100%',
        height,
        borderRadius: radius,
        padding
      }
    }
  }

  render () {
    const {
      ariaInvalid,
      ariaLabelledby,
      disabled,
      height,
      label,
      max,
      maxlength,
      min,
      minlength,
      name,
      pattern,
      placeholder,
      position,
      readonly,
      required,
      spellcheck,
      tabindex,
      theme,
      title,
      type
    } = this.props

    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const ariaLabelAttr = label ? `aria-label="${label}"` : ''
    const ariaLabelledByAttr = ariaLabelledby ? `aria-labelledby="${ariaLabelledby}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? 'disabled' : ''
    const maxAttr = max ? `max="${max}"` : ''
    const maxLengthAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const minLengthAttr = minlength ? `minlength="${minlength}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''
    const readonlyAttr = readonly && readonly === 'true' ? 'readonly' : ''
    const requiredAttr = required && required === 'true' ? 'required' : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const titleAttr = title ? `title="${title}"` : ''
    const value = this.state.value || this.props.value
    const valueAttr = value && value !== 'undefined' ? `value="${value.replace(/"/g, '&quot;')}"` : ''

    if (ariaLabelledByAttr) this.removeAttribute('ariaLabelled')
    if (height) this.style.width = height
    if (name) this.removeAttribute('name')
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const attributes = [
      ariaInvalidAttr,
      ariaLabelAttr,
      ariaLabelledByAttr,
      disabledAttr,
      maxAttr,
      maxLengthAttr,
      minAttr,
      minLengthAttr,
      nameAttr,
      patternAttr,
      placeholderAttr,
      readonlyAttr,
      requiredAttr,
      spellcheckAttr,
      tabAttr,
      titleAttr,
      valueAttr
    ].join(' ')

    const errorMessage = this.props.errorMessage ||
      this.props.errormessage || 'Invalid'

    return `
      <div class="tonic--wrapper ${positionAttr}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input
          styles="input"
          type="${type}"
          id="tonic--input_${this.props.id}"
          ${attributes}/>
        <div class="tonic--invalid">
          <span id="tonic--error-${this.props.id}">${errorMessage}</span>
        </div>
      </div>
    `
  }
}

module.exports = { TonicInput }
