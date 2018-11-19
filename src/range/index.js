class TonicRange extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

  defaults () {
    return {
      width: '250px',
      disabled: false,
      min: '0',
      max: '100',
      value: '50'
    }
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    if (!this.root) return

    this.root.querySelector('input').value = value
    this.setValue(value)
  }

  setValue (value) {
    const min = this.props.min
    const max = this.props.max
    const root = this.root

    const input = root.querySelector('input')
    const label = root.querySelector('label')

    input.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
    label.textContent = value

    this.setState(state => Object.assign({}, state, { value }))
  }

  input (e) {
    this.setValue(e.target.value || this.props.value)
  }

  stylesheet () {
    return `
      tonic-range  {
        position: relative;
        display: -webkit-flex;
        display: flex;
        height: 50px;
        padding: 20px 0;
      }

      tonic-range label {
        font: 13px var(--subheader);
        letter-spacing: 1px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      tonic-range input[type="range"] {
        margin: auto;
        outline: none;
        padding: 0;
        width: 50%;
        height: 4px;
        background-color: var(--background);
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--accent)), color-stop(100%, var(--accent)));
        background-image: -webkit-linear-gradient(var(--accent), var(--accent));
        background-image: -moz-linear-gradient(var(--accent), var(--accent));
        background-image: -o-linear-gradient(var(--accent), var(--accent));
        background-image: linear-gradient(var(--accent), var(--accent));
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 0;
        cursor: pointer;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]:disabled {
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--border)), color-stop(100%, var(--border)));
        background-image: -webkit-linear-gradient(var(--border), var(--border));
        background-image: -moz-linear-gradient(var(--border), var(--border));
        background-image: -o-linear-gradient(var(--border), var(--border));
        background-image: linear-gradient(var(--border), var(--border));
      }

      tonic-range input[type="range"]::-webkit-slider-runnable-track {
        box-shadow: none;
        border: none;
        background: transparent;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-track {
        box-shadow: none;
        border: none;
        background: transparent;
      }

      tonic-range input[type="range"]::-moz-focus-outer {
        border: 0;
      }

      tonic-range input[type="range"]::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 3px 0px rgba(0,0,0,0.25);
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.value}</label>`
  }

  styles () {
    const {
      width
    } = this.props

    return {
      width: {
        width
      }
    }
  }

  render () {
    const {
      width,
      height,
      disabled,
      theme,
      min,
      max,
      step,
      id
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const maxAttr = max ? `max="${max}"` : ''
    const stepAttr = step ? `step="${step}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const value = this.props.value || this.state.value
    const valueAttr = value && value !== 'undefined' ? `value="${value}"` : ''

    this.setState(state => Object.assign({}, state, { value }))

    const attributes = [
      valueAttr,
      minAttr,
      maxAttr,
      stepAttr,
      disabledAttr
    ].join(' ')

    return `
      ${this.renderLabel()}
      <div class="tonic--wrapper" styles="width">
        <input type="range" styles="width" id="${id}" ${attributes}/>
      </div>
    `
  }
}

Tonic.add(TonicRange)
