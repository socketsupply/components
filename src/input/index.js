class TonicInput extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.setInvalid = msg => this.setInvalid(msg)
    this.root.setValid = () => this.setValid()

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      width: '250px',
      color: 'var(--primary)',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      position: 'left',
      errorMessage: 'Invalid'
    }
  }

  get value () {
    return this.root.querySelector('input').value
  }

  set value (value) {
    this.root.querySelector('input').value = value
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
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
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

      tonic-input input:invalid {
        border-color: var(--error);
      }

      tonic-input input:invalid:focus {
        border-color: var(--error);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--primary);
      }

      tonic-input input[disabled] {
        background-color: var(--background);
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
        background-color: var(--error);
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
      <tonic-icon
        src="${this.props.src}"
        color="${this.props.color}">
      </tonic-icon>
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
      width,
      height,
      type,
      placeholder,
      spellcheck,
      ariaInvalid,
      disabled,
      required,
      pattern,
      theme,
      position,
      minlength,
      maxlength,
      min,
      max
    } = this.props

    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const requiredAttr = required && required === 'true' ? `required="true"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''
    const minLengthAttr = minlength ? `minlength="${minlength}"` : ''
    const maxLengthAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const maxAttr = max ? `max="${max}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const value = this.props.value || this.state.value
    const valueAttr = value && value !== 'undefined' ? `value="${value}"` : ''

    const attributes = [
      patternAttr,
      valueAttr,
      placeholderAttr,
      spellcheckAttr,
      ariaInvalidAttr,
      minLengthAttr,
      maxLengthAttr,
      minAttr,
      maxAttr,
      disabledAttr,
      requiredAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper ${positionAttr}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input styles="input" type="${type}" ${attributes}/>
        <div class="tonic--invalid">
          <span>${this.props.errorMessage}</span>
        </div>
      </div>
    `
  }
}

Tonic.add(TonicInput)
