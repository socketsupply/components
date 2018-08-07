class InputSelect extends Tonic { /* global Tonic */
  defaults () {
    return {
      disabled: false,
      width: '250px'
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
      value,
      disabled,
      required,
      width,
      height,
      padding,
      theme,
      radius
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''

    if (id) this.root.removeAttribute('id')
    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)
    style.push(`background-image: url('${InputSelect.svg.default()}')`)
    style = style.join('; ')

    const options = this.root.innerHTML

    return `
      <div class="wrapper">
        ${this.renderLabel()}

        <select
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}">
            ${options}
        </select>
      </div>
    `
  }
}

InputSelect.svg = {}
InputSelect.svg.default = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/></svg>`
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

Tonic.add(InputSelect)
