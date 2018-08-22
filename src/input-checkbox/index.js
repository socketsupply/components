class InputCheckbox extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })
  }

  get value () {
    return this.props.checked
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      disabled: false,
      checked: false,
      size: '18px'
    }
  }

  style () {
    const {
      color,
      iconOn,
      checked,
      iconOff
    } = this.props

    if (!color) this.props.color = this.getPropertyValue('primary')
    if (!iconOn) this.props.iconOn = InputCheckbox.svg.iconOn(this.props.color)
    if (!iconOff) this.props.iconOff = InputCheckbox.svg.iconOff(this.props.color)

    let url = this.props[checked ? 'iconOn' : 'iconOff']

    return {
      '.tonic--wrapper': {
        display: 'inline-block',
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        userSelect: 'none'
      },
      'input[type="checkbox"]': {
        display: 'none'
      },
      'input[type="checkbox"][disabled] + label': {
        opacity: '0.35'
      },
      'label': {
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      'label:nth-of-type(1)': {
        width: this.props.size,
        height: this.props.size,
        backgroundImage: `url('${url}')`
      },
      'label:nth-of-type(2)': {
        color: 'var(--primary)',
        font: '12px var(--subheader)',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        paddingTop: '2px',
        marginLeft: '10px'
      }
    }
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const color = this.props.color || this.getPropertyValue('primary')
    const url = InputCheckbox.svg[state ? 'iconOn' : 'iconOff'](color)
    this.root.querySelector('label.tonic--icon').style.backgroundImage = `url("${url}")`
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      checked,
      theme
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    //
    // the id attribute can be removed from the component
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

    return `
      <div class="tonic--wrapper">
        <input
          type="checkbox"
          id="${id}"
          ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}/>
        <label for="${id}" class="tonic--icon"></label>
        ${this.renderLabel()}
      </div>
    `
  }
}

InputCheckbox.svg = {}
InputCheckbox.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

InputCheckbox.svg.iconOn = (color) => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
    <polygon fill="${color}" points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
  </svg>
`)

InputCheckbox.svg.iconOff = (color) => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
  </svg>
`)

Tonic.add(InputCheckbox)
