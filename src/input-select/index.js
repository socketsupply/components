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
      radius: '2px'
    }
  }

  stylesheet () {
    return `
      input-select .tonic--wrapper {
        position: relative;
      }

      input-select .tonic--wrapper:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
        z-index: 1;
      }

      input-select.tonic--loading {
        pointer-events: none;
        transition: background 0.3s ease;
      }

      input-select.tonic--loading select {
        color: transparent;
        background-color: var(--window);
        border-color: var(--border);
      }

      input-select.tonic--loading .tonic--wrapper:before {
        margin-top: -8px;
        margin-left: -8px;
        display: block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%);
        border: 2px solid var(--medium);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      input-select select {
        color: var(--primary);
        font: 14px var(--monospace);
        padding: 10px 20px 10px 10px;
        background-color: var(--window);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--border);
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
      }

      input-select select[disabled] {
        background-color: var(--background);
      }

      input-select label {
        color: var(--medium);
        font: 12px/14px var(--subheader);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
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
    const {
      height,
      width,
      padding,
      radius,
      value,
      iconArrow
    } = this.props

    if (value) {
      const option = this.root.querySelector(`option[value="${value}"]`)
      if (option) option.setAttribute('selected', true)
    }

    const wrapper = this.root.querySelector('.tonic--wrapper')
    if (width) wrapper.style.width = width

    const select = this.root.querySelector('select')

    if (width) select.style.width = width
    if (height) select.style.height = height
    if (radius) select.style.borderRadius = radius
    if (padding) select.style.padding = padding

    select.style.backgroundImage = `url('${iconArrow}')`
  }

  render () {
    const {
      disabled,
      required,
      width,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    this.root.style.width = width

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
