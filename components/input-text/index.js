const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputText extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
      input {
        width: 100%;
        font: 14px 'Space-Mono', monospace;
        padding: 10px;
        border: 1px solid var(--border);
        border-radius: 3px;
        transition: border 0.2s ease;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }
      input:focus {
        border-color: var(--primary);
      }
      `

    this.defaults = {
      type: 'text',
      width: '250px',
      disabled: false,
      ariaInvalid: false,
      spellcheck: false,
      placeholder: ''
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
      padding
    } = { ...this.defaults, ...this.props }

    console.log(this.props)

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
          aria-invalid="${ariaInvalid}"
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText, { shadow: true })
