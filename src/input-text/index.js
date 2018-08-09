class InputText extends Tonic { /* global Tonic */
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      disabled: false,
      width: '250px',
      position: 'right'
    }
  }

  style () {
    return `%style%`
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  renderIcon () {
    if (!this.props.src) return ''

    return `
      <icon-container
        src="${this.props.src}"
        color="${this.props.color}">
      </icon-container>
    `
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
      theme,
      radius,
      position
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = (value && value !== 'undefined') ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)
    style = style.join('; ')

    return `
      <div class="wrapper ${position}" style="${style}">
        ${this.renderLabel()}
        ${this.renderIcon()}

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

Tonic.add(InputText)
