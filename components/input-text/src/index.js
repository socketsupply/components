const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputText extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
      type: 'text',
      width: '250px',
      disabled: false,
      ariaInvalid: false,
      spellcheck: false,
      placeholder: '',
      value: ''
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      type,
      width,
      height,
      required,
      disabled,
      placeholder,
      spellcheck,
      radius,
      ariaInvalid,
      padding,
      value
    } = { ...this.defaults, ...this.props }

    let style = []
    if (padding) style.push(`padding: ${padding}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
        <input
          type="${type}"
          ${required ? 'required' : ''}
          ${disabled ? 'disabled' : ''}
          placeholder="${placeholder}"
          spellcheck="${spellcheck}"
          value="${value}"
          aria-invalid="${ariaInvalid}"
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText, { shadow: true })
