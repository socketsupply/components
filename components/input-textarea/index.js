const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputTextarea extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      textarea {
        width: 100%;
        font: 14px 'Space-Mono', monospace;
        padding: 10px;
        border: 1px solid var(--border);
        outline: none;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        -ms-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      textarea:focus {
        border: 1px solid var(--primary);
      }
      textarea:invalid {
        border-color: var(--red);
      }
      label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
      `

    this.defaults = {
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
      radius,
      resize
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''

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

Tonic.add(InputTextarea, { shadow: true })
