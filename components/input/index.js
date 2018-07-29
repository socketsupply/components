const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class TonicInput extends Tonic {
  constructor () {
    super()

    this.stylesheet = `
      .wrapper {
        display: inline-block;
      }
    `

    this.props = {
      height: 32,
      width: 280,
      disabled: false,
      isInvalid: false,
      spellCheck: true
    }
  }

  render () {
    const {
      type,
      width,
      height,
      required,
      disabled,
      placeHolder,
      spellCheck,
      radius,
      isInvalid,
      padding,
      icon
    } = this.props

    let style = []
    if (padding) style.push(`padding: ${padding}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        <input
          type="${type}"
          width="${width}"
          height="${height}"
          required="${required}"
          disabled="${disabled}"
          placeholder="${placeHolder}"
          spellcheck="${spellCheck}"
          aria-invalid="${isInvalid}"
          style="${style}"
        />
        <tonic-icon id="${icon}"></tonic-icon>
      </div>
    `
  }
}

Tonic.add(TonicInput, { shadow: true })
