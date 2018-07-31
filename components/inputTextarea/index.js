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
        transition: all 0.2s ease;
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
