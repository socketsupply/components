class InputText extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.setInvalid = msg => this.setInvalid(msg)
    this.root.setValid = () => this.setValid()

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })
  }

  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      width: '250px',
      errorMessage: 'Invalid'
    }
  }

  get value () {
    return this.root.querySelector('input').value
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
      input-text .tonic--wrapper {
        position: relative;
      }

      input-text .tonic--right icon-container {
        right: 10px;
      }

      input-text .tonic--right input {
        padding-right: 40px;
      }

      input-text .tonic--left icon-container {
        left: 10px;
      }

      input-text .tonic--left input {
        padding-left: 40px;
      }

      input-text icon-container {
        position: absolute;
        bottom: 7px;
      }

      input-text label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      input-text input {
        color: var(--primary);
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }

      input-text input:invalid {
        border-color: var(--error);
      }

      input-text input:invalid:focus {
        border-color: var(--error);
      }

      input-text input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      input-text input:focus {
        border-color: var(--primary);
      }

      input-text input[disabled] {
        background-color: var(--background);
      }

      .tonic--invalid {
        font-size: 14px;
        text-align: center;
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s;
        visibility: hidden;
        opacity: 0;
      }

      .tonic--invalid span {
        color: white;
        padding: 2px 6px;
        background-color: var(--error);
        border-radius: 2px;
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }

      .tonic--invalid span:after {
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
        border-top: 6px solid var(--error);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  renderIcon () {
    if (!this.props.src) return ''

    return `
      <icon-container
        src="${this.props.src}"
        color="${this.props.color}">
      </icon-container>
    `
  }

  setupEvents () {
    const input = this.root.querySelector('input')

    const set = (k, v, event) => {
      this.setState(state => Object.assign({}, state, { [k]: v }))
    }

    const relay = name => {
      this.root && this.root.dispatchEvent(new window.Event(name))
    }

    input.addEventListener('focus', e => {
      set('focus', true)
      relay('focus')
    })

    input.addEventListener('blur', e => {
      set('focus', false)
      relay('blur')
    })

    input.addEventListener('input', e => {
      set('value', e.target.value)
      set('pos', e.target.selectionStart)
      relay('input')
    })

    const state = this.getState()
    input.focus()

    try {
      input.setSelectionRange(state.pos, state.pos)
    } catch (err) {
      console.warn(err)
    }
  }

  updated () {
    const input = this.root.querySelector('input')
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
    this.setupEvents()
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
        width,
        height,
        borderRadius: radius,
        padding
      }
    }
  }

  render () {
    const {
      type,
      placeholder,
      spellcheck,
      ariaInvalid,
      disabled,
      required,
      pattern,
      theme,
      position
    } = this.props

    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const value = this.props.value || this.state.value
    const valueAttr = value && value !== 'undefined' ? `value="${value}"` : ''

    return `
      <div class="tonic--wrapper ${positionAttr}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input
          styles="input"
          ${valueAttr}
          ${patternAttr}
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
        />
        <div class="tonic--invalid">
          <span>${this.props.errorMessage}</span>
        </div>
      </div>
    `
  }
}

Tonic.add(InputText)
