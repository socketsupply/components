(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (setImmediate){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicAccordion extends Tonic {
  defaults () {
    return {
      multiple: false
    }
  }

  static stylesheet () {
    return `
      tonic-accordion {
        display: block;
        border: 1px solid var(--tonic-border, black);
      }
    `
  }

  qs (s) {
    return this.querySelector(s)
  }

  qsa (s) {
    return [...this.querySelectorAll(s)]
  }

  setVisibility (id) {
    const trigger = document.getElementById(id)
    if (!trigger) return

    const allowMultiple = this.hasAttribute('data-allow-multiple')
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

    if (!isExpanded && !allowMultiple) {
      const triggers = this.qsa('.tonic--accordion-header button')
      const panels = this.qsa('.tonic--accordion-panel')

      triggers.forEach(el => el.setAttribute('aria-expanded', 'false'))
      panels.forEach(el => el.setAttribute('hidden', ''))
    }

    const panelId = trigger.getAttribute('aria-controls')

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false')
      const currentPanel = document.getElementById(panelId)
      if (currentPanel) currentPanel.setAttribute('hidden', '')
      return
    }

    trigger.setAttribute('aria-expanded', 'true')
    const currentPanel = document.getElementById(panelId)
    this.state.selected = id
    if (currentPanel) currentPanel.removeAttribute('hidden')
  }

  click (e) {
    const trigger = Tonic.match(e.target, 'button')
    if (!trigger) return

    this.setVisibility(trigger.id)
  }

  keydown (e) {
    const trigger = Tonic.match(e.target, 'button.tonic--title')
    if (!trigger) return

    const CTRL = e.ctrlKey
    const PAGEUP = e.code === 'PageUp'
    const PAGEDOWN = e.code === 'PageDown'
    const UPARROW = e.code === 'ArrowUp'
    const DOWNARROW = e.code === 'ArrowDown'
    const END = e.metaKey && e.code === 'ArrowDown'
    const HOME = e.metaKey && e.code === 'ArrowUp'

    const ctrlModifier = CTRL && (PAGEUP || PAGEDOWN)
    const triggers = this.qsa('button.tonic--title')

    if ((UPARROW || DOWNARROW) || ctrlModifier) {
      const index = triggers.indexOf(e.target)
      const direction = (PAGEDOWN || DOWNARROW) ? 1 : -1
      const length = triggers.length
      const newIndex = (index + length + direction) % length

      triggers[newIndex].focus()
      e.preventDefault()
    }

    if (HOME || END) {
      switch (e.key) {
        case HOME:
          triggers[0].focus()
          break
        case END:
          triggers[triggers.length - 1].focus()
          break
      }
      e.preventDefault()
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    if (!id) return

    setImmediate(() => this.setVisibility(id))
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-accordion')
    }

    const {
      multiple
    } = this.props

    if (multiple) this.setAttribute('data-allow-multiple', '')

    return this.html`
      ${this.nodes}
    `
  }
}

class TonicAccordionSection extends Tonic {
  static stylesheet () {
    return `
      tonic-accordion-section {
        display: block;
      }

      tonic-accordion-section:not(:last-of-type) {
        border-bottom: 1px solid var(--tonic-border, black);
      }

      tonic-accordion-section h4 {
        margin: 0;
      }

      tonic-accordion-section .tonic--accordion-header {
        display: flex;
      }

      tonic-accordion-section button {
        font-size: 14px;
        text-align: left;
        padding: 20px;
        position: relative;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        width: 100%;
      }

      tonic-accordion-section button:focus {
        outline: none;
      }

      tonic-accordion-section button:focus .tonic--label {
        border-bottom: 3px solid Highlight;
      }

      tonic-accordion-section [hidden] {
        display: none;
      }

      tonic-accordion-section .tonic--accordion-panel {
        padding: 10px 50px 20px 20px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow:before {
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(135deg);
        -moz-transform: translateY(-50%) translateX(-50%) rotate(135deg);
        transform: translateY(-50%) translateX(-50%) rotate(135deg);
        border-top: 1px solid var(--tonic-primary, #333);
        border-right: 1px solid var(--tonic-primary, #333);
      }

      tonic-accordion-section .tonic--accordion-header[aria-expanded="true"] .tonic--arrow:before {
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(315deg);
        -moz-transform: translateY(-50%) translateX(-50%) rotate(315deg);
        transform: translateY(-50%) translateX(-50%) rotate(315deg);
        margin-top: 3px;
      }
    `
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-accordion-section')
    }

    const {
      id,
      name,
      label
    } = this.props

    return this.html`
      <h4
        class="tonic--accordion-header"
        role="heading">
        <button
          class="tonic--title"
          id="tonic--accordion-header-${id}"
          name="${name}"
          aria-expanded="false"
          aria-controls="tonic--accordion-panel-${id}">
          <span class="tonic--label">${label}</span>
          <span class="tonic--arrow"></span>
        </button>
      </h4>
      <div
        class="tonic--accordion-panel"
        id="tonic--accordion-panel-${id}"
        aria-labelledby="tonic--accordion-header-${id}"
        role="region"
        hidden>
        ${this.nodes}
      </div>
    `
  }
}

module.exports = {
  TonicAccordion,
  TonicAccordionSection
}

}).call(this,require("timers").setImmediate)
},{"../mode":19,"@optoolco/tonic":20,"timers":26}],2:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicBadge extends Tonic {
  defaults () {
    return {
      count: 0
    }
  }

  get value () {
    return this.state.count
  }

  set value (value) {
    this.state.count = value
    this.reRender()
  }

  static stylesheet () {
    return `
      tonic-badge * {
        box-sizing: border-box;
      }

      tonic-badge .tonic--notifications {
        width: 40px;
        height: 40px;
        text-align: center;
        padding: 10px;
        position: relative;
        background-color: var(--tonic-background, #fff);
        border-radius: 8px;
      }

      tonic-badge span:after {
        content: '';
        width: 8px;
        height: 8px;
        display: none;
        position: absolute;
        top: 7px;
        right: 6px;
        background-color: var(--tonic-notification, #f66);
        border: 2px solid var(--tonic-background, #fff);
        border-radius: 50%;
      }

      tonic-badge .tonic--notifications.tonic--new span:after {
        display: block;
      }

      tonic-badge span {
        color: var(--tonic-primary, #333);
        font: 15px var(--tonic-subheader, 'Arial', sans-serif);
        letter-spacing: 1px;
        text-align: center;
      }
    `
  }

  willConnect () {
    this.state.count = this.props.count
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-badge')
    }

    const {
      theme
    } = this.props

    let count = this.state.count

    if (typeof count === 'undefined') {
      count = this.props.count
    }

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const countText = (count > 99) ? '99' : String(count)
    const classes = ['tonic--notifications']
    if (count > 0) classes.push('tonic--new')

    return this.html`
      <div ... ${{ class: classes.join(' ') }}>
        <span>${countText}</span>
      </div>
    `
  }
}

module.exports = {
  TonicBadge
}

},{"../mode":19,"@optoolco/tonic":20}],3:[function(require,module,exports){
const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const tonicBadge = document.querySelector('tonic-badge')

add.addEventListener('click', (e) => {
  tonicBadge.setState(state => ({
    ...state,
    count: ++state.count
  }))

  tonicBadge.reRender()
})

subtract.addEventListener('click', e => {
  tonicBadge.setState(state => {
    let count = state.count

    return {
      ...state,
      count: count > 0 ? --count : count
    }
  })

  tonicBadge.reRender()
})

},{}],4:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicButton extends Tonic {
  get value () {
    return this.props.value
  }

  get form () {
    return this.querySelector('button').form
  }

  get disabled () {
    return this.props.disabled === true
  }

  set disabled (state) {
    this.props.disabled = state
  }

  defaults () {
    return {
      height: '40px',
      width: '150px',
      margin: '5px',
      autofocus: 'false',
      async: false,
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--tonic-disabled)',
      backgroundColor: 'transparent'
    }
  }

  static stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--tonic-button, #333);
        width: auto;
        min-height: 40px;
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--tonic-button, #333);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--tonic-medium, #999);
        background-color: var(--tonic-background, #fff);
        border-color: var(--tonic-background, #fff);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--tonic-window, #fff) !important;
        background-color: var(--tonic-button, #333) !important;
        border-color: var(--tonic-button, #333) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--tonic-medium, #999);
        border-color: var(--tonic-medium, #999);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--tonic-medium, #999) !important;
        border-color: var(--tonic-medium, #999) !important;
      }

      tonic-button button.tonic--loading:before {
        margin-top: -8px;
        margin-left: -8px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
        border: 2px solid white;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-button button:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }

  loading (state) {
    const button = this.querySelector('button')
    const method = state ? 'add' : 'remove'
    if (button) button.classList[method]('tonic--loading')
  }

  click (e) {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async === 'true'
    const href = this.props.href

    if (async && !disabled) {
      this.loading(true)
    }

    if (href) {
      const target = this.getAttribute('target')

      if (target && target !== '_self') {
        window.open(href)
      } else {
        window.open(href, '_self')
      }
    }
  }

  styles () {
    const {
      width,
      height,
      margin,
      radius,
      fill,
      disabled,
      borderColor,
      borderWidth,
      textColor,
      textColorDisabled
    } = this.props

    return {
      button: {
        width,
        height,
        color: disabled && disabled === 'true' ? textColorDisabled : textColor,
        backgroundColor: fill,
        borderRadius: radius,
        borderColor: fill || borderColor,
        borderWidth: borderWidth
      },
      wrapper: {
        width,
        height,
        margin
      }
    }
  }

  render () {
    const {
      value,
      type,
      disabled,
      autofocus,
      active,
      async,
      tabindex
    } = this.props

    let classes = []

    if (active) classes.push('tonic--active')
    classes = classes.join(' ')

    if (tabindex) this.removeAttribute('tabindex')

    let label = ''

    if (this.querySelector('style')) {
      label = this.querySelector('button').textContent
    } else {
      label = this.textContent || type || 'Button'
    }

    return this.html`
      <div class="tonic--button--wrapper" styles="wrapper">
        <button ... ${{
          styles: 'button',
          async: String(async),
          disabled: disabled && disabled !== 'false',
          autofocus,
          alt: label,
          value,
          type,
          tabindex,
          class: classes
        }}>${label}</button>
      </div>
    `
  }
}

module.exports = { TonicButton }

},{"@optoolco/tonic":20}],5:[function(require,module,exports){
const button = document.getElementById('tonic-button-example')
button.addEventListener('click', e => {
  setTimeout(() => {
    button.loading(false)
  }, 3e3)
})

},{}],6:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicChart extends Tonic {
  constructor (o) {
    super(o)

    try {
      const dynamicRequire = require
      this.Chart = dynamicRequire('chart.js')
    } catch (err) {
      console.error('could not find "chart.js" dependency. npm install?')
    }
  }

  static stylesheet () {
    return `
      tonic-chart {
        display: inline-block;
        position: relative;
      }

      tonic-chart canvas {
        display: inline-block;
        position: relative;
      }
    `
  }

  draw (data = {}, options = {}) {
    const root = this.querySelector('canvas')
    const type = this.props.type || options.type

    return new this.Chart(root, {
      type,
      options,
      data
    })
  }

  async fetch (url, opts = {}) {
    if (!url) return {}

    try {
      const res = await window.fetch(url, opts)
      return { data: await res.json() }
    } catch (err) {
      return { err }
    }
  }

  async connected () {
    let data = null

    const options = {
      ...this.props,
      ...this.props.options
    }

    const src = this.props.src

    if (typeof src === 'string') {
      const response = await this.fetch(src)

      if (response.err) {
        console.error(response.err)
        data = {}
      } else {
        data = response.data
      }
    }

    if (src === Object(src)) {
      data = src
    }

    if (data && data.chartData) {
      throw new Error('chartData propery deprecated')
    }

    if (data) {
      this.draw(data, options)
    }
  }

  render () {
    const {
      width,
      height
    } = this.props

    this.style.width = width
    this.style.height = height

    return this.html`
      <canvas ... ${{ width, height }}>
      </canvas>
    `
  }
}

module.exports = { TonicChart }

},{"@optoolco/tonic":20}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicCheckbox extends Tonic {
  get value () {
    const state = this.getState()
    let value

    if ('checked' in this.props) {
      value = this.props.checked
    } else {
      value = state.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')

    this.state.checked = checked
    this.props.checked = checked
    this.reRender()
  }

  defaults () {
    return {
      disabled: false,
      size: '18px'
    }
  }

  static stylesheet () {
    return `
      tonic-checkbox .tonic--checkbox--wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      tonic-checkbox input[type="checkbox"] {
        display: none;
      }

      tonic-checkbox input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }

      tonic-checkbox label {
        color: var(--tonic-primary, #333);
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline;
        vertical-align: middle;
      }

      tonic-checkbox .tonic--icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      tonic-checkbox .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-checkbox label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
    `
  }

  change (e) {
    if (
      this.props.virtual === true ||
      this.props.virtual === 'true'
    ) {
      return
    }
    if (this.state._changing) return

    e.stopPropagation()

    const currentState = this.value
    this.state._changing = true
    this.value = !currentState

    this.reRender()
  }

  updated () {
    if (this.state._changing) {
      const e = new window.Event('change', { bubbles: true })
      this.dispatchEvent(e)
      delete this.state._changing
    }
  }

  styles () {
    return {
      icon: {
        width: this.props.size,
        height: this.props.size
      }
    }
  }

  renderIcon () {
    const checked = this.value
    const iconState = checked ? 'checked' : 'unchecked'

    return this.html`
      <svg>
        <use ... ${{
          href: `#${iconState}`,
          'xlink:href': `#${iconState}`,
          color: 'var(--tonic-primary, #333)',
          fill: 'var(--tonic-primary, #333)'
        }}>
        </use>
      </svg>
    `
  }

  renderLabel () {
    let {
      id,
      label
    } = this.props

    if (!this.props.label) {
      label = this.nodes
    }

    return this.html`
      <label
        styles="label"
        for="tonic--checkbox--${id}"
      >${label}</label>
    `
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-checkbox')
    }

    const {
      id,
      disabled,
      theme,
      title,
      tabindex
    } = this.props

    const checked = this.value
    if (typeof this.state.checked === 'undefined') {
      this.state.checked = checked
    }

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--checkbox--wrapper">
        <input ... ${{
          type: 'checkbox',
          id: `tonic--checkbox--${id}`,
          checked,
          disabled: disabled === 'true',
          title,
          tabindex
        }}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon"
        >
          ${this.renderIcon()}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicCheckbox }

},{"../mode":19,"@optoolco/tonic":20}],9:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],10:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class Dialog extends Tonic {
  constructor () {
    super()

    this.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--close')
      if (el) this.hide()

      const overlay = e.target.matches('.tonic--overlay')
      if (overlay) this.hide()
    })
  }

  defaults () {
    return {
      width: '450px',
      height: 'auto',
      overlay: true,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  static stylesheet () {
    return `
      .tonic--dialog .tonic--dialog--wrapper {
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

      .tonic--dialog .tonic--dialog--wrapper.tonic--show {
        visibility: visible;
        transition: visibility 0s ease 0s;
      }

      .tonic--dialog .tonic--dialog--wrapper.tonic--show .tonic--overlay {
        opacity: 1;
      }

      .tonic--dialog .tonic--dialog--wrapper.tonic--show .tonic--dialog--content {
        color: var(--tonic-primary, #333);
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }

      .tonic--dialog .tonic--overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      .tonic--dialog .tonic--dialog--content {
        min-width: 350px;
        min-height: 250px;
        height: auto;
        width: auto;
        margin: auto;
        position: relative;
        background-color: var(--tonic-window, #fff);
        z-index: 1;
        opacity: 0;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
        transition: all 0.3s ease-in-out;
      }

      .tonic--dialog .tonic--dialog--content > .tonic--close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 25px;
        right: 25px;
        cursor: pointer;
      }

      .tonic--dialog .tonic--close svg {
        width: inherit;
        height: inherit;
      }
    `
  }

  show () {
    const that = this

    return new Promise((resolve) => {
      const node = this.querySelector('.tonic--dialog--wrapper')
      node.classList.add('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })

      this._escapeHandler = e => {
        if (e.keyCode === 27) that.hide()
      }

      document.addEventListener('keyup', that._escapeHandler)
    })
  }

  hide () {
    const that = this

    return new Promise((resolve) => {
      const node = this.querySelector('.tonic--dialog--wrapper')
      node.classList.remove('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })
      document.removeEventListener('keyup', that._escapeHandler)
    })
  }

  event (eventName) {
    const that = this

    return {
      then (resolve) {
        const listener = event => {
          const close = Tonic.match(event.target, '.tonic--close')
          const value = Tonic.match(event.target, '[value]')

          if (close || value) {
            that.removeEventListener(eventName, listener)
          }

          if (close) return resolve({})
          if (value) resolve({ [event.target.value]: true })
        }

        that.addEventListener(eventName, listener)
      }
    }
  }

  async * wrap () {
    const {
      width,
      height,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.classList.add('tonic--dialog')

    const wrapper = document.createElement('div')

    const isOpen = !!this.querySelector('.tonic--dialog--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--dialog--wrapper tonic--show' : 'tonic--dialog--wrapper'

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay'
      overlayElement.style.backgroundColor = backgroundColor
      wrapper.appendChild(overlayElement)
    }

    const dialog = document.createElement('div')
    dialog.className = 'tonic--dialog--content'
    if (width) dialog.style.width = width
    if (height) dialog.style.height = height

    // create template
    const closeIcon = document.createElement('div')
    closeIcon.className = 'tonic--close'

    // create SVG
    const svgns = 'http://www.w3.org/2000/svg'
    const xlinkns = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(svgns, 'svg')
    const use = document.createElementNS(svgns, 'use')

    closeIcon.appendChild(svg)
    svg.appendChild(use)

    const iconColor = color || 'var(--tonic-primary, #333)'

    use.setAttributeNS(xlinkns, 'href', '#close')
    use.setAttributeNS(xlinkns, 'xlink:href', '#close')
    use.setAttribute('color', iconColor)
    use.setAttribute('fill', iconColor)

    wrapper.appendChild(dialog)
    const contentContainer = document.createElement('div')
    contentContainer.className = 'tonic--dialog--content-container'
    dialog.appendChild(contentContainer)
    dialog.appendChild(closeIcon)

    yield wrapper

    const setContent = content => {
      if (!content) return

      if (typeof content === 'string') {
        contentContainer.innerHTML = content
      } else {
        [...content.childNodes].forEach(el => contentContainer.appendChild(el))
      }
    }

    if (this.wrapped instanceof Tonic.AsyncFunction) {
      setContent(await this.wrapped() || '')
      return wrapper
    } else if (this.wrapped instanceof Tonic.AsyncFunctionGenerator) {
      const itr = this.wrapped()
      while (true) {
        const { value, done } = await itr.next()
        setContent(value)

        if (done) {
          return wrapper
        }

        yield wrapper
      }
    } else if (this.wrapped instanceof Function) {
      setContent(this.wrapped() || '')
      return wrapper
    }

    return wrapper
  }
}

module.exports = { Dialog }

},{"@optoolco/tonic":20}],11:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')
const { Dialog } = require('./index')

class ExampleDialog extends Dialog {
  async click (e) {
    if (Tonic.match(e.target, 'tonic-button')) {
      this.state.message = Date.now()
      this.reRender()
    }
  }

  body () {
    return `
      <header>Dialog</header>
      <main>
        ${this.state.message || 'Ready'}
      </main>
      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }

  loading () {
    this.state.loaded = true

    return `
      <h3>Loading...</h3>
    `
  }

  async * render () {
    if (!this.state.loaded) {
      yield this.loading()
    }

    return this.body()
  }
}

Tonic.add(ExampleDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())

},{"./index":10,"@optoolco/tonic":20}],12:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')
const scrollToY = require('scrolltoy')
const { qs, qsa } = require('qs')
const components = require('../..')
const nonce = require('./nonce')

components(Tonic)

if (window.location.pathname === '/examples.html') {
  require('../../router/readme')
  require('../../panel/readme')
  require('../../dialog/readme')
  require('../../tabs/readme')
  require('../../windowed/readme')
  require('../../tooltip/readme')
  require('../../popover/readme')
  require('../../badge/readme')
  require('../../button/readme')
  require('../../chart/readme')
  require('../../checkbox/readme')
  require('../../icon/readme')
  require('../../input/readme')
  require('../../progress-bar/readme')
  require('../../profile-image/readme')
  require('../../range/readme')
  require('../../select/readme')
  require('../../textarea/readme')
  require('../../toaster/readme')
  require('../../toaster-inline/readme')
  require('../../toggle/readme')
}

function setupNavigation () {
  qsa(`a[name="${document.body.dataset.page}"]`).forEach(el => {
    el.classList.add('active')
  })

  const main = qs('main')
  const links = qsa('nav ul li a')
  const ranges = []
  let current

  links.map(link => {
    const id = link.getAttribute('href').slice(1)
    const section = document.getElementById(id)
    const { top } = section.getBoundingClientRect()

    ranges.push({
      upper: top,
      lower: top + section.offsetHeight,
      id: id,
      link: link
    })

    link.addEventListener('click', event => {
      event.preventDefault()

      const prev = qs('a.selected')
      if (prev) prev.className = ''
      link.className = 'selected'
      scrollToY(main, section.offsetTop, 500)
      window.location.hash = id
    })
  })

  function onscroll (event) {
    if (scrollToY.scrolling) return
    var pos = main.scrollTop

    pos = pos + 100

    ranges.map(range => {
      if (pos >= range.upper && pos <= range.lower) {
        if (range.id === current) return

        current = range.id
        var prev = qs('a.selected')
        if (prev) prev.className = ''
        range.link.className = 'selected'
      }
    })
  }
  main.addEventListener('scroll', onscroll)
}

function clearFocus () {
  document.addEventListener('keydown', e => {
    if (e.keyCode === 9) {
      document.body.classList.add('show-focus')
    }
  })

  document.addEventListener('click', e => {
    document.body.classList.remove('show-focus')
  })
}

function ready () {
  setupNavigation()
  clearFocus()

  components(Tonic, nonce)
}

document.addEventListener('DOMContentLoaded', ready)

},{"../..":16,"../../badge/readme":3,"../../button/readme":5,"../../chart/readme":7,"../../checkbox/readme":9,"../../dialog/readme":11,"../../icon/readme":15,"../../input/readme":18,"../../panel/readme":28,"../../popover/readme":30,"../../profile-image/readme":32,"../../progress-bar/readme":34,"../../range/readme":36,"../../router/readme":39,"../../select/readme":41,"../../tabs/readme":44,"../../textarea/readme":46,"../../toaster-inline/readme":48,"../../toaster/readme":50,"../../toggle/readme":52,"../../tooltip/readme":54,"../../windowed/readme":56,"./nonce":13,"@optoolco/tonic":20,"qs":24,"scrolltoy":25}],13:[function(require,module,exports){

    module.exports = 'U29tZSBzdXBlciBzZWNyZXQ='
  
},{}],14:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicIcon extends Tonic {
  defaults () {
    return {
      size: '25px',
      fill: 'var(--tonic-primary, #333)'
    }
  }

  static stylesheet () {
    return `
      tonic-icon svg path {
        fill: inherit;
      }
    `
  }

  styles () {
    const {
      size
    } = this.props

    return {
      icon: {
        width: size,
        height: size
      }
    }
  }

  render () {
    const {
      symbolId,
      size,
      fill,
      theme,
      src,
      tabindex
    } = this.props

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <svg ... ${{
        styles: 'icon',
        tabindex
      }}>
        <use ... ${{
          href: `${src || ''}#${symbolId}`,
          'xlink:href': `${src || ''}#${symbolId}`,
          width: size,
          fill,
          color: fill,
          height: size
        }}>
      </svg>
    `
  }
}

module.exports = { TonicIcon }

},{"@optoolco/tonic":20}],15:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],16:[function(require,module,exports){
let Tonic
try {
  Tonic = require('@optoolco/tonic')
} catch (err) {
  console.error('Missing dependency. Try `npm install @optoolco/tonic`.')
  throw err
}

const version = Tonic.version
const major = version ? version.split('.')[0] : '0'
if (parseInt(major, 10) < 11) {
  console.error('Out of data dependency. Try `npm install @optoolco/tonic@11`.')
  throw new Error('Invalid Tonic version. requires at least v11')
}

const mode = require('./mode')

const { TonicAccordion, TonicAccordionSection } = require('./accordion')
const { TonicBadge } = require('./badge')
const { TonicButton } = require('./button')
const { TonicChart } = require('./chart')
const { TonicCheckbox } = require('./checkbox')
const { TonicIcon } = require('./icon')
const { TonicInput } = require('./input')
const { TonicPopover } = require('./popover')
const { TonicProfileImage } = require('./profile-image')
const { TonicProgressBar } = require('./progress-bar')
const { TonicRange } = require('./range')
const { TonicRelativeTime } = require('./relative-time')
const { TonicRouter } = require('./router')
const { TonicSelect } = require('./select')
const { TonicSprite } = require('./sprite')
const { TonicTabs, TonicTabPanel } = require('./tabs')
const { TonicTextarea } = require('./textarea')
const { TonicTooltip } = require('./tooltip')
const { TonicToasterInline } = require('./toaster-inline')
const { TonicToaster } = require('./toaster')
const { TonicToggle } = require('./toggle')

//
// An example collection of components.
//
module.exports = components
// For supporting unpkg / dist / jsfiddle.
components.Tonic = Tonic

function components (Tonic, opts) {
  if (opts && opts.strict === true) {
    mode.strict = true
  }

  Tonic.add(TonicAccordion)
  Tonic.add(TonicAccordionSection)
  Tonic.add(TonicBadge)
  Tonic.add(TonicButton)
  Tonic.add(TonicChart)
  Tonic.add(TonicCheckbox)
  Tonic.add(TonicInput)
  Tonic.add(TonicIcon)
  Tonic.add(TonicPopover)
  Tonic.add(TonicProfileImage)
  Tonic.add(TonicProgressBar)
  Tonic.add(TonicRange)
  Tonic.add(TonicRelativeTime)
  Tonic.add(TonicRouter)
  Tonic.add(TonicSelect)
  Tonic.add(TonicSprite)
  Tonic.add(TonicTabs)
  Tonic.add(TonicTabPanel)
  Tonic.add(TonicTextarea)
  Tonic.add(TonicTooltip)
  Tonic.add(TonicToasterInline)
  Tonic.add(TonicToaster)
  Tonic.add(TonicToggle)
}

},{"./accordion":1,"./badge":2,"./button":4,"./chart":6,"./checkbox":8,"./icon":14,"./input":17,"./mode":19,"./popover":29,"./profile-image":31,"./progress-bar":33,"./range":35,"./relative-time":37,"./router":38,"./select":40,"./sprite":42,"./tabs":43,"./textarea":45,"./toaster":49,"./toaster-inline":47,"./toggle":51,"./tooltip":53,"@optoolco/tonic":20}],17:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicInput extends Tonic {
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      color: 'var(--tonic-primary)',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      position: 'left'
    }
  }

  get form () {
    return this.querySelector('input').form
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    this.querySelector('input').value = value
    this.state.value = value
  }

  setValid () {
    this.reRender(props => Object.assign({}, props, {
      invalid: false
    }))
  }

  setInvalid (msg) {
    this.reRender(props => Object.assign({}, props, {
      invalid: true,
      errorMessage: msg
    }))
  }

  static stylesheet () {
    return `
      tonic-input .tonic--wrapper {
        position: relative;
      }

      tonic-input[src] .tonic--right tonic-icon {
        right: 10px;
      }

      tonic-input[src] .tonic--right input {
        padding-right: 40px;
      }

      tonic-input[src] .tonic--left tonic-icon {
        left: 10px;
      }

      tonic-input[src] .tonic--left input {
        padding-left: 40px;
      }

      tonic-input[src] tonic-icon {
        position: absolute;
        bottom: 7px;
      }

      tonic-input label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
        color: var(--tonic-primary, #333);
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border, #ccc);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-input input:invalid {
        border-color: var(--tonic-error, #f66);
      }

      tonic-input input:invalid:focus {
        border-color: var(--tonic-error, #f66);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--tonic-primary, #333);
      }

      tonic-input input[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-input[label] .tonic--invalid {
        margin-bottom: -13px;
      }

      tonic-input .tonic--invalid {
        font-size: 14px;
        text-align: center;
        margin-bottom: 13px;
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s;
        visibility: hidden;
        opacity: 0;
      }

      tonic-input .tonic--invalid span {
        color: white;
        padding: 2px 6px;
        background-color: var(--tonic-error, #f66);
        border-radius: 2px;
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }

      tonic-input .tonic--invalid span:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--tonic-error, #f66);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return this.html`
      <label
        for="tonic--input_${this.props.id}"
      >${this.props.label}</label>
    `
  }

  renderIcon () {
    if (!this.props.src) return ''

    return this.html`
      <tonic-icon
        src="${this.props.src}"
        color="${this.props.color}">
      </tonic-icon>
    `
  }

  setupEvents () {
    const input = this.querySelector('input')

    const set = (k, v, event) => {
      this.setState(state => Object.assign({}, state, { [k]: v }))
    }

    const relay = name => {
      this.dispatchEvent(new window.CustomEvent(name, { bubbles: true }))
    }

    input.addEventListener('focus', e => {
      set('focus', true)
      relay('focus')
    })

    input.addEventListener('blur', e => {
      set('focus', false)
      relay('blur')
    })

    input.addEventListener('input', e => {
      set('value', e.target.value)
      set('pos', e.target.selectionStart)
      relay('input')
    })

    const state = this.getState()
    if (!state.focus) return

    input.focus()

    try {
      input.setSelectionRange(state.pos, state.pos)
    } catch (err) {
      console.warn(err)
    }
  }

  updated () {
    const input = this.querySelector('input')

    setTimeout(() => {
      if (this.props.invalid) {
        input.setCustomValidity(this.props.errorMessage)
      } else {
        input.setCustomValidity('')
      }
    }, 32)

    this.setupEvents()
  }

  connected () {
    this.updated()
  }

  styles () {
    const {
      width,
      height,
      radius,
      padding
    } = this.props

    return {
      wrapper: {
        width
      },
      input: {
        width: '100%',
        height,
        borderRadius: radius,
        padding
      }
    }
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-input')
    }

    const {
      ariaInvalid,
      ariaLabelledby,
      disabled,
      height,
      label,
      max,
      maxlength,
      min,
      minlength,
      name,
      pattern,
      placeholder,
      position,
      readonly,
      required,
      spellcheck,
      tabindex,
      theme,
      title,
      type
    } = this.props

    if (ariaLabelledby) this.removeAttribute('ariaLabelledby')
    if (height) this.style.width = height
    if (name) this.removeAttribute('name')
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const value = typeof this.state.value === 'string'
      ? this.state.value : this.props.value

    const errorMessage = this.props.errorMessage ||
      this.props.errormessage || 'Invalid'

    const classes = ['tonic--wrapper']
    if (position) classes.push(`tonic--${position}`)

    const attributes = {
      ariaInvalid,
      ariaLabel: label,
      'aria-labelledby': ariaLabelledby,
      disabled: disabled === 'true',
      max,
      maxlength,
      min,
      minlength,
      name,
      pattern,
      placeholder,
      position,
      readonly: readonly === 'true',
      required: required === 'true',
      spellcheck,
      tabindex,
      title,
      value
    }

    return this.html`
      <div class="${classes.join(' ')}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input ... ${{
          styles: 'input',
          type,
          id: `tonic--input_${this.props.id}`,
          ...attributes
        }}/>
        <div class="tonic--invalid">
          <span id="tonic--error-${this.props.id}">${errorMessage}</span>
        </div>
      </div>
    `
  }
}

module.exports = { TonicInput }

},{"../mode":19,"@optoolco/tonic":20}],18:[function(require,module,exports){
const input = document.getElementById('tonic-input-example')
const span = document.getElementById('tonic-input-state')

const listener = e => {
  const state = input.getState()
  span.textContent = `Value: "${state.value || 'Empty'}", Focus: ${state.focus}`
}

input.addEventListener('input', listener)
input.addEventListener('blur', listener)
input.addEventListener('focus', listener)

},{}],19:[function(require,module,exports){
module.exports = { strict: false }

},{}],20:[function(require,module,exports){
class TonicRaw {
  constructor (rawText) {
    this.isTonicRaw = true
    this.rawText = rawText
  }

  valueOf () { return this.rawText }
  toString () { return this.rawText }
}

class Tonic extends window.HTMLElement {
  constructor () {
    super()
    const state = Tonic._states[this.id]
    delete Tonic._states[this.id]
    this.isTonicComponent = true
    this.state = state || {}
    this.props = {}
    this.elements = [...this.children].map(el => el.cloneNode(true))
    this.elements.__children__ = true
    this.nodes = [...this.childNodes].map(el => el.cloneNode(true))
    this.nodes.__children__ = true
    this._events()
  }

  static _createId () {
    return `tonic${Tonic._index++}`
  }

  static _maybePromise (p) {
    if (p && typeof p.then === 'function' && typeof p.catch === 'function') {
      p.catch(err => setTimeout(() => { throw err }, 0))
    }
  }

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  static _normalizeAttrs (o, x = {}) {
    [...o].forEach(o => (x[o.name] = o.value))
    return x
  }

  _events () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.addEventListener(p, this)
    }
  }

  _prop (o) {
    const id = this._id
    const p = `__${id}__${Tonic._createId()}__`
    Tonic._data[id] = Tonic._data[id] || {}
    Tonic._data[id][p] = o
    return p
  }

  _placehold (r) {
    const id = this._id
    const ref = `placehold:${id}:${Tonic._createId()}__`
    Tonic._children[id] = Tonic._children[id] || {}
    Tonic._children[id][ref] = r
    return ref
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static getPropertyNames (proto) {
    const props = []
    while (proto && proto !== Tonic.prototype) {
      props.push(...Object.getOwnPropertyNames(proto))
      proto = Object.getPrototypeOf(proto)
    }
    return props
  }

  static add (c, htmlName) {
    c.prototype._props = Tonic.getPropertyNames(c.prototype)

    const hasValidName = htmlName || (c.name && c.name.length > 1)
    if (!hasValidName) {
      throw Error('Mangling. https://bit.ly/2TkJ6zP')
    }

    if (!htmlName) htmlName = Tonic._splitName(c.name).toLowerCase()
    if (window.customElements.get(htmlName)) return

    Tonic._reg[htmlName] = c
    Tonic._tags = Object.keys(Tonic._reg).join()
    window.customElements.define(htmlName, c)

    if (c.stylesheet) {
      const styleNode = document.createElement('style')
      styleNode.appendChild(document.createTextNode(c.stylesheet()))
      if (document.head) document.head.appendChild(styleNode)
    }
  }

  static escape (s) {
    return s.replace(Tonic.ESC, c => Tonic.MAP[c])
  }

  static raw (s) {
    return new TonicRaw(s)
  }

  html ([s, ...strings], ...values) {
    const refs = o => {
      if (o && o.__children__) return this._placehold(o)
      if (o && o.isTonicRaw) return o.rawText
      switch (Object.prototype.toString.call(o)) {
        case '[object HTMLCollection]':
        case '[object NodeList]': return this._placehold([...o])
        case '[object Array]':
        case '[object Object]':
        case '[object Function]': return this._prop(o)
        case '[object NamedNodeMap]':
          return this._prop(Tonic._normalizeAttrs(o))
        case '[object Number]': return `${o}__float`
        case '[object String]': return Tonic.escape(o)
        case '[object Boolean]': return `${o}__boolean`
        case '[object Null]': return `${o}__null`
        case '[object HTMLElement]':
          return this._placehold([o])
      }
      if (
        typeof o === 'object' && o && o.nodeType === 1 &&
        typeof o.cloneNode === 'function'
      ) {
        return this._placehold([o])
      }
      return o
    }

    const reduce = (a, b) => a.concat(b, strings.shift())
    const str = values.map(refs).reduce(reduce, [s]).join('')
    return Tonic.raw(str)
  }

  setState (o) {
    this.state = typeof o === 'function' ? o(this.state) : o
  }

  getState () {
    return this.state
  }

  scheduleReRender (oldProps) {
    if (this.pendingReRender) return this.pendingReRender

    this.pendingReRender = new Promise(resolve => {
      window.requestAnimationFrame(() => {
        Tonic._maybePromise(this._set(this.root, this.render))
        this.pendingReRender = null

        if (this.updated) this.updated(oldProps)
        resolve()
      })
    })

    return this.pendingReRender
  }

  reRender (o = this.props) {
    const oldProps = { ...this.props }
    this.props = typeof o === 'function' ? o(oldProps) : o
    return this.scheduleReRender(oldProps)
  }

  getProps () {
    return this.props
  }

  handleEvent (e) {
    Tonic._maybePromise(this[e.type](e))
  }

  async _set (target, render, content = '') {
    for (const node of target.querySelectorAll(Tonic._tags)) {
      if (!node.isTonicComponent) continue
      if (!node.id || !Tonic._refIds.includes(node.id)) continue
      Tonic._states[node.id] = node.getState()
    }

    if (render instanceof Tonic.AsyncFunction) {
      content = await render.call(this) || ''
    } else if (render instanceof Tonic.AsyncFunctionGenerator) {
      const itr = render.call(this)
      while (true) {
        const { value, done } = await itr.next()
        this._set(target, null, value)
        if (done) break
      }
      return
    } else if (render instanceof Function) {
      content = render.call(this) || ''
    }

    if (content && content.isTonicRaw) {
      content = content.rawText
    }

    if (typeof content === 'string') {
      content = content.replace(Tonic.SPREAD, (_, p) => {
        const o = Tonic._data[p.split('__')[1]][p]
        return Object.entries(o).map(([key, value]) => {
          const k = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          if (value === true) return k
          else if (value) return `${k}="${Tonic.escape(String(value))}"`
          else return ''
        }).filter(Boolean).join(' ')
      })

      if (this.stylesheet) {
        content = `<style>${this.stylesheet()}</style>${content}`
      }

      target.innerHTML = content

      if (this.styles) {
        const styles = this.styles()
        for (const node of target.querySelectorAll('[styles]')) {
          for (const s of node.getAttribute('styles').split(/\s+/)) {
            Object.assign(node.style, styles[s.trim()])
          }
        }
      }

      const children = Tonic._children[this._id] || {}

      const walk = (node, fn) => {
        if (node.nodeType === 3) {
          const id = node.textContent.trim()
          if (children[id]) fn(node, children[id])
        }

        const childNodes = node.childNodes
        if (!childNodes) return

        for (let i = 0; i < childNodes.length; i++) {
          walk(childNodes[i], fn)
        }
      }

      walk(target, (node, children) => {
        for (const child of children) {
          node.parentNode.insertBefore(child, node)
        }
        delete Tonic._children[this._id][node.id]
        node.parentNode.removeChild(node)
      })
    } else {
      target.innerHTML = ''
      target.appendChild(content.cloneNode(true))
    }
  }

  connectedCallback () {
    this.root = this.shadowRoot || this

    if (this.wrap) {
      this.wrapped = this.render
      this.render = this.wrap
    }

    if (this.id && !Tonic._refIds.includes(this.id)) {
      Tonic._refIds.push(this.id)
    }
    const cc = s => s.replace(/-(.)/g, (_, m) => m.toUpperCase())

    for (const { name: _name, value } of this.attributes) {
      const name = cc(_name)
      const p = this.props[name] = value

      if (/__\w+__\w+__/.test(p)) {
        const { 1: root } = p.split('__')
        this.props[name] = Tonic._data[root][p]
      } else if (/\d+__float/.test(p)) {
        this.props[name] = parseFloat(p, 10)
      } else if (p === 'null__null') {
        this.props[name] = null
      } else if (/\w+__boolean/.test(p)) {
        this.props[name] = p.includes('true')
      } else if (/placehold:\w+:\w+__/.test(p)) {
        const { 1: root } = p.split(':')
        this.props[name] = Tonic._children[root][p][0]
      }
    }

    this.props = Object.assign(
      this.defaults ? this.defaults() : {},
      this.props
    )

    if (!this._source) {
      this._source = this.innerHTML
    } else {
      this.innerHTML = this._source
    }

    this._id = this._id || Tonic._createId()

    this.willConnect && this.willConnect()
    Tonic._maybePromise(this._set(this.root, this.render))
    Tonic._maybePromise(this.connected && this.connected())
  }

  disconnectedCallback () {
    Tonic._maybePromise(this.disconnected && this.disconnected())
    this.elements.length = 0
    this.nodes.length = 0
    delete Tonic._data[this._id]
    delete Tonic._children[this._id]
  }
}

Object.assign(Tonic, {
  _tags: '',
  _refIds: [],
  _data: {},
  _states: {},
  _children: {},
  _reg: {},
  _index: 0,
  version: require ? require('./package').version : null,
  SPREAD: /\.\.\.\s?(__\w+__\w+__)/g,
  ESC: /["&'<>`]/g,
  AsyncFunctionGenerator: async function * () {}.constructor,
  AsyncFunction: async function () {}.constructor,
  MAP: { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }
})

if (typeof module === 'object') module.exports = Tonic

},{"./package":21}],21:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "@optoolco/tonic@11.0.0",
      "/Users/paolofragomeni/projects/optoolco/components"
    ]
  ],
  "_development": true,
  "_from": "@optoolco/tonic@11.0.0",
  "_id": "@optoolco/tonic@11.0.0",
  "_inBundle": false,
  "_integrity": "sha512-nj6U2UUGHr6lOmhcEi5nEP9vdnEc8PQX/5+X4NjA96lrkfxnyiPyrIgnfe5LHY9BX7vPLid4BOp3Ne5B8QGJ4Q==",
  "_location": "/@optoolco/tonic",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "@optoolco/tonic@11.0.0",
    "name": "@optoolco/tonic",
    "escapedName": "@optoolco%2ftonic",
    "scope": "@optoolco",
    "rawSpec": "11.0.0",
    "saveSpec": null,
    "fetchSpec": "11.0.0"
  },
  "_requiredBy": [
    "#DEV:/"
  ],
  "_resolved": "https://registry.npmjs.org/@optoolco/tonic/-/tonic-11.0.0.tgz",
  "_spec": "11.0.0",
  "_where": "/Users/paolofragomeni/projects/optoolco/components",
  "author": {
    "name": "optoolco"
  },
  "bugs": {
    "url": "https://github.com/optoolco/tonic/issues"
  },
  "dependencies": {},
  "description": "A composable component inspired by React.",
  "devDependencies": {
    "benchmark": "^2.1.4",
    "browserify": "^16.2.2",
    "raynos-tape-puppet": "0.1.7-raynos2",
    "standard": "14.3.1",
    "tape": "^4.11.0",
    "terser": "^4.0.2",
    "uuid": "3.3.3"
  },
  "directories": {
    "test": "test"
  },
  "homepage": "https://github.com/optoolco/tonic#readme",
  "license": "MIT",
  "name": "@optoolco/tonic",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/optoolco/tonic.git"
  },
  "scripts": {
    "build:demo": "browserify --bare ./demo > ./docs/bundle.js",
    "minify": "terser index.js -c unused,dead_code,hoist_vars,loops=false,hoist_props=true,hoist_funs,toplevel,keep_classnames,keep_fargs=false -o dist/tonic.min.js",
    "test": "browserify test/index.js | tape-puppet"
  },
  "version": "11.0.0"
}

},{}],22:[function(require,module,exports){
"use strict";

module.exports = exports = self.fetch;

// Needed for TypeScript and Webpack.
exports.default = self.fetch.bind(self);

exports.Headers = self.Headers;
exports.Request = self.Request;
exports.Response = self.Response;

},{}],23:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],24:[function(require,module,exports){
const qs = (s, p) => (p || document).querySelector(s)
const qsa = (s, p) => [...(p || document).querySelectorAll(s)]

module.exports = { qs, qsa }

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":23,"timers":26}],27:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class Panel extends Tonic {
  constructor () {
    super()

    this.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--close')
      if (el) this.hide()

      const overlay = Tonic.match(e.target, '.tonic--overlay')
      if (overlay) this.hide()
    })
  }

  defaults () {
    return {
      position: 'right',
      overlay: false,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  static stylesheet () {
    return `
      .tonic--panel .tonic--panel--inner {
        color: var(--tonic-primary, #333);
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--tonic-window, #fff);
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease;
        opacity: 0;
        z-index: 100;
      }

      @media (max-width: 500px) .tonic--panel .tonic--panel--inner {
        width: 100%;
      }

      .tonic--panel .tonic--left .tonic--panel--inner {
        left: 0;
        -webkit-transform: translateX(-500px);
        -ms-transform: translateX(-500px);
        transform: translateX(-500px);
        border-right: 1px solid var(--tonic-border, #333);
        visibility: hidden;
      }

      .tonic--panel .tonic--right .tonic--panel--inner {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--tonic-border, #333);
        visibility: hidden;
      }

      .tonic--panel .tonic--show.tonic--right .tonic--panel--inner,
      .tonic--panel .tonic--show.tonic--left .tonic--panel--inner {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      .tonic--panel .tonic--show[overlay="true"] .tonic--overlay {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 0s;
      }

      .tonic--panel .tonic--overlay {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 1s;
        z-index: 1;
      }

      .tonic--panel .tonic--close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
      }

      .tonic--panel .tonic--close svg {
        width: inherit;
        height: inherit;
      }
    `
  }

  show () {
    const that = this

    return new Promise(resolve => {
      if (!that) return

      const node = that.querySelector('.tonic--wrapper')
      node.classList.add('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })

      this._escapeHandler = e => {
        if (e.keyCode === 27) that.hide()
      }

      document.addEventListener('keyup', that._escapeHandler)
    })
  }

  hide () {
    const that = this

    return new Promise(resolve => {
      if (!that) return
      const node = this.querySelector('.tonic--wrapper')
      node.classList.remove('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })
      document.removeEventListener('keyup', that._escapeHandler)
    })
  }

  async * wrap (render) {
    const {
      name,
      position,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.classList.add('tonic--panel')

    const wrapper = document.createElement('div')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const isOpen = !!this.querySelector('.tonic--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--wrapper tonic--show' : 'tonic--wrapper'
    wrapper.id = 'wrapper'
    const positionAttr = position ? `tonic--${position}` : ''
    wrapper.classList.add(positionAttr)

    if (overlay) wrapper.setAttribute('overlay', true)
    if (name) wrapper.setAttribute('name', name)

    // create panel
    const panel = document.createElement('div')
    panel.className = 'tonic--panel--inner'

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay'
      overlayElement.style.backgroundColor = backgroundColor
      wrapper.appendChild(overlayElement)
    }

    // create template
    const closeIcon = document.createElement('div')
    closeIcon.className = 'tonic--close'

    // create SVG
    const svgns = 'http://www.w3.org/2000/svg'
    const xlinkns = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(svgns, 'svg')
    const use = document.createElementNS(svgns, 'use')

    closeIcon.appendChild(svg)
    svg.appendChild(use)

    const iconColor = color || 'var(--tonic-primary, #333)'

    use.setAttributeNS(xlinkns, 'href', '#close')
    use.setAttributeNS(xlinkns, 'xlink:href', '#close')
    use.setAttribute('color', iconColor)
    use.setAttribute('fill', iconColor)

    const contentContainer = document.createElement('div')
    contentContainer.className = 'tonic--dialog--content-container'

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(contentContainer)
    panel.appendChild(closeIcon)

    yield wrapper

    const setContent = content => {
      if (!content) return

      if (typeof content === 'string') {
        contentContainer.innerHTML = content
      } else {
        [...content.childNodes].forEach(el => contentContainer.appendChild(el))
      }
    }

    if (this.wrapped instanceof Tonic.AsyncFunction) {
      setContent(await this.wrapped() || '')
      return wrapper
    }

    if (this.wrapped instanceof Tonic.AsyncFunctionGenerator) {
      const itr = this.wrapped()
      while (true) {
        const { value, done } = await itr.next()
        setContent(value)

        if (done) {
          return wrapper
        }

        yield wrapper
      }
    } else if (this.wrapped instanceof Function) {
      setContent(this.wrapped() || '')
      return wrapper
    }

    return wrapper
  }
}

module.exports = { Panel }

},{"@optoolco/tonic":20}],28:[function(require,module,exports){
const fetch = require('node-fetch')
const Tonic = require('@optoolco/tonic')
const { Panel } = require('./index')

class TonicPanel extends Panel {
  async getArticle (title) {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}&origin=*`)
      return Object.values((await res.json()).query.pages)[0]
    } catch (err) {
      return { title: 'Error', extract: err.message }
    }
  }

  async click (e) {
    if (e.target.value === 'close') {
      return this.hide()
    }

    if (e.target.value === 'get') {
      const page = await this.getArticle('HTML')

      this.reRender(props => ({
        ...props,
        ...page
      }))
    }
  }

  async * render () {
    return `
      <div class="tonic--header">Panel Example</div>
      <div class="tonic--main">
        <h3>${this.props.title || 'Hello'}
        <p>${this.props.extract || 'Click "get" to fetch the content from Wikipedia.'}</p>
      </div>
      <div class="tonic--footer">
        <tonic-button value="close">Close</tonic-button>
        <tonic-button value="get" async="true">Get</tonic-button>
      </div>
    `
  }
}

Tonic.add(TonicPanel)

//
// For this example, a button element will trigger the
// `.show()` method on the panel when it is clicked.
//
const panelLink = document.getElementById('content-panel-link-example')
const panel = document.getElementById('content-panel-example')

panelLink.addEventListener('click', e => panel.show())

},{"./index":27,"@optoolco/tonic":20,"node-fetch":22}],29:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicPopover extends Tonic {
  constructor () {
    super()

    const target = this.getAttribute('for')
    const el = document.getElementById(target)

    el.addEventListener('click', e => this.show(el))
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto',
      padding: '15px',
      margin: 10,
      position: 'bottomleft'
    }
  }

  static stylesheet () {
    return `
      tonic-popover .tonic--overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        display: none;
        z-index: 0;
        background-color: rgba(0,0,0,0);
      }

      tonic-popover .tonic--popover {
        position: absolute;
        top: 30px;
        background: var(--tonic-window, #fff);
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 2px;
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        -webkit-transform: scale(0.75);
        ms-transform: scale(0.75);
        transform: scale(0.75);
        transition: transform 0.1s ease-in-out, opacity 0s ease 0.1s, visibility 0s ease 0.1s, z-index 0s ease 0.1s;
      }

      tonic-popover .tonic--popover.tonic--show {
        box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3);
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        visibility: visible;
        transition: transform 0.15s ease-in-out;
        opacity: 1;
        z-index: 1;
      }

      tonic-popover .tonic--show ~ .tonic--overlay {
        display: block;
        opacity: 1;
      }

      tonic-popover .tonic--popover--top {
        transform-origin: bottom center;
      }

      tonic-popover .tonic--popover--topleft {
        transform-origin: bottom left;
      }

      tonic-popover .tonic--popover--topright {
        transform-origin: bottom right;
      }

      tonic-popover .tonic--popover--bottom {
        transform-origin: top center;
      }

      tonic-popover .tonic--popover--bottomleft {
        transform-origin: top left;
      }

      tonic-popover .tonic--popover--bottomright {
        transform-origin: top right;
      }

    `
  }

  styles () {
    const {
      width,
      height,
      padding,
      margin,
      position
    } = this.props

    return {
      popover: {
        width,
        height,
        padding,
        margin,
        position
      }
    }
  }

  show (triggerNode) {
    const popover = this.querySelector('.tonic--popover')
    let scrollableArea = triggerNode.parentNode

    while (true) {
      if (!scrollableArea || scrollableArea.tagName === 'BODY') break
      if (window.getComputedStyle(scrollableArea).overflow === 'scroll') break
      scrollableArea = scrollableArea.parentNode
    }

    const margin = parseInt(this.props.margin, 10)
    let { top, left } = triggerNode.getBoundingClientRect()
    let pos = top + scrollableArea.scrollTop
    left -= scrollableArea.offsetLeft

    switch (this.props.position) {
      case 'topleft':
        pos -= popover.offsetHeight + margin
        break
      case 'topright':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth - popover.offsetWidth)
        break
      case 'top':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
      case 'bottomleft':
        pos += triggerNode.offsetHeight + margin
        break
      case 'bottomright':
        pos += triggerNode.offsetHeight + margin
        left += triggerNode.offsetWidth - popover.offsetWidth
        break
      case 'bottom':
        pos += triggerNode.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
    }

    popover.style.top = `${pos}px`
    popover.style.left = `${left}px`

    window.requestAnimationFrame(() => {
      popover.className = `tonic--popover tonic--show tonic--popover--${this.props.position}`
      const event = new window.Event('show')
      this.dispatchEvent(event)
    })
  }

  hide () {
    const popover = this.querySelector('.tonic--popover')
    if (popover) popover.classList.remove('tonic--show')
  }

  connected () {
    if (!this.props.open) return
    const target = this.getAttribute('for')
    this.show(document.getElementById(target))
  }

  click (e) {
    if (Tonic.match(e.target, '.tonic--overlay')) {
      return this.hide()
    }
  }

  render () {
    const {
      theme
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--popover" styles="popover">
        ${this.nodes}
      </div>
      <div class="tonic--overlay"></div>
    `
  }
}

module.exports = { TonicPopover }

},{"@optoolco/tonic":20}],30:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],31:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicProfileImage extends Tonic {
  get value () {
    const state = this.getState()
    return state.data || this.props.src
  }

  defaults () {
    return {
      src: TonicProfileImage.svg.default(),
      size: '50px',
      radius: '5px'
    }
  }

  static stylesheet () {
    return `
      tonic-profile-image {
        display: inline-block;
      }

      tonic-profile-image .tonic--wrapper {
        position: relative;
        overflow: hidden;
      }

      tonic-profile-image .tonic--image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      tonic-profile-image .tonic--overlay {
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

      tonic-profile-image .tonic--overlay .tonic--icon {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      tonic-profile-image .tonic--overlay .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-profile-image .tonic--wrapper.tonic--editable:hover .tonic--overlay {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
      }
    `
  }

  styles () {
    const {
      src,
      size,
      border,
      radius
    } = this.props

    return {
      background: {
        backgroundImage: `url('${src}')`
      },
      hidden: {
        display: 'none'
      },
      wrapper: {
        width: size,
        height: size,
        border: border,
        borderRadius: radius
      }
    }
  }

  getPictureData (src, cb) {
    const reader = new window.FileReader()
    reader.onerror = err => cb(err)
    reader.onload = e => cb(null, e.target.result)
    reader.readAsDataURL(src)
  }

  click (e) {
    if (this.props.editable) {
      if (this.props.editable === 'false') return
      const fileInput = this.getElementsByTagName('input')[0]
      fileInput.click()
    }
  }

  change (e) {
    const fileInput = this.getElementsByTagName('input')[0]
    const data = fileInput.files[0]
    if (e.data) return
    e.stopPropagation()

    const {
      size,
      type,
      path,
      lastModifiedDate
    } = data

    this.getPictureData(data, (err, data) => {
      if (err) {
        const event = new window.Event('error')
        event.message = err.message
        this.dispatchEvent(event)
        return
      }

      const slot = this.querySelector('.tonic--image')

      this.setState(state => Object.assign({}, state, {
        size,
        path,
        mime: type,
        mtime: lastModifiedDate,
        data
      }))

      slot.style.backgroundImage = 'url("' + data + '")'
      const event = new window.Event('change', { bubbles: true })
      event.data = true // prevent recursion
      this.dispatchEvent(event)
    })
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-profile-image')
    }

    const {
      theme,
      editable
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const classes = ['tonic--wrapper']
    if (editable === 'true') classes.push('tonic--editable')

    return this.html`
      <div
        class="${classes.join(' ')}"
        styles="wrapper">

        <div
          class="tonic--image"
          styles="background">
        </div>

        <input type="file" styles="hidden"/>

        <div class="tonic--overlay">
          <div class="tonic--icon">
            <svg>
              <use
                href="#edit"
                xlink:href="#edit"
                color="#fff"
                fill="#fff">
              </use>
            </svg>
          </div>
        </div>
      </div>
    `
  }
}

TonicProfileImage.svg = {}
TonicProfileImage.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
TonicProfileImage.svg.default = () => TonicProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect fill="#F0F0F0" width="100" height="100"></rect>
    <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
    <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
  </svg>
`)

module.exports = { TonicProfileImage }

},{"../mode":19,"@optoolco/tonic":20}],32:[function(require,module,exports){
const profile = document.getElementById('profile-image-example-editable')

profile.addEventListener('change', e => console.log(e.data))
profile.addEventListener('error', e => console.log(e.message))

},{}],33:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicProgressBar extends Tonic {
  set value (value) {
    this.setProgress(value)
  }

  get value () {
    if (typeof this.state.progress !== 'undefined') {
      return this.state.progress
    }

    return this.props.progress
  }

  defaults () {
    return {
      width: '280px',
      height: '15px',
      progress: 0
    }
  }

  static stylesheet () {
    return `
      tonic-progress-bar {
        display: inline-block;
        user-select: none;
      }

      tonic-progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--tonic-background, #fff);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--tonic-accent, #f66);
        width: 0%;
        height: 100%;
      }
    `
  }

  styles () {
    const progress = this.state.progress || this.props.progress
    return {
      wrapper: {
        width: this.props.width,
        height: this.props.height
      },
      progress: {
        width: progress + '%',
        backgroundColor: this.props.color || 'var(--tonic-accent, #f66)'
      }
    }
  }

  setProgress (progress) {
    this.state.progress = progress
    this.reRender()
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-progress-bar')
    }

    if (this.props.theme) {
      this.classList.add(`tonic--theme--${this.props.theme}`)
    }

    this.style.width = this.props.width
    this.style.height = this.props.height

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress" styles="progress"></div>
      </div>
    `
  }
}

module.exports = { TonicProgressBar }

},{"../mode":19,"@optoolco/tonic":20}],34:[function(require,module,exports){
let percentage = 0
let interval = null

const progressBar = document.getElementById('progress-bar-example')

document.getElementById('start-progress').addEventListener('click', e => {
  clearInterval(interval)
  interval = setInterval(() => {
    progressBar.setProgress(percentage++)
    if (progressBar.value >= 100) percentage = 0
  }, 128)
})

document.getElementById('stop-progress').addEventListener('click', e => {
  clearInterval(interval)
})

},{}],35:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicRange extends Tonic {
  defaults () {
    return {
      width: '250px',
      disabled: false,
      min: '0',
      max: '100',
      value: '50'
    }
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    this.querySelector('input').value = value
    this.setValue(value)
  }

  setValue (value) {
    const min = this.props.min
    const max = this.props.max

    const input = this.querySelector('input')

    if (this.props.label) {
      const label = this.querySelector('label')
      label.textContent = this.getLabelValue(value)
    }

    input.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'

    this.setState(state => Object.assign({}, state, { value }))
  }

  input (e) {
    this.setValue(e.target.value || this.props.value)
  }

  static stylesheet () {
    return `
      tonic-range  {
        position: relative;
        display: -webkit-flex;
        display: flex;
        height: 50px;
        padding: 20px 0;
      }

      tonic-range label {
        font: 13px var(--tonic-subheader, 'Arial', sans-serif);
        letter-spacing: 1px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      tonic-range input[type="range"] {
        margin: auto;
        padding: 0;
        width: 50%;
        height: 4px;
        background-color: var(--tonic-background, #fff);
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-accent, #f66)), color-stop(100%, var(--tonic-accent, #f66)));
        background-image: -webkit-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: -moz-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: -o-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 0;
        cursor: pointer;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]:disabled {
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-border, #ccc)), color-stop(100%, var(--tonic-border, #ccc)));
        background-image: -webkit-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: -moz-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: -o-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
      }

      tonic-range input[type="range"]::-webkit-slider-runnable-track {
        box-shadow: none;
        border: none;
        background: transparent;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-track {
        box-shadow: none;
        border: none;
        background: transparent;
      }

      tonic-range input[type="range"]::-moz-focus-outer {
        border: 0;
      }

      tonic-range input[type="range"]::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 3px 0px rgba(0,0,0,0.25);
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
      }
    `
  }

  getLabelValue (value) {
    if (this.setLabel) {
      return this.setLabel(value)
    } else if (this.props.label) {
      return this.props.label.replace(/%\w/, value)
    } else {
      return value
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    const value = this.props.value
    return this.html`<label>${this.getLabelValue(value)}</label>`
  }

  styles () {
    const {
      width
    } = this.props

    return {
      width: {
        width
      }
    }
  }

  connected () {
    this.setValue(this.state.value)
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-range')
    }

    const {
      width,
      height,
      disabled,
      theme,
      min,
      max,
      step,
      id,
      tabindex
    } = this.props

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.removeAttribute('tabindex')

    const value = this.props.value || this.state.value
    if (typeof this.state.value === 'undefined') {
      this.state.value = value
    }

    return this.html`
      ${this.renderLabel()}
      <div class="tonic--wrapper" styles="width">
        <input ... ${{
          type: 'range',
          styles: 'width',
          id,
          value,
          tabindex,
          step,
          min,
          max,
          disabled: disabled === 'true'
        }}/>
      </div>
    `
  }
}

module.exports = { TonicRange }

},{"../mode":19,"@optoolco/tonic":20}],36:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],37:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function pad (num) {
  return `0${num}`.slice(-2)
}

function strftime (time, formatString) {
  const day = time.getDay()
  const date = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, (_arg) => {
    let match
    const modifier = _arg[1]

    switch (modifier) {
      case '%':
        return '%'
      case 'a':
        return weekdays[day].slice(0, 3)
      case 'A':
        return weekdays[day]
      case 'b':
        return months[month].slice(0, 3)
      case 'B':
        return months[month]
      case 'c':
        return time.toString()
      case 'd':
        return pad(date)
      case 'e':
        return String(date)
      case 'H':
        return pad(hour)
      case 'I':
        return pad(strftime(time, '%l'))
      case 'l':
        if (hour === 0 || hour === 12) {
          return String(12)
        } else {
          return String((hour + 12) % 12)
        }
      case 'm':
        return pad(month + 1)
      case 'M':
        return pad(minute)
      case 'p':
        if (hour > 11) {
          return 'PM'
        } else {
          return 'AM'
        }
      case 'P':
        if (hour > 11) {
          return 'pm'
        } else {
          return 'am'
        }
      case 'S':
        return pad(second)
      case 'w':
        return String(day)
      case 'y':
        return pad(year % 100)
      case 'Y':
        return String(year)
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/)
        return match ? match[1] : ''
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /)
        return match ? match[1] : ''
    }
    return ''
  })
}

function makeFormatter (options) {
  let format

  return function () {
    if (format) {
      return format
    }

    if ('Intl' in window) {
      try {
        format = new Intl.DateTimeFormat(undefined, options)
        return format
      } catch (e) {
        if (!(e instanceof RangeError)) {
          throw e
        }
      }
    }
  }
}

let dayFirst = null
const dayFirstFormatter = makeFormatter({ day: 'numeric', month: 'short' })

// Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
function isDayFirst () {
  if (dayFirst !== null) {
    return dayFirst
  }

  const formatter = dayFirstFormatter()
  if (formatter) {
    const output = formatter.format(new Date(0))
    dayFirst = !!output.match(/^\d/)
    return dayFirst
  } else {
    return false
  }
}

let yearSeparator = null

const yearFormatter = makeFormatter({
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

// Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
function isYearSeparator () {
  if (yearSeparator !== null) {
    return yearSeparator
  }

  const formatter = yearFormatter()

  if (formatter) {
    const output = formatter.format(new Date(0))
    yearSeparator = !!output.match(/\d,/)
    return yearSeparator
  } else {
    return true
  }
}

function isThisYear (date) {
  const now = new Date()
  return now.getUTCFullYear() === date.getUTCFullYear()
}

function makeRelativeFormat (locale, options) {
  if ('Intl' in window && 'RelativeTimeFormat' in window.Intl) {
    try {
      return new Intl.RelativeTimeFormat(locale, options)
    } catch (e) {
      if (!(e instanceof RangeError)) {
        throw e
      }
    }
  }
}

function localeFromElement (el) {
  const container = el.closest('[lang]')

  if (container instanceof window.HTMLElement && container.lang) {
    return container.lang
  }

  return 'default'
}

class RelativeTime {
  constructor (date, locale) {
    this.date = date
    this.locale = locale
  }

  toString () {
    const ago = this.timeElapsed()

    if (ago) {
      return ago
    }

    const ahead = this.timeAhead()

    if (ahead) {
      return ahead
    } else {
      return `on ${this.formatDate()}`
    }
  }

  get value () {
    return this.date
  }

  timeElapsed ({ date = this.date, locale = this.locale } = {}) {
    const ms = new Date().getTime() - date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)

    if (ms >= 0 && day < 30) {
      return this.timeAgoFromMs({ ms, date, locale })
    } else {
      return null
    }
  }

  timeAhead ({ date = this.date, locale = this.locale } = {}) {
    const ms = date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    if (ms >= 0 && day < 30) {
      return this.timeUntil({ date, locale })
    } else {
      return null
    }
  }

  timeAgo ({ date = this.date, locale = this.locale } = {}) {
    const ms = new Date().getTime() - date.getTime()
    return this.timeAgoFromMs({ ms, date, locale })
  }

  timeAgoFromMs ({ ms, locale = this.locale } = {}) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (ms < 0) {
      return formatRelativeTime(locale, 0, 'second')
    } else if (sec < 10) {
      return formatRelativeTime(locale, 0, 'second')
    } else if (sec < 45) {
      return formatRelativeTime(locale, -sec, 'second')
    } else if (sec < 90) {
      return formatRelativeTime(locale, -min, 'minute')
    } else if (min < 45) {
      return formatRelativeTime(locale, -min, 'minute')
    } else if (min < 90) {
      return formatRelativeTime(locale, -hr, 'hour')
    } else if (hr < 24) {
      return formatRelativeTime(locale, -hr, 'hour')
    } else if (hr < 36) {
      return formatRelativeTime(locale, -day, 'day')
    } else if (day < 30) {
      return formatRelativeTime(locale, -day, 'day')
    } else if (month < 12) {
      return formatRelativeTime(locale, -month, 'month')
    } else if (month < 18) {
      return formatRelativeTime(locale, -year, 'year')
    } else {
      return formatRelativeTime(locale, -year, 'year')
    }
  }

  timeUntil ({ date = this.date, locale = this.locale } = {}) {
    const ms = date.getTime() - new Date().getTime()
    return this.timeUntilFromMs({ ms, locale })
  }

  timeUntilFromMs ({ ms, locale = this.locale } = {}) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (month >= 18) {
      return formatRelativeTime(locale, year, 'year')
    } else if (month >= 12) {
      return formatRelativeTime(locale, year, 'year')
    } else if (day >= 45) {
      return formatRelativeTime(locale, month, 'month')
    } else if (day >= 30) {
      return formatRelativeTime(locale, month, 'month')
    } else if (hr >= 36) {
      return formatRelativeTime(locale, day, 'day')
    } else if (hr >= 24) {
      return formatRelativeTime(locale, day, 'day')
    } else if (min >= 90) {
      return formatRelativeTime(locale, hr, 'hour')
    } else if (min >= 45) {
      return formatRelativeTime(locale, hr, 'hour')
    } else if (sec >= 90) {
      return formatRelativeTime(locale, min, 'minute')
    } else if (sec >= 45) {
      return formatRelativeTime(locale, min, 'minute')
    } else if (sec >= 10) {
      return formatRelativeTime(locale, sec, 'second')
    } else {
      return formatRelativeTime(locale, 0, 'second')
    }
  }

  formatDate ({ date = this.date } = {}) {
    let format = isDayFirst() ? '%e %b' : '%b %e'

    if (!isThisYear(date)) {
      format += isYearSeparator() ? ', %Y' : ' %Y'
    }

    return strftime(date, format)
  }

  formatTime ({ date = this.date } = {}) {
    const formatter = timeFormatter()

    if (formatter) {
      return formatter.format(date)
    } else {
      return strftime(date, '%l:%M%P')
    }
  }
}

function formatRelativeTime (locale, value, unit) {
  const formatter = makeRelativeFormat(locale, { numeric: 'auto' })

  if (formatter) {
    return formatter.format(value, unit)
  } else {
    return formatEnRelativeTime(value, unit)
  }
}

// Simplified "en" RelativeTimeFormat.format function
//
// Values should roughly match
//   new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(value, unit)
//
function formatEnRelativeTime (value, unit) {
  if (value === 0) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `this ${unit}`
      case 'day':
        return 'today'
      case 'hour':
      case 'minute':
        return `in 0 ${unit}s`
      case 'second':
        return 'now'
    }
  } else if (value === 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `next ${unit}`
      case 'day':
        return 'tomorrow'
      case 'hour':
      case 'minute':
      case 'second':
        return `in 1 ${unit}`
    }
  } else if (value === -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `last ${unit}`
      case 'day':
        return 'yesterday'
      case 'hour':
      case 'minute':
      case 'second':
        return `1 ${unit} ago`
    }
  } else if (value > 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `in ${value} ${unit}s`
    }
  } else if (value < -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `${-value} ${unit}s ago`
    }
  }

  throw new RangeError(`Invalid unit argument for format() '${unit}'`)
}

class TonicRelativeTime extends Tonic {
  render () {
    let date = this.props.date || ''
    const locale = this.props.locale || localeFromElement(this)

    if (typeof date === 'string') {
      date = this.props.date = new Date(this.props.date)
    }

    if (date.toString() === 'Invalid Date') {
      date = new Date()
    }

    if (this.props.refresh) {
      this.interval = setInterval(() => {
        this.reRender(props => ({
          ...props,
          date
        }))
      }, +this.props.refresh)
    }

    const t = new RelativeTime(date, locale)
    return t.toString()
  }
}

const timeFormatter = makeFormatter({
  hour: 'numeric',
  minute: '2-digit'
})

module.exports = { TonicRelativeTime, RelativeTime }

},{"@optoolco/tonic":20}],38:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicRouter extends Tonic {
  constructor () {
    super()

    if (TonicRouter.patched) return
    TonicRouter.patched = true

    const patchEvent = function (type) {
      const orig = window.history[type]
      return function (...args) {
        const value = orig.call(this, ...args)

        window.dispatchEvent(new window.Event(type.toLowerCase()))
        TonicRouter.route()

        return value
      }
    }

    window.addEventListener('popstate', e => TonicRouter.route())
    window.history.pushState = patchEvent('pushState')
    window.history.replaceState = patchEvent('replaceState')
  }

  static route (routes, reset) {
    routes = routes || [...document.getElementsByTagName('tonic-router')]
    const keys = []
    let defaultRoute = null
    let hasMatch = false
    TonicRouter.props = {}

    for (const route of routes) {
      const path = route.getAttribute('path')

      route.removeAttribute('match')

      if (!path) {
        defaultRoute = route
        defaultRoute.reRender && defaultRoute.reRender()
        continue
      }

      const matcher = TonicRouter.matcher(path, keys)
      const match = matcher.exec(window.location.pathname)

      if (match) {
        route.setAttribute('match', true)
        hasMatch = true

        match.slice(1).forEach((m, i) => {
          TonicRouter.props[keys[i].name] = m
        })
      } else {
        route.removeAttribute('match')
      }

      if (!reset) {
        route.reRender && route.reRender()
      }
    }

    if (!reset && !hasMatch && defaultRoute) {
      defaultRoute.setAttribute('match', true)
      defaultRoute.reRender && defaultRoute.reRender()
    }
  }

  willConnect () {
    this.template = document.createElement('template')
    this.template.innerHTML = this.innerHTML
    TonicRouter.route([this], true)
  }

  updated () {
    if (this.hasAttribute('match')) {
      this.dispatchEvent(new window.Event('match'))
    }
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-router')
    }

    if (this.hasAttribute('match')) {
      this.setState(TonicRouter.props)
      return this.template.content
    }

    return ''
  }
}

TonicRouter.matcher = (() => {
  //
  // Most of this was lifted from the path-to-regex project which can
  // be found here -> https://github.com/pillarjs/path-to-regexp
  //
  const DEFAULT_DELIMITER = '/'
  const DEFAULT_DELIMITERS = './'

  const PATH_REGEXP = new RegExp([
    '(\\\\.)',
    '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
  ].join('|'), 'g')

  function parse (str, options) {
    const tokens = []
    let key = 0
    let index = 0
    let path = ''
    const defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
    const delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
    let pathEscaped = false
    let res

    while ((res = PATH_REGEXP.exec(str)) !== null) {
      const m = res[0]
      const escaped = res[1]
      const offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        pathEscaped = true
        continue
      }

      let prev = ''
      const next = str[index]
      const name = res[2]
      const capture = res[3]
      const group = res[4]
      const modifier = res[5]

      if (!pathEscaped && path.length) {
        const k = path.length - 1

        if (delimiters.indexOf(path[k]) > -1) {
          prev = path[k]
          path = path.slice(0, k)
        }
      }

      if (path) {
        tokens.push(path)
        path = ''
        pathEscaped = false
      }

      const partial = prev !== '' && next !== undefined && next !== prev
      const repeat = modifier === '+' || modifier === '*'
      const optional = modifier === '?' || modifier === '*'
      const delimiter = prev || defaultDelimiter
      const pattern = capture || group

      tokens.push({
        name: name || key++,
        prefix: prev,
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
      })
    }

    if (path || index < str.length) {
      tokens.push(path + str.substr(index))
    }

    return tokens
  }

  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
  }

  function escapeGroup (group) {
    return group.replace(/([=!:$/()])/g, '\\$1')
  }

  function flags (options) {
    return options && options.sensitive ? '' : 'i'
  }

  function regexpToRegexp (path, keys) {
    if (!keys) return path

    const groups = path.source.match(/\((?!\?)/g)

    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          pattern: null
        })
      }
    }

    return path
  }

  function arrayToRegexp (path, keys, options) {
    const parts = []

    for (let i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }

    return new RegExp('(?:' + parts.join('|') + ')', flags(options))
  }

  function stringToRegexp (path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options)
  }

  function tokensToRegExp (tokens, keys, options) {
    options = options || {}

    const strict = options.strict
    const end = options.end !== false
    const delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
    const delimiters = options.delimiters || DEFAULT_DELIMITERS
    const endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
    let route = ''
    let isEndDelimited = tokens.length === 0

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (typeof token === 'string') {
        route += escapeString(token)
        isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
      } else {
        const prefix = escapeString(token.prefix)
        const capture = token.repeat
          ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
          : token.pattern

        if (keys) keys.push(token)

        if (token.optional) {
          if (token.partial) {
            route += prefix + '(' + capture + ')?'
          } else {
            route += '(?:' + prefix + '(' + capture + '))?'
          }
        } else {
          route += prefix + '(' + capture + ')'
        }
      }
    }

    if (end) {
      if (!strict) route += '(?:' + delimiter + ')?'

      route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
    } else {
      if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
      if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
    }

    return new RegExp('^' + route, flags(options))
  }

  function pathToRegexp (path, keys, options) {
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys)
    }

    if (Array.isArray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
    }

    return stringToRegexp(/** @type {string} */ (path), keys, options)
  }

  return pathToRegexp
})()

module.exports = { TonicRouter }

},{"../mode":19,"@optoolco/tonic":20}],39:[function(require,module,exports){
const select = document.getElementById('tonic-router-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('match', () => {
  const { number } = page2.getState()
  const el = document.getElementById('page2-number')
  el.textContent = number
})

},{}],40:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicSelect extends Tonic {
  defaults () {
    return {
      disabled: false,
      iconArrow: TonicSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  static stylesheet () {
    return `
      tonic-select .tonic--wrapper {
        position: relative;
      }

      tonic-select .tonic--wrapper:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
        z-index: 1;
      }

      tonic-select.tonic--loading {
        pointer-events: none;
        transition: background 0.3s ease;
      }

      tonic-select.tonic--loading select {
        color: transparent;
        background-color: var(--tonic-window, #fff);
        border-color: var(--tonic-border, #ccc);
      }

      tonic-select.tonic--loading .tonic--wrapper:before {
        margin-top: -8px;
        margin-left: -8px;
        display: block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%);
        border: 2px solid var(--tonic-medium, #999);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-select select {
        color: var(--tonic-primary, #333);
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        background-color: var(--tonic-window, #fff);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--tonic-border, #ccc);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
      }

      tonic-select select:not([multiple]) {
        padding: 10px 30px 10px 10px;
      }

      tonic-select select[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-select label {
        color: var(--tonic-medium, #999);
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-select[multiple] select {
        background-image: none !important;
      }

      tonic-select[multiple] select option {
        padding: 6px 10px;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }

  get value () {
    const el = this.querySelector('select')

    if (this.props.multiple === 'true') {
      const value = [...el.options]
        .filter(el => el.selected)
        .map(el => el.getAttribute('value'))
      return value
    }

    return el.value
  }

  selectOptions (value) {
    const el = this.querySelector('select')
    const options = [...el.options]

    options.forEach(el => {
      el.selected = value.findIndex(v => v === el.value) > -1
    })
  }

  set value (value) {
    const multiSelect = (this.props.multiple === 'true') && Array.isArray(value)
    const el = this.root.querySelector('select')

    if (multiSelect) {
      this.selectOptions(value)
    } else if (!value) {
      value = el.selectedIndex
      el.selectedIndex = 0
    } else {
      el.value = value
    }
  }

  get option () {
    const node = this.querySelector('select')
    return node.options[node.selectedIndex]
  }

  get selectedIndex () {
    const node = this.querySelector('select')
    return node.selectedIndex
  }

  set selectedIndex (index) {
    const node = this.querySelector('select')
    node.selectedIndex = index
  }

  loading (state) {
    const method = state ? 'add' : 'remove'
    this.classList[method]('tonic--loading')
  }

  renderLabel () {
    if (!this.props.label) return ''
    return this.html`<label>${this.props.label}</label>`
  }

  styles () {
    const {
      height,
      width,
      padding,
      radius,
      iconArrow
    } = this.props

    return {
      wrapper: {
        width
      },
      select: {
        width,
        height,
        borderRadius: radius,
        padding,
        backgroundImage: `url('${iconArrow}')`
      }
    }
  }

  connected () {
    const value = this.props.value

    if (Array.isArray(value)) {
      this.selectOptions(value)
    } else if (value) {
      const option = this.querySelector(`option[value="${value}"]`)
      if (option) option.setAttribute('selected', true)
    }
  }

  render () {
    const {
      width,
      height,
      disabled,
      required,
      multiple,
      theme,
      name,
      size,
      tabindex
    } = this.props

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.removeAttribute('tabindex')

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        ${this.renderLabel()}
        <select ... ${{
          styles: 'select',
          disabled: disabled === 'true',
          multiple: multiple === 'true',
          name,
          tabindex,
          required,
          size
        }}>
          ${this.childNodes}
        </select>
      </div>
    `
  }
}

TonicSelect.svg = {}
TonicSelect.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
TonicSelect.svg.default = () => TonicSelect.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/>
  </svg>
`)

module.exports = { TonicSelect }

},{"@optoolco/tonic":20}],41:[function(require,module,exports){
const select = document.getElementById('options-example-1')
const notification = document.getElementsByTagName('tonic-toaster')[0]

select.addEventListener('change', ({ target }) => {
  notification.create({
    type: 'success',
    message: `Selected option was "${select.value}".`,
    title: 'Selection',
    duration: 2000
  })
})

},{}],42:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicSprite extends Tonic {
  static stylesheet () {
    return `
      tonic-sprite svg {
        visibility: hidden;
        height: 0;
      }
    `
  }

  render () {
    return this.html`
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">

        <symbol id="close" viewBox="0 0 100 100">
          <title>Close</title>
          <desc>Close Icon</desc>
          <path fill="currentColor" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4
            l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0
            l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
        </symbol>

        <symbol id="danger" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
        </symbol>

        <symbol id="warning" viewBox="0 0 100 100">
          <path fill="currentColor" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
        </symbol>

        <symbol id="success" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
        </symbol>

        <symbol id="info" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
        </symbol>

        <symbol id="profileimage" viewBox="0 0 100 100">
          <rect fill="#F0F0F0" width="100" height="100"></rect>
          <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
          <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
        </symbol>

        <symbol id="edit" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.8,32.8L67.5,20.5c-0.2-0.2-0.5-0.2-0.7,0L25.2,62.1c-0.1,0.1-0.1,0.1-0.1,0.2L20.8,79c0,0.2,0,0.4,0.1,0.5c0.1,0.1,0.2,0.1,0.4,0.1c0,0,0.1,0,0.1,0l16.6-4.4c0.1,0,0.2-0.1,0.2-0.1l41.6-41.6C79.9,33.3,79.9,33,79.8,32.8z M67.1,25.8l7.3,7.3L36.9,70.7l-7.3-7.3L67.1,25.8z M33,72.4l-6.8,1.8l1.8-6.9L33,72.4z"/>
        </symbol>

        <symbol id="checked" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
          <polygon points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
        </symbol>

        <symbol id="unchecked" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
        </symbol>

      </svg>
    `
  }
}

module.exports = { TonicSprite }

},{"@optoolco/tonic":20}],43:[function(require,module,exports){
(function (setImmediate){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicTabs extends Tonic {
  static stylesheet () {
    return `
      tonic-tabs .tonic--tab {
        -webkit-appearance: none;
        user-select: none;
      }
    `
  }

  get value () {
    const currentTab = this.querySelector('[aria-selected="true"]')
    if (currentTab) return currentTab.id
  }

  set selected (value) {
    const tab = document.getElementById(value)
    if (tab) tab.click()
  }

  qsa (s) {
    return [...this.querySelectorAll(s)]
  }

  setVisibility (id) {
    const tabs = this.querySelectorAll('.tonic--tab')

    for (const tab of tabs) {
      const control = tab.getAttribute('for')

      if (!control) {
        throw new Error(`No "for" attribute found for tab id "${tab.id}".`)
      }

      const panel = document.getElementById(control)

      if (!panel) {
        throw new Error(`No panel found that matches the id (${control})`)
      }

      if (tab.id === id) {
        panel.removeAttribute('hidden')
        tab.setAttribute('aria-selected', 'true')
        this.state.selected = id
      } else {
        panel.setAttribute('hidden', '')
        tab.setAttribute('aria-selected', 'false')
      }
    }
  }

  click (e) {
    const tab = Tonic.match(e.target, '.tonic--tab')
    if (!tab) return

    e.preventDefault()
    this.setVisibility(tab.id)
  }

  keydown (e) {
    const triggers = this.qsa('.tonic--tab')

    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        const index = triggers.indexOf(e.target)
        const direction = (e.code === 'ArrowLeft') ? -1 : 1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
        break
      }
      case 'Space': {
        const isActive = Tonic.match(e.target, '.tonic--tab:focus')
        if (!isActive) return

        e.preventDefault()

        const id = isActive.getAttribute('id')
        this.setVisibility(id)
        break
      }
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-tabs')
    }

    this.setAttribute('role', 'tablist')

    return [...this.childNodes].map((node, index) => {
      if (node.nodeType !== 1) return ''

      const ariaControls = node.getAttribute('for')

      if (!ariaControls) {
        return ''
      }

      if (node.attributes.class) {
        node.attributes.class.value += ' tonic--tab'
      }

      return this.html`
        <a
          ...${node.attributes}
          class="tonic--tab"
          href="#"
          role="tab"
          aria-controls="${ariaControls}"
          aria-selected="false">
          ${node.childNodes}
        </a>
      `
    }).join('')
  }
}

class TonicTabPanel extends Tonic {
  static stylesheet () {
    return `
      tonic-tab-panel {
        display: block;
      }
      tonic-tab-panel[hidden] {
        display: none;
      }
    `
  }

  connected () {
    const tab = document.querySelector(`.tonic--tab[for="${this.props.id}"]`)
    if (!tab) return
    const tabid = tab.getAttribute('id')
    this.setAttribute('aria-labelledby', tabid)
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-tab-panel')
    }

    this.setAttribute('role', 'tabpanel')

    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = {
  TonicTabs,
  TonicTabPanel
}

}).call(this,require("timers").setImmediate)
},{"../mode":19,"@optoolco/tonic":20,"timers":26}],44:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],45:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicTextarea extends Tonic {
  defaults () {
    return {
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

  static stylesheet () {
    return `
      tonic-textarea textarea {
        color: var(--tonic-primary, #333);
        width: 100%;
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border, #ccc);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--tonic-primary, #333);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--tonic-danger, #f66);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-textarea label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader,  'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
    `
  }

  styles () {
    const {
      width,
      radius,
      resize
    } = this.props

    return {
      textarea: {
        width,
        borderRadius: radius,
        resize: resize
      }
    }
  }

  get value () {
    return this.querySelector('textarea').value
  }

  set value (value) {
    this.querySelector('textarea').value = value
  }

  renderLabel () {
    if (typeof this.props.label === 'undefined') return ''
    return this.html`
      <label
        for="tonic--textarea_${this.props.id}"
      >${this.props.label}</label>
    `
  }

  willConnect () {
    const {
      value
    } = this.props

    this.props.value = typeof value === 'undefined' ? this.textContent : value
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-text-area')
    }

    const {
      ariaLabelledby,
      autofocus,
      cols,
      height,
      disabled,
      label,
      maxlength,
      minlength,
      name,
      placeholder,
      readonly,
      required,
      rows,
      spellcheck,
      tabindex,
      theme,
      width
    } = this.props

    if (ariaLabelledby) this.removeAttribute('ariaLabelled')
    if (width) this.style.width = width
    if (height) this.style.height = height
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')

    if (this.props.value === 'undefined') this.props.value = ''

    return this.html`
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea ... ${{
          styles: 'textarea',
          id: `tonic--textarea_${this.props.id}`,
          'aria-label': label,
          'aria-labelledby': ariaLabelledby,
          cols,
          disabled: disabled === 'true',
          maxlength,
          minlength,
          name,
          placeholder,
          rows,
          spellcheck,
          tabindex,
          autofocus,
          required,
          readonly
        }}>${this.props.value}</textarea>
      </div>
    `
  }
}

module.exports = { TonicTextarea }

},{"../mode":19,"@optoolco/tonic":20}],46:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],47:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicToasterInline extends Tonic {
  defaults () {
    return {
      display: 'true'
    }
  }

  static stylesheet () {
    return `
      tonic-toaster-inline svg {
        width: inherit;
        height: inherit;
      }

      tonic-toaster-inline .tonic--notification {
        max-height: 0;
        position: relative;
        background-color: var(--tonic-window, #fff);
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 3px;
        -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
        transition: opacity 0.2s ease-in-out 0s, transform 0.3s ease-in-out 0s, max-height 0.3s ease-in-out;
        opacity: 0;
        z-index: -1;
      }

      tonic-toaster-inline .tonic--notification.tonic--show {
        max-height: 100%;
        margin: 10px 0;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
        opacity: 1;
        z-index: 1;
      }

      tonic-toaster-inline .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster-inline .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster-inline .tonic--main {
        padding: 17px 18px 15px 18px;
      }

      tonic-toaster-inline.tonic--dismiss .tonic--main {
        margin-right: 40px;
      }

      tonic-toaster-inline .tonic--title {
        color: var(--tonic-primary, #333);
        font: 14px/18px var(--tonic-subheader, 'Arial', sans-serif);
      }

      tonic-toaster-inline .tonic--message {
        font: 14px/18px var(--tonic-subheader, 'Arial', sans-serif);
        color: var(--tonic-medium, #999);
      }

      tonic-toaster-inline .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster-inline .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
      }
    `
  }

  show () {
    const node = this.querySelector('.tonic--notification')
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.querySelector('.tonic--notification')
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    this.hide()
  }

  connected () {
    this.updated()
  }

  updated () {
    const {
      display,
      duration
    } = this.props

    if (display === 'true') {
      window.requestAnimationFrame(() => this.show())
    }

    if (duration) {
      setTimeout(() => this.hide(), duration)
    }
  }

  renderClose () {
    if (this.props.dismiss !== 'true') {
      return ''
    }

    this.classList.add('tonic--dismiss')

    return this.html`
      <div class="tonic--close">
        <svg>
          <use
            href="#close"
            xlink:href="#close"
            color="var(--tonic-primary, #333)"
            fill="var(--tonic-primary, #333)">
          </use>
        </svg>
      </div>
    `
  }

  renderIcon () {
    const type = this.props.type

    if (!type) return ''
    return this.html`
      <div class="tonic--icon">
        <svg>
          <use
            href="#${type}"
            xlink:href="#${type}"
            color="var(--tonic-${type}, #f66)"
            fill="var(--tonic-${type}, #f66)">
          </use>
        </svg>
      </div>
    `
  }

  styles () {
    return {
      type: {
        'border-color': `var(--tonic-${this.props.type}, #f66)`
      }
    }
  }

  render () {
    const {
      title,
      type,
      message,
      theme
    } = this.props

    if (theme) {
      this.setAttribute('theme', theme)
    }

    const classes = ['tonic--notification']
    if (type) {
      classes.push('tonic--alert', `tonic--${type}`)
    }

    return this.html`
      <div ... ${{
        class: classes.join(' '),
        styles: type ? 'type' : ''
      }}>
        ${this.renderIcon()}
        ${this.renderClose()}
        <div class="tonic--main">
          <div class="tonic--title">
            ${title}
          </div>
          <div class="tonic--message">
            ${message || this.childNodes}
          </div>
        </div>
      </div>
    `
  }
}

module.exports = { TonicToasterInline }

},{"@optoolco/tonic":20}],48:[function(require,module,exports){
const toaster1 = document.getElementById('toaster-1')
const toasterLink1 = document.getElementById('toaster-link-1')

toasterLink1.addEventListener('click', e => toaster1.show())

},{}],49:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicToaster extends Tonic {
  defaults () {
    return {
      position: 'center'
    }
  }

  static stylesheet () {
    return `
      tonic-toaster * {
        box-sizing: border-box;
      }

      tonic-toaster svg {
        width: inherit;
        height: inherit;
      }

      tonic-toaster .tonic--wrapper {
        user-select: none;
        position: fixed;
        top: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        visibility: hidden;
        z-index: 102;
      }

      @media (max-width: 850px) tonic-toaster .tonic--wrapper {
        width: 90%;
      }

      tonic-toaster .tonic--wrapper.tonic--show {
        visibility: visible;
      }

      tonic-toaster .tonic--wrapper.tonic--center {
        left: 50%;
        align-items: center;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
      }

      tonic-toaster .tonic--wrapper.tonic--left {
        align-items: flex-start;
        left: 10px;
      }

      tonic-toaster .tonic--wrapper.tonic--right {
        align-items: flex-end;
        right: 10px;
      }

      tonic-toaster .tonic--notification {
        width: auto;
        max-width: 600px;
        margin-top: 10px;
        position: relative;
        background-color: var(--tonic-window);
        box-shadow: 0px 10px 40px -20px rgba(0,0,0,0.4), 0 0 1px #a2a9b1;
        border-radius: 3px;
        -webkit-transform: translateY(-100px);
        -ms-transform: translateY(-100px);
        transform: translateY(-100px);
        transition: opacity 0.2s ease, transform 0s ease 1s;
        z-index: 1;
        opacity: 0;
      }

      tonic-toaster .tonic--notification.tonic--show {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }

      tonic-toaster .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster .tonic--main {
        padding: 17px 15px 15px 15px;
      }

      tonic-toaster .tonic--title {
        color: var(--tonic-primary);
        font: 14px/18px var(--tonic-subheader);
      }

      tonic-toaster .tonic--message {
        color: var(--tonic-medium);
        font: 14px/18px var(--tonic-body);
      }

      tonic-toaster .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster .tonic--notification .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
      }
    `
  }

  create ({ message, title, duration, type, dismiss } = {}) {
    const notification = document.createElement('div')
    notification.className = 'tonic--notification'

    const main = document.createElement('div')
    main.className = 'tonic--main'

    if (type) {
      notification.classList.add('tonic--alert')
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'tonic--title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'tonic--message'
    messageElement.textContent = message || this.props.message

    if (typeof dismiss === 'string') {
      dismiss = dismiss === 'true'
    }

    if (dismiss !== false) {
      const closeIcon = document.createElement('div')
      closeIcon.className = 'tonic--close'
      notification.appendChild(closeIcon)
      notification.classList.add('tonic--close')

      const svgns = 'http://www.w3.org/2000/svg'
      const xlinkns = 'http://www.w3.org/1999/xlink'
      const svg = document.createElementNS(svgns, 'svg')
      const use = document.createElementNS(svgns, 'use')

      closeIcon.appendChild(svg)
      svg.appendChild(use)

      use.setAttributeNS(xlinkns, 'href', '#close')
      use.setAttributeNS(xlinkns, 'xlink:href', '#close')
      use.setAttribute('color', 'var(--tonic-primary)')
      use.setAttribute('fill', 'var(--tonic-primary)')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'tonic--icon'
      notification.appendChild(alertIcon)

      const svgns = 'http://www.w3.org/2000/svg'
      const xlinkns = 'http://www.w3.org/1999/xlink'
      const svg = document.createElementNS(svgns, 'svg')
      const use = document.createElementNS(svgns, 'use')

      alertIcon.appendChild(svg)
      svg.appendChild(use)

      use.setAttributeNS(xlinkns, 'href', `#${type}`)
      use.setAttributeNS(xlinkns, 'xlink:href', `#${type}`)
      use.setAttribute('color', `var(--tonic-${type})`)
      use.setAttribute('fill', `var(--tonic-${type})`)
    }

    notification.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    this.querySelector('.tonic--wrapper').appendChild(notification)
    this.show()

    setTimeout(() => {
      if (!notification) return
      notification.classList.add('tonic--show')
    }, 64)

    if (duration) {
      setTimeout(() => {
        if (!notification) return
        this.destroy(notification)
      }, duration)
    }
  }

  destroy (el) {
    el.classList.remove('tonic--show')
    el.addEventListener('transitionend', e => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })
  }

  show () {
    const node = this.querySelector('.tonic--wrapper')
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.querySelector('.tonic--wrapper')
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    const notification = el.closest('.tonic--notification')
    if (notification) this.destroy(notification)
  }

  render () {
    const {
      theme,
      position
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const classes = ['tonic--wrapper']
    if (position) classes.push(`tonic--${position}`)

    return this.html`
      <div class="${classes.join(' ')}">
      </div>
    `
  }
}

module.exports = { TonicToaster }

},{"@optoolco/tonic":20}],50:[function(require,module,exports){
const notification = document.querySelector('tonic-toaster')

document
  .getElementById('tonic-toaster-example')
  .addEventListener('click', e => notification.create({
    type: 'success',
    title: 'Greetings',
    message: 'Hello, World'
  }))

},{}],51:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class TonicToggle extends Tonic {
  defaults () {
    return {
      checked: false
    }
  }

  get value () {
    const state = this.getState()
    let value

    if (typeof state.checked !== 'undefined') {
      value = state.checked
    } else {
      value = this.props.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')
    this.state.checked = checked

    this.reRender(props => Object.assign(props, {
      checked
    }))
  }

  static stylesheet () {
    return `
      tonic-toggle .tonic--toggle--wrapper {
        height: 30px;
        position: relative;
      }

      tonic-toggle .tonic--toggle--wrapper > label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 6px;
        display: block;
        user-select: none;
      }

      tonic-toggle .tonic--switch {
        position: absolute;
        left: 0;
        top: 0;
      }

      tonic-toggle .tonic--switch label:before {
        font: bold 12px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
      }

      tonic-toggle .tonic--toggle {
        position: absolute;
        opacity: 0;
        outline: none;
        user-select: none;
        z-index: 1;
      }

      tonic-toggle .tonic--toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--tonic-border, #ccc);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }

      tonic-toggle .tonic--toggle:focus + label {
        outline: -webkit-focus-ring-color auto 5px;
      }

      tonic-toggle .tonic--toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--tonic-border, #ccc);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--tonic-window, #fff);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }

      tonic-toggle .tonic--toggle:disabled {
        cursor: default;
      }

      tonic-toggle .tonic--toggle:disabled + label {
        cursor: default;
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:before {
        content: '';
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:after {
        background-color: var(--tonic-window, #fff);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--tonic-accent, #f66);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--tonic-accent, #f66);
        color: var(--tonic-background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--tonic-background, #fff);
      }
    `
  }

  change (e) {
    this.setState(state => Object.assign({}, state, {
      checked: e.target.checked
    }))
  }

  renderLabel () {
    const {
      id,
      label
    } = this.props

    if (!label) return ''

    return this.html`<label for="tonic--toggle--${id}">${label}</label>`
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on tonic-toggle')
    }

    const {
      id,
      disabled,
      theme,
      tabindex
    } = this.props

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    let checked
    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      checked = this.props.checked === 'true'
    }
    this.state.checked = checked

    return this.html`
      <div class="tonic--toggle--wrapper">
        <div class="tonic--switch">
          <input ... ${{
            type: 'checkbox',
            class: 'tonic--toggle',
            id: `tonic--toggle--${id}`,
            disabled: disabled === 'true',
            tabindex,
            checked
          }}/>
          <label for="tonic--toggle--${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicToggle }

},{"../mode":19,"@optoolco/tonic":20}],52:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],53:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicTooltip extends Tonic {
  connected () {
    const target = this.props.for
    const el = document.getElementById(target)
    let timer = null

    const leave = e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hide()
      }, 256)
    }

    el.addEventListener('mouseenter', e => {
      this.show(el)
    })

    this.addEventListener('mouseenter', e => clearTimeout(timer))
    this.addEventListener('mouseleave', leave)
    el.addEventListener('mouseleave', leave)
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto'
    }
  }

  static stylesheet () {
    return `
      tonic-tooltip .tonic--tooltip {
        color: var(--tonic-primary, #333);
        position: fixed;
        background: var(--tonic-window, #fff);
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 2px;
        transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out, z-index 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      tonic-tooltip .tonic--tooltip.tonic--show {
        visibility: visible;
        opacity: 1;
        z-index: 1;
        box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3);
      }

      tonic-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        z-index: -1;
        background-color: var(--tonic-window, #fff);
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 50%;
      }

      tonic-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        border: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
      }

      tonic-tooltip .tonic--top .tonic--tooltip-arrow {
        margin-bottom: -6px;
        bottom: 100%;
        border-top-color: var(--tonic-border, #ccc);
        border-left-color: var(--tonic-border, #ccc);
      }

      tonic-tooltip .tonic--bottom .tonic--tooltip-arrow {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--tonic-border, #ccc);
        border-right-color: var(--tonic-border, #ccc);
      }
    `
  }

  show (triggerNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.querySelector('.tonic--tooltip')
      const arrow = this.querySelector('.tonic--tooltip-arrow')

      let { top, left } = triggerNode.getBoundingClientRect()

      left += triggerNode.offsetWidth / 2
      left -= tooltip.offsetWidth / 2

      const offset = triggerNode.offsetHeight + (arrow.offsetHeight / 2)

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('tonic--bottom')
        tooltip.classList.add('tonic--top')
        top += offset
      } else {
        tooltip.classList.remove('tonic--top')
        tooltip.classList.add('tonic--bottom')
        top -= offset + tooltip.offsetHeight
      }

      tooltip.style.top = `${top}px`
      tooltip.style.left = `${left}px`

      window.requestAnimationFrame(() => {
        tooltip.classList.add('tonic--show')
      })

      window.addEventListener('mousewheel', e => {
        this.hide()
      }, { once: true })
    }, 256)
  }

  hide () {
    clearTimeout(this.timer)
    const tooltip = this.querySelector('.tonic--tooltip')
    tooltip.classList.remove('tonic--show')
  }

  styles () {
    const {
      width,
      height
    } = this.props

    return {
      tooltip: {
        width,
        height
      }
    }
  }

  render () {
    if (this.props.theme) {
      this.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.html`
      <div class="tonic--tooltip" styles="tooltip">
        ${this.nodes}
        <span class="tonic--tooltip-arrow"></span>
      </div>
    `
  }
}

module.exports = { TonicTooltip }

},{"@optoolco/tonic":20}],54:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],55:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class Windowed extends Tonic {
  get length () {
    return this.rows.length
  }

  defaults () {
    return {
      page: 100,
      rowsPerPage: 100,
      rowPadding: 50,
      rowHeight: 30,
      debug: false
    }
  }

  styles () {
    return {
      inner: {
        position: 'relative'
      },

      outer: {
        width: '100%',
        height: 'inherit',
        overflow: 'auto'
      }
    }
  }

  getRows () {
    return this.rows
  }

  push (o) {
    this.rows = this.rows || []
    this.rows.push(o)
  }

  unshift (o) {
    this.rows = this.rows || []
    this.rows.unshift(o)
  }

  pop () {
    this.rows = this.rows || []
    this.rows.pop()
  }

  shift () {
    this.rows = this.rows || []
    this.rows.shift()
  }

  find (fn) {
    if (!this.rows) return -1
    return this.rows.find(fn)
  }

  findIndex (fn) {
    if (!this.rows) return -1
    return this.rows.findIndex(fn)
  }

  splice (...args) {
    if (!this.rows) return null
    return this.rows.splice(...args)
  }

  async getRow (idx) {
    const el = this.rows[idx]
    return typeof el === 'function' ? el() : el
  }

  async load (rows = []) {
    this.rows = rows
    await this.reRender()

    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    this.outerHeight = outer.offsetHeight

    this.numPages = Math.ceil(this.rows.length / this.props.rowsPerPage)

    this.pages = {}
    this.pagesAvailable = this.pagesAvailable || []
    this.rowHeight = parseInt(this.props.rowHeight, 10)

    const inner = this.querySelector('.tonic--windowed--inner')
    inner.innerHTML = ''
    inner.style.height = `${this.rowHeight * this.rows.length}px`
    this.pageHeight = this.props.rowsPerPage * this.rowHeight
    this.padding = this.props.rowPadding * this.rowHeight

    this.rePaint()
  }

  setHeight (height, { render } = {}) {
    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    outer.style.height = height
    this.outerHeight = outer.offsetHeight

    if (render !== false) {
      this.rePaint()
    }
  }

  getPage (i) {
    let page, state

    if (this.pages[i]) {
      page = this.pages[i]
      state = 'ok'
    } else if (this.pagesAvailable.length) {
      page = this.getAvailablePage(i)
      state = 'old'
    } else {
      page = this.createNewPage(i)
      state = 'fresh'
    }

    this.pages[i] = page

    page.style.height = i < this.numPages - 1
      ? `${this.pageHeight}px`
      : this.getLastPageHeight()

    page.style.top = this.getPageTop(i)
    return [page, state]
  }

  getAvailablePage (i) {
    const page = this.pagesAvailable.pop()
    const inner = this.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    return page
  }

  createNewPage (i) {
    const page = document.createElement('div')

    Object.assign(page.style, {
      position: 'absolute',
      minWidth: '100%',
      className: 'tonic--windowed--page'
    })

    if (this.props.debug) {
      const random = Math.random() * 356
      page.style.backgroundColor = `hsla(${random}, 100%, 50%, 0.5)`
    }

    const inner = this.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    return page
  }

  async rePaint ({ refresh, load } = {}) {
    if (refresh && load !== false) this.load(this.rows)

    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    const viewStart = outer.scrollTop
    const viewEnd = viewStart + this.outerHeight

    const _start = Math.floor((viewStart - this.padding) / this.pageHeight)
    const start = Math.max(_start, 0) || 0

    const _end = Math.floor((viewEnd + this.padding) / this.pageHeight)
    const end = Math.min(_end, this.numPages - 1)
    const pagesRendered = {}

    for (let i = start; i <= end; i++) {
      const [page, state] = this.getPage(i)

      if (state === 'fresh') {
        await this.fillPage(i)
      } else if (refresh || state === 'old') {
        if (this.updateRow) {
          await this.updatePage(i)
        } else {
          page.innerHTML = ''
          await this.fillPage(i)
        }
      }
      pagesRendered[i] = true
    }

    const inner = this.querySelector('.tonic--windowed--inner')

    for (const i of Object.keys(this.pages)) {
      if (pagesRendered[i]) continue

      this.pagesAvailable.push(this.pages[i])
      inner.removeChild(this.pages[i])
      delete this.pages[i]
    }

    if (this.state.scrollTop) {
      outer.scrollTop = this.state.scrollTop
    }
  }

  getPageTop (i) {
    return `${i * this.pageHeight}px`
  }

  getLastPageHeight (i) {
    return `${(this.rows.length % this.props.rowsPerPage) * this.rowHeight}px`
  }

  async fillPage (i) {
    const page = this.pages[i]
    const frag = document.createDocumentFragment()
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    for (let j = i * this.props.rowsPerPage; j < limit; j++) {
      const data = await this.getRow(j)
      if (!data) continue

      const div = document.createElement('div')
      div.innerHTML = this.renderRow(data, j)
      frag.appendChild(div.firstElementChild)
    }

    page.appendChild(frag)
  }

  async updatePage (i) {
    const page = this.pages[i]
    const start = i * parseInt(this.props.rowsPerPage, 10)
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    const inner = this.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.pages[i]
      return
    }

    for (let j = start, rowIdx = 0; j < limit; j++, rowIdx++) {
      if (page.children[rowIdx] && this.updateRow) {
        this.updateRow(await this.getRow(j), j, page.children[rowIdx])
      } else {
        const div = document.createElement('div')
        div.innerHTML = this.renderRow(await this.getRow(j), j)
        page.appendChild(div.firstElementChild)
      }
    }

    while (page.children.length > limit - start) {
      page.removeChild(page.lastChild)
    }
  }

  connected () {
    if (!this.props.data || !this.props.data.length) return
    this.load(this.props.data)
  }

  updated () {
    const outer = this.querySelector('.tonic--windowed--outer')

    outer && outer.addEventListener('scroll', () => {
      this.state.scrollTop = outer.scrollTop
      this.rePaint()
    }, { passive: true })
  }

  renderLoadingState () {
    return this.html`<div class="tonic--windowed--loader"></div>`
  }

  renderEmptyState () {
    return this.html`<div class="tonic--windowed--empty"></div>`
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on windowed')
    }

    if (!this.rows) {
      return this.renderLoadingState()
    }

    if (!this.rows.length) {
      return this.renderEmptyState()
    }

    return this.html`
      <div class="tonic--windowed--outer" styles="outer">
        <div class="tonic--windowed--inner" styles="inner">
        </div>
      </div>
    `
  }
}

module.exports = { Windowed }

},{"../mode":19,"@optoolco/tonic":20}],56:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')
const { Windowed } = require('./index')

class ExampleWindowed extends Windowed {
  async click (e) {
    const row = Tonic.match(e.target, '[data-id]')

    if (row) {
      console.log(await this.getRow(+row.dataset.id))
    }
  }

  //
  // Reuses the same DOM structure
  //
  updateRow (row, index, element) {
    element.children[0].textContent = row.title
    element.children[1].textContent = row.date
    element.children[2].textContent = row.random
  }

  //
  // Creates a new DOM structure
  //
  renderRow (row, index) {
    return `
      <div class="tr" data-id="${row.id}">
        <div class="td">${row.title}</div>
        <div class="td">${row.date}</div>
        <div class="td">${row.random}</div>
      </div>
    `
  }

  render () {
    return `
      <div class="th">
        <div class="td">Title</div>
        <div class="td">Date</div>
        <div class="td">Random</div>
      </div>
      ${super.render()}
    `
  }
}

Tonic.add(ExampleWindowed)

//
// This demo generates the data after you click the overlay instead of
// on page load since 500K rows of data can take a few seconds to create.
//
const windowed = document.getElementsByTagName('example-windowed')[0]
const overlay = document.getElementById('click-to-load')

overlay.addEventListener('click', e => {
  const rows = []

  for (let i = 1; i < 500001; i++) {
    rows.push({
      id: i - 1,
      title: `Row #${i}`,
      date: String(new Date()),
      random: Math.random().toString(16).slice(2)
    })
  }

  overlay.classList.add('hidden')
  windowed.load(rows)
})

},{"./index":55,"@optoolco/tonic":20}]},{},[12]);
