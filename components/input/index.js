const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputText extends Tonic {
  constructor () {
    super()

    this.stylesheet = `
      .wrapper {
        display: inline-block;
        margin-bottom: 15px;
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
      input {
        padding: 10px;
        font: 14px 'Space-Mono', monospace;
        border: 1px solid var(--border);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        border-radius: 3px;
        transition: border 0.2s ease;
      }
      input:focus {
        border: 1px solid var(--primary);
      }
    `

    this.defaults = {
      height: 32,
      width: 300,
      type: 'text',
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
      padding,
      icon
    } = { ...this.defaults, ...this.props }

    console.log(this.props)

    let style = []
    if (padding) style.push(`padding: ${padding}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
        <input
          type="${type}"
          width="${width}"
          height="${height}"
          ${required ? 'required' : ''}
          ${disabled ? 'disabled' : ''}
          placeholder="${placeholder}"
          spellcheck="${spellcheck}"
          aria-invalid="${ariaInvalid}"
          style="${style}"
        />
        <tonic-icon id="${icon}"></tonic-icon>
      </div>
    `
  }
}

Tonic.add(InputText, { shadow: true })
