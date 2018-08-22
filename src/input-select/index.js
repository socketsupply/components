class InputSelect extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.loading = (state) => this.loading(state)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })

    Object.defineProperty(this.root, 'option', {
      get () { return that.option }
    })

    Object.defineProperty(this.root, 'selectedIndex', {
      get () { return that.selectedIndex }
    })
  }

  defaults () {
    return {
      disabled: false,
      iconArrow: InputSelect.svg.default(),
      width: '250px',
      radius: '2px',
      padding: '10px 20px 10px 10px'
    }
  }

  style () {
    return {
      '.tonic--wrapper': {
        position: 'relative',
        width: this.props.width
      },
      '.tonic--wrapper:before': {
        content: '""',
        width: '14px',
        height: '14px',
        opacity: '0',
        zIndex: '1'
      },
      '.tonic--loading': {
        pointerEvents: 'none',
        transition: 'background 0.3s ease'
      },
      '.tonic--loading select': {
        color: 'transparent',
        backgroundColor: 'var(--window)',
        borderColor: 'var(--border)'
      },
      '.tonic--loading .tonic--wrapper:before': {
        marginTop: '-8px',
        marginLeft: '-8px',
        display: 'block',
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        opacity: '1',
        '-webkit-transform': 'translateX(-50%)',
        '-ms-transform': 'translateX(-50%)',
        transform: 'translateX(-50%)',
        border: '2px solid var(--medium)',
        borderRadius: '50%',
        borderTopColor: 'transparent',
        animation: 'spin 1s linear 0s infinite',
        transition: 'opacity 0.3s ease'
      },
      'select': {
        color: 'var(--primary)',
        width: this.props.width,
        height: this.props.height,
        font: '14px var(--monospace)',
        padding: this.props.padding,
        backgroundImage: `url('${this.props.iconArrow}')`,
        backgroundColor: 'var(--window)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
        border: '1px solid var(--border)',
        borderRadius: this.props.radius,
        outline: 'none',
        '-webkit-appearance': 'none',
        appearance: 'none',
        position: 'relative'
      },
      'select[disabled]': {
        backgroundColor: 'var(--background)'
      },
      'label': {
        color: 'var(--medium)',
        font: '12px/14px var(--subheader)',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        paddingBottom: '10px',
        display: 'block'
      }
    }
  }

  get value () {
    return this.root.querySelector('select').value
  }

  get option () {
    const node = this.root.querySelector('select')
    return node.options[node.selectedIndex]
  }

  get selectedIndex () {
    const node = this.root.querySelector('select')
    return node.selectedIndex
  }

  loading (state) {
    const method = state ? 'add' : 'remove'
    this.root.classList[method]('tonic--loading')
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  connected () {
    if (this.props.value) {
      const option = this.root.querySelector(`option[value="${this.props.value}"]`)
      if (option) option.setAttribute('selected', true)
    }
  }

  render () {
    const {
      disabled,
      required,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const options = this.root.innerHTML

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <select
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}>
          ${options}
        </select>
      </div>
    `
  }
}

InputSelect.svg = {}
InputSelect.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
InputSelect.svg.default = () => InputSelect.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/>
  </svg>
`)

Tonic.add(InputSelect)
