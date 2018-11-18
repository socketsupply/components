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
    return ``
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
      <div class="tonic--wrapper" styles="wrapper">
        <input styles="input" type="range" ${attributes}/>
      </div>
    `
  }
}

Tonic.add(TonicRange)
