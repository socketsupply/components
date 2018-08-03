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
        transition: all 0.2s ease-in-out;
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
      type: 'submit',
      disabled: false,
      autofocus: false,
      height: '38px',
      width: '150px',
      radius: '2px'
    }
  }

  render () {
    const {
      id,
      name,
      value,
      type,
      disabled,
      autofocus,
      isLoading,
      isActive,
      width,
      height,
      radius,
      fill,
      textColor
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (fill) {
      style.push(`background-color: ${fill}`)
      style.push(`border-color: ${fill}`)
    }
    if (textColor) style.push(`color: ${textColor}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        <button
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          ${isLoading ? 'class="loading"' : ''}
          ${isActive ? 'class="active"' : ''}
          style="${style}">${value}</button>
      </div>
    `
  }
}

Tonic.add(InputButton, { shadow: true })
