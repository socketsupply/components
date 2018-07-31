const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputTextarea extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
      radius: '2px',
      width: '100%',
      disabled: false,
      autofocus: false,
      readonly: false,
      required: false,
      spellcheck: true,
      placeholder: '',
      resize: ''
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      name,
      disabled,
      placeholder,
      spellcheck,
      autofocus,
      readonly,
      required,
      resize,
      rows,
      cols,
      minlength,
      maxlength,
      width,
      height,
      radius
    } = { ...this.defaults, ...this.props }

    const nameAttr = name ? `name="${name}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (resize) style.push(`resize: none`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
        <textarea
          ${nameAttr}
          ${autofocus ? 'autofocus' : ''}
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
          ${required ? 'required' : ''}
          placeholder="${placeholder}"
          spellcheck="${spellcheck}"
          rows="${rows}"
          cols="${cols}"
          minlength="${minlength}"
          maxlength="${maxlength}"
          style="${style}"></textarea>
      </div>
    `
  }
}

Tonic.add(InputTextarea, { shadow: true })
