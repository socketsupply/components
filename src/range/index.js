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
      disabled: false
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
      tonic-range input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 6px 0;
        border: 10px solid transparent;
      }

      tonic-range input[type=range]::-webkit-slider-thumb {
        height: 18px;
        width: 18px;
        border-radius: 50px;
      }

      tonic-range input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        box-shadow: 1px 1px 1px rgba(255,255,255,0);
        background: var(--border);
        border: 0px;
        border-radius: 5px;
      }

      tonic-range input[type=range]::-webkit-slider-thumb {
        background: var(--primary);
        border: 0px;
        box-shadow: 0 0 0 0 rgba(0,0,0,0);
        height: 18px;
        width: 18px;
        border-radius: 37px;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
      }

      tonic-range input[type=range]:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 0 rgba(0,0,0,0);
      }

      tonic-range input[type=range]:focus {
        outline: none;
      }

      tonic-range ::-ms-fill-lower {
        background: var(--accent);
      }
    `
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
      step
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

    const attributes = `
    ${valueAttr}
    ${minAttr}
    ${maxAttr}
    ${stepAttr}
    ${disabledAttr}
    `

    return `
      <div class="tonic--wrapper" styles="width">
        <input styles="width" type="range" ${attributes}/>
      </div>
    `
  }
}

Tonic.add(TonicRange)
