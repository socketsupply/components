(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      svg {
        width: 100%;
        height: 100%;
      }
      `

    this.defaults = {
      size: '30px',
      color: '#000'
    }
  }

  render () {
    const {
      color,
      size
    } = { ...this.defaults, ...this.props }

    return `
      <div class="wrapper" style="width: ${size}; height: ${size};">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
          <path fill="${color}" d="M59.5,10H17.2v80.3h65.2V32L59.5,10z M60.2,19l13.2,12.7H60.2V19z M23.2,84.3V16h31v21.7h22.1v46.6H23.2z"/>
        </svg>
      </div>
    `
  }
}

Tonic.add(IconContainer)

},{"tonic":9}],2:[function(require,module,exports){
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
    if (fill) style.push(`background-color: ${fill}`)
    if (fill) style.push(`border-color: ${fill}`)
    if (textColor) style.push(`color: ${textColor}`)
    if (radius) style.push(`border-radius: ${radius}`)
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

},{"tonic":9}],3:[function(require,module,exports){
const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputCheckbox extends Tonic {
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
      size: '18px'
    }
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const fn = InputCheckbox._svg[state ? 'on' : 'off']
    this.label.innerHTML = fn(this.props.color)
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
      size
    } = { ...this.defaults, ...this.props }

    const state = checked ? 'on' : 'off'
    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    return `
      <div class="wrapper">
        <input
          type="checkbox"
          ${idAttr}
          ${nameAttr}
          ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}/>
        <label
          for="${id}"
          style="width: ${size}; height: ${size};">
          ${InputCheckbox._svg[state](color)}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

InputCheckbox.addIcon = (state, fn) => {
  InputCheckbox._svg[state] = fn
}

InputCheckbox._svg = {}
InputCheckbox._svg.on = color => `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
    <path fill="${color}" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
    <polygon fill="${color}" points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
  </svg>
`

InputCheckbox._svg.off = color => `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
    <path fill="${color}" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
  </svg>
`

Tonic.add(InputCheckbox, { shadow: true })

},{"tonic":9}],4:[function(require,module,exports){
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
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      disabled: false,
      width: '250px'
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
      radius
    } = { ...this.defaults, ...this.props }

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const valueAttr = value ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)
    style = style.join('; ')

    return `
      <div class="wrapper">
        ${this.renderLabel()}
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

},{"tonic":9}],5:[function(require,module,exports){
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

},{"tonic":9}],6:[function(require,module,exports){
const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputToggle extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      .wrapper {
        height: 30px;
        width: 47px;
        position: relative;
      }
      .switch {
        display: inline-table;
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
        transition: background 0.4s;
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
        transition: background 0.4s;
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
        background-color: var(--background);
        border-radius: 52px;
        transition: margin 0.4s, background 0.4s;
        display: block;
        z-index: 2;
      }
      .switch input.toggle:disabled {
        cursor: default;
      }
      .switch input.toggle:disabled + label {
        color: var(--disabled);
        cursor: default;
        background-color: var(--disabled);
      }
      .switch input.toggle:disabled + label:before,
      .switch input.toggle:disabled + label:after {
        color: var(--disabled);
      }
      .switch input.toggle:disabled + label:after {
        background-color: var(--disabled);
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
      disabled: false,
      checked: false
    }
  }

  change (e) {
    this.props.checked = !this.props.checked
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  render () {
    const {
      id,
      name,
      disabled,
      checked
    } = { ...this.defaults, ...this.props }

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

},{"tonic":9}],7:[function(require,module,exports){
const scrollToY = require('scrolltoy')
const main = document.querySelector('main')

const links = [].slice.call(document.querySelectorAll('nav ul li a'))
const ranges = []
let current

links.map(function (link) {
  const id = link.getAttribute('href').slice(1)
  const section = document.getElementById(id)

  ranges.push({
    upper: section.offsetTop,
    lower: section.offsetTop + section.offsetHeight,
    id: id,
    link: link
  })

  link.addEventListener('click', function (event) {
    event.preventDefault()

    const prev = document.querySelector('a.selected')
    if (prev) prev.className = ''
    link.className = 'selected'
    scrollToY(main, section.offsetTop, 1500)
    window.location.hash = id
  })
})

function onscroll (event) {
  if (scrollToY.scrolling) return
  var pos = main.scrollTop

  pos = pos + 100

  ranges.map(function (range) {
    if (pos >= range.upper && pos <= range.lower) {
      if (range.id === current) return

      current = range.id
      var prev = document.querySelector('a.selected')
      if (prev) prev.className = ''
      range.link.className = 'selected'
    }
  })
}

main.addEventListener('scroll', onscroll)

},{"scrolltoy":8}],8:[function(require,module,exports){
var requestFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function requestAnimationFallback (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

function ease (pos) {
  return ((pos /= 0.5) < 1)
    ? (0.5 * Math.pow(pos, 5))
    : (0.5 * (Math.pow((pos - 2), 5) + 2))
}

module.exports = function scrollToY (el, Y, speed) {
  var isWindow = !!el.alert
  var scrollY = isWindow ? el.scrollY : el.scrollTop
  var pos = Math.abs(scrollY - Y)
  var time = Math.max(0.1, Math.min(pos / speed, 0.8))

  let currentTime = 0

  function setY () {
    module.exports.scrolling = true
    currentTime += 1 / 60

    var p = currentTime / time
    var t = ease(p)

    if (p < 1) {
      var y = scrollY + ((Y - scrollY) * t)
      requestFrame(setY)

      if (isWindow) {
        el.scrollTo(0, y)
      } else {
        el.scrollTop = y
      }

      return
    }

    if (isWindow) {
      el.scrollTo(0, Y)
    } else {
      el.scrollTop = Y
    }

    module.exports.scrolling = false
  }
  setY()
}

},{}],9:[function(require,module,exports){
class Tonic extends window.HTMLElement {
  constructor () {
    super()
    this.props = {}
    this.state = {}
    this.on = this.addEventListener
    if (this.shadow) this.attachShadow({ mode: 'open' })
    this._bindEventListeners()
  }

  static match (el, s) {
    while (!el.matches) {
      el = el.parentNode
      if (el.tagName === 'HTML') return null
    }
    return el.matches(s) ? el : el.closest(s)
  }

  static add (c, opts = {}) {
    const name = c.name.match(/[A-Z][a-z]*/g).join('-').toLowerCase()
    if (window.customElements.get(name)) return

    const methods = Object.getOwnPropertyNames(c.prototype)
    c.prototype.events = []

    for (const key in this.prototype) {
      const k = key.slice(2)
      if (methods.includes(k)) {
        c.prototype.events.push(k)
      }
    }

    if (opts.shadow) c.prototype.shadow = true
    window.customElements.define(name, c)
  }

  static sanitize (o) {
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'object') o[k] = Tonic.sanitize(v)
      if (typeof v === 'string') o[k] = Tonic.escape(v)
    }
    return o
  }

  static escape (s) {
    return s.replace(Tonic.escapeRe, ch => Tonic.escapeMap[ch])
  }

  html ([s, ...strings], ...values) {
    const reducer = (a, b) => a.concat(b, strings.shift())
    const filter = s => s && (s !== true || s === 0)
    return Tonic.sanitize(values).reduce(reducer, [s]).filter(filter).join('')
  }

  disconnectedCallback (...args) {
    this.disconnected && this.disconnected(...args)
  }

  attributesChangedCallback (...args) {
    this.attributeChanged && this.attributeChanged(...args)
  }

  adoptedCallback (...args) {
    this.adopted && this.adopted(...args)
  }

  setProps (o) {
    const oldProps = JSON.parse(JSON.stringify(this.props))
    this.props = Tonic.sanitize(typeof o === 'function' ? o(this.props) : o)
    if (!this.root) throw new Error('Component not yet connected')
    this.root.appendChild(this._setContent(this.render()))
    this.updated && this.updated(oldProps)
  }

  _bindEventListeners () {
    this.events.forEach(event => {
      (this.shadowRoot || this).addEventListener(event, e => this[event](e))
    })
  }

  _setContent (content) {
    while (this.root.firstChild) this.root.firstChild.remove()
    let node = null

    if (typeof content === 'string') {
      const tmp = document.createElement('tmp')
      tmp.innerHTML = content
      node = tmp.firstElementChild
    } else {
      node = content.cloneNode(true)
    }

    if (this.styleNode) node.appendChild(this.styleNode)
    return node
  }

  connectedCallback () {
    for (let { name, value } of this.attributes) {
      name = name.replace(/-(.)/gui, (_, m) => m.toUpperCase())
      this.props[name] = value
    }

    if (this.props.data) {
      try { this.props.data = JSON.parse(this.props.data) } catch (e) {}
    }

    this.root = (this.shadowRoot || this)
    this.props = Tonic.sanitize(this.props)
    this.willConnect && this.willConnect()
    this.root.appendChild(this._setContent(this.render()))
    this.connected && this.connected()

    if (this.stylesheet) {
      const style = document.createElement('style')
      style.textContent = this.stylesheet
      this.styleNode = this.root.appendChild(style)
    }
  }
}

Tonic.escapeRe = /["&'<>`]/g
Tonic.escapeMap = { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }

if (typeof module === 'object') module.exports = Tonic

},{}]},{},[7,1,2,3,4,5,6]);
