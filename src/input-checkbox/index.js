class InputCheckbox extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })
  }

  get value () {
    return this.state.checked
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(document.body)
    return computed.getPropertyValue(`--${s}`).trim()
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
      input-checkbox .tonic--input-checkbox--wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      input-checkbox input[type="checkbox"] {
        display: none;
      }

      input-checkbox input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }

      input-checkbox label {
        color: var(--primary);
        font: 12px var(--subheader);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline-block;
        vertical-align: middle;
      }

      input-checkbox .tonic--icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      input-checkbox .tonic--icon svg {
        fill :blue;
      }

      input-checkbox label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
    `
  }

  change (e) {
    this.setState(state => Object.assign({}, state, {
      checked: !state.checked
    }))

    const state = this.getState()

    let url = ''

    const label = this.root.querySelector('label.tonic--icon')
    const color = this.props.color || this.getPropertyValue('primary')

    if (this.props.iconOn && this.props.iconOff) {
      url = this.props[state.checked ? 'iconOn' : 'iconOff']
    } else {
      url = InputCheckbox.svg[state.checked ? 'iconOn' : 'iconOff']()
    }

    label.style['-webkit-mask-image'] =
      label.style.maskImage = `url("${url}"), url('#${Date.now()}')`

    label.backgroundColor = color
  }

  styles () {
    let {
      color,
      iconOn,
      iconOff,
      checked,
      size
    } = this.props

    if (!color) color = this.getPropertyValue('primary')
    if (!iconOn) iconOn = InputCheckbox.svg.iconOn()
    if (!iconOff) iconOff = InputCheckbox.svg.iconOff()

    let url = checked === 'true' ? iconOn : iconOff

    return {
      icon: {
        width: size,
        height: size,
        '-webkit-mask-image': `url('${url}')`,
        maskImage: `url('${url}')`,
        backgroundColor: color
      }
    }
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''

    const {
      id,
      label
    } = this.props

    return `<label styles="label" for="tonic--checkbox--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme
    } = this.props

    let checked = this.props.checked === 'true'

    if (this.state.checked !== 'undefined') {
      checked = this.state.checked
    }

    checked = checked ? 'checked' : ''

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return `
      <div class="tonic--input-checkbox--wrapper">
        <input
          type="checkbox"
          id="tonic--checkbox--${id}"
          ${disabled}
          ${checked}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon">
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

InputCheckbox.svg = {}
InputCheckbox.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

InputCheckbox.svg.iconOn = () => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
    <polygon points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
  </svg>
`)

InputCheckbox.svg.iconOff = () => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
  </svg>
`)

Tonic.add(InputCheckbox)
