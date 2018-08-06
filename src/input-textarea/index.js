class InputTextarea extends Tonic { /* global Tonic */
  defaults () {
    return {
      placeholder: '',
      spellcheck: true,
      disabled: false,
      required: false,
      readonly: false,
      autofocus: false,
      width: '100%',
      radius: '2px'
    }
  }

  style () {
    return `%style%`
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      placeholder,
      spellcheck,
      disabled,
      required,
      readonly,
      autofocus,
      rows,
      cols,
      minlength,
      maxlength,
      width,
      height,
      theme,
      radius,
      resize
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (resize) style.push(`resize: ${resize}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
        <textarea
          ${idAttr}
          ${nameAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          ${readonly ? 'readonly' : ''}
          ${autofocus ? 'autofocus' : ''}
          rows="${rows}"
          cols="${cols}"
          minlength="${minlength}"
          maxlength="${maxlength}"
          style="${style}"></textarea>
      </div>
    `
  }
}

Tonic.add(InputTextarea)
