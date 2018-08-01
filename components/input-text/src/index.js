const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputText extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      disabled: false,
      width: '250px'
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      type,
      value,
      placeholder,
      spellcheck,
      ariaInvalid,
      disabled,
      required,
      width,
      height,
      padding,
      radius
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
        <input
          ${idAttr}
          ${nameAttr}
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText, { shadow: true })
