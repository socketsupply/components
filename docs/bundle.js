(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class IconContainer extends Tonic {
  render () {
    return `<div></div>`
  }
}

Tonic.add(IconContainer)

},{"tonic":4}],2:[function(require,module,exports){
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
      input:invalid {
        border: 1px solid var(--red);
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

},{"tonic":4}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
class Tonic extends window.HTMLElement {
  constructor () {
    super()
    this.props = {}
    this.state = {}
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
    this.props = Tonic.sanitize(typeof o === 'function' ? o(this.props) : o)
    if (!this.root) throw new Error('Component not yet connected')
    this.root.appendChild(this._setContent(this.render()))
  }

  _bindEventListeners () {
    this.events.forEach(event => {
      this.addEventListener(event, e => this[event](e))
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

},{}]},{},[3,1,2]);
