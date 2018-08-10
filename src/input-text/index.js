class InputText extends Tonic { /* global Tonic */
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
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
      invalid,
      disabled,
      required,
      pattern,
      width,
      height,
      padding,
      theme,
      radius,
      position
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const valueAttr = (value && value !== 'undefined') ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const invalidAttr = invalid ? `invalid="${invalid}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []

    if (width) {
      this.root.style.width = width
      style.push(`width: ${width}`)
    }

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
          ${patternAttr}
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${invalidAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText)
