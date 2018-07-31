const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputButton extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      button {
        min-height: 38px;
        padding: 8px;
        font: 12px 'Poppins', sans-serif;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 1px solid var(--primary);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        transition: all 0.2s ease;
      }
      button[disabled] {
        background-color: var(--secondary);
        border-color: var(--secondary);
        color: var(--medium);
      }
      button:not([disabled]):hover {
        background-color: var(--primary);
        border-color: var(--primary);
        color: #fff;
      }
      `

    this.defaults = {
      value: 'Submit',
      radius: '2px',
      height: '38px',
      width: '150px',
      disabled: false,
      autofocus: false,
      type: 'submit'
    }
  }

  render () {
    const {
      type,
      value,
      name,
      disabled,
      autofocus,
      isLoading,
      isActive,
      width,
      height,
      padding,
      fill,
      textColor,
      radius
    } = { ...this.defaults, ...this.props }

    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (fill) style.push(`background-color: ${fill}`)
    if (fill) style.push(`border-color: ${fill}`)
    if (textColor) style.push(`color: ${textColor}`)
    if (padding) style.push(`padding: ${padding}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        <button
          ${typeAttr}
          ${valueAttr}
          ${nameAttr}
          ${autofocus ? 'autofocus' : ''}
          ${disabled ? 'disabled' : ''}
          ${isLoading ? 'loading' : ''}
          ${isActive ? 'active' : ''}
          style="${style}">${value}</button>
      </div>
    `
  }
}

Tonic.add(InputButton, { shadow: true })
