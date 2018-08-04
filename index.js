class ContentTooltip extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      :host {
        position: relative;
        display: inline-block;
      }
      :host span {
        all: inherit;
      }
      :host span .tooltip {
        position: absolute;
        top: 30px;
        background: var(--window);
        box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3);
        border: 1px solid var(--border);
        border-radius: 2px;
        transition: opacity 0.3s ease-in-out, z-index 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        visibility: hidden;
        z-index: -1;
        opacity: 0;
      }
      :host span .tooltip.show {
        visibility: visible;
        opacity: 1;
        z-index: 1;
      }
      :host span .tooltip.arrow span {
        width: 12px;
        height: 12px;
        position: absolute;
        background-color: var(--window);
        border: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -8px;
        left: 50%;
      }
      :host span .tooltip.top span {
        margin-bottom: -6px;
        bottom: 100%;
        border-top-color: var(--border);
        border-left-color: var(--border);
      }
      :host span .tooltip.bottom span {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--border);
        border-right-color: var(--border);
      }
      :host span .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 47% 83%, 39% 75%, 0% 75%);
        clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 47% 83%, 39% 75%, 0% 75%);
      }
      `

    this.defaults = {
      width: '250px',
      height: '150px'
    }
  }

  mouseenter (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.getElementById('tooltip')
      let el = this.parentNode

      while (true) {
        if (!el || el.tagName === 'html') break
        if (window.getComputedStyle(el).overflow === 'scroll') break
        el = el.parentNode
      }

      let { top } = this.getBoundingClientRect()
      top += (el.scrollY || 0)
      let left = -(tooltip.offsetWidth / 2) + (this.offsetWidth / 2)

      if (left < 0) {
        left = 0
      }

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('bottom')
        tooltip.classList.add('top')
        tooltip.style.top = `30px`
        tooltip.style.left = `${left}px`
      } else {
        tooltip.classList.remove('top')
        tooltip.classList.add('bottom')
        const offsetTop = tooltip.offsetHeight + this.offsetHeight
        tooltip.style.top = `-${offsetTop}px`
        tooltip.style.left = `${left}px`
      }

      tooltip.classList.add('show')
    }, 128)
  }

  mouseleave (e) {
    clearTimeout(this.timer)
    const tooltip = this.root.getElementById('tooltip')
    tooltip.classList.remove('show')
  }

  willConnect () {
    const {
      width,
      theme,
      height
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')
    this.text = this.getAttribute('text')

    if (theme) this.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    const arrow = document.createElement('span')
    arrow.textContent = ' '

    const span = document.createElement('span')
    span.textContent = this.innerHTML
    span.id = 'text'

    while (this.firstChild) this.firstChild.remove()

    const tooltip = document.createElement('div')
    tooltip.id = 'tooltip'
    tooltip.className = 'tooltip arrow'
    tooltip.setAttribute('style', style.join(''))
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)

    tooltip.appendChild(arrow)
    tooltip.appendChild(clone)
    span.appendChild(tooltip)
    this.root.appendChild(span)
    this.structure = span
  }

  render () {
    return this.structure
  }
}

Tonic.add(ContentTooltip, { shadow: true })

class DialogBox extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      :host {
        position: relative;
        display: inline-block;
      }
      :host .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        z-index: 100;
        visibility: hidden;
        transition: visibility 0s ease 0.5s;
      }
      :host .wrapper.show {
        visibility: visible;
        transition: visibility 0s ease 0s;
      }
      :host .wrapper.show .overlay {
        opacity: 1;
      }
      :host .wrapper.show .dialog {
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }
      :host .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      :host .dialog {
        padding-top: 50px;
        margin: auto;
        position: relative;
        background-color: var(--window);
        box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3), 0 0 1px #a2a9b1;
        border-radius: 4px;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
        transition: all 0.3s ease-in-out;
        z-index: 1;
        opacity: 0;
      }
      :host .dialog header {
        height: 70px;
        font: 14px 'Poppins', sans-serif;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1.5px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 26px 65px 25px 65px;
      }
      :host .dialog main {
        width: auto;
        text-align: center;
        padding: 20px;
        margin: 0 auto;
      }
      :host .dialog .close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 25px;
        right: 25px;
      }
      :host .dialog .close svg {
        width: 100%;
        height: 100%;
      }
      :host .dialog .close svg use {
        fill: var(--primary);
        color: var(--primary);
      }
      :host .dialog footer {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 70px;
        padding: 15px;
      }
      :host .dialog footer input-button {
        display: inline-block;
        margin: 0 5px;
      }
      `

    this.defaults = {
      width: '450px',
      height: '275px',
      overlay: true,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e, target) {
    const el = Tonic.match(target, '.close')
    if (el) this.hide()

    const overlay = Tonic.match(target, '.overlay')
    if (overlay) this.hide()

    this.value = {}
  }

  willConnect () {
    const {
      width,
      height,
      overlay,
      theme,
      backgroundColor
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')
    if (theme) this.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    while (this.firstChild) this.firstChild.remove()

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.id = 'wrapper'
    wrapper.className = 'wrapper'

    // create overlay
    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'overlay'
      overlayElement.setAttribute('style', `background-color: ${backgroundColor}`)
      wrapper.appendChild(overlayElement)
    }

    // create dialog
    const dialog = document.createElement('div')
    dialog.className = 'dialog'
    dialog.setAttribute('style', style.join(''))

    // create template
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)
    const close = document.createElement('div')
    close.className = 'close'

    // create svg
    const file = './sprite.svg#close'
    const nsSvg = 'http://www.w3.org/2000/svg'
    const nsXlink = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(nsSvg, 'svg')
    const use = document.createElementNS(nsSvg, 'use')
    use.setAttributeNS(nsXlink, 'xlink:href', file)

    // append everything
    wrapper.appendChild(dialog)
    dialog.appendChild(clone)
    dialog.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)

    this.structure = wrapper
  }

  render () {
    return this.structure
  }
}

Tonic.add(DialogBox, { shadow: true })

class IconContainer extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.defaults = {
      size: '25px',
      color: 'var(--primary)',
      src: './sprite.svg#example'
    }
  }

  render () {
    let {
      color,
      size,
      theme,
      src
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    if (color === 'undefined' || color === 'color') {
      color = this.defaults.color
    }

    const style = `fill: ${color}; color: ${color};`

    return `
      <div class="wrapper" style="width: ${size}; height: ${size};">
        <svg>
          <use xlink:href="${src}" style="${style}">
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer, { shadow: true })

class InputButton extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      button {
        min-height: 38px;
        color: var(--primary);
        font: 12px 'Poppins', sans-serif;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        background-color: transparent;
        border: 1px solid var(--primary);
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        transition: all 0.2s ease-in-out;
      }
      button[disabled] {
        color: var(--medium);
        background-color: var(--background);
        border-color: var(--background);
      }
      button:not([disabled]):hover {
        color: var(--window);
        background-color: var(--primary);
        border-color: var(--primary);
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
      theme,
      fill,
      textColor
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

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

class InputCheckbox extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }
      label {
        color: var(--primary);
        font: 12px 'Poppins', sans-serif;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline-block;
        vertical-align: middle;
      }
      label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.props = {
      checked: false,
      changed: false
    }

    this.defaults = {
      disabled: false,
      checked: false,
      color: 'var(--primary)',
      size: '18px',
      on: './sprite.svg#checkbox_on',
      off: './sprite.svg#checkbox_off'
    }
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const props = { ...this.defaults, ...this.props }
    const file = props[state ? 'on' : 'off']
    const ns = 'http://www.w3.org/1999/xlink'
    this.root.querySelector('use').setAttributeNS(ns, 'xlink:href', file)
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      checked,
      color,
      on,
      theme,
      off,
      size
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    const state = checked ? on : off
    const nameAttr = name ? `name="${name}"` : ''
    const style = `fill: ${color}; color: ${color};`

    return `
      <div class="wrapper">
        <input
          type="checkbox"
          id="${id}"
          ${nameAttr}
          ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}/>
        <label
          for="${id}"
          style="width: ${size}; height: ${size};">
          <svg>
            <use xlink:href="${state}" style="${style}">
          </svg>
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputCheckbox, { shadow: true })

class InputText extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        position: relative;
      }
      .wrapper.right icon-container {
        right: 10px;
      }
      .wrapper.left icon-container {
        left: 10px;
      }
      icon-container {
        position: absolute;
        bottom: 7px;
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
        width: 100%;
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        border-radius: 3px;
        transition: border 0.2s ease-in-out;
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
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      disabled: false,
      width: '250px',
      position: 'right'
    }
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
      disabled,
      required,
      width,
      height,
      padding,
      theme,
      radius,
      position
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''

    if (theme) this.classList.add(`theme-${theme}`)

    let style = []
    if (width) style.push(`width: ${width}`)
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
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText, { shadow: true })

class InputTextarea extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      textarea {
        width: 100%;
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        outline: none;
        transition: all 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      textarea:focus {
        border: 1px solid var(--primary);
      }
      textarea:invalid {
        border-color: var(--caution);
      }
      label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
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
      theme,
      radius,
      resize
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''

    if (theme) this.classList.add(`theme-${theme}`)

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

class InputToggle extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        height: 30px;
        width: 47px;
        position: relative;
      }
      .wrapper > label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 9px;
        display: block;
      }
      .switch {
        position: absolute;
        left: 0;
        top: 0;
      }
      .switch label:before {
        font: bold 12px 'Poppins', sans-serif;
        text-transform: uppercase;
      }
      .switch input.toggle {
        position: absolute;
        outline: none;
        user-select: none;
        z-index: 1;
        display: none;
      }
      .switch input.toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--border);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }
      .switch input.toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        bottom: 1px;
        right: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--border);
      }
      .switch input.toggle + label:after {
        content: ' ';
        width: 20px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--window);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }
      .switch input.toggle:disabled {
        cursor: default;
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label {
        cursor: default;
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label:before {
        background-color: var(--background);
      }
      .switch input.toggle:disabled + label:after {
        background-color: var(--window);
      }
      .switch input.toggle:checked + label {
        background-color: var(--accent);
      }
      .switch input.toggle:checked + label:before {
        content: ' ';
        background-color: var(--accent);
        color: var(--background);
      }
      .switch input.toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--background);
      }
      `

    this.defaults = {
      checked: false
    }
  }

  change (e) {
    this.props.checked = !this.props.checked
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="${this.props.id}">${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      theme,
      checked
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    const nameAttr = name ? `name="${name}"` : ''

    return `
      <div class="wrapper">
        <div class="switch">
          <input
            type="checkbox"
            class="toggle"
            id="${id}"
            ${nameAttr}
            ${disabled ? 'disabled' : ''}
            ${checked ? 'checked' : ''}>
          <label for="${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(InputToggle, { shadow: true })

class NotificationBadge extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      .notifications {
        background-color: var(--secondary);
        width: 40px;
        height: 40px;
        padding: 10px;
        border-radius: 8px;
      }
      .notifications span {
        color: var(--window);
        font: 15px var(--subheader);
        letter-spacing: 1px;
        text-align: center;
        position: relative;
      }
      .notifications span:after {
        content: '';
        width: 8px;
        height: 8px;
        display: block;
        position: absolute;
        top: -3px;
        right: -6px;
        border-radius: 50%;
        background-color: var(--notification);
        border: 2px solid var(--secondary);
      }
      `

    this.defaults = {
    }
  }

  render () {
    let {
      count,
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    count = '23'

    return `
      <div class="notifications">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge, { shadow: true })

class NotificationToaster extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      `

    this.defaults = {
    }
  }

  render () {
    const {
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)
    return `<div></div>`
  }
}

Tonic.add(NotificationToaster)

class ProfileImage extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        position: relative;
        overflow: hidden;
      }
      .wrapper .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .wrapper .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        transition: opacity 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
        display: flex;
      }
      .wrapper .overlay svg {
        margin: auto;
      }
      .wrapper.editable:hover .overlay {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
      }
      `

    this.defaults = {
      size: '50px',
      src: './default.jpg',
      radius: '5px'
    }
  }

  render () {
    let {
      id,
      name,
      size,
      src,
      radius,
      border,
      theme,
      editable
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (theme) this.classList.add(`theme-${theme}`)

    let style = []
    if (size) {
      style.push(`width: ${size}`)
      style.push(`height: ${size}`)
    }
    if (border) style.push(`border: ${border}`)
    if (radius) style.push(`border-radius: ${radius}`)
    style = style.join('; ')

    return `
      <div class="wrapper ${editable ? 'editable' : ''}" style="${style}">
        <div
          class="image"
          ${idAttr}
          ${nameAttr}
          style="background-image: url('${src}')">
        </div>
        <div class="overlay">
          <svg style="width: 40px; height: 40px;">
            <use xlink:href="./sprite.svg#edit" style="fill: #fff; color: #fff;">
          </svg>
        </div>
      </div>
    `
  }
}

Tonic.add(ProfileImage, { shadow: true })

class SidePanel extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      .wrapper .panel {
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--window);
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        z-index: 100;
        transition: transform 0.3s ease-in-out;
      }
      .wrapper.left .panel {
        left: 0;
        -webkit-transform: translateX(-500px);
        -ms-transform: translateX(-500px);
        transform: translateX(-500px);
        border-right: 1px solid var(--border);
      }
      .wrapper.right .panel {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--border);
      }
      .wrapper.show.right .panel,
      .wrapper.show.left .panel {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
      }
      .wrapper.show.right[overlay="true"] .overlay,
      .wrapper.show.left[overlay="true"] .overlay {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 0s;
      }
      .wrapper .overlay {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 1s;
      }
      .wrapper .close {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: 30px;
      }
      .wrapper .close svg {
        width: 100%;
        height: 100%;
      }
      .wrapper header {
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 90px;
        border-bottom: 1px solid var(--border);
      }
      .wrapper main {
        padding: 20px;
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        bottom: 70px;
        overflow: scroll;
      }
      .wrapper footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 70px;
        padding: 20px;
        text-align: right;
        border-top: 1px solid var(--border);
      }
      `

    this.defaults = {
      position: 'right',
      overlay: false,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e, target) {
    const el = Tonic.match(target, '.close')
    if (el) this.hide()

    const overlay = Tonic.match(target, '.overlay')
    if (overlay) this.hide()

    this.value = {}
  }

  willConnect () {
    const {
      name,
      position,
      overlay,
      theme,
      backgroundColor
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')

    if (theme) this.classList.add(`theme-${theme}`)

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.id = 'wrapper'
    wrapper.classList.add('wrapper')
    wrapper.classList.add(position)
    if (overlay) {
      wrapper.setAttribute('overlay', true)
    }
    if (name) {
      wrapper.setAttribute('name', name)
    }

    // create panel
    const panel = document.createElement('div')
    panel.className = 'panel'

    // create overlay
    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'overlay'
      overlayElement.setAttribute('style', `background-color: ${backgroundColor}`)
      wrapper.appendChild(overlayElement)
    }

    // create template
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)
    const close = document.createElement('div')
    close.className = 'close'

    // create svg
    const file = './sprite.svg#close'
    const nsSvg = 'http://www.w3.org/2000/svg'
    const nsXlink = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(nsSvg, 'svg')
    const use = document.createElementNS(nsSvg, 'use')
    use.setAttributeNS(nsXlink, 'xlink:href', file)

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(clone)
    panel.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)

    this.structure = wrapper
  }

  render () {
    return this.structure
  }
}

Tonic.add(SidePanel, { shadow: true })

class TabMenu extends Tonic { /* global Tonic */
  constructor () {
    super()
    this.stylesheet = `
      `

    this.defaults = {
    }
  }

  render () {
    let {
      theme
    } = { ...this.defaults, ...this.props }

    if (theme) this.classList.add(`theme-${theme}`)

    return `
      <div class="tab-menu">
        <div class="tab"></div>
      </div>
    `
  }
}

Tonic.add(TabMenu, { shadow: true })
