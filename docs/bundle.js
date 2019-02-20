(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const scrollToY = require('scrolltoy')
const { qs, qsa } = require('qs')
const Tonic = require('@conductorlab/tonic')
const nonce = require('./nonce')

const components = require('../..')
const readme = require('./readme')

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
  Tonic.init()

  readme(Tonic)
}

document.addEventListener('DOMContentLoaded', ready)

},{"../..":4,"./nonce":2,"./readme":3,"@conductorlab/tonic":5,"qs":7,"scrolltoy":8}],2:[function(require,module,exports){

    module.exports = 'U29tZSBzdXBlciBzZWNyZXQ='
  
},{}],3:[function(require,module,exports){

    module.exports = Tonic => {
      
        //
        // ./src/badge/readme.js
        //
        if (document.body.dataset.page === 'examples') {
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

        }
      

        //
        // ./src/button/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const button = document.getElementById('tonic-button-example')
button.addEventListener('click', e => {
  setTimeout(() => {
    button.loading(false)
  }, 3e3)
})

        }
      

        //
        // ./src/dialog/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          class TonicDialog extends Tonic.Dialog {
  click (e) {
    if (!Tonic.match(e.target, '#update')) return

    this.reRender(props => ({
      ...props,
      message: `Date stamp ${Date.now()}`
    }))
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message}
      </main>
      <footer>
        <tonic-button id="update">Update</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicDialog)
Tonic.init()

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())

        }
      

        //
        // ./src/input/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const input = document.getElementById('tonic-input-example')
const span = document.getElementById('tonic-input-state')

const listener = e => {
  const state = input.getState()
  span.textContent = `Value: "${state.value || 'Empty'}", Focus: ${state.focus}`
}

input.addEventListener('input', listener)
input.addEventListener('blur', listener)
input.addEventListener('focus', listener)

        }
      

        //
        // ./src/panel/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const fetch = require('node-fetch')

class TonicPanel extends Tonic.Panel {
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

  render () {
    return `
      <header></header>
      <main>
        <h3>${this.props.title || 'Hello'}
        <p>${this.props.extract || 'Click "get" to fetch the content from Wikipedia.'}</p>
      </main>
      <footer>
        <tonic-button value="close">Close</tonic-button>
        <tonic-button value="get" async="true">Get</tonic-button>
      </footer>
    `
  }
}

Tonic.add(TonicPanel)
Tonic.init()

//
// For this example, a button element will trigger the
// `.show()` method on the panel when it is clicked.
//
const panelLink = document.getElementById('content-panel-link-example')
const panel = document.getElementById('content-panel-example')

panelLink.addEventListener('click', e => panel.show())

        }
      

        //
        // ./src/profile-image/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const profile = document.getElementById('profile-image-example-editable')

profile.addEventListener('change', e => console.log(e.data))
profile.addEventListener('error', e => console.log(e.message))

        }
      

        //
        // ./src/progress-bar/readme.js
        //
        if (document.body.dataset.page === 'examples') {
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

        }
      

        //
        // ./src/router/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const select = document.getElementById('tonic-router-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('match', () => {
  const { number } = page2.getProps()
  const el = document.getElementById('page2-number')
  el.textContent = number
})

        }
      

        //
        // ./src/select/readme.js
        //
        if (document.body.dataset.page === 'examples') {
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

        }
      

        //
        // ./src/toaster/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const notification = document.querySelector('tonic-toaster')

document
  .getElementById('tonic-toaster-example')
  .addEventListener('click', e => notification.create({
    type: 'success',
    title: 'Greetings',
    message: 'Hello, World'
  }))

        }
      

        //
        // ./src/toaster-inline/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const toaster1 = document.getElementById('toaster-1')
const toasterLink1 = document.getElementById('toaster-link-1')

toasterLink1.addEventListener('click', e => toaster1.show())

        }
      

        //
        // ./src/windowed/readme.js
        //
        if (document.body.dataset.page === 'examples') {
          const Tonic = require('@conductorlab/tonic')

class TonicWindowed extends Tonic.Windowed {
  async click (e) {
    const row = Tonic.match(e.target, '[data-id]')

    if (row) {
      console.log(await this.getRow(+row.dataset.id))
    }
  }

  renderRow (row) {
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

Tonic.add(TonicWindowed)
Tonic.init()

//
// This demo generates the data after you click the overlay instead of
// on page load since 500K rows of data can take a few seconds to create.
//
const windowed = document.getElementsByTagName('tonic-windowed')[0]
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

        }
      
    }
  
},{"@conductorlab/tonic":5,"node-fetch":6}],4:[function(require,module,exports){
(function (global){

    //
    // Warning: Do not edit, use 'npm run build'.
    //
    module.exports = (Tonic, nonce) => {
      if (nonce) Tonic.nonce = nonce

      class TonicBadge extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.state.count = this.props.count

    const that = this

    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

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

  stylesheet () {
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
        background-color: var(--background);
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
        background-color: var(--notification);
        border: 2px solid var(--background);
        border-radius: 50%;
      }

      tonic-badge .tonic--notifications.tonic--new span:after {
        display: block;
      }

      tonic-badge span {
        color: var(--primary);
        font: 15px var(--subheader);
        letter-spacing: 1px;
        text-align: center;
      }
    `
  }

  render () {
    let {
      theme
    } = this.props

    let count = this.state.count

    if (typeof count === 'undefined') {
      count = this.props.count
    }

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const countAttr = (count > 99) ? '99' : count

    const newAttr = (count > 0) ? 'tonic--new' : ''

    return `
      <div class="tonic--notifications ${newAttr}">
        <span>${countAttr}</span>
      </div>
    `
  }
}

Tonic.add(TonicBadge)

class TonicButton extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.loading = (state) => this.loading(state)

    const that = this

    Object.defineProperty(this.root, 'value', {
      get () { return that.props.value }
    })

    Object.defineProperty(this.root, 'disabled', {
      get () { return that.props.disabled === true },
      set (state) { that.props.disabled = state }
    })
  }

  defaults () {
    return {
      height: '40px',
      width: '150px',
      margin: '5px',
      autofocus: 'false',
      async: 'false',
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--disabled)',
      backgroundColor: 'transparent'
    }
  }

  stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--button);
        width: auto;
        min-height: 40px;
        font: 12px var(--subheader);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--button);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--medium);
        background-color: var(--background);
        border-color: var(--background);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--window) !important;
        background-color: var(--button) !important;
        border-color: var(--button) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--medium);
        border-color: var(--medium);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--medium) !important;
        border-color: var(--medium) !important;
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
    window.requestAnimationFrame(() => {
      if (!this.root) return
      const button = this.root.querySelector('button')
      const method = state ? 'add' : 'remove'
      if (button) button.classList[method]('tonic--loading')
    })
  }

  click (e) {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async === 'true'
    const href = this.props.href

    if (async && !disabled) {
      this.loading(true)
    }

    if (href) window.open(href)
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

    const disabledAttr = disabled && disabled !== 'false' ? 'disabled' : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    let classes = []

    if (active) classes.push(`tonic--active`)
    classes = classes.join(' ')

    if (tabindex) this.root.removeAttribute('tabindex')

    const label = this.root.textContent || type || 'Button'

    const attributes = [
      valueAttr,
      typeAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--button--wrapper" styles="wrapper">
        <button
          styles="button"
          async="${async}"
          ${disabledAttr}
          autofocus="${autofocus}"
          alt="${label}"
          ${attributes}
          class="${classes}">${label}</button>
      </div>
    `
  }
}

Tonic.add(TonicButton)

class TonicChart extends Tonic { /* global Tonic */
  constructor (opts) {
    super(opts)

    this.root.draw = (...args) => this.draw(...args)
  }

  stylesheet () {
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

  draw (data, options = this.props.options) {
    const root = this.root.querySelector('canvas')

    //
    // Add a few sensible defaults, but allow the user to
    // override everything by passing in their own options.
    //
    let tooltipEnabled = true
    let lineWidth = 1

    if (typeof this.props.tooltip !== 'undefined') {
      tooltipEnabled = this.props.tooltip === 'true'
    }

    if (typeof this.props.lineWidth !== 'undefined') {
      lineWidth = parseInt(this.props.lineWidth, 10)
    }

    const defaults = {
      tooltips: {
        enabled: tooltipEnabled
      },
      drawTicks: this.props.drawTicks === 'true',
      drawBorder: this.props.drawBorder === 'true',
      legend: { display: this.props.legend },
      title: {
        display: !!this.props.title,
        text: this.props.title
      }
    }

    const mergedOptions = Object.assign({}, defaults, options)

    //
    // Create the chart by passing the options and data.
    //
    if (!window.ChartJS) {
      //
      // ChartJS will violate your CSPs. So, only allow it's code to be run if
      // you actually instantiate a chart.
      //
      !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Chart=t()}}(function(){return function t(e,i,n){function a(r,s){if(!i[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(o)return o(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var d=i[r]={exports:{}};e[r][0].call(d.exports,function(t){var i=e[r][1][t];return a(i||t)},d,d.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)a(n[r]);return a}({1:[function(t,e,i){},{}],2:[function(t,e,i){var n=t(6);function a(t){if(t){var e=[0,0,0],i=1,a=t.match(/^#([a-fA-F0-9]{3})$/i);if(a){a=a[1];for(var o=0;o<e.length;o++)e[o]=parseInt(a[o]+a[o],16)}else if(a=t.match(/^#([a-fA-F0-9]{6})$/i)){a=a[1];for(o=0;o<e.length;o++)e[o]=parseInt(a.slice(2*o,2*o+2),16)}else if(a=t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(o=0;o<e.length;o++)e[o]=parseInt(a[o+1]);i=parseFloat(a[4])}else if(a=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(o=0;o<e.length;o++)e[o]=Math.round(2.55*parseFloat(a[o+1]));i=parseFloat(a[4])}else if(a=t.match(/(\w+)/)){if("transparent"==a[1])return[0,0,0,0];if(!(e=n[a[1]]))return}for(o=0;o<e.length;o++)e[o]=d(e[o],0,255);return i=i||0==i?d(i,0,1):1,e[3]=i,e}}function o(t){if(t){var e=t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var i=parseFloat(e[4]);return[d(parseInt(e[1]),0,360),d(parseFloat(e[2]),0,100),d(parseFloat(e[3]),0,100),d(isNaN(i)?1:i,0,1)]}}}function r(t){if(t){var e=t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var i=parseFloat(e[4]);return[d(parseInt(e[1]),0,360),d(parseFloat(e[2]),0,100),d(parseFloat(e[3]),0,100),d(isNaN(i)?1:i,0,1)]}}}function s(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function l(t,e){return"rgba("+Math.round(t[0]/255*100)+"%, "+Math.round(t[1]/255*100)+"%, "+Math.round(t[2]/255*100)+"%, "+(e||t[3]||1)+")"}function u(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function d(t,e,i){return Math.min(Math.max(e,t),i)}function c(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}e.exports={getRgba:a,getHsla:o,getRgb:function(t){var e=a(t);return e&&e.slice(0,3)},getHsl:function(t){var e=o(t);return e&&e.slice(0,3)},getHwb:r,getAlpha:function(t){var e=a(t);{if(e)return e[3];if(e=o(t))return e[3];if(e=r(t))return e[3]}},hexString:function(t){return"#"+c(t[0])+c(t[1])+c(t[2])},rgbString:function(t,e){if(e<1||t[3]&&t[3]<1)return s(t,e);return"rgb("+t[0]+", "+t[1]+", "+t[2]+")"},rgbaString:s,percentString:function(t,e){if(e<1||t[3]&&t[3]<1)return l(t,e);var i=Math.round(t[0]/255*100),n=Math.round(t[1]/255*100),a=Math.round(t[2]/255*100);return"rgb("+i+"%, "+n+"%, "+a+"%)"},percentaString:l,hslString:function(t,e){if(e<1||t[3]&&t[3]<1)return u(t,e);return"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"},hslaString:u,hwbString:function(t,e){void 0===e&&(e=void 0!==t[3]?t[3]:1);return"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"},keyword:function(t){return h[t.slice(0,3)]}};var h={};for(var f in n)h[n[f]]=f},{6:6}],3:[function(t,e,i){var n=t(5),a=t(2),o=function(t){return t instanceof o?t:this instanceof o?(this.valid=!1,this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1},void("string"==typeof t?(e=a.getRgba(t))?this.setValues("rgb",e):(e=a.getHsla(t))?this.setValues("hsl",e):(e=a.getHwb(t))&&this.setValues("hwb",e):"object"==typeof t&&(void 0!==(e=t).r||void 0!==e.red?this.setValues("rgb",e):void 0!==e.l||void 0!==e.lightness?this.setValues("hsl",e):void 0!==e.v||void 0!==e.value?this.setValues("hsv",e):void 0!==e.w||void 0!==e.whiteness?this.setValues("hwb",e):void 0===e.c&&void 0===e.cyan||this.setValues("cmyk",e)))):new o(t);var e};o.prototype={isValid:function(){return this.valid},rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t=(t%=360)<0?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return a.hexString(this.values.rgb)},rgbString:function(){return a.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return a.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return a.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return a.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return a.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return a.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return a.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],i=0;i<t.length;i++){var n=t[i]/255;e[i]=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),i=t.luminosity();return e>i?(e+.05)/(i+.05):(i+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb;return(299*t[0]+587*t[1]+114*t[2])/1e3<128},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;e<3;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,i=(e[0]+t)%360;return e[0]=i<0?360+i:i,this.setValues("hsl",e),this},mix:function(t,e){var i=this,n=t,a=void 0===e?.5:e,o=2*a-1,r=i.alpha()-n.alpha(),s=((o*r==-1?o:(o+r)/(1+o*r))+1)/2,l=1-s;return this.rgb(s*i.red()+l*n.red(),s*i.green()+l*n.green(),s*i.blue()+l*n.blue()).alpha(i.alpha()*a+n.alpha()*(1-a))},toJSON:function(){return this.rgb()},clone:function(){var t,e,i=new o,n=this.values,a=i.values;for(var r in n)n.hasOwnProperty(r)&&(t=n[r],"[object Array]"===(e={}.toString.call(t))?a[r]=t.slice(0):"[object Number]"===e?a[r]=t:console.error("unexpected color value:",t));return i}},o.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},o.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},o.prototype.getValues=function(t){for(var e=this.values,i={},n=0;n<t.length;n++)i[t.charAt(n)]=e[t][n];return 1!==e.alpha&&(i.a=e.alpha),i},o.prototype.setValues=function(t,e){var i,a,o=this.values,r=this.spaces,s=this.maxes,l=1;if(this.valid=!0,"alpha"===t)l=e;else if(e.length)o[t]=e.slice(0,t.length),l=e[t.length];else if(void 0!==e[t.charAt(0)]){for(i=0;i<t.length;i++)o[t][i]=e[t.charAt(i)];l=e.a}else if(void 0!==e[r[t][0]]){var u=r[t];for(i=0;i<t.length;i++)o[t][i]=e[u[i]];l=e.alpha}if(o.alpha=Math.max(0,Math.min(1,void 0===l?o.alpha:l)),"alpha"===t)return!1;for(i=0;i<t.length;i++)a=Math.max(0,Math.min(s[t][i],o[t][i])),o[t][i]=Math.round(a);for(var d in r)d!==t&&(o[d]=n[t][d](o[t]));return!0},o.prototype.setSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i),this)},o.prototype.setChannel=function(t,e,i){var n=this.values[t];return void 0===i?n[e]:i===n[e]?this:(n[e]=i,this.setValues(t,n),this)},"undefined"!=typeof window&&(window.Color=o),e.exports=o},{2:2,5:5}],4:[function(t,e,i){function n(t){var e,i,n=t[0]/255,a=t[1]/255,o=t[2]/255,r=Math.min(n,a,o),s=Math.max(n,a,o),l=s-r;return s==r?e=0:n==s?e=(a-o)/l:a==s?e=2+(o-n)/l:o==s&&(e=4+(n-a)/l),(e=Math.min(60*e,360))<0&&(e+=360),i=(r+s)/2,[e,100*(s==r?0:i<=.5?l/(s+r):l/(2-s-r)),100*i]}function a(t){var e,i,n=t[0],a=t[1],o=t[2],r=Math.min(n,a,o),s=Math.max(n,a,o),l=s-r;return i=0==s?0:l/s*1e3/10,s==r?e=0:n==s?e=(a-o)/l:a==s?e=2+(o-n)/l:o==s&&(e=4+(n-a)/l),(e=Math.min(60*e,360))<0&&(e+=360),[e,i,s/255*1e3/10]}function o(t){var e=t[0],i=t[1],a=t[2];return[n(t)[0],100*(1/255*Math.min(e,Math.min(i,a))),100*(a=1-1/255*Math.max(e,Math.max(i,a)))]}function s(t){var e,i=t[0]/255,n=t[1]/255,a=t[2]/255;return[100*((1-i-(e=Math.min(1-i,1-n,1-a)))/(1-e)||0),100*((1-n-e)/(1-e)||0),100*((1-a-e)/(1-e)||0),100*e]}function l(t){return C[JSON.stringify(t)]}function u(t){var e=t[0]/255,i=t[1]/255,n=t[2]/255;return[100*(.4124*(e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92)+.3576*(i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92)+.1805*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)),100*(.2126*e+.7152*i+.0722*n),100*(.0193*e+.1192*i+.9505*n)]}function d(t){var e=u(t),i=e[0],n=e[1],a=e[2];return n/=100,a/=108.883,i=(i/=95.047)>.008856?Math.pow(i,1/3):7.787*i+16/116,[116*(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116)-16,500*(i-n),200*(n-(a=a>.008856?Math.pow(a,1/3):7.787*a+16/116))]}function c(t){var e,i,n,a,o,r=t[0]/360,s=t[1]/100,l=t[2]/100;if(0==s)return[o=255*l,o,o];e=2*l-(i=l<.5?l*(1+s):l+s-l*s),a=[0,0,0];for(var u=0;u<3;u++)(n=r+1/3*-(u-1))<0&&n++,n>1&&n--,o=6*n<1?e+6*(i-e)*n:2*n<1?i:3*n<2?e+(i-e)*(2/3-n)*6:e,a[u]=255*o;return a}function h(t){var e=t[0]/60,i=t[1]/100,n=t[2]/100,a=Math.floor(e)%6,o=e-Math.floor(e),r=255*n*(1-i),s=255*n*(1-i*o),l=255*n*(1-i*(1-o));n*=255;switch(a){case 0:return[n,l,r];case 1:return[s,n,r];case 2:return[r,n,l];case 3:return[r,s,n];case 4:return[l,r,n];case 5:return[n,r,s]}}function f(t){var e,i,n,a,o=t[0]/360,s=t[1]/100,l=t[2]/100,u=s+l;switch(u>1&&(s/=u,l/=u),n=6*o-(e=Math.floor(6*o)),0!=(1&e)&&(n=1-n),a=s+n*((i=1-l)-s),e){default:case 6:case 0:r=i,g=a,b=s;break;case 1:r=a,g=i,b=s;break;case 2:r=s,g=i,b=a;break;case 3:r=s,g=a,b=i;break;case 4:r=a,g=s,b=i;break;case 5:r=i,g=s,b=a}return[255*r,255*g,255*b]}function p(t){var e=t[0]/100,i=t[1]/100,n=t[2]/100,a=t[3]/100;return[255*(1-Math.min(1,e*(1-a)+a)),255*(1-Math.min(1,i*(1-a)+a)),255*(1-Math.min(1,n*(1-a)+a))]}function m(t){var e,i,n,a=t[0]/100,o=t[1]/100,r=t[2]/100;return i=-.9689*a+1.8758*o+.0415*r,n=.0557*a+-.204*o+1.057*r,e=(e=3.2406*a+-1.5372*o+-.4986*r)>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,[255*(e=Math.min(Math.max(0,e),1)),255*(i=Math.min(Math.max(0,i),1)),255*(n=Math.min(Math.max(0,n),1))]}function v(t){var e=t[0],i=t[1],n=t[2];return i/=100,n/=108.883,e=(e/=95.047)>.008856?Math.pow(e,1/3):7.787*e+16/116,[116*(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116)-16,500*(e-i),200*(i-(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116))]}function x(t){var e,i,n,a,o=t[0],r=t[1],s=t[2];return o<=8?a=(i=100*o/903.3)/100*7.787+16/116:(i=100*Math.pow((o+16)/116,3),a=Math.pow(i/100,1/3)),[e=e/95.047<=.008856?e=95.047*(r/500+a-16/116)/7.787:95.047*Math.pow(r/500+a,3),i,n=n/108.883<=.008859?n=108.883*(a-s/200-16/116)/7.787:108.883*Math.pow(a-s/200,3)]}function y(t){var e,i=t[0],n=t[1],a=t[2];return(e=360*Math.atan2(a,n)/2/Math.PI)<0&&(e+=360),[i,Math.sqrt(n*n+a*a),e]}function k(t){return m(x(t))}function M(t){var e,i=t[0],n=t[1];return e=t[2]/360*2*Math.PI,[i,n*Math.cos(e),n*Math.sin(e)]}function w(t){return S[t]}e.exports={rgb2hsl:n,rgb2hsv:a,rgb2hwb:o,rgb2cmyk:s,rgb2keyword:l,rgb2xyz:u,rgb2lab:d,rgb2lch:function(t){return y(d(t))},hsl2rgb:c,hsl2hsv:function(t){var e=t[0],i=t[1]/100,n=t[2]/100;if(0===n)return[0,0,0];return[e,100*(2*(i*=(n*=2)<=1?n:2-n)/(n+i)),100*((n+i)/2)]},hsl2hwb:function(t){return o(c(t))},hsl2cmyk:function(t){return s(c(t))},hsl2keyword:function(t){return l(c(t))},hsv2rgb:h,hsv2hsl:function(t){var e,i,n=t[0],a=t[1]/100,o=t[2]/100;return e=a*o,[n,100*(e=(e/=(i=(2-a)*o)<=1?i:2-i)||0),100*(i/=2)]},hsv2hwb:function(t){return o(h(t))},hsv2cmyk:function(t){return s(h(t))},hsv2keyword:function(t){return l(h(t))},hwb2rgb:f,hwb2hsl:function(t){return n(f(t))},hwb2hsv:function(t){return a(f(t))},hwb2cmyk:function(t){return s(f(t))},hwb2keyword:function(t){return l(f(t))},cmyk2rgb:p,cmyk2hsl:function(t){return n(p(t))},cmyk2hsv:function(t){return a(p(t))},cmyk2hwb:function(t){return o(p(t))},cmyk2keyword:function(t){return l(p(t))},keyword2rgb:w,keyword2hsl:function(t){return n(w(t))},keyword2hsv:function(t){return a(w(t))},keyword2hwb:function(t){return o(w(t))},keyword2cmyk:function(t){return s(w(t))},keyword2lab:function(t){return d(w(t))},keyword2xyz:function(t){return u(w(t))},xyz2rgb:m,xyz2lab:v,xyz2lch:function(t){return y(v(t))},lab2xyz:x,lab2rgb:k,lab2lch:y,lch2lab:M,lch2xyz:function(t){return x(M(t))},lch2rgb:function(t){return k(M(t))}};var S={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},C={};for(var _ in S)C[JSON.stringify(S[_])]=_},{}],5:[function(t,e,i){var n=t(4),a=function(){return new u};for(var o in n){a[o+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),n[t](e)}}(o);var r=/(\w+)2(\w+)/.exec(o),s=r[1],l=r[2];(a[s]=a[s]||{})[l]=a[o]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var i=n[t](e);if("string"==typeof i||void 0===i)return i;for(var a=0;a<i.length;a++)i[a]=Math.round(i[a]);return i}}(o)}var u=function(){this.convs={}};u.prototype.routeSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i))},u.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},u.prototype.getValues=function(t){var e=this.convs[t];if(!e){var i=this.space,n=this.convs[i];e=a[i][t](n),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){u.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=a},{4:4}],6:[function(t,e,i){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],7:[function(t,e,i){var n=t(29)();n.helpers=t(45),t(27)(n),n.defaults=t(25),n.Element=t(26),n.elements=t(40),n.Interaction=t(28),n.layouts=t(30),n.platform=t(48),n.plugins=t(31),n.Ticks=t(34),t(22)(n),t(23)(n),t(24)(n),t(33)(n),t(32)(n),t(35)(n),t(55)(n),t(53)(n),t(54)(n),t(56)(n),t(57)(n),t(58)(n),t(15)(n),t(16)(n),t(17)(n),t(18)(n),t(19)(n),t(20)(n),t(21)(n),t(8)(n),t(9)(n),t(10)(n),t(11)(n),t(12)(n),t(13)(n),t(14)(n);var a=t(49);for(var o in a)a.hasOwnProperty(o)&&n.plugins.register(a[o]);n.platform.initialize(),e.exports=n,"undefined"!=typeof window&&(window.Chart=n),n.Legend=a.legend._element,n.Title=a.title._element,n.pluginService=n.plugins,n.PluginBase=n.Element.extend({}),n.canvasHelpers=n.helpers.canvas,n.layoutService=n.layouts},{10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,40:40,45:45,48:48,49:49,53:53,54:54,55:55,56:56,57:57,58:58,8:8,9:9}],8:[function(t,e,i){"use strict";e.exports=function(t){t.Bar=function(e,i){return i.type="bar",new t(e,i)}}},{}],9:[function(t,e,i){"use strict";e.exports=function(t){t.Bubble=function(e,i){return i.type="bubble",new t(e,i)}}},{}],10:[function(t,e,i){"use strict";e.exports=function(t){t.Doughnut=function(e,i){return i.type="doughnut",new t(e,i)}}},{}],11:[function(t,e,i){"use strict";e.exports=function(t){t.Line=function(e,i){return i.type="line",new t(e,i)}}},{}],12:[function(t,e,i){"use strict";e.exports=function(t){t.PolarArea=function(e,i){return i.type="polarArea",new t(e,i)}}},{}],13:[function(t,e,i){"use strict";e.exports=function(t){t.Radar=function(e,i){return i.type="radar",new t(e,i)}}},{}],14:[function(t,e,i){"use strict";e.exports=function(t){t.Scatter=function(e,i){return i.type="scatter",new t(e,i)}}},{}],15:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("bar",{hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,offset:!0,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}}),n._set("horizontalBar",{hover:{mode:"index",axis:"y"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,offset:!0,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(t,e){var i="";return t.length>0&&(t[0].yLabel?i=t[0].yLabel:e.labels.length>0&&t[0].index<e.labels.length&&(i=e.labels[t[0].index])),i},label:function(t,e){return(e.datasets[t.datasetIndex].label||"")+": "+t.xLabel}},mode:"index",axis:"y"}}),e.exports=function(t){t.controllers.bar=t.DatasetController.extend({dataElementType:a.Rectangle,initialize:function(){var e;t.DatasetController.prototype.initialize.apply(this,arguments),(e=this.getMeta()).stack=this.getDataset().stack,e.bar=!0},update:function(t){var e,i,n=this.getMeta().data;for(this._ruler=this.getRuler(),e=0,i=n.length;e<i;++e)this.updateElement(n[e],e,t)},updateElement:function(t,e,i){var n=this,a=n.chart,r=n.getMeta(),s=n.getDataset(),l=t.custom||{},u=a.options.elements.rectangle;t._xScale=n.getScaleForId(r.xAxisID),t._yScale=n.getScaleForId(r.yAxisID),t._datasetIndex=n.index,t._index=e,t._model={datasetLabel:s.label,label:a.data.labels[e],borderSkipped:l.borderSkipped?l.borderSkipped:u.borderSkipped,backgroundColor:l.backgroundColor?l.backgroundColor:o.valueAtIndexOrDefault(s.backgroundColor,e,u.backgroundColor),borderColor:l.borderColor?l.borderColor:o.valueAtIndexOrDefault(s.borderColor,e,u.borderColor),borderWidth:l.borderWidth?l.borderWidth:o.valueAtIndexOrDefault(s.borderWidth,e,u.borderWidth)},n.updateElementGeometry(t,e,i),t.pivot()},updateElementGeometry:function(t,e,i){var n=this,a=t._model,o=n.getValueScale(),r=o.getBasePixel(),s=o.isHorizontal(),l=n._ruler||n.getRuler(),u=n.calculateBarValuePixels(n.index,e),d=n.calculateBarIndexPixels(n.index,e,l);a.horizontal=s,a.base=i?r:u.base,a.x=s?i?r:u.head:d.center,a.y=s?d.center:i?r:u.head,a.height=s?d.size:void 0,a.width=s?void 0:d.size},getValueScaleId:function(){return this.getMeta().yAxisID},getIndexScaleId:function(){return this.getMeta().xAxisID},getValueScale:function(){return this.getScaleForId(this.getValueScaleId())},getIndexScale:function(){return this.getScaleForId(this.getIndexScaleId())},_getStacks:function(t){var e,i,n=this.chart,a=this.getIndexScale().options.stacked,o=void 0===t?n.data.datasets.length:t+1,r=[];for(e=0;e<o;++e)(i=n.getDatasetMeta(e)).bar&&n.isDatasetVisible(e)&&(!1===a||!0===a&&-1===r.indexOf(i.stack)||void 0===a&&(void 0===i.stack||-1===r.indexOf(i.stack)))&&r.push(i.stack);return r},getStackCount:function(){return this._getStacks().length},getStackIndex:function(t,e){var i=this._getStacks(t),n=void 0!==e?i.indexOf(e):-1;return-1===n?i.length-1:n},getRuler:function(){var t,e,i=this.getIndexScale(),n=this.getStackCount(),a=this.index,r=i.isHorizontal(),s=r?i.left:i.top,l=s+(r?i.width:i.height),u=[];for(t=0,e=this.getMeta().data.length;t<e;++t)u.push(i.getPixelForValue(null,t,a));return{min:o.isNullOrUndef(i.options.barThickness)?function(t,e){var i,n,a,o,r=t.isHorizontal()?t.width:t.height,s=t.getTicks();for(a=1,o=e.length;a<o;++a)r=Math.min(r,e[a]-e[a-1]);for(a=0,o=s.length;a<o;++a)n=t.getPixelForTick(a),r=a>0?Math.min(r,n-i):r,i=n;return r}(i,u):-1,pixels:u,start:s,end:l,stackCount:n,scale:i}},calculateBarValuePixels:function(t,e){var i,n,a,o,r,s,l=this.chart,u=this.getMeta(),d=this.getValueScale(),c=l.data.datasets,h=d.getRightValue(c[t].data[e]),f=d.options.stacked,g=u.stack,p=0;if(f||void 0===f&&void 0!==g)for(i=0;i<t;++i)(n=l.getDatasetMeta(i)).bar&&n.stack===g&&n.controller.getValueScaleId()===d.id&&l.isDatasetVisible(i)&&(a=d.getRightValue(c[i].data[e]),(h<0&&a<0||h>=0&&a>0)&&(p+=a));return o=d.getPixelForValue(p),{size:s=((r=d.getPixelForValue(p+h))-o)/2,base:o,head:r,center:r+s/2}},calculateBarIndexPixels:function(t,e,i){var n,a,r,s,l,u,d,c,h,f,g,p,m,v,b,x,y,k=i.scale.options,M="flex"===k.barThickness?(h=e,g=k,m=(f=i).pixels,v=m[h],b=h>0?m[h-1]:null,x=h<m.length-1?m[h+1]:null,y=g.categoryPercentage,null===b&&(b=v-(null===x?f.end-v:x-v)),null===x&&(x=v+v-b),p=v-(v-b)/2*y,{chunk:(x-b)/2*y/f.stackCount,ratio:g.barPercentage,start:p}):(n=e,a=i,u=(r=k).barThickness,d=a.stackCount,c=a.pixels[n],o.isNullOrUndef(u)?(s=a.min*r.categoryPercentage,l=r.barPercentage):(s=u*d,l=1),{chunk:s/d,ratio:l,start:c-s/2}),w=this.getStackIndex(t,this.getMeta().stack),S=M.start+M.chunk*w+M.chunk/2,C=Math.min(o.valueOrDefault(k.maxBarThickness,1/0),M.chunk*M.ratio);return{base:S-C/2,head:S+C/2,center:S,size:C}},draw:function(){var t=this.chart,e=this.getValueScale(),i=this.getMeta().data,n=this.getDataset(),a=i.length,r=0;for(o.canvas.clipArea(t.ctx,t.chartArea);r<a;++r)isNaN(e.getRightValue(n.data[r]))||i[r].draw();o.canvas.unclipArea(t.ctx)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},a=t._model;a.backgroundColor=n.hoverBackgroundColor?n.hoverBackgroundColor:o.valueAtIndexOrDefault(e.hoverBackgroundColor,i,o.getHoverColor(a.backgroundColor)),a.borderColor=n.hoverBorderColor?n.hoverBorderColor:o.valueAtIndexOrDefault(e.hoverBorderColor,i,o.getHoverColor(a.borderColor)),a.borderWidth=n.hoverBorderWidth?n.hoverBorderWidth:o.valueAtIndexOrDefault(e.hoverBorderWidth,i,a.borderWidth)},removeHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},a=t._model,r=this.chart.options.elements.rectangle;a.backgroundColor=n.backgroundColor?n.backgroundColor:o.valueAtIndexOrDefault(e.backgroundColor,i,r.backgroundColor),a.borderColor=n.borderColor?n.borderColor:o.valueAtIndexOrDefault(e.borderColor,i,r.borderColor),a.borderWidth=n.borderWidth?n.borderWidth:o.valueAtIndexOrDefault(e.borderWidth,i,r.borderWidth)}}),t.controllers.horizontalBar=t.controllers.bar.extend({getValueScaleId:function(){return this.getMeta().xAxisID},getIndexScaleId:function(){return this.getMeta().yAxisID}})}},{25:25,40:40,45:45}],16:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("bubble",{hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(t,e){var i=e.datasets[t.datasetIndex].label||"",n=e.datasets[t.datasetIndex].data[t.index];return i+": ("+t.xLabel+", "+t.yLabel+", "+n.r+")"}}}}),e.exports=function(t){t.controllers.bubble=t.DatasetController.extend({dataElementType:a.Point,update:function(t){var e=this,i=e.getMeta().data;o.each(i,function(i,n){e.updateElement(i,n,t)})},updateElement:function(t,e,i){var n=this,a=n.getMeta(),o=t.custom||{},r=n.getScaleForId(a.xAxisID),s=n.getScaleForId(a.yAxisID),l=n._resolveElementOptions(t,e),u=n.getDataset().data[e],d=n.index,c=i?r.getPixelForDecimal(.5):r.getPixelForValue("object"==typeof u?u:NaN,e,d),h=i?s.getBasePixel():s.getPixelForValue(u,e,d);t._xScale=r,t._yScale=s,t._options=l,t._datasetIndex=d,t._index=e,t._model={backgroundColor:l.backgroundColor,borderColor:l.borderColor,borderWidth:l.borderWidth,hitRadius:l.hitRadius,pointStyle:l.pointStyle,radius:i?0:l.radius,skip:o.skip||isNaN(c)||isNaN(h),x:c,y:h},t.pivot()},setHoverStyle:function(t){var e=t._model,i=t._options;e.backgroundColor=o.valueOrDefault(i.hoverBackgroundColor,o.getHoverColor(i.backgroundColor)),e.borderColor=o.valueOrDefault(i.hoverBorderColor,o.getHoverColor(i.borderColor)),e.borderWidth=o.valueOrDefault(i.hoverBorderWidth,i.borderWidth),e.radius=i.radius+i.hoverRadius},removeHoverStyle:function(t){var e=t._model,i=t._options;e.backgroundColor=i.backgroundColor,e.borderColor=i.borderColor,e.borderWidth=i.borderWidth,e.radius=i.radius},_resolveElementOptions:function(t,e){var i,n,a,r=this.chart,s=r.data.datasets[this.index],l=t.custom||{},u=r.options.elements.point,d=o.options.resolve,c=s.data[e],h={},f={chart:r,dataIndex:e,dataset:s,datasetIndex:this.index},g=["backgroundColor","borderColor","borderWidth","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth","hoverRadius","hitRadius","pointStyle"];for(i=0,n=g.length;i<n;++i)h[a=g[i]]=d([l[a],s[a],u[a]],f,e);return h.radius=d([l.radius,c?c.r:void 0,s.radius,u.radius],f,e),h}})}},{25:25,40:40,45:45}],17:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("doughnut",{animation:{animateRotate:!0,animateScale:!1},hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,n=i.datasets,a=i.labels;if(n.length)for(var o=0;o<n[0].data.length;++o)e.push('<li><span style="background-color:'+n[0].backgroundColor[o]+'"></span>'),a[o]&&e.push(a[o]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map(function(i,n){var a=t.getDatasetMeta(0),r=e.datasets[0],s=a.data[n],l=s&&s.custom||{},u=o.valueAtIndexOrDefault,d=t.options.elements.arc;return{text:i,fillStyle:l.backgroundColor?l.backgroundColor:u(r.backgroundColor,n,d.backgroundColor),strokeStyle:l.borderColor?l.borderColor:u(r.borderColor,n,d.borderColor),lineWidth:l.borderWidth?l.borderWidth:u(r.borderWidth,n,d.borderWidth),hidden:isNaN(r.data[n])||a.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var i,n,a,o=e.index,r=this.chart;for(i=0,n=(r.data.datasets||[]).length;i<n;++i)(a=r.getDatasetMeta(i)).data[o]&&(a.data[o].hidden=!a.data[o].hidden);r.update()}},cutoutPercentage:50,rotation:-.5*Math.PI,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,e){var i=e.labels[t.index],n=": "+e.datasets[t.datasetIndex].data[t.index];return o.isArray(i)?(i=i.slice())[0]+=n:i+=n,i}}}}),n._set("pie",o.clone(n.doughnut)),n._set("pie",{cutoutPercentage:0}),e.exports=function(t){t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({dataElementType:a.Arc,linkScales:o.noop,getRingIndex:function(t){for(var e=0,i=0;i<t;++i)this.chart.isDatasetVisible(i)&&++e;return e},update:function(t){var e=this,i=e.chart,n=i.chartArea,a=i.options,r=a.elements.arc,s=n.right-n.left-r.borderWidth,l=n.bottom-n.top-r.borderWidth,u=Math.min(s,l),d={x:0,y:0},c=e.getMeta(),h=a.cutoutPercentage,f=a.circumference;if(f<2*Math.PI){var g=a.rotation%(2*Math.PI),p=(g+=2*Math.PI*(g>=Math.PI?-1:g<-Math.PI?1:0))+f,m=Math.cos(g),v=Math.sin(g),b=Math.cos(p),x=Math.sin(p),y=g<=0&&p>=0||g<=2*Math.PI&&2*Math.PI<=p,k=g<=.5*Math.PI&&.5*Math.PI<=p||g<=2.5*Math.PI&&2.5*Math.PI<=p,M=g<=-Math.PI&&-Math.PI<=p||g<=Math.PI&&Math.PI<=p,w=g<=.5*-Math.PI&&.5*-Math.PI<=p||g<=1.5*Math.PI&&1.5*Math.PI<=p,S=h/100,C=M?-1:Math.min(m*(m<0?1:S),b*(b<0?1:S)),_=w?-1:Math.min(v*(v<0?1:S),x*(x<0?1:S)),D=y?1:Math.max(m*(m>0?1:S),b*(b>0?1:S)),I=k?1:Math.max(v*(v>0?1:S),x*(x>0?1:S)),P=.5*(D-C),A=.5*(I-_);u=Math.min(s/P,l/A),d={x:-.5*(D+C),y:-.5*(I+_)}}i.borderWidth=e.getMaxBorderWidth(c.data),i.outerRadius=Math.max((u-i.borderWidth)/2,0),i.innerRadius=Math.max(h?i.outerRadius/100*h:0,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),i.offsetX=d.x*i.outerRadius,i.offsetY=d.y*i.outerRadius,c.total=e.calculateTotal(),e.outerRadius=i.outerRadius-i.radiusLength*e.getRingIndex(e.index),e.innerRadius=Math.max(e.outerRadius-i.radiusLength,0),o.each(c.data,function(i,n){e.updateElement(i,n,t)})},updateElement:function(t,e,i){var n=this,a=n.chart,r=a.chartArea,s=a.options,l=s.animation,u=(r.left+r.right)/2,d=(r.top+r.bottom)/2,c=s.rotation,h=s.rotation,f=n.getDataset(),g=i&&l.animateRotate?0:t.hidden?0:n.calculateCircumference(f.data[e])*(s.circumference/(2*Math.PI)),p=i&&l.animateScale?0:n.innerRadius,m=i&&l.animateScale?0:n.outerRadius,v=o.valueAtIndexOrDefault;o.extend(t,{_datasetIndex:n.index,_index:e,_model:{x:u+a.offsetX,y:d+a.offsetY,startAngle:c,endAngle:h,circumference:g,outerRadius:m,innerRadius:p,label:v(f.label,e,a.data.labels[e])}});var b=t._model;this.removeHoverStyle(t),i&&l.animateRotate||(b.startAngle=0===e?s.rotation:n.getMeta().data[e-1]._model.endAngle,b.endAngle=b.startAngle+b.circumference),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},calculateTotal:function(){var t,e=this.getDataset(),i=this.getMeta(),n=0;return o.each(i.data,function(i,a){t=e.data[a],isNaN(t)||i.hidden||(n+=Math.abs(t))}),n},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(Math.abs(t)/e):0},getMaxBorderWidth:function(t){for(var e,i,n=0,a=this.index,o=t.length,r=0;r<o;r++)e=t[r]._model?t[r]._model.borderWidth:0,n=(i=t[r]._chart?t[r]._chart.config.data.datasets[a].hoverBorderWidth:0)>(n=e>n?e:n)?i:n;return n}})}},{25:25,40:40,45:45}],18:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("line",{showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}}),e.exports=function(t){function e(t,e){return o.valueOrDefault(t.showLine,e.showLines)}t.controllers.line=t.DatasetController.extend({datasetElementType:a.Line,dataElementType:a.Point,update:function(t){var i,n,a,r=this,s=r.getMeta(),l=s.dataset,u=s.data||[],d=r.chart.options,c=d.elements.line,h=r.getScaleForId(s.yAxisID),f=r.getDataset(),g=e(f,d);for(g&&(a=l.custom||{},void 0!==f.tension&&void 0===f.lineTension&&(f.lineTension=f.tension),l._scale=h,l._datasetIndex=r.index,l._children=u,l._model={spanGaps:f.spanGaps?f.spanGaps:d.spanGaps,tension:a.tension?a.tension:o.valueOrDefault(f.lineTension,c.tension),backgroundColor:a.backgroundColor?a.backgroundColor:f.backgroundColor||c.backgroundColor,borderWidth:a.borderWidth?a.borderWidth:f.borderWidth||c.borderWidth,borderColor:a.borderColor?a.borderColor:f.borderColor||c.borderColor,borderCapStyle:a.borderCapStyle?a.borderCapStyle:f.borderCapStyle||c.borderCapStyle,borderDash:a.borderDash?a.borderDash:f.borderDash||c.borderDash,borderDashOffset:a.borderDashOffset?a.borderDashOffset:f.borderDashOffset||c.borderDashOffset,borderJoinStyle:a.borderJoinStyle?a.borderJoinStyle:f.borderJoinStyle||c.borderJoinStyle,fill:a.fill?a.fill:void 0!==f.fill?f.fill:c.fill,steppedLine:a.steppedLine?a.steppedLine:o.valueOrDefault(f.steppedLine,c.stepped),cubicInterpolationMode:a.cubicInterpolationMode?a.cubicInterpolationMode:o.valueOrDefault(f.cubicInterpolationMode,c.cubicInterpolationMode)},l.pivot()),i=0,n=u.length;i<n;++i)r.updateElement(u[i],i,t);for(g&&0!==l._model.tension&&r.updateBezierControlPoints(),i=0,n=u.length;i<n;++i)u[i].pivot()},getPointBackgroundColor:function(t,e){var i=this.chart.options.elements.point.backgroundColor,n=this.getDataset(),a=t.custom||{};return a.backgroundColor?i=a.backgroundColor:n.pointBackgroundColor?i=o.valueAtIndexOrDefault(n.pointBackgroundColor,e,i):n.backgroundColor&&(i=n.backgroundColor),i},getPointBorderColor:function(t,e){var i=this.chart.options.elements.point.borderColor,n=this.getDataset(),a=t.custom||{};return a.borderColor?i=a.borderColor:n.pointBorderColor?i=o.valueAtIndexOrDefault(n.pointBorderColor,e,i):n.borderColor&&(i=n.borderColor),i},getPointBorderWidth:function(t,e){var i=this.chart.options.elements.point.borderWidth,n=this.getDataset(),a=t.custom||{};return isNaN(a.borderWidth)?!isNaN(n.pointBorderWidth)||o.isArray(n.pointBorderWidth)?i=o.valueAtIndexOrDefault(n.pointBorderWidth,e,i):isNaN(n.borderWidth)||(i=n.borderWidth):i=a.borderWidth,i},updateElement:function(t,e,i){var n,a,r=this,s=r.getMeta(),l=t.custom||{},u=r.getDataset(),d=r.index,c=u.data[e],h=r.getScaleForId(s.yAxisID),f=r.getScaleForId(s.xAxisID),g=r.chart.options.elements.point;void 0!==u.radius&&void 0===u.pointRadius&&(u.pointRadius=u.radius),void 0!==u.hitRadius&&void 0===u.pointHitRadius&&(u.pointHitRadius=u.hitRadius),n=f.getPixelForValue("object"==typeof c?c:NaN,e,d),a=i?h.getBasePixel():r.calculatePointY(c,e,d),t._xScale=f,t._yScale=h,t._datasetIndex=d,t._index=e,t._model={x:n,y:a,skip:l.skip||isNaN(n)||isNaN(a),radius:l.radius||o.valueAtIndexOrDefault(u.pointRadius,e,g.radius),pointStyle:l.pointStyle||o.valueAtIndexOrDefault(u.pointStyle,e,g.pointStyle),backgroundColor:r.getPointBackgroundColor(t,e),borderColor:r.getPointBorderColor(t,e),borderWidth:r.getPointBorderWidth(t,e),tension:s.dataset._model?s.dataset._model.tension:0,steppedLine:!!s.dataset._model&&s.dataset._model.steppedLine,hitRadius:l.hitRadius||o.valueAtIndexOrDefault(u.pointHitRadius,e,g.hitRadius)}},calculatePointY:function(t,e,i){var n,a,o,r=this.chart,s=this.getMeta(),l=this.getScaleForId(s.yAxisID),u=0,d=0;if(l.options.stacked){for(n=0;n<i;n++)if(a=r.data.datasets[n],"line"===(o=r.getDatasetMeta(n)).type&&o.yAxisID===l.id&&r.isDatasetVisible(n)){var c=Number(l.getRightValue(a.data[e]));c<0?d+=c||0:u+=c||0}var h=Number(l.getRightValue(t));return h<0?l.getPixelForValue(d+h):l.getPixelForValue(u+h)}return l.getPixelForValue(t)},updateBezierControlPoints:function(){var t,e,i,n,a=this.getMeta(),r=this.chart.chartArea,s=a.data||[];function l(t,e,i){return Math.max(Math.min(t,i),e)}if(a.dataset._model.spanGaps&&(s=s.filter(function(t){return!t._model.skip})),"monotone"===a.dataset._model.cubicInterpolationMode)o.splineCurveMonotone(s);else for(t=0,e=s.length;t<e;++t)i=s[t]._model,n=o.splineCurve(o.previousItem(s,t)._model,i,o.nextItem(s,t)._model,a.dataset._model.tension),i.controlPointPreviousX=n.previous.x,i.controlPointPreviousY=n.previous.y,i.controlPointNextX=n.next.x,i.controlPointNextY=n.next.y;if(this.chart.options.elements.line.capBezierPoints)for(t=0,e=s.length;t<e;++t)(i=s[t]._model).controlPointPreviousX=l(i.controlPointPreviousX,r.left,r.right),i.controlPointPreviousY=l(i.controlPointPreviousY,r.top,r.bottom),i.controlPointNextX=l(i.controlPointNextX,r.left,r.right),i.controlPointNextY=l(i.controlPointNextY,r.top,r.bottom)},draw:function(){var t=this.chart,i=this.getMeta(),n=i.data||[],a=t.chartArea,r=n.length,s=0;for(o.canvas.clipArea(t.ctx,a),e(this.getDataset(),t.options)&&i.dataset.draw(),o.canvas.unclipArea(t.ctx);s<r;++s)n[s].draw(a)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},a=t._model;a.radius=n.hoverRadius||o.valueAtIndexOrDefault(e.pointHoverRadius,i,this.chart.options.elements.point.hoverRadius),a.backgroundColor=n.hoverBackgroundColor||o.valueAtIndexOrDefault(e.pointHoverBackgroundColor,i,o.getHoverColor(a.backgroundColor)),a.borderColor=n.hoverBorderColor||o.valueAtIndexOrDefault(e.pointHoverBorderColor,i,o.getHoverColor(a.borderColor)),a.borderWidth=n.hoverBorderWidth||o.valueAtIndexOrDefault(e.pointHoverBorderWidth,i,a.borderWidth)},removeHoverStyle:function(t){var e=this,i=e.chart.data.datasets[t._datasetIndex],n=t._index,a=t.custom||{},r=t._model;void 0!==i.radius&&void 0===i.pointRadius&&(i.pointRadius=i.radius),r.radius=a.radius||o.valueAtIndexOrDefault(i.pointRadius,n,e.chart.options.elements.point.radius),r.backgroundColor=e.getPointBackgroundColor(t,n),r.borderColor=e.getPointBorderColor(t,n),r.borderWidth=e.getPointBorderWidth(t,n)}})}},{25:25,40:40,45:45}],19:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("polarArea",{scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,n=i.datasets,a=i.labels;if(n.length)for(var o=0;o<n[0].data.length;++o)e.push('<li><span style="background-color:'+n[0].backgroundColor[o]+'"></span>'),a[o]&&e.push(a[o]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map(function(i,n){var a=t.getDatasetMeta(0),r=e.datasets[0],s=a.data[n].custom||{},l=o.valueAtIndexOrDefault,u=t.options.elements.arc;return{text:i,fillStyle:s.backgroundColor?s.backgroundColor:l(r.backgroundColor,n,u.backgroundColor),strokeStyle:s.borderColor?s.borderColor:l(r.borderColor,n,u.borderColor),lineWidth:s.borderWidth?s.borderWidth:l(r.borderWidth,n,u.borderWidth),hidden:isNaN(r.data[n])||a.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var i,n,a,o=e.index,r=this.chart;for(i=0,n=(r.data.datasets||[]).length;i<n;++i)(a=r.getDatasetMeta(i)).data[o].hidden=!a.data[o].hidden;r.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}}),e.exports=function(t){t.controllers.polarArea=t.DatasetController.extend({dataElementType:a.Arc,linkScales:o.noop,update:function(t){var e=this,i=e.chart,n=i.chartArea,a=e.getMeta(),r=i.options,s=r.elements.arc,l=Math.min(n.right-n.left,n.bottom-n.top);i.outerRadius=Math.max((l-s.borderWidth/2)/2,0),i.innerRadius=Math.max(r.cutoutPercentage?i.outerRadius/100*r.cutoutPercentage:1,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),e.outerRadius=i.outerRadius-i.radiusLength*e.index,e.innerRadius=e.outerRadius-i.radiusLength,a.count=e.countVisibleElements(),o.each(a.data,function(i,n){e.updateElement(i,n,t)})},updateElement:function(t,e,i){for(var n=this,a=n.chart,r=n.getDataset(),s=a.options,l=s.animation,u=a.scale,d=a.data.labels,c=n.calculateCircumference(r.data[e]),h=u.xCenter,f=u.yCenter,g=0,p=n.getMeta(),m=0;m<e;++m)isNaN(r.data[m])||p.data[m].hidden||++g;var v=s.startAngle,b=t.hidden?0:u.getDistanceFromCenterForValue(r.data[e]),x=v+c*g,y=x+(t.hidden?0:c),k=l.animateScale?0:u.getDistanceFromCenterForValue(r.data[e]);o.extend(t,{_datasetIndex:n.index,_index:e,_scale:u,_model:{x:h,y:f,innerRadius:0,outerRadius:i?k:b,startAngle:i&&l.animateRotate?v:x,endAngle:i&&l.animateRotate?v:y,label:o.valueAtIndexOrDefault(d,e,d[e])}}),n.removeHoverStyle(t),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},countVisibleElements:function(){var t=this.getDataset(),e=this.getMeta(),i=0;return o.each(e.data,function(e,n){isNaN(t.data[n])||e.hidden||i++}),i},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{25:25,40:40,45:45}],20:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("radar",{scale:{type:"radialLinear"},elements:{line:{tension:0}}}),e.exports=function(t){t.controllers.radar=t.DatasetController.extend({datasetElementType:a.Line,dataElementType:a.Point,linkScales:o.noop,update:function(t){var e=this,i=e.getMeta(),n=i.dataset,a=i.data,r=n.custom||{},s=e.getDataset(),l=e.chart.options.elements.line,u=e.chart.scale;void 0!==s.tension&&void 0===s.lineTension&&(s.lineTension=s.tension),o.extend(i.dataset,{_datasetIndex:e.index,_scale:u,_children:a,_loop:!0,_model:{tension:r.tension?r.tension:o.valueOrDefault(s.lineTension,l.tension),backgroundColor:r.backgroundColor?r.backgroundColor:s.backgroundColor||l.backgroundColor,borderWidth:r.borderWidth?r.borderWidth:s.borderWidth||l.borderWidth,borderColor:r.borderColor?r.borderColor:s.borderColor||l.borderColor,fill:r.fill?r.fill:void 0!==s.fill?s.fill:l.fill,borderCapStyle:r.borderCapStyle?r.borderCapStyle:s.borderCapStyle||l.borderCapStyle,borderDash:r.borderDash?r.borderDash:s.borderDash||l.borderDash,borderDashOffset:r.borderDashOffset?r.borderDashOffset:s.borderDashOffset||l.borderDashOffset,borderJoinStyle:r.borderJoinStyle?r.borderJoinStyle:s.borderJoinStyle||l.borderJoinStyle}}),i.dataset.pivot(),o.each(a,function(i,n){e.updateElement(i,n,t)},e),e.updateBezierControlPoints()},updateElement:function(t,e,i){var n=this,a=t.custom||{},r=n.getDataset(),s=n.chart.scale,l=n.chart.options.elements.point,u=s.getPointPositionForValue(e,r.data[e]);void 0!==r.radius&&void 0===r.pointRadius&&(r.pointRadius=r.radius),void 0!==r.hitRadius&&void 0===r.pointHitRadius&&(r.pointHitRadius=r.hitRadius),o.extend(t,{_datasetIndex:n.index,_index:e,_scale:s,_model:{x:i?s.xCenter:u.x,y:i?s.yCenter:u.y,tension:a.tension?a.tension:o.valueOrDefault(r.lineTension,n.chart.options.elements.line.tension),radius:a.radius?a.radius:o.valueAtIndexOrDefault(r.pointRadius,e,l.radius),backgroundColor:a.backgroundColor?a.backgroundColor:o.valueAtIndexOrDefault(r.pointBackgroundColor,e,l.backgroundColor),borderColor:a.borderColor?a.borderColor:o.valueAtIndexOrDefault(r.pointBorderColor,e,l.borderColor),borderWidth:a.borderWidth?a.borderWidth:o.valueAtIndexOrDefault(r.pointBorderWidth,e,l.borderWidth),pointStyle:a.pointStyle?a.pointStyle:o.valueAtIndexOrDefault(r.pointStyle,e,l.pointStyle),hitRadius:a.hitRadius?a.hitRadius:o.valueAtIndexOrDefault(r.pointHitRadius,e,l.hitRadius)}}),t._model.skip=a.skip?a.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.chart.chartArea,e=this.getMeta();o.each(e.data,function(i,n){var a=i._model,r=o.splineCurve(o.previousItem(e.data,n,!0)._model,a,o.nextItem(e.data,n,!0)._model,a.tension);a.controlPointPreviousX=Math.max(Math.min(r.previous.x,t.right),t.left),a.controlPointPreviousY=Math.max(Math.min(r.previous.y,t.bottom),t.top),a.controlPointNextX=Math.max(Math.min(r.next.x,t.right),t.left),a.controlPointNextY=Math.max(Math.min(r.next.y,t.bottom),t.top),i.pivot()})},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},n=t._index,a=t._model;a.radius=i.hoverRadius?i.hoverRadius:o.valueAtIndexOrDefault(e.pointHoverRadius,n,this.chart.options.elements.point.hoverRadius),a.backgroundColor=i.hoverBackgroundColor?i.hoverBackgroundColor:o.valueAtIndexOrDefault(e.pointHoverBackgroundColor,n,o.getHoverColor(a.backgroundColor)),a.borderColor=i.hoverBorderColor?i.hoverBorderColor:o.valueAtIndexOrDefault(e.pointHoverBorderColor,n,o.getHoverColor(a.borderColor)),a.borderWidth=i.hoverBorderWidth?i.hoverBorderWidth:o.valueAtIndexOrDefault(e.pointHoverBorderWidth,n,a.borderWidth)},removeHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},n=t._index,a=t._model,r=this.chart.options.elements.point;a.radius=i.radius?i.radius:o.valueAtIndexOrDefault(e.pointRadius,n,r.radius),a.backgroundColor=i.backgroundColor?i.backgroundColor:o.valueAtIndexOrDefault(e.pointBackgroundColor,n,r.backgroundColor),a.borderColor=i.borderColor?i.borderColor:o.valueAtIndexOrDefault(e.pointBorderColor,n,r.borderColor),a.borderWidth=i.borderWidth?i.borderWidth:o.valueAtIndexOrDefault(e.pointBorderWidth,n,r.borderWidth)}})}},{25:25,40:40,45:45}],21:[function(t,e,i){"use strict";t(25)._set("scatter",{hover:{mode:"single"},scales:{xAxes:[{id:"x-axis-1",type:"linear",position:"bottom"}],yAxes:[{id:"y-axis-1",type:"linear",position:"left"}]},showLines:!1,tooltips:{callbacks:{title:function(){return""},label:function(t){return"("+t.xLabel+", "+t.yLabel+")"}}}}),e.exports=function(t){t.controllers.scatter=t.controllers.line}},{25:25}],22:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45);n._set("global",{animation:{duration:1e3,easing:"easeOutQuart",onProgress:o.noop,onComplete:o.noop}}),e.exports=function(t){t.Animation=a.extend({chart:null,currentStep:0,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,i,n){var a,o,r=this.animations;for(e.chart=t,n||(t.animating=!0),a=0,o=r.length;a<o;++a)if(r[a].chart===t)return void(r[a]=e);r.push(e),1===r.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var e=o.findIndex(this.animations,function(e){return e.chart===t});-1!==e&&(this.animations.splice(e,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=o.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=this,e=Date.now(),i=0;t.dropFrames>1&&(i=Math.floor(t.dropFrames),t.dropFrames=t.dropFrames%1),t.advance(1+i);var n=Date.now();t.dropFrames+=(n-e)/t.frameDuration,t.animations.length>0&&t.requestAnimationFrame()},advance:function(t){for(var e,i,n=this.animations,a=0;a<n.length;)i=(e=n[a]).chart,e.currentStep=(e.currentStep||0)+t,e.currentStep=Math.min(e.currentStep,e.numSteps),o.callback(e.render,[i,e],i),o.callback(e.onAnimationProgress,[e],i),e.currentStep>=e.numSteps?(o.callback(e.onAnimationComplete,[e],i),i.animating=!1,n.splice(a,1)):++a}},Object.defineProperty(t.Animation.prototype,"animationObject",{get:function(){return this}}),Object.defineProperty(t.Animation.prototype,"chartInstance",{get:function(){return this.chart},set:function(t){this.chart=t}})}},{25:25,26:26,45:45}],23:[function(t,e,i){"use strict";var n=t(25),a=t(45),o=t(28),r=t(30),s=t(48),l=t(31);e.exports=function(t){function e(t){return"top"===t||"bottom"===t}t.types={},t.instances={},t.controllers={},a.extend(t.prototype,{construct:function(e,i){var o,r,l=this;(r=(o=(o=i)||{}).data=o.data||{}).datasets=r.datasets||[],r.labels=r.labels||[],o.options=a.configMerge(n.global,n[o.type],o.options||{}),i=o;var u=s.acquireContext(e,i),d=u&&u.canvas,c=d&&d.height,h=d&&d.width;l.id=a.uid(),l.ctx=u,l.canvas=d,l.config=i,l.width=h,l.height=c,l.aspectRatio=c?h/c:null,l.options=i.options,l._bufferedRender=!1,l.chart=l,l.controller=l,t.instances[l.id]=l,Object.defineProperty(l,"data",{get:function(){return l.config.data},set:function(t){l.config.data=t}}),u&&d?(l.initialize(),l.update()):console.error("Failed to create chart: can't acquire context from the given item")},initialize:function(){var t=this;return l.notify(t,"beforeInit"),a.retinaScale(t,t.options.devicePixelRatio),t.bindEvents(),t.options.responsive&&t.resize(!0),t.ensureScalesHaveIDs(),t.buildOrUpdateScales(),t.initToolTip(),l.notify(t,"afterInit"),t},clear:function(){return a.canvas.clear(this),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(t){var e=this,i=e.options,n=e.canvas,o=i.maintainAspectRatio&&e.aspectRatio||null,r=Math.max(0,Math.floor(a.getMaximumWidth(n))),s=Math.max(0,Math.floor(o?r/o:a.getMaximumHeight(n)));if((e.width!==r||e.height!==s)&&(n.width=e.width=r,n.height=e.height=s,n.style.width=r+"px",n.style.height=s+"px",a.retinaScale(e,i.devicePixelRatio),!t)){var u={width:r,height:s};l.notify(e,"resize",[u]),e.options.onResize&&e.options.onResize(e,u),e.stop(),e.update(e.options.responsiveAnimationDuration)}},ensureScalesHaveIDs:function(){var t=this.options,e=t.scales||{},i=t.scale;a.each(e.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),a.each(e.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),i&&(i.id=i.id||"scale")},buildOrUpdateScales:function(){var i=this,n=i.options,o=i.scales||{},r=[],s=Object.keys(o).reduce(function(t,e){return t[e]=!1,t},{});n.scales&&(r=r.concat((n.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category",dposition:"bottom"}}),(n.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear",dposition:"left"}}))),n.scale&&r.push({options:n.scale,dtype:"radialLinear",isDefault:!0,dposition:"chartArea"}),a.each(r,function(n){var r=n.options,l=r.id,u=a.valueOrDefault(r.type,n.dtype);e(r.position)!==e(n.dposition)&&(r.position=n.dposition),s[l]=!0;var d=null;if(l in o&&o[l].type===u)(d=o[l]).options=r,d.ctx=i.ctx,d.chart=i;else{var c=t.scaleService.getScaleConstructor(u);if(!c)return;d=new c({id:l,type:u,options:r,ctx:i.ctx,chart:i}),o[d.id]=d}d.mergeTicksOptions(),n.isDefault&&(i.scale=d)}),a.each(s,function(t,e){t||delete o[e]}),i.scales=o,t.scaleService.addScalesToLayout(this)},buildOrUpdateControllers:function(){var e=this,i=[],n=[];return a.each(e.data.datasets,function(a,o){var r=e.getDatasetMeta(o),s=a.type||e.config.type;if(r.type&&r.type!==s&&(e.destroyDatasetMeta(o),r=e.getDatasetMeta(o)),r.type=s,i.push(r.type),r.controller)r.controller.updateIndex(o),r.controller.linkScales();else{var l=t.controllers[r.type];if(void 0===l)throw new Error('"'+r.type+'" is not a chart type.');r.controller=new l(e,o),n.push(r.controller)}},e),n},resetElements:function(){var t=this;a.each(t.data.datasets,function(e,i){t.getDatasetMeta(i).controller.reset()},t)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(e){var i,n,o=this;if(e&&"object"==typeof e||(e={duration:e,lazy:arguments[1]}),n=(i=o).options,a.each(i.scales,function(t){r.removeBox(i,t)}),n=a.configMerge(t.defaults.global,t.defaults[i.config.type],n),i.options=i.config.options=n,i.ensureScalesHaveIDs(),i.buildOrUpdateScales(),i.tooltip._options=n.tooltips,i.tooltip.initialize(),l._invalidate(o),!1!==l.notify(o,"beforeUpdate")){o.tooltip._data=o.data;var s=o.buildOrUpdateControllers();a.each(o.data.datasets,function(t,e){o.getDatasetMeta(e).controller.buildOrUpdateElements()},o),o.updateLayout(),o.options.animation&&o.options.animation.duration&&a.each(s,function(t){t.reset()}),o.updateDatasets(),o.tooltip.initialize(),o.lastActive=[],l.notify(o,"afterUpdate"),o._bufferedRender?o._bufferedRequest={duration:e.duration,easing:e.easing,lazy:e.lazy}:o.render(e)}},updateLayout:function(){!1!==l.notify(this,"beforeLayout")&&(r.update(this,this.width,this.height),l.notify(this,"afterScaleUpdate"),l.notify(this,"afterLayout"))},updateDatasets:function(){if(!1!==l.notify(this,"beforeDatasetsUpdate")){for(var t=0,e=this.data.datasets.length;t<e;++t)this.updateDataset(t);l.notify(this,"afterDatasetsUpdate")}},updateDataset:function(t){var e=this.getDatasetMeta(t),i={meta:e,index:t};!1!==l.notify(this,"beforeDatasetUpdate",[i])&&(e.controller.update(),l.notify(this,"afterDatasetUpdate",[i]))},render:function(e){var i=this;e&&"object"==typeof e||(e={duration:e,lazy:arguments[1]});var n=e.duration,o=e.lazy;if(!1!==l.notify(i,"beforeRender")){var r=i.options.animation,s=function(t){l.notify(i,"afterRender"),a.callback(r&&r.onComplete,[t],i)};if(r&&(void 0!==n&&0!==n||void 0===n&&0!==r.duration)){var u=new t.Animation({numSteps:(n||r.duration)/16.66,easing:e.easing||r.easing,render:function(t,e){var i=a.easing.effects[e.easing],n=e.currentStep,o=n/e.numSteps;t.draw(i(o),o,n)},onAnimationProgress:r.onProgress,onAnimationComplete:s});t.animationService.addAnimation(i,u,n,o)}else i.draw(),s(new t.Animation({numSteps:0,chart:i}));return i}},draw:function(t){var e=this;e.clear(),a.isNullOrUndef(t)&&(t=1),e.transition(t),!1!==l.notify(e,"beforeDraw",[t])&&(a.each(e.boxes,function(t){t.draw(e.chartArea)},e),e.scale&&e.scale.draw(),e.drawDatasets(t),e._drawTooltip(t),l.notify(e,"afterDraw",[t]))},transition:function(t){for(var e=0,i=(this.data.datasets||[]).length;e<i;++e)this.isDatasetVisible(e)&&this.getDatasetMeta(e).controller.transition(t);this.tooltip.transition(t)},drawDatasets:function(t){var e=this;if(!1!==l.notify(e,"beforeDatasetsDraw",[t])){for(var i=(e.data.datasets||[]).length-1;i>=0;--i)e.isDatasetVisible(i)&&e.drawDataset(i,t);l.notify(e,"afterDatasetsDraw",[t])}},drawDataset:function(t,e){var i=this.getDatasetMeta(t),n={meta:i,index:t,easingValue:e};!1!==l.notify(this,"beforeDatasetDraw",[n])&&(i.controller.draw(e),l.notify(this,"afterDatasetDraw",[n]))},_drawTooltip:function(t){var e=this.tooltip,i={tooltip:e,easingValue:t};!1!==l.notify(this,"beforeTooltipDraw",[i])&&(e.draw(),l.notify(this,"afterTooltipDraw",[i]))},getElementAtEvent:function(t){return o.modes.single(this,t)},getElementsAtEvent:function(t){return o.modes.label(this,t,{intersect:!0})},getElementsAtXAxis:function(t){return o.modes["x-axis"](this,t,{intersect:!0})},getElementsAtEventForMode:function(t,e,i){var n=o.modes[e];return"function"==typeof n?n(this,t,i):[]},getDatasetAtEvent:function(t){return o.modes.dataset(this,t,{intersect:!0})},getDatasetMeta:function(t){var e=this.data.datasets[t];e._meta||(e._meta={});var i=e._meta[this.id];return i||(i=e._meta[this.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,i=this.data.datasets.length;e<i;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroyDatasetMeta:function(t){var e=this.id,i=this.data.datasets[t],n=i._meta&&i._meta[e];n&&(n.controller.destroy(),delete i._meta[e])},destroy:function(){var e,i,n=this,o=n.canvas;for(n.stop(),e=0,i=n.data.datasets.length;e<i;++e)n.destroyDatasetMeta(e);o&&(n.unbindEvents(),a.canvas.clear(n),s.releaseContext(n.ctx),n.canvas=null,n.ctx=null),l.notify(n,"destroy"),delete t.instances[n.id]},toBase64Image:function(){return this.canvas.toDataURL.apply(this.canvas,arguments)},initToolTip:function(){var e=this;e.tooltip=new t.Tooltip({_chart:e,_chartInstance:e,_data:e.data,_options:e.options.tooltips},e)},bindEvents:function(){var t=this,e=t._listeners={},i=function(){t.eventHandler.apply(t,arguments)};a.each(t.options.events,function(n){s.addEventListener(t,n,i),e[n]=i}),t.options.responsive&&(i=function(){t.resize()},s.addEventListener(t,"resize",i),e.resize=i)},unbindEvents:function(){var t=this,e=t._listeners;e&&(delete t._listeners,a.each(e,function(e,i){s.removeEventListener(t,i,e)}))},updateHoverStyle:function(t,e,i){var n,a,o,r=i?"setHoverStyle":"removeHoverStyle";for(a=0,o=t.length;a<o;++a)(n=t[a])&&this.getDatasetMeta(n._datasetIndex).controller[r](n)},eventHandler:function(t){var e=this,i=e.tooltip;if(!1!==l.notify(e,"beforeEvent",[t])){e._bufferedRender=!0,e._bufferedRequest=null;var n=e.handleEvent(t);i&&(n=i._start?i.handleEvent(t):n|i.handleEvent(t)),l.notify(e,"afterEvent",[t]);var a=e._bufferedRequest;return a?e.render(a):n&&!e.animating&&(e.stop(),e.render(e.options.hover.animationDuration,!0)),e._bufferedRender=!1,e._bufferedRequest=null,e}},handleEvent:function(t){var e,i=this,n=i.options||{},o=n.hover;return i.lastActive=i.lastActive||[],"mouseout"===t.type?i.active=[]:i.active=i.getElementsAtEventForMode(t,o.mode,o),a.callback(n.onHover||n.hover.onHover,[t.native,i.active],i),"mouseup"!==t.type&&"click"!==t.type||n.onClick&&n.onClick.call(i,t.native,i.active),i.lastActive.length&&i.updateHoverStyle(i.lastActive,o.mode,!1),i.active.length&&o.mode&&i.updateHoverStyle(i.active,o.mode,!0),e=!a.arrayEquals(i.active,i.lastActive),i.lastActive=i.active,e}}),t.Controller=t}},{25:25,28:28,30:30,31:31,45:45,48:48}],24:[function(t,e,i){"use strict";var n=t(45);e.exports=function(t){var e=["push","pop","shift","splice","unshift"];function i(t,i){var n=t._chartjs;if(n){var a=n.listeners,o=a.indexOf(i);-1!==o&&a.splice(o,1),a.length>0||(e.forEach(function(e){delete t[e]}),delete t._chartjs)}}t.DatasetController=function(t,e){this.initialize(t,e)},n.extend(t.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this,e=t.getMeta(),i=t.getDataset();null!==e.xAxisID&&e.xAxisID in t.chart.scales||(e.xAxisID=i.xAxisID||t.chart.options.scales.xAxes[0].id),null!==e.yAxisID&&e.yAxisID in t.chart.scales||(e.yAxisID=i.yAxisID||t.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},destroy:function(){this._data&&i(this._data,this)},createMetaDataset:function(){var t=this.datasetElementType;return t&&new t({_chart:this.chart,_datasetIndex:this.index})},createMetaData:function(t){var e=this.dataElementType;return e&&new e({_chart:this.chart,_datasetIndex:this.index,_index:t})},addElements:function(){var t,e,i=this.getMeta(),n=this.getDataset().data||[],a=i.data;for(t=0,e=n.length;t<e;++t)a[t]=a[t]||this.createMetaData(t);i.dataset=i.dataset||this.createMetaDataset()},addElementAndReset:function(t){var e=this.createMetaData(t);this.getMeta().data.splice(t,0,e),this.updateElement(e,t,!0)},buildOrUpdateElements:function(){var t,a,o=this,r=o.getDataset(),s=r.data||(r.data=[]);o._data!==s&&(o._data&&i(o._data,o),a=o,(t=s)._chartjs?t._chartjs.listeners.push(a):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[a]}}),e.forEach(function(e){var i="onData"+e.charAt(0).toUpperCase()+e.slice(1),a=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:function(){var e=Array.prototype.slice.call(arguments),o=a.apply(this,e);return n.each(t._chartjs.listeners,function(t){"function"==typeof t[i]&&t[i].apply(t,e)}),o}})})),o._data=s),o.resyncElements()},update:n.noop,transition:function(t){for(var e=this.getMeta(),i=e.data||[],n=i.length,a=0;a<n;++a)i[a].transition(t);e.dataset&&e.dataset.transition(t)},draw:function(){var t=this.getMeta(),e=t.data||[],i=e.length,n=0;for(t.dataset&&t.dataset.draw();n<i;++n)e[n].draw()},removeHoverStyle:function(t,e){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},r=n.valueAtIndexOrDefault,s=t._model;s.backgroundColor=o.backgroundColor?o.backgroundColor:r(i.backgroundColor,a,e.backgroundColor),s.borderColor=o.borderColor?o.borderColor:r(i.borderColor,a,e.borderColor),s.borderWidth=o.borderWidth?o.borderWidth:r(i.borderWidth,a,e.borderWidth)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,a=t.custom||{},o=n.valueAtIndexOrDefault,r=n.getHoverColor,s=t._model;s.backgroundColor=a.hoverBackgroundColor?a.hoverBackgroundColor:o(e.hoverBackgroundColor,i,r(s.backgroundColor)),s.borderColor=a.hoverBorderColor?a.hoverBorderColor:o(e.hoverBorderColor,i,r(s.borderColor)),s.borderWidth=a.hoverBorderWidth?a.hoverBorderWidth:o(e.hoverBorderWidth,i,s.borderWidth)},resyncElements:function(){var t=this.getMeta(),e=this.getDataset().data,i=t.data.length,n=e.length;n<i?t.data.splice(n,i-n):n>i&&this.insertElements(i,n-i)},insertElements:function(t,e){for(var i=0;i<e;++i)this.addElementAndReset(t+i)},onDataPush:function(){this.insertElements(this.getDataset().data.length-1,arguments.length)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(t,e){this.getMeta().data.splice(t,e),this.insertElements(t,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),t.DatasetController.extend=n.inherits}},{45:45}],25:[function(t,e,i){"use strict";var n=t(45);e.exports={_set:function(t,e){return n.merge(this[t]||(this[t]={}),e)}}},{45:45}],26:[function(t,e,i){"use strict";var n=t(3),a=t(45);var o=function(t){a.extend(this,t),this.initialize.apply(this,arguments)};a.extend(o.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=a.clone(t._model)),t._start={},t},transition:function(t){var e=this,i=e._model,a=e._start,o=e._view;return i&&1!==t?(o||(o=e._view={}),a||(a=e._start={}),function(t,e,i,a){var o,r,s,l,u,d,c,h,f,g=Object.keys(i);for(o=0,r=g.length;o<r;++o)if(d=i[s=g[o]],e.hasOwnProperty(s)||(e[s]=d),(l=e[s])!==d&&"_"!==s[0]){if(t.hasOwnProperty(s)||(t[s]=l),(c=typeof d)==typeof(u=t[s]))if("string"===c){if((h=n(u)).valid&&(f=n(d)).valid){e[s]=f.mix(h,a).rgbString();continue}}else if("number"===c&&isFinite(u)&&isFinite(d)){e[s]=u+(d-u)*a;continue}e[s]=d}}(a,o,i,t),e):(e._view=i,e._start=null,e)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return a.isNumber(this._model.x)&&a.isNumber(this._model.y)}}),o.extend=a.inherits,e.exports=o},{3:3,45:45}],27:[function(t,e,i){"use strict";var n=t(3),a=t(25),o=t(45);e.exports=function(t){function e(t,e,i){var n;return"string"==typeof t?(n=parseInt(t,10),-1!==t.indexOf("%")&&(n=n/100*e.parentNode[i])):n=t,n}function i(t){return null!=t&&"none"!==t}function r(t,n,a){var o=document.defaultView,r=t.parentNode,s=o.getComputedStyle(t)[n],l=o.getComputedStyle(r)[n],u=i(s),d=i(l),c=Number.POSITIVE_INFINITY;return u||d?Math.min(u?e(s,t,a):c,d?e(l,r,a):c):"none"}o.configMerge=function(){return o.merge(o.clone(arguments[0]),[].slice.call(arguments,1),{merger:function(e,i,n,a){var r=i[e]||{},s=n[e];"scales"===e?i[e]=o.scaleMerge(r,s):"scale"===e?i[e]=o.merge(r,[t.scaleService.getScaleDefaults(s.type),s]):o._merger(e,i,n,a)}})},o.scaleMerge=function(){return o.merge(o.clone(arguments[0]),[].slice.call(arguments,1),{merger:function(e,i,n,a){if("xAxes"===e||"yAxes"===e){var r,s,l,u=n[e].length;for(i[e]||(i[e]=[]),r=0;r<u;++r)l=n[e][r],s=o.valueOrDefault(l.type,"xAxes"===e?"category":"linear"),r>=i[e].length&&i[e].push({}),!i[e][r].type||l.type&&l.type!==i[e][r].type?o.merge(i[e][r],[t.scaleService.getScaleDefaults(s),l]):o.merge(i[e][r],l)}else o._merger(e,i,n,a)}})},o.where=function(t,e){if(o.isArray(t)&&Array.prototype.filter)return t.filter(e);var i=[];return o.each(t,function(t){e(t)&&i.push(t)}),i},o.findIndex=Array.prototype.findIndex?function(t,e,i){return t.findIndex(e,i)}:function(t,e,i){i=void 0===i?t:i;for(var n=0,a=t.length;n<a;++n)if(e.call(i,t[n],n,t))return n;return-1},o.findNextWhere=function(t,e,i){o.isNullOrUndef(i)&&(i=-1);for(var n=i+1;n<t.length;n++){var a=t[n];if(e(a))return a}},o.findPreviousWhere=function(t,e,i){o.isNullOrUndef(i)&&(i=t.length);for(var n=i-1;n>=0;n--){var a=t[n];if(e(a))return a}},o.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},o.almostEquals=function(t,e,i){return Math.abs(t-e)<i},o.almostWhole=function(t,e){var i=Math.round(t);return i-e<t&&i+e>t},o.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},o.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},o.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return 0===(t=+t)||isNaN(t)?t:t>0?1:-1},o.log10=Math.log10?function(t){return Math.log10(t)}:function(t){var e=Math.log(t)*Math.LOG10E,i=Math.round(e);return t===Math.pow(10,i)?i:e},o.toRadians=function(t){return t*(Math.PI/180)},o.toDegrees=function(t){return t*(180/Math.PI)},o.getAngleFromPoint=function(t,e){var i=e.x-t.x,n=e.y-t.y,a=Math.sqrt(i*i+n*n),o=Math.atan2(n,i);return o<-.5*Math.PI&&(o+=2*Math.PI),{angle:o,distance:a}},o.distanceBetweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},o.aliasPixel=function(t){return t%2==0?0:.5},o.splineCurve=function(t,e,i,n){var a=t.skip?e:t,o=e,r=i.skip?e:i,s=Math.sqrt(Math.pow(o.x-a.x,2)+Math.pow(o.y-a.y,2)),l=Math.sqrt(Math.pow(r.x-o.x,2)+Math.pow(r.y-o.y,2)),u=s/(s+l),d=l/(s+l),c=n*(u=isNaN(u)?0:u),h=n*(d=isNaN(d)?0:d);return{previous:{x:o.x-c*(r.x-a.x),y:o.y-c*(r.y-a.y)},next:{x:o.x+h*(r.x-a.x),y:o.y+h*(r.y-a.y)}}},o.EPSILON=Number.EPSILON||1e-14,o.splineCurveMonotone=function(t){var e,i,n,a,r,s,l,u,d,c=(t||[]).map(function(t){return{model:t._model,deltaK:0,mK:0}}),h=c.length;for(e=0;e<h;++e)if(!(n=c[e]).model.skip){if(i=e>0?c[e-1]:null,(a=e<h-1?c[e+1]:null)&&!a.model.skip){var f=a.model.x-n.model.x;n.deltaK=0!==f?(a.model.y-n.model.y)/f:0}!i||i.model.skip?n.mK=n.deltaK:!a||a.model.skip?n.mK=i.deltaK:this.sign(i.deltaK)!==this.sign(n.deltaK)?n.mK=0:n.mK=(i.deltaK+n.deltaK)/2}for(e=0;e<h-1;++e)n=c[e],a=c[e+1],n.model.skip||a.model.skip||(o.almostEquals(n.deltaK,0,this.EPSILON)?n.mK=a.mK=0:(r=n.mK/n.deltaK,s=a.mK/n.deltaK,(u=Math.pow(r,2)+Math.pow(s,2))<=9||(l=3/Math.sqrt(u),n.mK=r*l*n.deltaK,a.mK=s*l*n.deltaK)));for(e=0;e<h;++e)(n=c[e]).model.skip||(i=e>0?c[e-1]:null,a=e<h-1?c[e+1]:null,i&&!i.model.skip&&(d=(n.model.x-i.model.x)/3,n.model.controlPointPreviousX=n.model.x-d,n.model.controlPointPreviousY=n.model.y-d*n.mK),a&&!a.model.skip&&(d=(a.model.x-n.model.x)/3,n.model.controlPointNextX=n.model.x+d,n.model.controlPointNextY=n.model.y+d*n.mK))},o.nextItem=function(t,e,i){return i?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},o.previousItem=function(t,e,i){return i?e<=0?t[t.length-1]:t[e-1]:e<=0?t[0]:t[e-1]},o.niceNum=function(t,e){var i=Math.floor(o.log10(t)),n=t/Math.pow(10,i);return(e?n<1.5?1:n<3?2:n<7?5:10:n<=1?1:n<=2?2:n<=5?5:10)*Math.pow(10,i)},o.requestAnimFrame="undefined"==typeof window?function(t){t()}:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},o.getRelativePosition=function(t,e){var i,n,a=t.originalEvent||t,r=t.currentTarget||t.srcElement,s=r.getBoundingClientRect(),l=a.touches;l&&l.length>0?(i=l[0].clientX,n=l[0].clientY):(i=a.clientX,n=a.clientY);var u=parseFloat(o.getStyle(r,"padding-left")),d=parseFloat(o.getStyle(r,"padding-top")),c=parseFloat(o.getStyle(r,"padding-right")),h=parseFloat(o.getStyle(r,"padding-bottom")),f=s.right-s.left-u-c,g=s.bottom-s.top-d-h;return{x:i=Math.round((i-s.left-u)/f*r.width/e.currentDevicePixelRatio),y:n=Math.round((n-s.top-d)/g*r.height/e.currentDevicePixelRatio)}},o.getConstraintWidth=function(t){return r(t,"max-width","clientWidth")},o.getConstraintHeight=function(t){return r(t,"max-height","clientHeight")},o.getMaximumWidth=function(t){var e=t.parentNode;if(!e)return t.clientWidth;var i=parseInt(o.getStyle(e,"padding-left"),10),n=parseInt(o.getStyle(e,"padding-right"),10),a=e.clientWidth-i-n,r=o.getConstraintWidth(t);return isNaN(r)?a:Math.min(a,r)},o.getMaximumHeight=function(t){var e=t.parentNode;if(!e)return t.clientHeight;var i=parseInt(o.getStyle(e,"padding-top"),10),n=parseInt(o.getStyle(e,"padding-bottom"),10),a=e.clientHeight-i-n,r=o.getConstraintHeight(t);return isNaN(r)?a:Math.min(a,r)},o.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},o.retinaScale=function(t,e){var i=t.currentDevicePixelRatio=e||window.devicePixelRatio||1;if(1!==i){var n=t.canvas,a=t.height,o=t.width;n.height=a*i,n.width=o*i,t.ctx.scale(i,i),n.style.height||n.style.width||(n.style.height=a+"px",n.style.width=o+"px")}},o.fontString=function(t,e,i){return e+" "+t+"px "+i},o.longestText=function(t,e,i,n){var a=(n=n||{}).data=n.data||{},r=n.garbageCollect=n.garbageCollect||[];n.font!==e&&(a=n.data={},r=n.garbageCollect=[],n.font=e),t.font=e;var s=0;o.each(i,function(e){null!=e&&!0!==o.isArray(e)?s=o.measureText(t,a,r,s,e):o.isArray(e)&&o.each(e,function(e){null==e||o.isArray(e)||(s=o.measureText(t,a,r,s,e))})});var l=r.length/2;if(l>i.length){for(var u=0;u<l;u++)delete a[r[u]];r.splice(0,l)}return s},o.measureText=function(t,e,i,n,a){var o=e[a];return o||(o=e[a]=t.measureText(a).width,i.push(a)),o>n&&(n=o),n},o.numberOfLabelLines=function(t){var e=1;return o.each(t,function(t){o.isArray(t)&&t.length>e&&(e=t.length)}),e},o.color=n?function(t){return t instanceof CanvasGradient&&(t=a.global.defaultColor),n(t)}:function(t){return console.error("Color.js not found!"),t},o.getHoverColor=function(t){return t instanceof CanvasPattern?t:o.color(t).saturate(.5).darken(.1).rgbString()}}},{25:25,3:3,45:45}],28:[function(t,e,i){"use strict";var n=t(45);function a(t,e){return t.native?{x:t.x,y:t.y}:n.getRelativePosition(t,e)}function o(t,e){var i,n,a,o,r;for(n=0,o=t.data.datasets.length;n<o;++n)if(t.isDatasetVisible(n))for(a=0,r=(i=t.getDatasetMeta(n)).data.length;a<r;++a){var s=i.data[a];s._view.skip||e(s)}}function r(t,e){var i=[];return o(t,function(t){t.inRange(e.x,e.y)&&i.push(t)}),i}function s(t,e,i,n){var a=Number.POSITIVE_INFINITY,r=[];return o(t,function(t){if(!i||t.inRange(e.x,e.y)){var o=t.getCenterPoint(),s=n(e,o);s<a?(r=[t],a=s):s===a&&r.push(t)}}),r}function l(t){var e=-1!==t.indexOf("x"),i=-1!==t.indexOf("y");return function(t,n){var a=e?Math.abs(t.x-n.x):0,o=i?Math.abs(t.y-n.y):0;return Math.sqrt(Math.pow(a,2)+Math.pow(o,2))}}function u(t,e,i){var n=a(e,t);i.axis=i.axis||"x";var o=l(i.axis),u=i.intersect?r(t,n):s(t,n,!1,o),d=[];return u.length?(t.data.datasets.forEach(function(e,i){if(t.isDatasetVisible(i)){var n=t.getDatasetMeta(i).data[u[0]._index];n&&!n._view.skip&&d.push(n)}}),d):[]}e.exports={modes:{single:function(t,e){var i=a(e,t),n=[];return o(t,function(t){if(t.inRange(i.x,i.y))return n.push(t),n}),n.slice(0,1)},label:u,index:u,dataset:function(t,e,i){var n=a(e,t);i.axis=i.axis||"xy";var o=l(i.axis),u=i.intersect?r(t,n):s(t,n,!1,o);return u.length>0&&(u=t.getDatasetMeta(u[0]._datasetIndex).data),u},"x-axis":function(t,e){return u(t,e,{intersect:!1})},point:function(t,e){return r(t,a(e,t))},nearest:function(t,e,i){var n=a(e,t);i.axis=i.axis||"xy";var o=l(i.axis),r=s(t,n,i.intersect,o);return r.length>1&&r.sort(function(t,e){var i=t.getArea()-e.getArea();return 0===i&&(i=t._datasetIndex-e._datasetIndex),i}),r.slice(0,1)},x:function(t,e,i){var n=a(e,t),r=[],s=!1;return o(t,function(t){t.inXRange(n.x)&&r.push(t),t.inRange(n.x,n.y)&&(s=!0)}),i.intersect&&!s&&(r=[]),r},y:function(t,e,i){var n=a(e,t),r=[],s=!1;return o(t,function(t){t.inYRange(n.y)&&r.push(t),t.inRange(n.x,n.y)&&(s=!0)}),i.intersect&&!s&&(r=[]),r}}}},{45:45}],29:[function(t,e,i){"use strict";t(25)._set("global",{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},layout:{padding:{top:0,right:0,bottom:0,left:0}}}),e.exports=function(){var t=function(t,e){return this.construct(t,e),this};return t.Chart=t,t}},{25:25}],30:[function(t,e,i){"use strict";var n=t(45);function a(t,e){return n.where(t,function(t){return t.position===e})}function o(t,e){t.forEach(function(t,e){return t._tmpIndex_=e,t}),t.sort(function(t,i){var n=e?i:t,a=e?t:i;return n.weight===a.weight?n._tmpIndex_-a._tmpIndex_:n.weight-a.weight}),t.forEach(function(t){delete t._tmpIndex_})}e.exports={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),e.fullWidth=e.fullWidth||!1,e.position=e.position||"top",e.weight=e.weight||0,t.boxes.push(e)},removeBox:function(t,e){var i=t.boxes?t.boxes.indexOf(e):-1;-1!==i&&t.boxes.splice(i,1)},configure:function(t,e,i){for(var n,a=["fullWidth","position","weight"],o=a.length,r=0;r<o;++r)n=a[r],i.hasOwnProperty(n)&&(e[n]=i[n])},update:function(t,e,i){if(t){var r=t.options.layout||{},s=n.options.toPadding(r.padding),l=s.left,u=s.right,d=s.top,c=s.bottom,h=a(t.boxes,"left"),f=a(t.boxes,"right"),g=a(t.boxes,"top"),p=a(t.boxes,"bottom"),m=a(t.boxes,"chartArea");o(h,!0),o(f,!1),o(g,!0),o(p,!1);var v=e-l-u,b=i-d-c,x=b/2,y=(e-v/2)/(h.length+f.length),k=(i-x)/(g.length+p.length),M=v,w=b,S=[];n.each(h.concat(f,g,p),function(t){var e,i=t.isHorizontal();i?(e=t.update(t.fullWidth?v:M,k),w-=e.height):(e=t.update(y,w),M-=e.width),S.push({horizontal:i,minSize:e,box:t})});var C=0,_=0,D=0,I=0;n.each(g.concat(p),function(t){if(t.getPadding){var e=t.getPadding();C=Math.max(C,e.left),_=Math.max(_,e.right)}}),n.each(h.concat(f),function(t){if(t.getPadding){var e=t.getPadding();D=Math.max(D,e.top),I=Math.max(I,e.bottom)}});var P=l,A=u,T=d,F=c;n.each(h.concat(f),N),n.each(h,function(t){P+=t.width}),n.each(f,function(t){A+=t.width}),n.each(g.concat(p),N),n.each(g,function(t){T+=t.height}),n.each(p,function(t){F+=t.height}),n.each(h.concat(f),function(t){var e=n.findNextWhere(S,function(e){return e.box===t}),i={left:0,right:0,top:T,bottom:F};e&&t.update(e.minSize.width,w,i)}),P=l,A=u,T=d,F=c,n.each(h,function(t){P+=t.width}),n.each(f,function(t){A+=t.width}),n.each(g,function(t){T+=t.height}),n.each(p,function(t){F+=t.height});var O=Math.max(C-P,0);P+=O,A+=Math.max(_-A,0);var R=Math.max(D-T,0);T+=R,F+=Math.max(I-F,0);var L=i-T-F,z=e-P-A;z===M&&L===w||(n.each(h,function(t){t.height=L}),n.each(f,function(t){t.height=L}),n.each(g,function(t){t.fullWidth||(t.width=z)}),n.each(p,function(t){t.fullWidth||(t.width=z)}),w=L,M=z);var B=l+O,W=d+R;n.each(h.concat(g),V),B+=M,W+=w,n.each(f,V),n.each(p,V),t.chartArea={left:P,top:T,right:P+M,bottom:T+w},n.each(m,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(M,w)})}function N(t){var e=n.findNextWhere(S,function(e){return e.box===t});if(e)if(t.isHorizontal()){var i={left:Math.max(P,C),right:Math.max(A,_),top:0,bottom:0};t.update(t.fullWidth?v:M,b/2,i)}else t.update(e.minSize.width,w)}function V(t){t.isHorizontal()?(t.left=t.fullWidth?l:P,t.right=t.fullWidth?e-u:P+M,t.top=W,t.bottom=W+t.height,W=t.bottom):(t.left=B,t.right=B+t.width,t.top=T,t.bottom=T+w,B=t.right)}}}},{45:45}],31:[function(t,e,i){"use strict";var n=t(25),a=t(45);n._set("global",{plugins:{}}),e.exports={_plugins:[],_cacheId:0,register:function(t){var e=this._plugins;[].concat(t).forEach(function(t){-1===e.indexOf(t)&&e.push(t)}),this._cacheId++},unregister:function(t){var e=this._plugins;[].concat(t).forEach(function(t){var i=e.indexOf(t);-1!==i&&e.splice(i,1)}),this._cacheId++},clear:function(){this._plugins=[],this._cacheId++},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e,i){var n,a,o,r,s,l=this.descriptors(t),u=l.length;for(n=0;n<u;++n)if("function"==typeof(s=(o=(a=l[n]).plugin)[e])&&((r=[t].concat(i||[])).push(a.options),!1===s.apply(o,r)))return!1;return!0},descriptors:function(t){var e=t.$plugins||(t.$plugins={});if(e.id===this._cacheId)return e.descriptors;var i=[],o=[],r=t&&t.config||{},s=r.options&&r.options.plugins||{};return this._plugins.concat(r.plugins||[]).forEach(function(t){if(-1===i.indexOf(t)){var e=t.id,r=s[e];!1!==r&&(!0===r&&(r=a.clone(n.global.plugins[e])),i.push(t),o.push({plugin:t,options:r||{}}))}}),e.descriptors=o,e.id=this._cacheId,o},_invalidate:function(t){delete t.$plugins}}},{25:25,45:45}],32:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45),r=t(34);function s(t){var e,i,n=[];for(e=0,i=t.length;e<i;++e)n.push(t[e].label);return n}function l(t,e,i){var n=t.getPixelForTick(e);return i&&(n-=0===e?(t.getPixelForTick(1)-n)/2:(n-t.getPixelForTick(e-1))/2),n}n._set("scale",{display:!0,position:"left",offset:!1,gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",zeroLineBorderDash:[],zeroLineBorderDashOffset:0,offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{display:!1,labelString:"",lineHeight:1.2,padding:{top:4,bottom:4}},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:0,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:r.formatters.values,minor:{},major:{}}}),e.exports=function(t){function e(t,e,i){return o.isArray(e)?o.longestText(t,i,e):t.measureText(e).width}function i(t){var e=o.valueOrDefault,i=n.global,a=e(t.fontSize,i.defaultFontSize),r=e(t.fontStyle,i.defaultFontStyle),s=e(t.fontFamily,i.defaultFontFamily);return{size:a,style:r,family:s,font:o.fontString(a,r,s)}}function r(t){return o.options.toLineHeight(o.valueOrDefault(t.lineHeight,1.2),o.valueOrDefault(t.fontSize,n.global.defaultFontSize))}t.Scale=a.extend({getPadding:function(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}},getTicks:function(){return this._ticks},mergeTicksOptions:function(){var t=this.options.ticks;for(var e in!1===t.minor&&(t.minor={display:!1}),!1===t.major&&(t.major={display:!1}),t)"major"!==e&&"minor"!==e&&(void 0===t.minor[e]&&(t.minor[e]=t[e]),void 0===t.major[e]&&(t.major[e]=t[e]))},beforeUpdate:function(){o.callback(this.options.beforeUpdate,[this])},update:function(t,e,i){var n,a,r,s,l,u,d=this;for(d.beforeUpdate(),d.maxWidth=t,d.maxHeight=e,d.margins=o.extend({left:0,right:0,top:0,bottom:0},i),d.longestTextCache=d.longestTextCache||{},d.beforeSetDimensions(),d.setDimensions(),d.afterSetDimensions(),d.beforeDataLimits(),d.determineDataLimits(),d.afterDataLimits(),d.beforeBuildTicks(),l=d.buildTicks()||[],d.afterBuildTicks(),d.beforeTickToLabelConversion(),r=d.convertTicksToLabels(l)||d.ticks,d.afterTickToLabelConversion(),d.ticks=r,n=0,a=r.length;n<a;++n)s=r[n],(u=l[n])?u.label=s:l.push(u={label:s,major:!1});return d._ticks=l,d.beforeCalculateTickRotation(),d.calculateTickRotation(),d.afterCalculateTickRotation(),d.beforeFit(),d.fit(),d.afterFit(),d.afterUpdate(),d.minSize},afterUpdate:function(){o.callback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){o.callback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){o.callback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){o.callback(this.options.beforeDataLimits,[this])},determineDataLimits:o.noop,afterDataLimits:function(){o.callback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){o.callback(this.options.beforeBuildTicks,[this])},buildTicks:o.noop,afterBuildTicks:function(){o.callback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){o.callback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this.options.ticks;this.ticks=this.ticks.map(t.userCallback||t.callback,this)},afterTickToLabelConversion:function(){o.callback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){o.callback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var t=this,e=t.ctx,n=t.options.ticks,a=s(t._ticks),r=i(n);e.font=r.font;var l=n.minRotation||0;if(a.length&&t.options.display&&t.isHorizontal())for(var u,d=o.longestText(e,r.font,a,t.longestTextCache),c=d,h=t.getPixelForTick(1)-t.getPixelForTick(0)-6;c>h&&l<n.maxRotation;){var f=o.toRadians(l);if(u=Math.cos(f),Math.sin(f)*d>t.maxHeight){l--;break}l++,c=u*d}t.labelRotation=l},afterCalculateTickRotation:function(){o.callback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){o.callback(this.options.beforeFit,[this])},fit:function(){var t=this,n=t.minSize={width:0,height:0},a=s(t._ticks),l=t.options,u=l.ticks,d=l.scaleLabel,c=l.gridLines,h=l.display,f=t.isHorizontal(),g=i(u),p=l.gridLines.tickMarkLength;if(n.width=f?t.isFullWidth()?t.maxWidth-t.margins.left-t.margins.right:t.maxWidth:h&&c.drawTicks?p:0,n.height=f?h&&c.drawTicks?p:0:t.maxHeight,d.display&&h){var m=r(d)+o.options.toPadding(d.padding).height;f?n.height+=m:n.width+=m}if(u.display&&h){var v=o.longestText(t.ctx,g.font,a,t.longestTextCache),b=o.numberOfLabelLines(a),x=.5*g.size,y=t.options.ticks.padding;if(f){t.longestLabelWidth=v;var k=o.toRadians(t.labelRotation),M=Math.cos(k),w=Math.sin(k)*v+g.size*b+x*(b-1)+x;n.height=Math.min(t.maxHeight,n.height+w+y),t.ctx.font=g.font;var S=e(t.ctx,a[0],g.font),C=e(t.ctx,a[a.length-1],g.font);0!==t.labelRotation?(t.paddingLeft="bottom"===l.position?M*S+3:M*x+3,t.paddingRight="bottom"===l.position?M*x+3:M*C+3):(t.paddingLeft=S/2+3,t.paddingRight=C/2+3)}else u.mirror?v=0:v+=y+x,n.width=Math.min(t.maxWidth,n.width+v),t.paddingTop=g.size/2,t.paddingBottom=g.size/2}t.handleMargins(),t.width=n.width,t.height=n.height},handleMargins:function(){var t=this;t.margins&&(t.paddingLeft=Math.max(t.paddingLeft-t.margins.left,0),t.paddingTop=Math.max(t.paddingTop-t.margins.top,0),t.paddingRight=Math.max(t.paddingRight-t.margins.right,0),t.paddingBottom=Math.max(t.paddingBottom-t.margins.bottom,0))},afterFit:function(){o.callback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(t){if(o.isNullOrUndef(t))return NaN;if("number"==typeof t&&!isFinite(t))return NaN;if(t)if(this.isHorizontal()){if(void 0!==t.x)return this.getRightValue(t.x)}else if(void 0!==t.y)return this.getRightValue(t.y);return t},getLabelForIndex:o.noop,getPixelForValue:o.noop,getValueForPixel:o.noop,getPixelForTick:function(t){var e=this,i=e.options.offset;if(e.isHorizontal()){var n=(e.width-(e.paddingLeft+e.paddingRight))/Math.max(e._ticks.length-(i?0:1),1),a=n*t+e.paddingLeft;i&&(a+=n/2);var o=e.left+Math.round(a);return o+=e.isFullWidth()?e.margins.left:0}var r=e.height-(e.paddingTop+e.paddingBottom);return e.top+t*(r/(e._ticks.length-1))},getPixelForDecimal:function(t){var e=this;if(e.isHorizontal()){var i=(e.width-(e.paddingLeft+e.paddingRight))*t+e.paddingLeft,n=e.left+Math.round(i);return n+=e.isFullWidth()?e.margins.left:0}return e.top+t*e.height},getBasePixel:function(){return this.getPixelForValue(this.getBaseValue())},getBaseValue:function(){var t=this.min,e=this.max;return this.beginAtZero?0:t<0&&e<0?e:t>0&&e>0?t:0},_autoSkip:function(t){var e,i,n,a,r=this,s=r.isHorizontal(),l=r.options.ticks.minor,u=t.length,d=o.toRadians(r.labelRotation),c=Math.cos(d),h=r.longestLabelWidth*c,f=[];for(l.maxTicksLimit&&(a=l.maxTicksLimit),s&&(e=!1,(h+l.autoSkipPadding)*u>r.width-(r.paddingLeft+r.paddingRight)&&(e=1+Math.floor((h+l.autoSkipPadding)*u/(r.width-(r.paddingLeft+r.paddingRight)))),a&&u>a&&(e=Math.max(e,Math.floor(u/a)))),i=0;i<u;i++)n=t[i],(e>1&&i%e>0||i%e==0&&i+e>=u)&&i!==u-1&&delete n.label,f.push(n);return f},draw:function(t){var e=this,a=e.options;if(a.display){var s=e.ctx,u=n.global,d=a.ticks.minor,c=a.ticks.major||d,h=a.gridLines,f=a.scaleLabel,g=0!==e.labelRotation,p=e.isHorizontal(),m=d.autoSkip?e._autoSkip(e.getTicks()):e.getTicks(),v=o.valueOrDefault(d.fontColor,u.defaultFontColor),b=i(d),x=o.valueOrDefault(c.fontColor,u.defaultFontColor),y=i(c),k=h.drawTicks?h.tickMarkLength:0,M=o.valueOrDefault(f.fontColor,u.defaultFontColor),w=i(f),S=o.options.toPadding(f.padding),C=o.toRadians(e.labelRotation),_=[],D=e.options.gridLines.lineWidth,I="right"===a.position?e.right:e.right-D-k,P="right"===a.position?e.right+k:e.right,A="bottom"===a.position?e.top+D:e.bottom-k-D,T="bottom"===a.position?e.top+D+k:e.bottom+D;if(o.each(m,function(i,n){if(!o.isNullOrUndef(i.label)){var r,s,c,f,v,b,x,y,M,w,S,F,O,R,L=i.label;n===e.zeroLineIndex&&a.offset===h.offsetGridLines?(r=h.zeroLineWidth,s=h.zeroLineColor,c=h.zeroLineBorderDash,f=h.zeroLineBorderDashOffset):(r=o.valueAtIndexOrDefault(h.lineWidth,n),s=o.valueAtIndexOrDefault(h.color,n),c=o.valueOrDefault(h.borderDash,u.borderDash),f=o.valueOrDefault(h.borderDashOffset,u.borderDashOffset));var z="middle",B="middle",W=d.padding;if(p){var N=k+W;"bottom"===a.position?(B=g?"middle":"top",z=g?"right":"center",R=e.top+N):(B=g?"middle":"bottom",z=g?"left":"center",R=e.bottom-N);var V=l(e,n,h.offsetGridLines&&m.length>1);V<e.left&&(s="rgba(0,0,0,0)"),V+=o.aliasPixel(r),O=e.getPixelForTick(n)+d.labelOffset,v=x=M=S=V,b=A,y=T,w=t.top,F=t.bottom+D}else{var E,H="left"===a.position;d.mirror?(z=H?"left":"right",E=W):(z=H?"right":"left",E=k+W),O=H?e.right-E:e.left+E;var j=l(e,n,h.offsetGridLines&&m.length>1);j<e.top&&(s="rgba(0,0,0,0)"),j+=o.aliasPixel(r),R=e.getPixelForTick(n)+d.labelOffset,v=I,x=P,M=t.left,S=t.right+D,b=y=w=F=j}_.push({tx1:v,ty1:b,tx2:x,ty2:y,x1:M,y1:w,x2:S,y2:F,labelX:O,labelY:R,glWidth:r,glColor:s,glBorderDash:c,glBorderDashOffset:f,rotation:-1*C,label:L,major:i.major,textBaseline:B,textAlign:z})}}),o.each(_,function(t){if(h.display&&(s.save(),s.lineWidth=t.glWidth,s.strokeStyle=t.glColor,s.setLineDash&&(s.setLineDash(t.glBorderDash),s.lineDashOffset=t.glBorderDashOffset),s.beginPath(),h.drawTicks&&(s.moveTo(t.tx1,t.ty1),s.lineTo(t.tx2,t.ty2)),h.drawOnChartArea&&(s.moveTo(t.x1,t.y1),s.lineTo(t.x2,t.y2)),s.stroke(),s.restore()),d.display){s.save(),s.translate(t.labelX,t.labelY),s.rotate(t.rotation),s.font=t.major?y.font:b.font,s.fillStyle=t.major?x:v,s.textBaseline=t.textBaseline,s.textAlign=t.textAlign;var i=t.label;if(o.isArray(i))for(var n=i.length,a=1.5*b.size,r=e.isHorizontal()?0:-a*(n-1)/2,l=0;l<n;++l)s.fillText(""+i[l],0,r),r+=a;else s.fillText(i,0,0);s.restore()}}),f.display){var F,O,R=0,L=r(f)/2;if(p)F=e.left+(e.right-e.left)/2,O="bottom"===a.position?e.bottom-L-S.bottom:e.top+L+S.top;else{var z="left"===a.position;F=z?e.left+L+S.top:e.right-L-S.top,O=e.top+(e.bottom-e.top)/2,R=z?-.5*Math.PI:.5*Math.PI}s.save(),s.translate(F,O),s.rotate(R),s.textAlign="center",s.textBaseline="middle",s.fillStyle=M,s.font=w.font,s.fillText(f.labelString,0,0),s.restore()}if(h.drawBorder){s.lineWidth=o.valueAtIndexOrDefault(h.lineWidth,0),s.strokeStyle=o.valueAtIndexOrDefault(h.color,0);var B=e.left,W=e.right+D,N=e.top,V=e.bottom+D,E=o.aliasPixel(s.lineWidth);p?(N=V="top"===a.position?e.bottom:e.top,N+=E,V+=E):(B=W="left"===a.position?e.right:e.left,B+=E,W+=E),s.beginPath(),s.moveTo(B,N),s.lineTo(W,V),s.stroke()}}}})}},{25:25,26:26,34:34,45:45}],33:[function(t,e,i){"use strict";var n=t(25),a=t(45),o=t(30);e.exports=function(t){t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,e,i){this.constructors[t]=e,this.defaults[t]=a.clone(i)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(t){return this.defaults.hasOwnProperty(t)?a.merge({},[n.scale,this.defaults[t]]):{}},updateScaleDefaults:function(t,e){this.defaults.hasOwnProperty(t)&&(this.defaults[t]=a.extend(this.defaults[t],e))},addScalesToLayout:function(t){a.each(t.scales,function(e){e.fullWidth=e.options.fullWidth,e.position=e.options.position,e.weight=e.options.weight,o.addBox(t,e)})}}}},{25:25,30:30,45:45}],34:[function(t,e,i){"use strict";var n=t(45);e.exports={formatters:{values:function(t){return n.isArray(t)?t:""+t},linear:function(t,e,i){var a=i.length>3?i[2]-i[1]:i[1]-i[0];Math.abs(a)>1&&t!==Math.floor(t)&&(a=t-Math.floor(t));var o=n.log10(Math.abs(a)),r="";if(0!==t){var s=-1*Math.floor(o);s=Math.max(Math.min(s,20),0),r=t.toFixed(s)}else r="0";return r},logarithmic:function(t,e,i){var a=t/Math.pow(10,Math.floor(n.log10(t)));return 0===t?"0":1===a||2===a||5===a||0===e||e===i.length-1?t.toExponential():""}}}},{45:45}],35:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45);n._set("global",{tooltips:{enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretPadding:2,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,borderColor:"rgba(0,0,0,0)",borderWidth:0,callbacks:{beforeTitle:o.noop,title:function(t,e){var i="",n=e.labels,a=n?n.length:0;if(t.length>0){var o=t[0];o.xLabel?i=o.xLabel:a>0&&o.index<a&&(i=n[o.index])}return i},afterTitle:o.noop,beforeBody:o.noop,beforeLabel:o.noop,label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i&&(i+=": "),i+=t.yLabel},labelColor:function(t,e){var i=e.getDatasetMeta(t.datasetIndex).data[t.index]._view;return{borderColor:i.borderColor,backgroundColor:i.backgroundColor}},labelTextColor:function(){return this._options.bodyFontColor},afterLabel:o.noop,afterBody:o.noop,beforeFooter:o.noop,footer:o.noop,afterFooter:o.noop}}}),e.exports=function(t){function e(t,e){var i=o.color(t);return i.alpha(e*i.alpha()).rgbaString()}function i(t,e){return e&&(o.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function r(t){var e=n.global,i=o.valueOrDefault;return{xPadding:t.xPadding,yPadding:t.yPadding,xAlign:t.xAlign,yAlign:t.yAlign,bodyFontColor:t.bodyFontColor,_bodyFontFamily:i(t.bodyFontFamily,e.defaultFontFamily),_bodyFontStyle:i(t.bodyFontStyle,e.defaultFontStyle),_bodyAlign:t.bodyAlign,bodyFontSize:i(t.bodyFontSize,e.defaultFontSize),bodySpacing:t.bodySpacing,titleFontColor:t.titleFontColor,_titleFontFamily:i(t.titleFontFamily,e.defaultFontFamily),_titleFontStyle:i(t.titleFontStyle,e.defaultFontStyle),titleFontSize:i(t.titleFontSize,e.defaultFontSize),_titleAlign:t.titleAlign,titleSpacing:t.titleSpacing,titleMarginBottom:t.titleMarginBottom,footerFontColor:t.footerFontColor,_footerFontFamily:i(t.footerFontFamily,e.defaultFontFamily),_footerFontStyle:i(t.footerFontStyle,e.defaultFontStyle),footerFontSize:i(t.footerFontSize,e.defaultFontSize),_footerAlign:t.footerAlign,footerSpacing:t.footerSpacing,footerMarginTop:t.footerMarginTop,caretSize:t.caretSize,cornerRadius:t.cornerRadius,backgroundColor:t.backgroundColor,opacity:0,legendColorBackground:t.multiKeyBackground,displayColors:t.displayColors,borderColor:t.borderColor,borderWidth:t.borderWidth}}t.Tooltip=a.extend({initialize:function(){this._model=r(this._options),this._lastActive=[]},getTitle:function(){var t=this._options.callbacks,e=t.beforeTitle.apply(this,arguments),n=t.title.apply(this,arguments),a=t.afterTitle.apply(this,arguments),o=[];return o=i(o=i(o=i(o,e),n),a)},getBeforeBody:function(){var t=this._options.callbacks.beforeBody.apply(this,arguments);return o.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,e){var n=this,a=n._options.callbacks,r=[];return o.each(t,function(t){var o={before:[],lines:[],after:[]};i(o.before,a.beforeLabel.call(n,t,e)),i(o.lines,a.label.call(n,t,e)),i(o.after,a.afterLabel.call(n,t,e)),r.push(o)}),r},getAfterBody:function(){var t=this._options.callbacks.afterBody.apply(this,arguments);return o.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this._options.callbacks,e=t.beforeFooter.apply(this,arguments),n=t.footer.apply(this,arguments),a=t.afterFooter.apply(this,arguments),o=[];return o=i(o=i(o=i(o,e),n),a)},update:function(e){var i,n,a,s,l,u,d,c,h,f,g,p,m,v,b,x,y,k,M,w,S=this,C=S._options,_=S._model,D=S._model=r(C),I=S._active,P=S._data,A={xAlign:_.xAlign,yAlign:_.yAlign},T={x:_.x,y:_.y},F={width:_.width,height:_.height},O={x:_.caretX,y:_.caretY};if(I.length){D.opacity=1;var R=[],L=[];O=t.Tooltip.positioners[C.position].call(S,I,S._eventPosition);var z=[];for(i=0,n=I.length;i<n;++i)z.push((x=I[i],y=void 0,k=void 0,void 0,void 0,y=x._xScale,k=x._yScale||x._scale,M=x._index,w=x._datasetIndex,{xLabel:y?y.getLabelForIndex(M,w):"",yLabel:k?k.getLabelForIndex(M,w):"",index:M,datasetIndex:w,x:x._model.x,y:x._model.y}));C.filter&&(z=z.filter(function(t){return C.filter(t,P)})),C.itemSort&&(z=z.sort(function(t,e){return C.itemSort(t,e,P)})),o.each(z,function(t){R.push(C.callbacks.labelColor.call(S,t,S._chart)),L.push(C.callbacks.labelTextColor.call(S,t,S._chart))}),D.title=S.getTitle(z,P),D.beforeBody=S.getBeforeBody(z,P),D.body=S.getBody(z,P),D.afterBody=S.getAfterBody(z,P),D.footer=S.getFooter(z,P),D.x=Math.round(O.x),D.y=Math.round(O.y),D.caretPadding=C.caretPadding,D.labelColors=R,D.labelTextColors=L,D.dataPoints=z,A=function(t,e){var i,n,a,o,r,s=t._model,l=t._chart,u=t._chart.chartArea,d="center",c="center";s.y<e.height?c="top":s.y>l.height-e.height&&(c="bottom");var h=(u.left+u.right)/2,f=(u.top+u.bottom)/2;"center"===c?(i=function(t){return t<=h},n=function(t){return t>h}):(i=function(t){return t<=e.width/2},n=function(t){return t>=l.width-e.width/2}),a=function(t){return t+e.width+s.caretSize+s.caretPadding>l.width},o=function(t){return t-e.width-s.caretSize-s.caretPadding<0},r=function(t){return t<=f?"top":"bottom"},i(s.x)?(d="left",a(s.x)&&(d="center",c=r(s.y))):n(s.x)&&(d="right",o(s.x)&&(d="center",c=r(s.y)));var g=t._options;return{xAlign:g.xAlign?g.xAlign:d,yAlign:g.yAlign?g.yAlign:c}}(this,F=function(t,e){var i=t._chart.ctx,n=2*e.yPadding,a=0,r=e.body,s=r.reduce(function(t,e){return t+e.before.length+e.lines.length+e.after.length},0);s+=e.beforeBody.length+e.afterBody.length;var l=e.title.length,u=e.footer.length,d=e.titleFontSize,c=e.bodyFontSize,h=e.footerFontSize;n+=l*d,n+=l?(l-1)*e.titleSpacing:0,n+=l?e.titleMarginBottom:0,n+=s*c,n+=s?(s-1)*e.bodySpacing:0,n+=u?e.footerMarginTop:0,n+=u*h,n+=u?(u-1)*e.footerSpacing:0;var f=0,g=function(t){a=Math.max(a,i.measureText(t).width+f)};return i.font=o.fontString(d,e._titleFontStyle,e._titleFontFamily),o.each(e.title,g),i.font=o.fontString(c,e._bodyFontStyle,e._bodyFontFamily),o.each(e.beforeBody.concat(e.afterBody),g),f=e.displayColors?c+2:0,o.each(r,function(t){o.each(t.before,g),o.each(t.lines,g),o.each(t.after,g)}),f=0,i.font=o.fontString(h,e._footerFontStyle,e._footerFontFamily),o.each(e.footer,g),{width:a+=2*e.xPadding,height:n}}(this,D)),a=D,s=F,l=A,u=S._chart,d=a.x,c=a.y,h=a.caretSize,f=a.caretPadding,g=a.cornerRadius,p=l.xAlign,m=l.yAlign,v=h+f,b=g+f,"right"===p?d-=s.width:"center"===p&&((d-=s.width/2)+s.width>u.width&&(d=u.width-s.width),d<0&&(d=0)),"top"===m?c+=v:c-="bottom"===m?s.height+v:s.height/2,"center"===m?"left"===p?d+=v:"right"===p&&(d-=v):"left"===p?d-=b:"right"===p&&(d+=b),T={x:d,y:c}}else D.opacity=0;return D.xAlign=A.xAlign,D.yAlign=A.yAlign,D.x=T.x,D.y=T.y,D.width=F.width,D.height=F.height,D.caretX=O.x,D.caretY=O.y,S._model=D,e&&C.custom&&C.custom.call(S,D),S},drawCaret:function(t,e){var i=this._chart.ctx,n=this._view,a=this.getCaretPosition(t,e,n);i.lineTo(a.x1,a.y1),i.lineTo(a.x2,a.y2),i.lineTo(a.x3,a.y3)},getCaretPosition:function(t,e,i){var n,a,o,r,s,l,u=i.caretSize,d=i.cornerRadius,c=i.xAlign,h=i.yAlign,f=t.x,g=t.y,p=e.width,m=e.height;if("center"===h)s=g+m/2,"left"===c?(a=(n=f)-u,o=n,r=s+u,l=s-u):(a=(n=f+p)+u,o=n,r=s-u,l=s+u);else if("left"===c?(n=(a=f+d+u)-u,o=a+u):"right"===c?(n=(a=f+p-d-u)-u,o=a+u):(n=(a=i.caretX)-u,o=a+u),"top"===h)s=(r=g)-u,l=r;else{s=(r=g+m)+u,l=r;var v=o;o=n,n=v}return{x1:n,x2:a,x3:o,y1:r,y2:s,y3:l}},drawTitle:function(t,i,n,a){var r=i.title;if(r.length){n.textAlign=i._titleAlign,n.textBaseline="top";var s,l,u=i.titleFontSize,d=i.titleSpacing;for(n.fillStyle=e(i.titleFontColor,a),n.font=o.fontString(u,i._titleFontStyle,i._titleFontFamily),s=0,l=r.length;s<l;++s)n.fillText(r[s],t.x,t.y),t.y+=u+d,s+1===r.length&&(t.y+=i.titleMarginBottom-d)}},drawBody:function(t,i,n,a){var r=i.bodyFontSize,s=i.bodySpacing,l=i.body;n.textAlign=i._bodyAlign,n.textBaseline="top",n.font=o.fontString(r,i._bodyFontStyle,i._bodyFontFamily);var u=0,d=function(e){n.fillText(e,t.x+u,t.y),t.y+=r+s};n.fillStyle=e(i.bodyFontColor,a),o.each(i.beforeBody,d);var c=i.displayColors;u=c?r+2:0,o.each(l,function(s,l){var u=e(i.labelTextColors[l],a);n.fillStyle=u,o.each(s.before,d),o.each(s.lines,function(o){c&&(n.fillStyle=e(i.legendColorBackground,a),n.fillRect(t.x,t.y,r,r),n.lineWidth=1,n.strokeStyle=e(i.labelColors[l].borderColor,a),n.strokeRect(t.x,t.y,r,r),n.fillStyle=e(i.labelColors[l].backgroundColor,a),n.fillRect(t.x+1,t.y+1,r-2,r-2),n.fillStyle=u),d(o)}),o.each(s.after,d)}),u=0,o.each(i.afterBody,d),t.y-=s},drawFooter:function(t,i,n,a){var r=i.footer;r.length&&(t.y+=i.footerMarginTop,n.textAlign=i._footerAlign,n.textBaseline="top",n.fillStyle=e(i.footerFontColor,a),n.font=o.fontString(i.footerFontSize,i._footerFontStyle,i._footerFontFamily),o.each(r,function(e){n.fillText(e,t.x,t.y),t.y+=i.footerFontSize+i.footerSpacing}))},drawBackground:function(t,i,n,a,o){n.fillStyle=e(i.backgroundColor,o),n.strokeStyle=e(i.borderColor,o),n.lineWidth=i.borderWidth;var r=i.xAlign,s=i.yAlign,l=t.x,u=t.y,d=a.width,c=a.height,h=i.cornerRadius;n.beginPath(),n.moveTo(l+h,u),"top"===s&&this.drawCaret(t,a),n.lineTo(l+d-h,u),n.quadraticCurveTo(l+d,u,l+d,u+h),"center"===s&&"right"===r&&this.drawCaret(t,a),n.lineTo(l+d,u+c-h),n.quadraticCurveTo(l+d,u+c,l+d-h,u+c),"bottom"===s&&this.drawCaret(t,a),n.lineTo(l+h,u+c),n.quadraticCurveTo(l,u+c,l,u+c-h),"center"===s&&"left"===r&&this.drawCaret(t,a),n.lineTo(l,u+h),n.quadraticCurveTo(l,u,l+h,u),n.closePath(),n.fill(),i.borderWidth>0&&n.stroke()},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var i={width:e.width,height:e.height},n={x:e.x,y:e.y},a=Math.abs(e.opacity<.001)?0:e.opacity,o=e.title.length||e.beforeBody.length||e.body.length||e.afterBody.length||e.footer.length;this._options.enabled&&o&&(this.drawBackground(n,e,t,i,a),n.x+=e.xPadding,n.y+=e.yPadding,this.drawTitle(n,e,t,a),this.drawBody(n,e,t,a),this.drawFooter(n,e,t,a))}},handleEvent:function(t){var e,i=this,n=i._options;return i._lastActive=i._lastActive||[],"mouseout"===t.type?i._active=[]:i._active=i._chart.getElementsAtEventForMode(t,n.mode,n),(e=!o.arrayEquals(i._active,i._lastActive))&&(i._lastActive=i._active,(n.enabled||n.custom)&&(i._eventPosition={x:t.x,y:t.y},i.update(!0),i.pivot())),e}}),t.Tooltip.positioners={average:function(t){if(!t.length)return!1;var e,i,n=0,a=0,o=0;for(e=0,i=t.length;e<i;++e){var r=t[e];if(r&&r.hasValue()){var s=r.tooltipPosition();n+=s.x,a+=s.y,++o}}return{x:Math.round(n/o),y:Math.round(a/o)}},nearest:function(t,e){var i,n,a,r=e.x,s=e.y,l=Number.POSITIVE_INFINITY;for(i=0,n=t.length;i<n;++i){var u=t[i];if(u&&u.hasValue()){var d=u.getCenterPoint(),c=o.distanceBetweenPoints(e,d);c<l&&(l=c,a=u)}}if(a){var h=a.tooltipPosition();r=h.x,s=h.y}return{x:r,y:s}}}}},{25:25,26:26,45:45}],36:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45);n._set("global",{elements:{arc:{backgroundColor:n.global.defaultColor,borderColor:"#fff",borderWidth:2}}}),e.exports=a.extend({inLabelRange:function(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2)},inRange:function(t,e){var i=this._view;if(i){for(var n=o.getAngleFromPoint(i,{x:t,y:e}),a=n.angle,r=n.distance,s=i.startAngle,l=i.endAngle;l<s;)l+=2*Math.PI;for(;a>l;)a-=2*Math.PI;for(;a<s;)a+=2*Math.PI;var u=a>=s&&a<=l,d=r>=i.innerRadius&&r<=i.outerRadius;return u&&d}return!1},getCenterPoint:function(){var t=this._view,e=(t.startAngle+t.endAngle)/2,i=(t.innerRadius+t.outerRadius)/2;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},getArea:function(){var t=this._view;return Math.PI*((t.endAngle-t.startAngle)/(2*Math.PI))*(Math.pow(t.outerRadius,2)-Math.pow(t.innerRadius,2))},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,i=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},draw:function(){var t=this._chart.ctx,e=this._view,i=e.startAngle,n=e.endAngle;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,i,n),t.arc(e.x,e.y,e.innerRadius,n,i,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})},{25:25,26:26,45:45}],37:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45),r=n.global;n._set("global",{elements:{line:{tension:.4,backgroundColor:r.defaultColor,borderWidth:3,borderColor:r.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0}}}),e.exports=a.extend({draw:function(){var t,e,i,n,a=this._view,s=this._chart.ctx,l=a.spanGaps,u=this._children.slice(),d=r.elements.line,c=-1;for(this._loop&&u.length&&u.push(u[0]),s.save(),s.lineCap=a.borderCapStyle||d.borderCapStyle,s.setLineDash&&s.setLineDash(a.borderDash||d.borderDash),s.lineDashOffset=a.borderDashOffset||d.borderDashOffset,s.lineJoin=a.borderJoinStyle||d.borderJoinStyle,s.lineWidth=a.borderWidth||d.borderWidth,s.strokeStyle=a.borderColor||r.defaultColor,s.beginPath(),c=-1,t=0;t<u.length;++t)e=u[t],i=o.previousItem(u,t),n=e._view,0===t?n.skip||(s.moveTo(n.x,n.y),c=t):(i=-1===c?i:u[c],n.skip||(c!==t-1&&!l||-1===c?s.moveTo(n.x,n.y):o.canvas.lineTo(s,i._view,e._view),c=t));s.stroke(),s.restore()}})},{25:25,26:26,45:45}],38:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45),r=n.global.defaultColor;function s(t){var e=this._view;return!!e&&Math.abs(t-e.x)<e.radius+e.hitRadius}n._set("global",{elements:{point:{radius:3,pointStyle:"circle",backgroundColor:r,borderColor:r,borderWidth:1,hitRadius:1,hoverRadius:4,hoverBorderWidth:1}}}),e.exports=a.extend({inRange:function(t,e){var i=this._view;return!!i&&Math.pow(t-i.x,2)+Math.pow(e-i.y,2)<Math.pow(i.hitRadius+i.radius,2)},inLabelRange:s,inXRange:s,inYRange:function(t){var e=this._view;return!!e&&Math.abs(t-e.y)<e.radius+e.hitRadius},getCenterPoint:function(){var t=this._view;return{x:t.x,y:t.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(t){var e=this._view,i=this._model,a=this._chart.ctx,s=e.pointStyle,l=e.radius,u=e.x,d=e.y,c=o.color,h=0;e.skip||(a.strokeStyle=e.borderColor||r,a.lineWidth=o.valueOrDefault(e.borderWidth,n.global.elements.point.borderWidth),a.fillStyle=e.backgroundColor||r,void 0!==t&&(i.x<t.left||1.01*t.right<i.x||i.y<t.top||1.01*t.bottom<i.y)&&(i.x<t.left?h=(u-i.x)/(t.left-i.x):1.01*t.right<i.x?h=(i.x-u)/(i.x-t.right):i.y<t.top?h=(d-i.y)/(t.top-i.y):1.01*t.bottom<i.y&&(h=(i.y-d)/(i.y-t.bottom)),h=Math.round(100*h)/100,a.strokeStyle=c(a.strokeStyle).alpha(h).rgbString(),a.fillStyle=c(a.fillStyle).alpha(h).rgbString()),o.canvas.drawPoint(a,s,l,u,d))}})},{25:25,26:26,45:45}],39:[function(t,e,i){"use strict";var n=t(25),a=t(26);function o(t){return void 0!==t._view.width}function r(t){var e,i,n,a,r=t._view;if(o(t)){var s=r.width/2;e=r.x-s,i=r.x+s,n=Math.min(r.y,r.base),a=Math.max(r.y,r.base)}else{var l=r.height/2;e=Math.min(r.x,r.base),i=Math.max(r.x,r.base),n=r.y-l,a=r.y+l}return{left:e,top:n,right:i,bottom:a}}n._set("global",{elements:{rectangle:{backgroundColor:n.global.defaultColor,borderColor:n.global.defaultColor,borderSkipped:"bottom",borderWidth:0}}}),e.exports=a.extend({draw:function(){var t,e,i,n,a,o,r,s=this._chart.ctx,l=this._view,u=l.borderWidth;if(l.horizontal?(t=l.base,e=l.x,i=l.y-l.height/2,n=l.y+l.height/2,a=e>t?1:-1,o=1,r=l.borderSkipped||"left"):(t=l.x-l.width/2,e=l.x+l.width/2,i=l.y,a=1,o=(n=l.base)>i?1:-1,r=l.borderSkipped||"bottom"),u){var d=Math.min(Math.abs(t-e),Math.abs(i-n)),c=(u=u>d?d:u)/2,h=t+("left"!==r?c*a:0),f=e+("right"!==r?-c*a:0),g=i+("top"!==r?c*o:0),p=n+("bottom"!==r?-c*o:0);h!==f&&(i=g,n=p),g!==p&&(t=h,e=f)}s.beginPath(),s.fillStyle=l.backgroundColor,s.strokeStyle=l.borderColor,s.lineWidth=u;var m=[[t,n],[t,i],[e,i],[e,n]],v=["bottom","left","top","right"].indexOf(r,0);function b(t){return m[(v+t)%4]}-1===v&&(v=0);var x=b(0);s.moveTo(x[0],x[1]);for(var y=1;y<4;y++)x=b(y),s.lineTo(x[0],x[1]);s.fill(),u&&s.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=!1;if(this._view){var n=r(this);i=t>=n.left&&t<=n.right&&e>=n.top&&e<=n.bottom}return i},inLabelRange:function(t,e){if(!this._view)return!1;var i=r(this);return o(this)?t>=i.left&&t<=i.right:e>=i.top&&e<=i.bottom},inXRange:function(t){var e=r(this);return t>=e.left&&t<=e.right},inYRange:function(t){var e=r(this);return t>=e.top&&t<=e.bottom},getCenterPoint:function(){var t,e,i=this._view;return o(this)?(t=i.x,e=(i.y+i.base)/2):(t=(i.x+i.base)/2,e=i.y),{x:t,y:e}},getArea:function(){var t=this._view;return t.width*Math.abs(t.y-t.base)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})},{25:25,26:26}],40:[function(t,e,i){"use strict";e.exports={},e.exports.Arc=t(36),e.exports.Line=t(37),e.exports.Point=t(38),e.exports.Rectangle=t(39)},{36:36,37:37,38:38,39:39}],41:[function(t,e,i){"use strict";var n=t(42);i=e.exports={clear:function(t){t.ctx.clearRect(0,0,t.width,t.height)},roundedRect:function(t,e,i,n,a,o){if(o){var r=Math.min(o,n/2),s=Math.min(o,a/2);t.moveTo(e+r,i),t.lineTo(e+n-r,i),t.quadraticCurveTo(e+n,i,e+n,i+s),t.lineTo(e+n,i+a-s),t.quadraticCurveTo(e+n,i+a,e+n-r,i+a),t.lineTo(e+r,i+a),t.quadraticCurveTo(e,i+a,e,i+a-s),t.lineTo(e,i+s),t.quadraticCurveTo(e,i,e+r,i)}else t.rect(e,i,n,a)},drawPoint:function(t,e,i,n,a){var o,r,s,l,u,d;if(!e||"object"!=typeof e||"[object HTMLImageElement]"!==(o=e.toString())&&"[object HTMLCanvasElement]"!==o){if(!(isNaN(i)||i<=0)){switch(e){default:t.beginPath(),t.arc(n,a,i,0,2*Math.PI),t.closePath(),t.fill();break;case"triangle":t.beginPath(),u=(r=3*i/Math.sqrt(3))*Math.sqrt(3)/2,t.moveTo(n-r/2,a+u/3),t.lineTo(n+r/2,a+u/3),t.lineTo(n,a-2*u/3),t.closePath(),t.fill();break;case"rect":d=1/Math.SQRT2*i,t.beginPath(),t.fillRect(n-d,a-d,2*d,2*d),t.strokeRect(n-d,a-d,2*d,2*d);break;case"rectRounded":var c=i/Math.SQRT2,h=n-c,f=a-c,g=Math.SQRT2*i;t.beginPath(),this.roundedRect(t,h,f,g,g,i/2),t.closePath(),t.fill();break;case"rectRot":d=1/Math.SQRT2*i,t.beginPath(),t.moveTo(n-d,a),t.lineTo(n,a+d),t.lineTo(n+d,a),t.lineTo(n,a-d),t.closePath(),t.fill();break;case"cross":t.beginPath(),t.moveTo(n,a+i),t.lineTo(n,a-i),t.moveTo(n-i,a),t.lineTo(n+i,a),t.closePath();break;case"crossRot":t.beginPath(),s=Math.cos(Math.PI/4)*i,l=Math.sin(Math.PI/4)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l),t.moveTo(n-s,a+l),t.lineTo(n+s,a-l),t.closePath();break;case"star":t.beginPath(),t.moveTo(n,a+i),t.lineTo(n,a-i),t.moveTo(n-i,a),t.lineTo(n+i,a),s=Math.cos(Math.PI/4)*i,l=Math.sin(Math.PI/4)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l),t.moveTo(n-s,a+l),t.lineTo(n+s,a-l),t.closePath();break;case"line":t.beginPath(),t.moveTo(n-i,a),t.lineTo(n+i,a),t.closePath();break;case"dash":t.beginPath(),t.moveTo(n,a),t.lineTo(n+i,a),t.closePath()}t.stroke()}}else t.drawImage(e,n-e.width/2,a-e.height/2,e.width,e.height)},clipArea:function(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()},unclipArea:function(t){t.restore()},lineTo:function(t,e,i,n){if(i.steppedLine)return"after"===i.steppedLine&&!n||"after"!==i.steppedLine&&n?t.lineTo(e.x,i.y):t.lineTo(i.x,e.y),void t.lineTo(i.x,i.y);i.tension?t.bezierCurveTo(n?e.controlPointPreviousX:e.controlPointNextX,n?e.controlPointPreviousY:e.controlPointNextY,n?i.controlPointNextX:i.controlPointPreviousX,n?i.controlPointNextY:i.controlPointPreviousY,i.x,i.y):t.lineTo(i.x,i.y)}};n.clear=i.clear,n.drawRoundedRectangle=function(t){t.beginPath(),i.roundedRect.apply(i,arguments),t.closePath()}},{42:42}],42:[function(t,e,i){"use strict";var n,a={noop:function(){},uid:(n=0,function(){return n++}),isNullOrUndef:function(t){return null==t},isArray:Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},isObject:function(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)},valueOrDefault:function(t,e){return void 0===t?e:t},valueAtIndexOrDefault:function(t,e,i){return a.valueOrDefault(a.isArray(t)?t[e]:t,i)},callback:function(t,e,i){if(t&&"function"==typeof t.call)return t.apply(i,e)},each:function(t,e,i,n){var o,r,s;if(a.isArray(t))if(r=t.length,n)for(o=r-1;o>=0;o--)e.call(i,t[o],o);else for(o=0;o<r;o++)e.call(i,t[o],o);else if(a.isObject(t))for(r=(s=Object.keys(t)).length,o=0;o<r;o++)e.call(i,t[s[o]],s[o])},arrayEquals:function(t,e){var i,n,o,r;if(!t||!e||t.length!==e.length)return!1;for(i=0,n=t.length;i<n;++i)if(o=t[i],r=e[i],o instanceof Array&&r instanceof Array){if(!a.arrayEquals(o,r))return!1}else if(o!==r)return!1;return!0},clone:function(t){if(a.isArray(t))return t.map(a.clone);if(a.isObject(t)){for(var e={},i=Object.keys(t),n=i.length,o=0;o<n;++o)e[i[o]]=a.clone(t[i[o]]);return e}return t},_merger:function(t,e,i,n){var o=e[t],r=i[t];a.isObject(o)&&a.isObject(r)?a.merge(o,r,n):e[t]=a.clone(r)},_mergerIf:function(t,e,i){var n=e[t],o=i[t];a.isObject(n)&&a.isObject(o)?a.mergeIf(n,o):e.hasOwnProperty(t)||(e[t]=a.clone(o))},merge:function(t,e,i){var n,o,r,s,l,u=a.isArray(e)?e:[e],d=u.length;if(!a.isObject(t))return t;for(n=(i=i||{}).merger||a._merger,o=0;o<d;++o)if(e=u[o],a.isObject(e))for(l=0,s=(r=Object.keys(e)).length;l<s;++l)n(r[l],t,e,i);return t},mergeIf:function(t,e){return a.merge(t,e,{merger:a._mergerIf})},extend:function(t){for(var e=function(e,i){t[i]=e},i=1,n=arguments.length;i<n;++i)a.each(arguments[i],e);return t},inherits:function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},n=function(){this.constructor=i};return n.prototype=e.prototype,i.prototype=new n,i.extend=a.inherits,t&&a.extend(i.prototype,t),i.__super__=e.prototype,i}};e.exports=a,a.callCallback=a.callback,a.indexOf=function(t,e,i){return Array.prototype.indexOf.call(t,e,i)},a.getValueOrDefault=a.valueOrDefault,a.getValueAtIndexOrDefault=a.valueAtIndexOrDefault},{}],43:[function(t,e,i){"use strict";var n=t(42),a={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return(t-=1)*t*t+1},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-((t-=1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return(t-=1)*t*t*t*t+1},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return 1-Math.cos(t*(Math.PI/2))},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:1-Math.pow(2,-10*t)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t){return t>=1?t:-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-(t-=1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1===t?1:(i||(i=.3),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),-n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i))},easeOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1===t?1:(i||(i=.3),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),n*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:2==(t/=.5)?1:(i||(i=.45),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),t<1?n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i)*-.5:n*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){return t*t*(2.70158*t-1.70158)},easeOutBack:function(t){return(t-=1)*t*(2.70158*t+1.70158)+1},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:function(t){return 1-a.easeOutBounce(1-t)},easeOutBounce:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:function(t){return t<.5?.5*a.easeInBounce(2*t):.5*a.easeOutBounce(2*t-1)+.5}};e.exports={effects:a},n.easingEffects=a},{42:42}],44:[function(t,e,i){"use strict";var n=t(42);e.exports={toLineHeight:function(t,e){var i=(""+t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);if(!i||"normal"===i[1])return 1.2*e;switch(t=+i[2],i[3]){case"px":return t;case"%":t/=100}return e*t},toPadding:function(t){var e,i,a,o;return n.isObject(t)?(e=+t.top||0,i=+t.right||0,a=+t.bottom||0,o=+t.left||0):e=i=a=o=+t||0,{top:e,right:i,bottom:a,left:o,height:e+a,width:o+i}},resolve:function(t,e,i){var a,o,r;for(a=0,o=t.length;a<o;++a)if(void 0!==(r=t[a])&&(void 0!==e&&"function"==typeof r&&(r=r(e)),void 0!==i&&n.isArray(r)&&(r=r[i]),void 0!==r))return r}}},{42:42}],45:[function(t,e,i){"use strict";e.exports=t(42),e.exports.easing=t(43),e.exports.canvas=t(41),e.exports.options=t(44)},{41:41,42:42,43:43,44:44}],46:[function(t,e,i){e.exports={acquireContext:function(t){return t&&t.canvas&&(t=t.canvas),t&&t.getContext("2d")||null}}},{}],47:[function(t,e,i){"use strict";var n=t(45),a="$chartjs",o="chartjs-",r=o+"render-monitor",s=o+"render-animation",l=["animationstart","webkitAnimationStart"],u={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"};function d(t,e){var i=n.getStyle(t,e),a=i&&i.match(/^(\d+)(\.\d+)?px$/);return a?Number(a[1]):void 0}var c=!!function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("e",null,e)}catch(t){}return t}()&&{passive:!0};function h(t,e,i){t.addEventListener(e,i,c)}function f(t,e,i){t.removeEventListener(e,i,c)}function g(t,e,i,n,a){return{type:t,chart:e,native:a||null,x:void 0!==i?i:null,y:void 0!==n?n:null}}function p(t,e,i){var u,d,c,f,p,m,v,b,x=t[a]||(t[a]={}),y=x.resizer=function(t){var e=document.createElement("div"),i=o+"size-monitor",n="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";e.style.cssText=n,e.className=i,e.innerHTML='<div class="'+i+'-expand" style="'+n+'"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="'+i+'-shrink" style="'+n+'"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';var a=e.childNodes[0],r=e.childNodes[1];e._reset=function(){a.scrollLeft=1e6,a.scrollTop=1e6,r.scrollLeft=1e6,r.scrollTop=1e6};var s=function(){e._reset(),t()};return h(a,"scroll",s.bind(a,"expand")),h(r,"scroll",s.bind(r,"shrink")),e}((u=function(){if(x.resizer)return e(g("resize",i))},c=!1,f=[],function(){f=Array.prototype.slice.call(arguments),d=d||this,c||(c=!0,n.requestAnimFrame.call(window,function(){c=!1,u.apply(d,f)}))}));m=function(){if(x.resizer){var e=t.parentNode;e&&e!==y.parentNode&&e.insertBefore(y,e.firstChild),y._reset()}},v=(p=t)[a]||(p[a]={}),b=v.renderProxy=function(t){t.animationName===s&&m()},n.each(l,function(t){h(p,t,b)}),v.reflow=!!p.offsetParent,p.classList.add(r)}function m(t){var e,i,o,s=t[a]||{},u=s.resizer;delete s.resizer,i=(e=t)[a]||{},(o=i.renderProxy)&&(n.each(l,function(t){f(e,t,o)}),delete i.renderProxy),e.classList.remove(r),u&&u.parentNode&&u.parentNode.removeChild(u)}e.exports={_enabled:"undefined"!=typeof window&&"undefined"!=typeof document,initialize:function(){var t,e,i,n="from{opacity:0.99}to{opacity:1}";e="@-webkit-keyframes "+s+"{"+n+"}@keyframes "+s+"{"+n+"}."+r+"{-webkit-animation:"+s+" 0.001s;animation:"+s+" 0.001s;}",i=(t=this)._style||document.createElement("style"),t._style||(t._style=i,e="/* Chart.js */\n"+e,i.setAttribute("type","text/css"),document.getElementsByTagName("head")[0].appendChild(i)),i.appendChild(document.createTextNode(e))},acquireContext:function(t,e){"string"==typeof t?t=document.getElementById(t):t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas);var i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(function(t,e){var i=t.style,n=t.getAttribute("height"),o=t.getAttribute("width");if(t[a]={initial:{height:n,width:o,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",null===o||""===o){var r=d(t,"width");void 0!==r&&(t.width=r)}if(null===n||""===n)if(""===t.style.height)t.height=t.width/(e.options.aspectRatio||2);else{var s=d(t,"height");void 0!==r&&(t.height=s)}}(t,e),i):null},releaseContext:function(t){var e=t.canvas;if(e[a]){var i=e[a].initial;["height","width"].forEach(function(t){var a=i[t];n.isNullOrUndef(a)?e.removeAttribute(t):e.setAttribute(t,a)}),n.each(i.style||{},function(t,i){e.style[i]=t}),e.width=e.width,delete e[a]}},addEventListener:function(t,e,i){var o=t.canvas;if("resize"!==e){var r=i[a]||(i[a]={});h(o,e,(r.proxies||(r.proxies={}))[t.id+"_"+e]=function(e){var a,o,r,s;i((o=t,r=u[(a=e).type]||a.type,s=n.getRelativePosition(a,o),g(r,o,s.x,s.y,a)))})}else p(o,i,t)},removeEventListener:function(t,e,i){var n=t.canvas;if("resize"!==e){var o=((i[a]||{}).proxies||{})[t.id+"_"+e];o&&f(n,e,o)}else m(n)}},n.addEvent=h,n.removeEvent=f},{45:45}],48:[function(t,e,i){"use strict";var n=t(45),a=t(46),o=t(47),r=o._enabled?o:a;e.exports=n.extend({initialize:function(){},acquireContext:function(){},releaseContext:function(){},addEventListener:function(){},removeEventListener:function(){}},r)},{45:45,46:46,47:47}],49:[function(t,e,i){"use strict";e.exports={},e.exports.filler=t(50),e.exports.legend=t(51),e.exports.title=t(52)},{50:50,51:51,52:52}],50:[function(t,e,i){"use strict";var n=t(25),a=t(40),o=t(45);n._set("global",{plugins:{filler:{propagate:!0}}});var r={dataset:function(t){var e=t.fill,i=t.chart,n=i.getDatasetMeta(e),a=n&&i.isDatasetVisible(e)&&n.dataset._children||[],o=a.length||0;return o?function(t,e){return e<o&&a[e]._view||null}:null},boundary:function(t){var e=t.boundary,i=e?e.x:null,n=e?e.y:null;return function(t){return{x:null===i?t.x:i,y:null===n?t.y:n}}}};function s(t,e,i){var n,a=t._model||{},o=a.fill;if(void 0===o&&(o=!!a.backgroundColor),!1===o||null===o)return!1;if(!0===o)return"origin";if(n=parseFloat(o,10),isFinite(n)&&Math.floor(n)===n)return"-"!==o[0]&&"+"!==o[0]||(n=e+n),!(n===e||n<0||n>=i)&&n;switch(o){case"bottom":return"start";case"top":return"end";case"zero":return"origin";case"origin":case"start":case"end":return o;default:return!1}}function l(t){var e,i=t.el._model||{},n=t.el._scale||{},a=t.fill,o=null;if(isFinite(a))return null;if("start"===a?o=void 0===i.scaleBottom?n.bottom:i.scaleBottom:"end"===a?o=void 0===i.scaleTop?n.top:i.scaleTop:void 0!==i.scaleZero?o=i.scaleZero:n.getBasePosition?o=n.getBasePosition():n.getBasePixel&&(o=n.getBasePixel()),null!=o){if(void 0!==o.x&&void 0!==o.y)return o;if("number"==typeof o&&isFinite(o))return{x:(e=n.isHorizontal())?o:null,y:e?null:o}}return null}function u(t,e,i){var n,a=t[e].fill,o=[e];if(!i)return a;for(;!1!==a&&-1===o.indexOf(a);){if(!isFinite(a))return a;if(!(n=t[a]))return!1;if(n.visible)return a;o.push(a),a=n.fill}return!1}function d(t){return t&&!t.skip}function c(t,e,i,n,a){var r;if(n&&a){for(t.moveTo(e[0].x,e[0].y),r=1;r<n;++r)o.canvas.lineTo(t,e[r-1],e[r]);for(t.lineTo(i[a-1].x,i[a-1].y),r=a-1;r>0;--r)o.canvas.lineTo(t,i[r],i[r-1],!0)}}e.exports={id:"filler",afterDatasetsUpdate:function(t,e){var i,n,o,d,c,h,f,g=(t.data.datasets||[]).length,p=e.propagate,m=[];for(n=0;n<g;++n)d=null,(o=(i=t.getDatasetMeta(n)).dataset)&&o._model&&o instanceof a.Line&&(d={visible:t.isDatasetVisible(n),fill:s(o,n,g),chart:t,el:o}),i.$filler=d,m.push(d);for(n=0;n<g;++n)(d=m[n])&&(d.fill=u(m,n,p),d.boundary=l(d),d.mapper=(void 0,f=void 0,h=(c=d).fill,f="dataset",!1===h?null:(isFinite(h)||(f="boundary"),r[f](c))))},beforeDatasetDraw:function(t,e){var i=e.meta.$filler;if(i){var a=t.ctx,r=i.el,s=r._view,l=r._children||[],u=i.mapper,h=s.backgroundColor||n.global.defaultColor;u&&h&&l.length&&(o.canvas.clipArea(a,t.chartArea),function(t,e,i,n,a,o){var r,s,l,u,h,f,g,p=e.length,m=n.spanGaps,v=[],b=[],x=0,y=0;for(t.beginPath(),r=0,s=p+!!o;r<s;++r)h=i(u=e[l=r%p]._view,l,n),f=d(u),g=d(h),f&&g?(x=v.push(u),y=b.push(h)):x&&y&&(m?(f&&v.push(u),g&&b.push(h)):(c(t,v,b,x,y),x=y=0,v=[],b=[]));c(t,v,b,x,y),t.closePath(),t.fillStyle=a,t.fill()}(a,l,u,s,h,r._loop),o.canvas.unclipArea(a))}}}},{25:25,40:40,45:45}],51:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45),r=t(30),s=o.noop;function l(t,e){return t.usePointStyle?e*Math.SQRT2:t.boxWidth}n._set("global",{legend:{display:!0,position:"top",fullWidth:!0,reverse:!1,weight:1e3,onClick:function(t,e){var i=e.datasetIndex,n=this.chart,a=n.getDatasetMeta(i);a.hidden=null===a.hidden?!n.data.datasets[i].hidden:null,n.update()},onHover:null,labels:{boxWidth:40,padding:10,generateLabels:function(t){var e=t.data;return o.isArray(e.datasets)?e.datasets.map(function(e,i){return{text:e.label,fillStyle:o.isArray(e.backgroundColor)?e.backgroundColor[0]:e.backgroundColor,hidden:!t.isDatasetVisible(i),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,pointStyle:e.pointStyle,datasetIndex:i}},this):[]}}},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var i=0;i<t.data.datasets.length;i++)e.push('<li><span style="background-color:'+t.data.datasets[i].backgroundColor+'"></span>'),t.data.datasets[i].label&&e.push(t.data.datasets[i].label),e.push("</li>");return e.push("</ul>"),e.join("")}});var u=a.extend({initialize:function(t){o.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:s,update:function(t,e,i){var n=this;return n.beforeUpdate(),n.maxWidth=t,n.maxHeight=e,n.margins=i,n.beforeSetDimensions(),n.setDimensions(),n.afterSetDimensions(),n.beforeBuildLabels(),n.buildLabels(),n.afterBuildLabels(),n.beforeFit(),n.fit(),n.afterFit(),n.afterUpdate(),n.minSize},afterUpdate:s,beforeSetDimensions:s,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:s,beforeBuildLabels:s,buildLabels:function(){var t=this,e=t.options.labels||{},i=o.callback(e.generateLabels,[t.chart],t)||[];e.filter&&(i=i.filter(function(i){return e.filter(i,t.chart.data)})),t.options.reverse&&i.reverse(),t.legendItems=i},afterBuildLabels:s,beforeFit:s,fit:function(){var t=this,e=t.options,i=e.labels,a=e.display,r=t.ctx,s=n.global,u=o.valueOrDefault,d=u(i.fontSize,s.defaultFontSize),c=u(i.fontStyle,s.defaultFontStyle),h=u(i.fontFamily,s.defaultFontFamily),f=o.fontString(d,c,h),g=t.legendHitBoxes=[],p=t.minSize,m=t.isHorizontal();if(m?(p.width=t.maxWidth,p.height=a?10:0):(p.width=a?10:0,p.height=t.maxHeight),a)if(r.font=f,m){var v=t.lineWidths=[0],b=t.legendItems.length?d+i.padding:0;r.textAlign="left",r.textBaseline="top",o.each(t.legendItems,function(e,n){var a=l(i,d)+d/2+r.measureText(e.text).width;v[v.length-1]+a+i.padding>=t.width&&(b+=d+i.padding,v[v.length]=t.left),g[n]={left:0,top:0,width:a,height:d},v[v.length-1]+=a+i.padding}),p.height+=b}else{var x=i.padding,y=t.columnWidths=[],k=i.padding,M=0,w=0,S=d+x;o.each(t.legendItems,function(t,e){var n=l(i,d)+d/2+r.measureText(t.text).width;w+S>p.height&&(k+=M+i.padding,y.push(M),M=0,w=0),M=Math.max(M,n),w+=S,g[e]={left:0,top:0,width:n,height:d}}),k+=M,y.push(M),p.width+=k}t.width=p.width,t.height=p.height},afterFit:s,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var t=this,e=t.options,i=e.labels,a=n.global,r=a.elements.line,s=t.width,u=t.lineWidths;if(e.display){var d,c=t.ctx,h=o.valueOrDefault,f=h(i.fontColor,a.defaultFontColor),g=h(i.fontSize,a.defaultFontSize),p=h(i.fontStyle,a.defaultFontStyle),m=h(i.fontFamily,a.defaultFontFamily),v=o.fontString(g,p,m);c.textAlign="left",c.textBaseline="middle",c.lineWidth=.5,c.strokeStyle=f,c.fillStyle=f,c.font=v;var b=l(i,g),x=t.legendHitBoxes,y=t.isHorizontal();d=y?{x:t.left+(s-u[0])/2,y:t.top+i.padding,line:0}:{x:t.left+i.padding,y:t.top+i.padding,line:0};var k=g+i.padding;o.each(t.legendItems,function(n,l){var f,p,m,v,M,w=c.measureText(n.text).width,S=b+g/2+w,C=d.x,_=d.y;y?C+S>=s&&(_=d.y+=k,d.line++,C=d.x=t.left+(s-u[d.line])/2):_+k>t.bottom&&(C=d.x=C+t.columnWidths[d.line]+i.padding,_=d.y=t.top+i.padding,d.line++),function(t,i,n){if(!(isNaN(b)||b<=0)){c.save(),c.fillStyle=h(n.fillStyle,a.defaultColor),c.lineCap=h(n.lineCap,r.borderCapStyle),c.lineDashOffset=h(n.lineDashOffset,r.borderDashOffset),c.lineJoin=h(n.lineJoin,r.borderJoinStyle),c.lineWidth=h(n.lineWidth,r.borderWidth),c.strokeStyle=h(n.strokeStyle,a.defaultColor);var s=0===h(n.lineWidth,r.borderWidth);if(c.setLineDash&&c.setLineDash(h(n.lineDash,r.borderDash)),e.labels&&e.labels.usePointStyle){var l=g*Math.SQRT2/2,u=l/Math.SQRT2,d=t+u,f=i+u;o.canvas.drawPoint(c,n.pointStyle,l,d,f)}else s||c.strokeRect(t,i,b,g),c.fillRect(t,i,b,g);c.restore()}}(C,_,n),x[l].left=C,x[l].top=_,f=n,p=w,v=b+(m=g/2)+C,M=_+m,c.fillText(f.text,v,M),f.hidden&&(c.beginPath(),c.lineWidth=2,c.moveTo(v,M),c.lineTo(v+p,M),c.stroke()),y?d.x+=S+i.padding:d.y+=k})}},handleEvent:function(t){var e=this,i=e.options,n="mouseup"===t.type?"click":t.type,a=!1;if("mousemove"===n){if(!i.onHover)return}else{if("click"!==n)return;if(!i.onClick)return}var o=t.x,r=t.y;if(o>=e.left&&o<=e.right&&r>=e.top&&r<=e.bottom)for(var s=e.legendHitBoxes,l=0;l<s.length;++l){var u=s[l];if(o>=u.left&&o<=u.left+u.width&&r>=u.top&&r<=u.top+u.height){if("click"===n){i.onClick.call(e,t.native,e.legendItems[l]),a=!0;break}if("mousemove"===n){i.onHover.call(e,t.native,e.legendItems[l]),a=!0;break}}}return a}});function d(t,e){var i=new u({ctx:t.ctx,options:e,chart:t});r.configure(t,i,e),r.addBox(t,i),t.legend=i}e.exports={id:"legend",_element:u,beforeInit:function(t){var e=t.options.legend;e&&d(t,e)},beforeUpdate:function(t){var e=t.options.legend,i=t.legend;e?(o.mergeIf(e,n.global.legend),i?(r.configure(t,i,e),i.options=e):d(t,e)):i&&(r.removeBox(t,i),delete t.legend)},afterEvent:function(t,e){var i=t.legend;i&&i.handleEvent(e)}}},{25:25,26:26,30:30,45:45}],52:[function(t,e,i){"use strict";var n=t(25),a=t(26),o=t(45),r=t(30),s=o.noop;n._set("global",{title:{display:!1,fontStyle:"bold",fullWidth:!0,lineHeight:1.2,padding:10,position:"top",text:"",weight:2e3}});var l=a.extend({initialize:function(t){o.extend(this,t),this.legendHitBoxes=[]},beforeUpdate:s,update:function(t,e,i){var n=this;return n.beforeUpdate(),n.maxWidth=t,n.maxHeight=e,n.margins=i,n.beforeSetDimensions(),n.setDimensions(),n.afterSetDimensions(),n.beforeBuildLabels(),n.buildLabels(),n.afterBuildLabels(),n.beforeFit(),n.fit(),n.afterFit(),n.afterUpdate(),n.minSize},afterUpdate:s,beforeSetDimensions:s,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:s,beforeBuildLabels:s,buildLabels:s,afterBuildLabels:s,beforeFit:s,fit:function(){var t=this,e=o.valueOrDefault,i=t.options,a=i.display,r=e(i.fontSize,n.global.defaultFontSize),s=t.minSize,l=o.isArray(i.text)?i.text.length:1,u=o.options.toLineHeight(i.lineHeight,r),d=a?l*u+2*i.padding:0;t.isHorizontal()?(s.width=t.maxWidth,s.height=d):(s.width=d,s.height=t.maxHeight),t.width=s.width,t.height=s.height},afterFit:s,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var t=this,e=t.ctx,i=o.valueOrDefault,a=t.options,r=n.global;if(a.display){var s,l,u,d=i(a.fontSize,r.defaultFontSize),c=i(a.fontStyle,r.defaultFontStyle),h=i(a.fontFamily,r.defaultFontFamily),f=o.fontString(d,c,h),g=o.options.toLineHeight(a.lineHeight,d),p=g/2+a.padding,m=0,v=t.top,b=t.left,x=t.bottom,y=t.right;e.fillStyle=i(a.fontColor,r.defaultFontColor),e.font=f,t.isHorizontal()?(l=b+(y-b)/2,u=v+p,s=y-b):(l="left"===a.position?b+p:y-p,u=v+(x-v)/2,s=x-v,m=Math.PI*("left"===a.position?-.5:.5)),e.save(),e.translate(l,u),e.rotate(m),e.textAlign="center",e.textBaseline="middle";var k=a.text;if(o.isArray(k))for(var M=0,w=0;w<k.length;++w)e.fillText(k[w],0,M,s),M+=g;else e.fillText(k,0,0,s);e.restore()}}});function u(t,e){var i=new l({ctx:t.ctx,options:e,chart:t});r.configure(t,i,e),r.addBox(t,i),t.titleBlock=i}e.exports={id:"title",_element:l,beforeInit:function(t){var e=t.options.title;e&&u(t,e)},beforeUpdate:function(t){var e=t.options.title,i=t.titleBlock;e?(o.mergeIf(e,n.global.title),i?(r.configure(t,i,e),i.options=e):u(t,e)):i&&(r.removeBox(t,i),delete t.titleBlock)}}},{25:25,26:26,30:30,45:45}],53:[function(t,e,i){"use strict";e.exports=function(t){var e=t.Scale.extend({getLabels:function(){var t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels},determineDataLimits:function(){var t,e=this,i=e.getLabels();e.minIndex=0,e.maxIndex=i.length-1,void 0!==e.options.ticks.min&&(t=i.indexOf(e.options.ticks.min),e.minIndex=-1!==t?t:e.minIndex),void 0!==e.options.ticks.max&&(t=i.indexOf(e.options.ticks.max),e.maxIndex=-1!==t?t:e.maxIndex),e.min=i[e.minIndex],e.max=i[e.maxIndex]},buildTicks:function(){var t=this,e=t.getLabels();t.ticks=0===t.minIndex&&t.maxIndex===e.length-1?e:e.slice(t.minIndex,t.maxIndex+1)},getLabelForIndex:function(t,e){var i=this,n=i.chart.data,a=i.isHorizontal();return n.yLabels&&!a?i.getRightValue(n.datasets[e].data[t]):i.ticks[t-i.minIndex]},getPixelForValue:function(t,e){var i,n=this,a=n.options.offset,o=Math.max(n.maxIndex+1-n.minIndex-(a?0:1),1);if(null!=t&&(i=n.isHorizontal()?t.x:t.y),void 0!==i||void 0!==t&&isNaN(e)){t=i||t;var r=n.getLabels().indexOf(t);e=-1!==r?r:e}if(n.isHorizontal()){var s=n.width/o,l=s*(e-n.minIndex);return a&&(l+=s/2),n.left+Math.round(l)}var u=n.height/o,d=u*(e-n.minIndex);return a&&(d+=u/2),n.top+Math.round(d)},getPixelForTick:function(t){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null)},getValueForPixel:function(t){var e=this,i=e.options.offset,n=Math.max(e._ticks.length-(i?0:1),1),a=e.isHorizontal(),o=(a?e.width:e.height)/n;return t-=a?e.left:e.top,i&&(t-=o/2),(t<=0?0:Math.round(t/o))+e.minIndex},getBasePixel:function(){return this.bottom}});t.scaleService.registerScaleType("category",e,{position:"bottom"})}},{}],54:[function(t,e,i){"use strict";var n=t(25),a=t(45),o=t(34);e.exports=function(t){var e={position:"left",ticks:{callback:o.formatters.linear}},i=t.LinearScaleBase.extend({determineDataLimits:function(){var t=this,e=t.options,i=t.chart,n=i.data.datasets,o=t.isHorizontal();function r(e){return o?e.xAxisID===t.id:e.yAxisID===t.id}t.min=null,t.max=null;var s=e.stacked;if(void 0===s&&a.each(n,function(t,e){if(!s){var n=i.getDatasetMeta(e);i.isDatasetVisible(e)&&r(n)&&void 0!==n.stack&&(s=!0)}}),e.stacked||s){var l={};a.each(n,function(n,o){var s=i.getDatasetMeta(o),u=[s.type,void 0===e.stacked&&void 0===s.stack?o:"",s.stack].join(".");void 0===l[u]&&(l[u]={positiveValues:[],negativeValues:[]});var d=l[u].positiveValues,c=l[u].negativeValues;i.isDatasetVisible(o)&&r(s)&&a.each(n.data,function(i,n){var a=+t.getRightValue(i);isNaN(a)||s.data[n].hidden||(d[n]=d[n]||0,c[n]=c[n]||0,e.relativePoints?d[n]=100:a<0?c[n]+=a:d[n]+=a)})}),a.each(l,function(e){var i=e.positiveValues.concat(e.negativeValues),n=a.min(i),o=a.max(i);t.min=null===t.min?n:Math.min(t.min,n),t.max=null===t.max?o:Math.max(t.max,o)})}else a.each(n,function(e,n){var o=i.getDatasetMeta(n);i.isDatasetVisible(n)&&r(o)&&a.each(e.data,function(e,i){var n=+t.getRightValue(e);isNaN(n)||o.data[i].hidden||(null===t.min?t.min=n:n<t.min&&(t.min=n),null===t.max?t.max=n:n>t.max&&(t.max=n))})});t.min=isFinite(t.min)&&!isNaN(t.min)?t.min:0,t.max=isFinite(t.max)&&!isNaN(t.max)?t.max:1,this.handleTickRangeOptions()},getTickLimit:function(){var t,e=this.options.ticks;if(this.isHorizontal())t=Math.min(e.maxTicksLimit?e.maxTicksLimit:11,Math.ceil(this.width/50));else{var i=a.valueOrDefault(e.fontSize,n.global.defaultFontSize);t=Math.min(e.maxTicksLimit?e.maxTicksLimit:11,Math.ceil(this.height/(2*i)))}return t},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t){var e=this,i=e.start,n=+e.getRightValue(t),a=e.end-i;return e.isHorizontal()?e.left+e.width/a*(n-i):e.bottom-e.height/a*(n-i)},getValueForPixel:function(t){var e=this,i=e.isHorizontal(),n=i?e.width:e.height,a=(i?t-e.left:e.bottom-t)/n;return e.start+(e.end-e.start)*a},getPixelForTick:function(t){return this.getPixelForValue(this.ticksAsNumbers[t])}});t.scaleService.registerScaleType("linear",i,e)}},{25:25,34:34,45:45}],55:[function(t,e,i){"use strict";var n=t(45);e.exports=function(t){var e=n.noop;t.LinearScaleBase=t.Scale.extend({getRightValue:function(e){return"string"==typeof e?+e:t.Scale.prototype.getRightValue.call(this,e)},handleTickRangeOptions:function(){var t=this,e=t.options.ticks;if(e.beginAtZero){var i=n.sign(t.min),a=n.sign(t.max);i<0&&a<0?t.max=0:i>0&&a>0&&(t.min=0)}var o=void 0!==e.min||void 0!==e.suggestedMin,r=void 0!==e.max||void 0!==e.suggestedMax;void 0!==e.min?t.min=e.min:void 0!==e.suggestedMin&&(null===t.min?t.min=e.suggestedMin:t.min=Math.min(t.min,e.suggestedMin)),void 0!==e.max?t.max=e.max:void 0!==e.suggestedMax&&(null===t.max?t.max=e.suggestedMax:t.max=Math.max(t.max,e.suggestedMax)),o!==r&&t.min>=t.max&&(o?t.max=t.min+1:t.min=t.max-1),t.min===t.max&&(t.max++,e.beginAtZero||t.min--)},getTickLimit:e,handleDirectionalChanges:e,buildTicks:function(){var t=this,e=t.options.ticks,i=t.getTickLimit(),a={maxTicks:i=Math.max(2,i),min:e.min,max:e.max,stepSize:n.valueOrDefault(e.fixedStepSize,e.stepSize)},o=t.ticks=function(t,e){var i,a=[];if(t.stepSize&&t.stepSize>0)i=t.stepSize;else{var o=n.niceNum(e.max-e.min,!1);i=n.niceNum(o/(t.maxTicks-1),!0)}var r=Math.floor(e.min/i)*i,s=Math.ceil(e.max/i)*i;t.min&&t.max&&t.stepSize&&n.almostWhole((t.max-t.min)/t.stepSize,i/1e3)&&(r=t.min,s=t.max);var l=(s-r)/i;l=n.almostEquals(l,Math.round(l),i/1e3)?Math.round(l):Math.ceil(l);var u=1;i<1&&(u=Math.pow(10,i.toString().length-2),r=Math.round(r*u)/u,s=Math.round(s*u)/u),a.push(void 0!==t.min?t.min:r);for(var d=1;d<l;++d)a.push(Math.round((r+d*i)*u)/u);return a.push(void 0!==t.max?t.max:s),a}(a,t);t.handleDirectionalChanges(),t.max=n.max(o),t.min=n.min(o),e.reverse?(o.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){var e=this;e.ticksAsNumbers=e.ticks.slice(),e.zeroLineIndex=e.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(e)}})}},{45:45}],56:[function(t,e,i){"use strict";var n=t(45),a=t(34);e.exports=function(t){var e={position:"left",ticks:{callback:a.formatters.logarithmic}},i=t.Scale.extend({determineDataLimits:function(){var t=this,e=t.options,i=t.chart,a=i.data.datasets,o=t.isHorizontal();function r(e){return o?e.xAxisID===t.id:e.yAxisID===t.id}t.min=null,t.max=null,t.minNotZero=null;var s=e.stacked;if(void 0===s&&n.each(a,function(t,e){if(!s){var n=i.getDatasetMeta(e);i.isDatasetVisible(e)&&r(n)&&void 0!==n.stack&&(s=!0)}}),e.stacked||s){var l={};n.each(a,function(a,o){var s=i.getDatasetMeta(o),u=[s.type,void 0===e.stacked&&void 0===s.stack?o:"",s.stack].join(".");i.isDatasetVisible(o)&&r(s)&&(void 0===l[u]&&(l[u]=[]),n.each(a.data,function(e,i){var n=l[u],a=+t.getRightValue(e);isNaN(a)||s.data[i].hidden||a<0||(n[i]=n[i]||0,n[i]+=a)}))}),n.each(l,function(e){if(e.length>0){var i=n.min(e),a=n.max(e);t.min=null===t.min?i:Math.min(t.min,i),t.max=null===t.max?a:Math.max(t.max,a)}})}else n.each(a,function(e,a){var o=i.getDatasetMeta(a);i.isDatasetVisible(a)&&r(o)&&n.each(e.data,function(e,i){var n=+t.getRightValue(e);isNaN(n)||o.data[i].hidden||n<0||(null===t.min?t.min=n:n<t.min&&(t.min=n),null===t.max?t.max=n:n>t.max&&(t.max=n),0!==n&&(null===t.minNotZero||n<t.minNotZero)&&(t.minNotZero=n))})});this.handleTickRangeOptions()},handleTickRangeOptions:function(){var t=this,e=t.options.ticks,i=n.valueOrDefault;t.min=i(e.min,t.min),t.max=i(e.max,t.max),t.min===t.max&&(0!==t.min&&null!==t.min?(t.min=Math.pow(10,Math.floor(n.log10(t.min))-1),t.max=Math.pow(10,Math.floor(n.log10(t.max))+1)):(t.min=1,t.max=10)),null===t.min&&(t.min=Math.pow(10,Math.floor(n.log10(t.max))-1)),null===t.max&&(t.max=0!==t.min?Math.pow(10,Math.floor(n.log10(t.min))+1):10),null===t.minNotZero&&(t.min>0?t.minNotZero=t.min:t.max<1?t.minNotZero=Math.pow(10,Math.floor(n.log10(t.max))):t.minNotZero=1)},buildTicks:function(){var t=this,e=t.options.ticks,i=!t.isHorizontal(),a={min:e.min,max:e.max},o=t.ticks=function(t,e){var i,a,o=[],r=n.valueOrDefault,s=r(t.min,Math.pow(10,Math.floor(n.log10(e.min)))),l=Math.floor(n.log10(e.max)),u=Math.ceil(e.max/Math.pow(10,l));0===s?(i=Math.floor(n.log10(e.minNotZero)),a=Math.floor(e.minNotZero/Math.pow(10,i)),o.push(s),s=a*Math.pow(10,i)):(i=Math.floor(n.log10(s)),a=Math.floor(s/Math.pow(10,i)));for(var d=i<0?Math.pow(10,Math.abs(i)):1;o.push(s),10==++a&&(a=1,d=++i>=0?1:d),s=Math.round(a*Math.pow(10,i)*d)/d,i<l||i===l&&a<u;);var c=r(t.max,s);return o.push(c),o}(a,t);t.max=n.max(o),t.min=n.min(o),e.reverse?(i=!i,t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max),i&&o.reverse()},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t){return this.getPixelForValue(this.tickValues[t])},_getFirstTickValue:function(t){var e=Math.floor(n.log10(t));return Math.floor(t/Math.pow(10,e))*Math.pow(10,e)},getPixelForValue:function(e){var i,a,o,r,s,l=this,u=l.options.ticks.reverse,d=n.log10,c=l._getFirstTickValue(l.minNotZero),h=0;return e=+l.getRightValue(e),u?(o=l.end,r=l.start,s=-1):(o=l.start,r=l.end,s=1),l.isHorizontal()?(i=l.width,a=u?l.right:l.left):(i=l.height,s*=-1,a=u?l.top:l.bottom),e!==o&&(0===o&&(i-=h=n.getValueOrDefault(l.options.ticks.fontSize,t.defaults.global.defaultFontSize),o=c),0!==e&&(h+=i/(d(r)-d(o))*(d(e)-d(o))),a+=s*h),a},getValueForPixel:function(e){var i,a,o,r,s=this,l=s.options.ticks.reverse,u=n.log10,d=s._getFirstTickValue(s.minNotZero);if(l?(a=s.end,o=s.start):(a=s.start,o=s.end),s.isHorizontal()?(i=s.width,r=l?s.right-e:e-s.left):(i=s.height,r=l?e-s.top:s.bottom-e),r!==a){if(0===a){var c=n.getValueOrDefault(s.options.ticks.fontSize,t.defaults.global.defaultFontSize);r-=c,i-=c,a=d}r*=u(o)-u(a),r/=i,r=Math.pow(10,u(a)+r)}return r}});t.scaleService.registerScaleType("logarithmic",i,e)}},{34:34,45:45}],57:[function(t,e,i){"use strict";var n=t(25),a=t(45),o=t(34);e.exports=function(t){var e=n.global,i={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},gridLines:{circular:!1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:o.formatters.linear},pointLabels:{display:!0,fontSize:10,callback:function(t){return t}}};function r(t){var e=t.options;return e.angleLines.display||e.pointLabels.display?t.chart.data.labels.length:0}function s(t){var i=t.options.pointLabels,n=a.valueOrDefault(i.fontSize,e.defaultFontSize),o=a.valueOrDefault(i.fontStyle,e.defaultFontStyle),r=a.valueOrDefault(i.fontFamily,e.defaultFontFamily);return{size:n,style:o,family:r,font:a.fontString(n,o,r)}}function l(t,e,i,n,a){return t===n||t===a?{start:e-i/2,end:e+i/2}:t<n||t>a?{start:e-i-5,end:e}:{start:e,end:e+i+5}}function u(t,e,i,n){if(a.isArray(e))for(var o=i.y,r=1.5*n,s=0;s<e.length;++s)t.fillText(e[s],i.x,o),o+=r;else t.fillText(e,i.x,i.y)}function d(t){return a.isNumber(t)?t:0}var c=t.LinearScaleBase.extend({setDimensions:function(){var t=this,i=t.options,n=i.ticks;t.width=t.maxWidth,t.height=t.maxHeight,t.xCenter=Math.round(t.width/2),t.yCenter=Math.round(t.height/2);var o=a.min([t.height,t.width]),r=a.valueOrDefault(n.fontSize,e.defaultFontSize);t.drawingArea=i.display?o/2-(r/2+n.backdropPaddingY):o/2},determineDataLimits:function(){var t=this,e=t.chart,i=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY;a.each(e.data.datasets,function(o,r){if(e.isDatasetVisible(r)){var s=e.getDatasetMeta(r);a.each(o.data,function(e,a){var o=+t.getRightValue(e);isNaN(o)||s.data[a].hidden||(i=Math.min(o,i),n=Math.max(o,n))})}}),t.min=i===Number.POSITIVE_INFINITY?0:i,t.max=n===Number.NEGATIVE_INFINITY?0:n,t.handleTickRangeOptions()},getTickLimit:function(){var t=this.options.ticks,i=a.valueOrDefault(t.fontSize,e.defaultFontSize);return Math.min(t.maxTicksLimit?t.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*i)))},convertTicksToLabels:function(){var e=this;t.LinearScaleBase.prototype.convertTicksToLabels.call(e),e.pointLabels=e.chart.data.labels.map(e.options.pointLabels.callback,e)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var t,e;this.options.pointLabels.display?function(t){var e,i,n,o=s(t),u=Math.min(t.height/2,t.width/2),d={r:t.width,l:0,t:t.height,b:0},c={};t.ctx.font=o.font,t._pointLabelSizes=[];var h,f,g,p=r(t);for(e=0;e<p;e++){n=t.getPointPosition(e,u),h=t.ctx,f=o.size,g=t.pointLabels[e]||"",i=a.isArray(g)?{w:a.longestText(h,h.font,g),h:g.length*f+1.5*(g.length-1)*f}:{w:h.measureText(g).width,h:f},t._pointLabelSizes[e]=i;var m=t.getIndexAngle(e),v=a.toDegrees(m)%360,b=l(v,n.x,i.w,0,180),x=l(v,n.y,i.h,90,270);b.start<d.l&&(d.l=b.start,c.l=m),b.end>d.r&&(d.r=b.end,c.r=m),x.start<d.t&&(d.t=x.start,c.t=m),x.end>d.b&&(d.b=x.end,c.b=m)}t.setReductions(u,d,c)}(this):(t=this,e=Math.min(t.height/2,t.width/2),t.drawingArea=Math.round(e),t.setCenterPoint(0,0,0,0))},setReductions:function(t,e,i){var n=e.l/Math.sin(i.l),a=Math.max(e.r-this.width,0)/Math.sin(i.r),o=-e.t/Math.cos(i.t),r=-Math.max(e.b-this.height,0)/Math.cos(i.b);n=d(n),a=d(a),o=d(o),r=d(r),this.drawingArea=Math.min(Math.round(t-(n+a)/2),Math.round(t-(o+r)/2)),this.setCenterPoint(n,a,o,r)},setCenterPoint:function(t,e,i,n){var a=this,o=a.width-e-a.drawingArea,r=t+a.drawingArea,s=i+a.drawingArea,l=a.height-n-a.drawingArea;a.xCenter=Math.round((r+o)/2+a.left),a.yCenter=Math.round((s+l)/2+a.top)},getIndexAngle:function(t){return t*(2*Math.PI/r(this))+(this.chart.options&&this.chart.options.startAngle?this.chart.options.startAngle:0)*Math.PI*2/360},getDistanceFromCenterForValue:function(t){var e=this;if(null===t)return 0;var i=e.drawingArea/(e.max-e.min);return e.options.ticks.reverse?(e.max-t)*i:(t-e.min)*i},getPointPosition:function(t,e){var i=this.getIndexAngle(t)-Math.PI/2;return{x:Math.round(Math.cos(i)*e)+this.xCenter,y:Math.round(Math.sin(i)*e)+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this.min,e=this.max;return this.getPointPositionForValue(0,this.beginAtZero?0:t<0&&e<0?e:t>0&&e>0?t:0)},draw:function(){var t=this,i=t.options,n=i.gridLines,o=i.ticks,l=a.valueOrDefault;if(i.display){var d=t.ctx,c=this.getIndexAngle(0),h=l(o.fontSize,e.defaultFontSize),f=l(o.fontStyle,e.defaultFontStyle),g=l(o.fontFamily,e.defaultFontFamily),p=a.fontString(h,f,g);a.each(t.ticks,function(i,s){if(s>0||o.reverse){var u=t.getDistanceFromCenterForValue(t.ticksAsNumbers[s]);if(n.display&&0!==s&&function(t,e,i,n){var o=t.ctx;if(o.strokeStyle=a.valueAtIndexOrDefault(e.color,n-1),o.lineWidth=a.valueAtIndexOrDefault(e.lineWidth,n-1),t.options.gridLines.circular)o.beginPath(),o.arc(t.xCenter,t.yCenter,i,0,2*Math.PI),o.closePath(),o.stroke();else{var s=r(t);if(0===s)return;o.beginPath();var l=t.getPointPosition(0,i);o.moveTo(l.x,l.y);for(var u=1;u<s;u++)l=t.getPointPosition(u,i),o.lineTo(l.x,l.y);o.closePath(),o.stroke()}}(t,n,u,s),o.display){var f=l(o.fontColor,e.defaultFontColor);if(d.font=p,d.save(),d.translate(t.xCenter,t.yCenter),d.rotate(c),o.showLabelBackdrop){var g=d.measureText(i).width;d.fillStyle=o.backdropColor,d.fillRect(-g/2-o.backdropPaddingX,-u-h/2-o.backdropPaddingY,g+2*o.backdropPaddingX,h+2*o.backdropPaddingY)}d.textAlign="center",d.textBaseline="middle",d.fillStyle=f,d.fillText(i,0,-u),d.restore()}}}),(i.angleLines.display||i.pointLabels.display)&&function(t){var i=t.ctx,n=t.options,o=n.angleLines,l=n.pointLabels;i.lineWidth=o.lineWidth,i.strokeStyle=o.color;var d,c,h,f,g=t.getDistanceFromCenterForValue(n.ticks.reverse?t.min:t.max),p=s(t);i.textBaseline="top";for(var m=r(t)-1;m>=0;m--){if(o.display){var v=t.getPointPosition(m,g);i.beginPath(),i.moveTo(t.xCenter,t.yCenter),i.lineTo(v.x,v.y),i.stroke(),i.closePath()}if(l.display){var b=t.getPointPosition(m,g+5),x=a.valueAtIndexOrDefault(l.fontColor,m,e.defaultFontColor);i.font=p.font,i.fillStyle=x;var y=t.getIndexAngle(m),k=a.toDegrees(y);i.textAlign=0===(f=k)||180===f?"center":f<180?"left":"right",d=k,c=t._pointLabelSizes[m],h=b,90===d||270===d?h.y-=c.h/2:(d>270||d<90)&&(h.y-=c.h),u(i,t.pointLabels[m]||"",b,p.size)}}}(t)}}});t.scaleService.registerScaleType("radialLinear",c,i)}},{25:25,34:34,45:45}],58:[function(t,e,i){"use strict";var n=t(1);n="function"==typeof n?n:window.moment;var a=t(25),o=t(45),r=Number.MIN_SAFE_INTEGER||-9007199254740991,s=Number.MAX_SAFE_INTEGER||9007199254740991,l={millisecond:{common:!0,size:1,steps:[1,2,5,10,20,50,100,250,500]},second:{common:!0,size:1e3,steps:[1,2,5,10,30]},minute:{common:!0,size:6e4,steps:[1,2,5,10,30]},hour:{common:!0,size:36e5,steps:[1,2,3,6,12]},day:{common:!0,size:864e5,steps:[1,2,5]},week:{common:!1,size:6048e5,steps:[1,2,3,4]},month:{common:!0,size:2628e6,steps:[1,2,3]},quarter:{common:!1,size:7884e6,steps:[1,2,3,4]},year:{common:!0,size:3154e7}},u=Object.keys(l);function d(t,e){return t-e}function c(t){var e,i,n,a={},o=[];for(e=0,i=t.length;e<i;++e)a[n=t[e]]||(a[n]=!0,o.push(n));return o}function h(t,e,i,n){var a=function(t,e,i){for(var n,a,o,r=0,s=t.length-1;r>=0&&r<=s;){if(a=t[(n=r+s>>1)-1]||null,o=t[n],!a)return{lo:null,hi:o};if(o[e]<i)r=n+1;else{if(!(a[e]>i))return{lo:a,hi:o};s=n-1}}return{lo:o,hi:null}}(t,e,i),o=a.lo?a.hi?a.lo:t[t.length-2]:t[0],r=a.lo?a.hi?a.hi:t[t.length-1]:t[1],s=r[e]-o[e],l=s?(i-o[e])/s:0,u=(r[n]-o[n])*l;return o[n]+u}function f(t,e){var i=e.parser,a=e.parser||e.format;return"function"==typeof i?i(t):"string"==typeof t&&"string"==typeof a?n(t,a):(t instanceof n||(t=n(t)),t.isValid()?t:"function"==typeof a?a(t):t)}function g(t,e){if(o.isNullOrUndef(t))return null;var i=e.options.time,n=f(e.getRightValue(t),i);return n.isValid()?(i.round&&n.startOf(i.round),n.valueOf()):null}function p(t){for(var e=u.indexOf(t)+1,i=u.length;e<i;++e)if(l[u[e]].common)return u[e]}function m(t,e,i,a){var r,d=a.time,c=d.unit||function(t,e,i,n){var a,o,r,d=u.length;for(a=u.indexOf(t);a<d-1;++a)if(r=(o=l[u[a]]).steps?o.steps[o.steps.length-1]:s,o.common&&Math.ceil((i-e)/(r*o.size))<=n)return u[a];return u[d-1]}(d.minUnit,t,e,i),h=p(c),f=o.valueOrDefault(d.stepSize,d.unitStepSize),g="week"===c&&d.isoWeekday,m=a.ticks.major.enabled,v=l[c],b=n(t),x=n(e),y=[];for(f||(f=function(t,e,i,n){var a,o,r,s=e-t,u=l[i],d=u.size,c=u.steps;if(!c)return Math.ceil(s/(n*d));for(a=0,o=c.length;a<o&&(r=c[a],!(Math.ceil(s/(d*r))<=n));++a);return r}(t,e,c,i)),g&&(b=b.isoWeekday(g),x=x.isoWeekday(g)),b=b.startOf(g?"day":c),(x=x.startOf(g?"day":c))<e&&x.add(1,c),r=n(b),m&&h&&!g&&!d.round&&(r.startOf(h),r.add(~~((b-r)/(v.size*f))*f,c));r<x;r.add(f,c))y.push(+r);return y.push(+r),y}e.exports=function(t){var e=t.Scale.extend({initialize:function(){if(!n)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");this.mergeTicksOptions(),t.Scale.prototype.initialize.call(this)},update:function(){var e=this.options;return e.time&&e.time.format&&console.warn("options.time.format is deprecated and replaced by options.time.parser."),t.Scale.prototype.update.apply(this,arguments)},getRightValue:function(e){return e&&void 0!==e.t&&(e=e.t),t.Scale.prototype.getRightValue.call(this,e)},determineDataLimits:function(){var t,e,i,a,l,u,h=this,f=h.chart,p=h.options.time,m=p.unit||"day",v=s,b=r,x=[],y=[],k=[];for(t=0,i=f.data.labels.length;t<i;++t)k.push(g(f.data.labels[t],h));for(t=0,i=(f.data.datasets||[]).length;t<i;++t)if(f.isDatasetVisible(t))if(l=f.data.datasets[t].data,o.isObject(l[0]))for(y[t]=[],e=0,a=l.length;e<a;++e)u=g(l[e],h),x.push(u),y[t][e]=u;else x.push.apply(x,k),y[t]=k.slice(0);else y[t]=[];k.length&&(k=c(k).sort(d),v=Math.min(v,k[0]),b=Math.max(b,k[k.length-1])),x.length&&(x=c(x).sort(d),v=Math.min(v,x[0]),b=Math.max(b,x[x.length-1])),v=g(p.min,h)||v,b=g(p.max,h)||b,v=v===s?+n().startOf(m):v,b=b===r?+n().endOf(m)+1:b,h.min=Math.min(v,b),h.max=Math.max(v+1,b),h._horizontal=h.isHorizontal(),h._table=[],h._timestamps={data:x,datasets:y,labels:k}},buildTicks:function(){var t,e,i,a,o,r,s,d,c,v,b,x,y=this,k=y.min,M=y.max,w=y.options,S=w.time,C=[],_=[];switch(w.ticks.source){case"data":C=y._timestamps.data;break;case"labels":C=y._timestamps.labels;break;case"auto":default:C=m(k,M,y.getLabelCapacity(k),w)}for("ticks"===w.bounds&&C.length&&(k=C[0],M=C[C.length-1]),k=g(S.min,y)||k,M=g(S.max,y)||M,t=0,e=C.length;t<e;++t)(i=C[t])>=k&&i<=M&&_.push(i);return y.min=k,y.max=M,y._unit=S.unit||function(t,e,i,a){var o,r,s=n.duration(n(a).diff(n(i)));for(o=u.length-1;o>=u.indexOf(e);o--)if(r=u[o],l[r].common&&s.as(r)>=t.length)return r;return u[e?u.indexOf(e):0]}(_,S.minUnit,y.min,y.max),y._majorUnit=p(y._unit),y._table=function(t,e,i,n){if("linear"===n||!t.length)return[{time:e,pos:0},{time:i,pos:1}];var a,o,r,s,l,u=[],d=[e];for(a=0,o=t.length;a<o;++a)(s=t[a])>e&&s<i&&d.push(s);for(d.push(i),a=0,o=d.length;a<o;++a)l=d[a+1],r=d[a-1],s=d[a],void 0!==r&&void 0!==l&&Math.round((l+r)/2)===s||u.push({time:s,pos:a/(o-1)});return u}(y._timestamps.data,k,M,w.distribution),y._offsets=(a=y._table,o=_,r=k,s=M,b=0,x=0,(d=w).offset&&o.length&&(d.time.min||(c=o.length>1?o[1]:s,v=o[0],b=(h(a,"time",c,"pos")-h(a,"time",v,"pos"))/2),d.time.max||(c=o[o.length-1],v=o.length>1?o[o.length-2]:r,x=(h(a,"time",c,"pos")-h(a,"time",v,"pos"))/2)),{left:b,right:x}),y._labelFormat=function(t,e){var i,n,a,o=t.length;for(i=0;i<o;i++){if(0!==(n=f(t[i],e)).millisecond())return"MMM D, YYYY h:mm:ss.SSS a";0===n.second()&&0===n.minute()&&0===n.hour()||(a=!0)}return a?"MMM D, YYYY h:mm:ss a":"MMM D, YYYY"}(y._timestamps.data,S),function(t,e){var i,a,o,r,s=[];for(i=0,a=t.length;i<a;++i)o=t[i],r=!!e&&o===+n(o).startOf(e),s.push({value:o,major:r});return s}(_,y._majorUnit)},getLabelForIndex:function(t,e){var i=this.chart.data,n=this.options.time,a=i.labels&&t<i.labels.length?i.labels[t]:"",r=i.datasets[e].data[t];return o.isObject(r)&&(a=this.getRightValue(r)),n.tooltipFormat?f(a,n).format(n.tooltipFormat):"string"==typeof a?a:f(a,n).format(this._labelFormat)},tickFormatFunction:function(t,e,i,n){var a=this.options,r=t.valueOf(),s=a.time.displayFormats,l=s[this._unit],u=this._majorUnit,d=s[u],c=t.clone().startOf(u).valueOf(),h=a.ticks.major,f=h.enabled&&u&&d&&r===c,g=t.format(n||(f?d:l)),p=f?h:a.ticks.minor,m=o.valueOrDefault(p.callback,p.userCallback);return m?m(g,e,i):g},convertTicksToLabels:function(t){var e,i,a=[];for(e=0,i=t.length;e<i;++e)a.push(this.tickFormatFunction(n(t[e].value),e,t));return a},getPixelForOffset:function(t){var e=this,i=e._horizontal?e.width:e.height,n=e._horizontal?e.left:e.top,a=h(e._table,"time",t,"pos");return n+i*(e._offsets.left+a)/(e._offsets.left+1+e._offsets.right)},getPixelForValue:function(t,e,i){var n=null;if(void 0!==e&&void 0!==i&&(n=this._timestamps.datasets[i][e]),null===n&&(n=g(t,this)),null!==n)return this.getPixelForOffset(n)},getPixelForTick:function(t){var e=this.getTicks();return t>=0&&t<e.length?this.getPixelForOffset(e[t].value):null},getValueForPixel:function(t){var e=this,i=e._horizontal?e.width:e.height,a=e._horizontal?e.left:e.top,o=(i?(t-a)/i:0)*(e._offsets.left+1+e._offsets.left)-e._offsets.right,r=h(e._table,"pos",o,"time");return n(r)},getLabelWidth:function(t){var e=this.options.ticks,i=this.ctx.measureText(t).width,n=o.toRadians(e.maxRotation),r=Math.cos(n),s=Math.sin(n);return i*r+o.valueOrDefault(e.fontSize,a.global.defaultFontSize)*s},getLabelCapacity:function(t){var e=this,i=e.options.time.displayFormats.millisecond,a=e.tickFormatFunction(n(t),0,[],i),o=e.getLabelWidth(a),r=e.isHorizontal()?e.width:e.height,s=Math.floor(r/o);return s>0?s:1}});t.scaleService.registerScaleType("time",e,{position:"bottom",distribution:"linear",bounds:"data",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm a",hour:"hA",day:"MMM D",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1,source:"auto",major:{enabled:!1}}})}},{1:1,25:25,45:45}]},{},[7])(7)});
      window.ChartJS = window.Chart
    }

    return new window.ChartJS(root, {
      type: this.props.type,
      options: mergedOptions,
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
    let configuration = null

    if (typeof this.props.src === 'string') {

      const response = await this.fetch(this.props.src)

      if (response.err) {
        return console.error(err)
      }

      data = response.data
    }

    if ((this.props.src === Object(this.props.src)) && this.props.src.chartData) {
      data = this.props.src.chartData
      configuration = this.props.configuration || {}
    }

    if (data) {
      this.draw(data, configuration)
    }
  }

  render () {
    const {
      width,
      height
    } = this.props

    this.root.style.width = width
    this.root.style.height = height

    return `
      <canvas width="${width}" height="${height}">
      </canvas>
    `
  }
}

Tonic.add(TonicChart)

class TonicCheckbox extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return (that.value === true) || (that.value === 'true') },
      set (value) { that.value = (value === true) || (value === 'true') }
    })
  }

  get value () {
    const state = this.getState()

    if (typeof state.checked !== 'undefined') {
      return state.checked
    }

    return this.props.checked
  }

  set value (checked) {
    this.reRender(props => Object.assign(props, {
      checked
    }))

    this.state.checked = checked
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(document.body)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      disabled: false,
      checked: false,
      size: '18px'
    }
  }

  stylesheet () {
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
        color: var(--primary);
        font: 12px var(--subheader);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline-block;
        vertical-align: middle;
      }

      tonic-checkbox .tonic--icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      tonic-checkbox label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
    `
  }

  change (e) {
    this.setState(state => Object.assign({}, state, {
      checked: !state.checked
    }))

    const state = this.getState()

    let url = ''

    const label = this.root.querySelector('label.tonic--icon')
    const color = this.props.color || this.getPropertyValue('primary')

    if (this.props.iconOn && this.props.iconOff) {
      url = this.props[state.checked ? 'iconOn' : 'iconOff']
    } else {
      url = TonicCheckbox.svg[state.checked ? 'iconOn' : 'iconOff']()
    }

    label.style['-webkit-mask-image'] = label.style.maskImage = `url("${url}")`

    label.backgroundColor = color
  }

  styles () {
    let {
      color,
      iconOn,
      iconOff,
      checked,
      size
    } = this.props

    if (!color) color = this.getPropertyValue('primary')
    if (!iconOn) iconOn = TonicCheckbox.svg.iconOn()
    if (!iconOff) iconOff = TonicCheckbox.svg.iconOff()

    let url = checked === 'true' ? iconOn : iconOff

    return {
      icon: {
        width: size,
        height: size,
        '-webkit-mask-image': `url('${url}')`,
        maskImage: `url('${url}')`,
        backgroundColor: color
      }
    }
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
    }
  }

  renderLabel () {
    if (!this.props.label) return ''

    const {
      id,
      label
    } = this.props

    return `<label styles="label" for="tonic--checkbox--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
      tabindex
    } = this.props

    let checked = (this.props.checked === true) || (this.props.checked === 'true')

    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      this.setState(state => Object.assign(state, {
        state,
        checked
      }))
    }

    const checkedAttr = checked ? 'checked' : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    const attributes = [
      disabledAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--checkbox--wrapper">
        <input
          type="checkbox"
          id="tonic--checkbox--${id}"
          ${checkedAttr}
          ${attributes}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon">
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

TonicCheckbox.svg = {}
TonicCheckbox.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

TonicCheckbox.svg.iconOn = () => TonicCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
    <polygon points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
  </svg>
`)

TonicCheckbox.svg.iconOff = () => TonicCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
  </svg>
`)

Tonic.add(TonicCheckbox)

class Dialog extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.show = () => this.show()
    this.root.hide = () => this.hide()
    this.root.event = name => this.event(name)

    this.root.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--close')
      if (el) this.hide()

      const overlay = e.target.matches('.tonic--overlay')
      if (overlay) this.hide()
    })
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      width: '450px',
      height: 'auto',
      overlay: true,
      closeIcon: Dialog.svg.closeIcon(this.getPropertyValue('primary')),
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  stylesheet () {
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
        color: var(--primary);
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
        background-color: var(--window);
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
    `
  }

  show () {
    const that = this

    return new Promise((resolve) => {
      const node = this.root.firstElementChild
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
      const node = that.root.firstElementChild
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
            that.root.removeEventListener(eventName, listener)
          }

          if (close) return resolve({})
          if (value) resolve({ [event.target.value]: true })
        }

        that.root.addEventListener(eventName, listener)
      }
    }
  }

  wrap (render) {
    const {
      width,
      height,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.root.classList.add('tonic--dialog')

    const template = document.createElement('template')
    const wrapper = document.createElement('div')

    const isOpen = !!this.root.querySelector('.tonic--dialog--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--dialog--wrapper tonic--show' : 'tonic--dialog--wrapper'

    const content = render()

    typeof content === 'string'
      ? (template.innerHTML = content)
      : [...content.children].forEach(el => template.appendChild(el))

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

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

    const close = document.createElement('div')
    close.className = 'tonic--close'

    const iconColor = color || this.getPropertyValue('primary')
    const url = Dialog.svg.closeIcon(iconColor)
    close.style.backgroundImage = `url("${url}")`

    wrapper.appendChild(dialog)
    dialog.appendChild(template.content)
    dialog.appendChild(close)
    return wrapper
  }
}

Dialog.svg = {}
Dialog.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
Dialog.svg.closeIcon = color => Dialog.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

Tonic.Dialog = Dialog

class TonicIcon extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      fill: 'var(--primary)'
    }
  }

  stylesheet () {
    return `
      icon {
        display: inline-block;
      }
      svg path {
        fill: inherit;
      }
    `
  }

  styles () {
    let {
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
    let {
      symbolId,
      size,
      fill,
      theme,
      src
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <svg styles="icon">
        <use
          href="${src}#${symbolId}"
          xlink:href="${src}#${symbolId}"
          width="${size}"
          ${fill ? `fill="${fill}" color="${fill}"` : ''}
          height="${size}">
      </svg>
    `
  }
}

Tonic.add(TonicIcon)

class TonicInput extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.setInvalid = msg => this.setInvalid(msg)
    this.root.setValid = () => this.setValid()

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      width: '250px',
      color: 'var(--primary)',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      position: 'left',
      errorMessage: 'Invalid'
    }
  }

  get value () {
    return this.state.value
  }

  set value (value) {
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

  stylesheet () {
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
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
        color: var(--primary);
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-input input:invalid {
        border-color: var(--error);
      }

      tonic-input input:invalid:focus {
        border-color: var(--error);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--primary);
      }

      tonic-input input[disabled] {
        background-color: var(--background);
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
        background-color: var(--error);
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
        border-top: 6px solid var(--error);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  renderIcon () {
    if (!this.props.src) return ''

    return `
      <tonic-icon
        src="${this.props.src}"
        color="${this.props.color}">
      </tonic-icon>
    `
  }

  setupEvents () {
    if (!this.root) return
    const input = this.root.querySelector('input')

    const set = (k, v, event) => {
      this.setState(state => Object.assign({}, state, { [k]: v }))
    }

    const relay = name => {
      this.root && this.root.dispatchEvent(new window.Event(name))
    }

    input.addEventListener('focus', e => {
      set('focus', true)
      relay('focus')
    })

    input.addEventListener('blur', e => {
      set('focus', false)
      relay('blur')
    })

    input.addEventListener('keyup', e => {
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
    if (!this.root) return
    const input = this.root.querySelector('input')

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
    this.setupEvents()

    if (this.props.value) {
      this.state.value = this.props.value
    }
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
        width,
        height,
        borderRadius: radius,
        padding
      }
    }
  }

  render () {
    const {
      width,
      height,
      type,
      placeholder,
      spellcheck,
      ariaInvalid,
      disabled,
      required,
      pattern,
      theme,
      position,
      minlength,
      maxlength,
      min,
      max,
      tabindex
    } = this.props

    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const requiredAttr = required && required === 'true' ? `required="true"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''
    const minLengthAttr = minlength ? `minlength="${minlength}"` : ''
    const maxLengthAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const maxAttr = max ? `max="${max}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    const value = this.state.value || this.props.value
    const valueAttr = value && value !== 'undefined' ? `value="${value}"` : ''

    const attributes = [
      patternAttr,
      valueAttr,
      placeholderAttr,
      spellcheckAttr,
      ariaInvalidAttr,
      minLengthAttr,
      maxLengthAttr,
      minAttr,
      maxAttr,
      disabledAttr,
      requiredAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper ${positionAttr}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input styles="input" type="${type}" ${attributes}/>
        <div class="tonic--invalid">
          <span>${this.props.errorMessage}</span>
        </div>
      </div>
    `
  }
}

Tonic.add(TonicInput)

class Panel extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.show = fn => this.show(fn)
    this.root.hide = fn => this.hide(fn)

    this.root.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--close')
      if (el) this.hide()

      const overlay = Tonic.match(e.target, '.tonic--overlay')
      if (overlay) this.hide()
    })
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      position: 'right',
      overlay: false,
      closeIcon: Panel.svg.closeIcon,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  stylesheet () {
    return `
      .tonic--panel .tonic--panel--inner {
        color: var(--primary);
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--window);
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        transition: transform 0.3s ease-in-out;
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
        border-right: 1px solid var(--border);
        visibility: hidden;
      }

      .tonic--panel .tonic--right .tonic--panel--inner {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--border);
        visibility: hidden;
      }

      .tonic--panel .tonic--show.tonic--right .tonic--panel--inner,
      .tonic--panel .tonic--show.tonic--left .tonic--panel--inner {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
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
    `
  }

  show (fn) {
    const node = this.root.firstChild
    node.classList.add('tonic--show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  hide (fn) {
    const node = this.root.firstChild
    node.classList.remove('tonic--show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  wrap (render) {
    const {
      name,
      position,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.root.classList.add('tonic--panel')

    const wrapper = document.createElement('div')
    const template = document.createElement('template')

    const content = render()

    typeof content === 'string'
      ? (template.innerHTML = content)
      : [...content.children].forEach(el => template.appendChild(el))

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const isOpen = !!this.root.querySelector('.tonic--wrapper.tonic--show')
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
    const close = document.createElement('div')
    close.className = 'tonic--close'

    const iconColor = color || this.getPropertyValue('primary')
    const url = Panel.svg.closeIcon(iconColor)
    close.style.backgroundImage = `url("${url}")`

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(template.content)
    panel.appendChild(close)

    return wrapper
  }
}

Panel.svg = {}
Panel.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
Panel.svg.closeIcon = color => Panel.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

Tonic.Panel = Panel

class TonicPopover extends Tonic { /* global Tonic */
  constructor ({ node }) {
    super({ node })
    const target = node.getAttribute('for')
    const el = document.getElementById(target)

    this.root.hide = () => this.hide()

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

  stylesheet () {
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
        background: var(--window);
        border: 1px solid var(--border);
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
    const popover = this.root.querySelector('.tonic--popover')
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
      this.root.dispatchEvent(event)
    })
  }

  hide () {
    const popover = this.root.querySelector('.tonic--popover')
    if (popover) popover.classList.remove('tonic--show')
  }

  connected () {
    if (!this.props.open) return
    const target = this.root.getAttribute('for')
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

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--popover" styles="popover">
        ${this.children}
      </div>
      <div class="tonic--overlay"></div>
    `
  }
}

Tonic.add(TonicPopover)

class TonicProfileImage extends Tonic { /* global Tonic */
  constructor (args) {
    super(args)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () {
        const state = that.getState()
        return state.data || that.props.src
      }
    })
  }

  defaults () {
    return {
      size: '50px',
      src: TonicProfileImage.svg.default(),
      iconEdit: TonicProfileImage.svg.edit(),
      radius: '5px'
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  stylesheet () {
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

      tonic-profile-image .tonic--overlay div {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-size: 40px 40px;
        background-repeat: no-repeat;
        background-position: center center;
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
      iconEdit,
      src,
      size,
      border,
      radius
    } = this.props

    return {
      icon: {
        backgroundImage: `url('${iconEdit}')`
      },
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
      const fileInput = this.root.getElementsByTagName('input')[0]
      fileInput.click()
    }
  }

  change (e) {
    const fileInput = this.root.getElementsByTagName('input')[0]
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
      if (!this.root) return

      if (err) {
        const event = new window.Event('error')
        event.message = err.message
        this.root.dispatchEvent(event)
        return
      }

      const slot = this.root && this.root.querySelector('.tonic--image')

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
      this.root.dispatchEvent(event)
    })
  }

  render () {
    let {
      theme,
      editable
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    const editableAttr = editable && (editable === 'true') ? 'tonic--editable' : ''

    return `
      <div
        class="tonic--wrapper ${editableAttr}"
        styles="wrapper">

        <div
          class="tonic--image"
          styles="background">
        </div>

        <input type="file" styles="hidden"/>

        <div class="tonic--overlay">
          <div styles="icon"></div>
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

TonicProfileImage.svg.edit = () => TonicProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#fff" d="M79.8,32.8L67.5,20.5c-0.2-0.2-0.5-0.2-0.7,0L25.2,62.1c-0.1,0.1-0.1,0.1-0.1,0.2L20.8,79c0,0.2,0,0.4,0.1,0.5c0.1,0.1,0.2,0.1,0.4,0.1c0,0,0.1,0,0.1,0l16.6-4.4c0.1,0,0.2-0.1,0.2-0.1l41.6-41.6C79.9,33.3,79.9,33,79.8,32.8z M67.1,25.8l7.3,7.3L36.9,70.7l-7.3-7.3L67.1,25.8z M33,72.4l-6.8,1.8l1.8-6.9L33,72.4z"/>
  </svg>
`)

Tonic.add(TonicProfileImage)

class TonicProgressBar extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.setProgress = n => this.setProgress(n)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.setProgress(value) }
    })
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

  stylesheet () {
    return `
      tonic-progress-bar {
        display: inline-block;
        user-select: none;
      }

      tonic-progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--background);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--accent);
        width: 0%;
        height: 100%;
      }
    `
  }

  styles () {
    return {
      wrapper: {
        width: this.props.width,
        height: this.props.height
      },
      progress: {
        backgroundColor: this.props.color || 'var(--accent)'
      }
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  setProgress (progress) {
    this.setState(state => Object.assign({}, state, {
      progress
    }))

    this.reRender()
  }

  updated () {
    window.requestAnimationFrame(() => {
      const progressBar = this.root.querySelector('.tonic--progress')
      let progress = this.props.progress

      if (typeof this.state.progress !== 'undefined') {
        progress = this.state.progress
      }

      if (progressBar) {
        progressBar.style.width = `${progress}%`
      }
    })
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    this.root.style.width = this.props.width
    this.root.style.height = this.props.height

    return `
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress" styles="progress"></div>
      </div>
    `
  }
}

Tonic.add(TonicProgressBar)

class TonicRange extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

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
    if (!this.root) return

    this.root.querySelector('input').value = value
    this.setValue(value)
  }

  setValue (value) {
    const root = this.root
    if (!root) return

    const min = this.props.min
    const max = this.props.max

    const input = root.querySelector('input')

    if (this.props.label) {
      const label = root.querySelector('label')
      label.textContent = this.getLabelValue(value)
    }

    input.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'

    this.setState(state => Object.assign({}, state, { value }))
  }

  input (e) {
    this.setValue(e.target.value || this.props.value)
  }

  stylesheet () {
    return `
      tonic-range  {
        position: relative;
        display: -webkit-flex;
        display: flex;
        height: 50px;
        padding: 20px 0;
      }

      tonic-range label {
        font: 13px var(--subheader);
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
        background-color: var(--background);
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--accent)), color-stop(100%, var(--accent)));
        background-image: -webkit-linear-gradient(var(--accent), var(--accent));
        background-image: -moz-linear-gradient(var(--accent), var(--accent));
        background-image: -o-linear-gradient(var(--accent), var(--accent));
        background-image: linear-gradient(var(--accent), var(--accent));
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 0;
        cursor: pointer;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]:disabled {
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--border)), color-stop(100%, var(--border)));
        background-image: -webkit-linear-gradient(var(--border), var(--border));
        background-image: -moz-linear-gradient(var(--border), var(--border));
        background-image: -o-linear-gradient(var(--border), var(--border));
        background-image: linear-gradient(var(--border), var(--border));
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
    return `<label>${this.getLabelValue(value)}</label>`
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

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const maxAttr = max ? `max="${max}"` : ''
    const stepAttr = step ? `step="${step}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    const value = this.props.value || this.state.value
    const valueAttr = value && value !== 'undefined' ? `value="${value}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    this.setState(state => Object.assign({}, state, { value }))

    const attributes = [
      valueAttr,
      minAttr,
      maxAttr,
      stepAttr,
      disabledAttr,
      tabAttr
    ].join(' ')

    return `
      ${this.renderLabel()}
      <div class="tonic--wrapper" styles="width">
        <input type="range" styles="width" id="${id}" ${attributes}/>
      </div>
    `
  }
}

Tonic.add(TonicRange)

class TonicRouter extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this

    if (TonicRouter.patched) return
    TonicRouter.patched = true

    const createEvent = function (type) {
      const orig = window.history[type]
      return function (...args) {
        that.reset()

        const value = orig.call(this, ...args)
        window.dispatchEvent(new window.Event(type.toLowerCase()))

        const nodes = document.getElementsByTagName('tonic-router')
        for (const node of nodes) node.reRender()
        return value
      }
    }

    window.addEventListener('popstate', e => this.reRender(p => p))

    window.history.pushState = createEvent('pushState')
    window.history.replaceState = createEvent('replaceState')
  }

  stylesheet () {
    return `
      tonic-router {
        display: none;
      }

      tonic-router.tonic--show {
        display: block;
      }
    `
  }

  reset () {
    TonicRouter.matches = false
    const contentTags = document.getElementsByTagName('tonic-router')
    Array.from(contentTags).forEach(tag => tag.classList.remove('tonic--show'))
  }

  willConnect () {
    this.template = document.createElement('template')
    this.template.innerHTML = this.root.innerHTML
  }

  updated () {
    if (!this.root.classList.contains('tonic--show')) return
    const event = new window.Event('match')
    this.root.dispatchEvent(event)
  }

  render () {
    const none = this.root.hasAttribute('none')

    if (none) {
      if (TonicRouter.matches) return
      this.root.classList.add('tonic--show')
      return this.template.content
    }

    const path = this.root.getAttribute('path')
    const keys = []
    const matcher = TonicRouter.matcher(path, keys)
    const match = matcher.exec(window.location.pathname)

    if (match) {
      TonicRouter.matches = true

      match.slice(1).forEach((m, i) => {
        this.props[keys[i].name] = m
      })

      this.root.classList.add('tonic--show')
      return this.template.content
    }

    return ''
  }
}

TonicRouter.matches = false
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
    let tokens = []
    let key = 0
    let index = 0
    let path = ''
    let defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
    let delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
    let pathEscaped = false
    let res

    while ((res = PATH_REGEXP.exec(str)) !== null) {
      let m = res[0]
      let escaped = res[1]
      let offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        pathEscaped = true
        continue
      }

      let prev = ''
      let next = str[index]
      let name = res[2]
      let capture = res[3]
      let group = res[4]
      let modifier = res[5]

      if (!pathEscaped && path.length) {
        let k = path.length - 1

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

      let partial = prev !== '' && next !== undefined && next !== prev
      let repeat = modifier === '+' || modifier === '*'
      let optional = modifier === '?' || modifier === '*'
      let delimiter = prev || defaultDelimiter
      let pattern = capture || group

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
    let parts = []

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

    let strict = options.strict
    let end = options.end !== false
    let delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
    let delimiters = options.delimiters || DEFAULT_DELIMITERS
    let endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
    let route = ''
    let isEndDelimited = tokens.length === 0

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i]

      if (typeof token === 'string') {
        route += escapeString(token)
        isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
      } else {
        let prefix = escapeString(token.prefix)
        let capture = token.repeat
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

Tonic.add(TonicRouter)

class TonicSelect extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.loading = (state) => this.loading(state)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })

    Object.defineProperty(this.root, 'option', {
      get () { return that.option }
    })

    Object.defineProperty(this.root, 'selectedIndex', {
      get () { return that.selectedIndex }
    })
  }

  defaults () {
    return {
      disabled: false,
      iconArrow: TonicSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  stylesheet () {
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
        background-color: var(--window);
        border-color: var(--border);
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
        border: 2px solid var(--medium);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-select select {
        color: var(--primary);
        font: 14px var(--monospace);
        background-color: var(--window);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--border);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
      }

      tonic-select select:not([multiple]) {
        padding: 10px 30px 10px 10px;
      }

      tonic-select select[disabled] {
        background-color: var(--background);
      }

      tonic-select label {
        color: var(--medium);
        font: 12px/14px var(--subheader);
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
    if (!this.root) return
    const el = this.root.querySelector('select')

    if (this.props.multiple === 'true') {
      const value = [...el.options]
        .filter(el => el.selected)
        .map(el => el.getAttribute('value'))
      return value
    }

    return el.value
  }

  selectOptions (value) {
    const el = this.root.querySelector('select')
    const options = [...el.options]

    options.forEach(el => {
      el.selected = value.findIndex(v => v === el.value) > -1
    })
  }

  set value (value) {
    if (!this.root) return

    if (this.props.multiple === 'true' && Array.isArray(value)) {
      this.selectOptions(value)
    } else {
      if (!value) value = 0 // if a falsy value
      const el = this.root.querySelector('select')
      el.selectedIndex = value
    }
  }

  get option () {
    const node = this.root.querySelector('select')
    return node.options[node.selectedIndex]
  }

  get selectedIndex () {
    const node = this.root.querySelector('select')
    return node.selectedIndex
  }

  loading (state) {
    if (!this.root) return
    const method = state ? 'add' : 'remove'
    this.root.classList[method]('tonic--loading')
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
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
      const option = this.root.querySelector(`option[value="${value}"]`)
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
      size,
      theme,
      tabindex
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const multipleAttr = multiple && multiple === 'true' ? `multiple="true"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const sizeAttr = size ? `size="${size}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    const attributes = [
      disabledAttr,
      multipleAttr,
      sizeAttr,
      required,
      tabAttr
    ].join(' ')

    const options = this.root.innerHTML

    return `
      <div class="tonic--wrapper" styles="wrapper">
        ${this.renderLabel()}
        <select styles="select" ${attributes}>
          ${options}
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

Tonic.add(TonicSelect)

class TonicTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  stylesheet () {
    return `
      [data-tab-name] {
        color: var(--primary);
      }

      [data-tab-group] {
        display: none;
      }

      .tonic--show[data-tab-group] {
        display: block;
      }
    `
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  getCurrentContentNode (group) {
    return this.qs(`[data-tab-group="${group}"].tonic--show`)
  }

  click (e) {
    const tab = Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')
    if (!tab) return

    e.preventDefault()

    const group = this.props.group
    const currentContentNode = this.getCurrentContentNode(group)
    if (currentContentNode) currentContentNode.classList.remove('tonic--show')

    const name = tab.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (!target) {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
      return
    }

    const parent = tab.closest('tonic-tabs')
    const currentContentLink = this.qs(`[data-tab-name].tonic--selected`, parent)
    if (currentContentLink) currentContentLink.classList.remove('tonic--selected')

    target.classList.add('tonic--show')
    tab.classList.add('tonic--selected')

    this.setState(state => Object.assign(state, {
      selected: name
    }))
  }

  connected () {
    let name = this.state.selected || this.root.getAttribute('selected')

    if (name) {
      const targetLink = this.qs(`[data-tab-name=${name}]`, this.root)
      if (targetLink) targetLink.classList.add('tonic--selected')
    } else {
      const currentLink = this.qs(`[data-tab-name].tonic--selected`, this.root)
      if (!currentLink) {
        console.warn(`Not found '[data.tab-name].tonic--selected'`)
        return
      }
      name = currentLink.dataset.tabName
    }

    const group = this.props.group
    if (!group) return

    const currentContentNode = this.getCurrentContentNode(group)
    if (currentContentNode) currentContentNode.classList.remove('tonic--show')

    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)
    if (!target) return

    target.classList.add('tonic--show')
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.root.innerHTML
  }
}

Tonic.add(TonicTabs)

class TonicTextarea extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this

    Object.defineProperty(this.root, 'value', {
      get () { return that.value },
      set (value) { that.value = value }
    })
  }

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

  stylesheet () {
    return `
      tonic-textarea textarea {
        color: var(--primary);
        width: 100%;
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--primary);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--danger);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--background);
      }

      tonic-textarea label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
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
    return this.root.querySelector('textarea').value
  }

  set value (value) {
    this.root.querySelector('textarea').value = value
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  willConnect () {
    this.props.value = this.props.value || this.root.textContent
  }

  render () {
    const {
      width,
      height,
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
      tabindex,
      theme
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const rowsAttr = rows ? `rows="${rows}"` : ''
    const colsAttr = cols ? `cols="${cols}"` : ''
    const minAttr = minlength ? `minlength="${minlength}"` : ''
    const maxAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    if (width) this.root.style.width = width
    if (height) this.root.style.width = height
    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.root.removeAttribute('tabindex')

    if (this.props.value === 'undefined') this.props.value = ''

    const attributes = [
      placeholderAttr,
      spellcheckAttr,
      disabled,
      required,
      readonly,
      autofocus,
      rowsAttr,
      colsAttr,
      minAttr,
      maxAttr,
      disabledAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea styles="textarea" ${attributes}>${this.props.value}</textarea>
      </div>
    `
  }
}

Tonic.add(TonicTextarea)

class TonicToaster extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      closeIcon: TonicToaster.svg.closeIcon(this.getPropertyValue('primary')),
      dangerIcon: TonicToaster.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: TonicToaster.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: TonicToaster.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: TonicToaster.svg.infoIcon(this.getPropertyValue('info')),
      position: 'center'
    }
  }

  stylesheet () {
    return `
      tonic-toaster * {
        box-sizing: border-box;
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
        background-color: var(--window);
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
        color: var(--primary);
        font: 14px/18px var(--subheader);
      }

      tonic-toaster .tonic--message {
        color: var(--medium);
        font: 14px/18px var(--body);
      }

      tonic-toaster .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        background-size: cover;
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
        background-size: cover;
      }

      tonic-toaster .tonic--notification .tonic--close svg path {
        fill: var(--primary);
        color: var(--primary);
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
      const close = document.createElement('div')
      close.className = 'tonic--close'
      close.style.backgroundImage = `url("${this.props.closeIcon}")`
      notification.appendChild(close)
      notification.classList.add('tonic--close')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'tonic--icon'
      notification.appendChild(alertIcon)

      switch (type) {
        case 'danger':
          alertIcon.style.backgroundImage = `url("${this.props.dangerIcon}")`
          if (!title && !message) { titleElement.textContent = 'Danger' }
          break

        case 'warning':
          alertIcon.style.backgroundImage = `url("${this.props.warningIcon}")`
          if (!title && !message) { titleElement.textContent = 'Warning' }
          break

        case 'success':
          alertIcon.style.backgroundImage = `url("${this.props.successIcon}")`
          if (!title && !message) { titleElement.textContent = 'Success' }
          break

        case 'info':
          alertIcon.style.backgroundImage = `url("${this.props.infoIcon}")`
          if (!title && !message) { titleElement.textContent = 'Information' }
          break
      }
    }

    notification.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    this.root.querySelector('.tonic--wrapper').appendChild(notification)
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

  destroy (notification) {
    notification.classList.remove('tonic--show')
    notification.addEventListener('transitionend', e => {
      if (!notification) return

      notification.parentNode.removeChild(notification)
    })
  }

  show () {
    const node = this.root.firstElementChild
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.root.firstElementChild
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

    const positionAttr = position ? `tonic--${position}` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `<div class="tonic--wrapper ${positionAttr}"></div>`
  }
}

TonicToaster.svg = {}
TonicToaster.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

TonicToaster.svg.closeIcon = color => TonicToaster.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

TonicToaster.svg.dangerIcon = color => TonicToaster.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

TonicToaster.svg.warningIcon = color => TonicToaster.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

TonicToaster.svg.successIcon = color => TonicToaster.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

TonicToaster.svg.infoIcon = color => TonicToaster.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(TonicToaster)

class TonicToasterInline extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.show = () => this.show()
    this.root.hide = () => this.hide()
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      display: 'true',
      closeIcon: TonicToasterInline.svg.closeIcon(),
      dangerIcon: TonicToasterInline.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: TonicToasterInline.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: TonicToasterInline.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: TonicToasterInline.svg.infoIcon(this.getPropertyValue('info'))
    }
  }

  stylesheet () {
    return `
      tonic-toaster-inline .tonic--notification {
        max-height: 0;
        margin: 10px 0;
        position: relative;
        background-color: var(--window);
        border-radius: 3px;
        -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
        transition: opacity 0.2s ease-in-out 0s, transform 0.3s ease-in-out 0s, max-height 0.3s ease-in-out;
        border: 1px solid var(--border);
        opacity: 0;
        z-index: 1;
      }

      tonic-toaster-inline .tonic--notification.tonic--show {
        max-height: 100%;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
        opacity: 1;
      }

      tonic-toaster-inline .tonic--warning {
        border-color: var(--warning);
      }

      tonic-toaster-inline .tonic--danger {
        border-color: var(--danger);
      }

      tonic-toaster-inline .tonic--success {
        border-color: var(--success);
      }

      tonic-toaster-inline .tonic--info {
        border-color: var(--secondary);
      }

      tonic-toaster-inline .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster-inline .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster-inline main {
        padding: 17px 15px 15px 15px;
      }

      tonic-toaster-inline .tonic--title {
        color: var(--primary);
        font: 14px/18px var(--subheader);
      }

      tonic-toaster-inline .tonic--message {
        font: 14px/18px var(--subheader);
        color: var(--medium);
      }

      tonic-toaster-inline .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        background-size: cover;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster-inline .tonic--notification .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
        background-size: cover;
      }

      tonic-toaster-inline .tonic--notification .tonic--close svg path {
        fill: var(--primary);
        color: var(--primary);
      }
    `
  }

  show () {
    if (!this.root) return
    this.root.firstElementChild.classList.add('tonic--show')
  }

  hide () {
    if (!this.root) return
    this.root.firstElementChild.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    this.hide()
  }

  connected () {
    if (!this.root) return

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

  styles () {
    const icon = this.props[this.props.type + 'Icon']

    return {
      icon: {
        backgroundImage: `url("${icon}")`
      },
      close: {
        backgroundImage: `url("${this.props.closeIcon}")`
      }
    }
  }

  renderClose () {
    if (this.props.dismiss !== 'true') {
      return ''
    }

    return this.html`<div class="tonic--close" styles="close"></div>`
  }

  renderIcon () {
    if (!this.props.type) return ''
    return this.html`<div class="tonic--icon" styles="icon"></div>`
  }

  render () {
    const {
      title,
      type,
      message,
      theme
    } = this.props

    if (theme) {
      this.root.setAttribute('theme', theme)
    }

    let typeClasses = ''

    if (type) {
      typeClasses = `tonic--alert tonic--${type}`
    }

    return this.html`
      <div class="tonic--notification ${typeClasses}">
        ${this.renderIcon()}
        ${this.renderClose()}
        <main>
          <div class="tonic--title">
            ${title}
          </div>
          <div class="tonic--message">
            ${message || this.children}
          </div>
        </main>
      </div>
    `
  }
}

TonicToasterInline.svg = {}
TonicToasterInline.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

TonicToasterInline.svg.closeIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

TonicToasterInline.svg.dangerIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

TonicToasterInline.svg.warningIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

TonicToasterInline.svg.successIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

TonicToasterInline.svg.infoIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(TonicToasterInline)

class TonicToggle extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return (that.value === true) || (that.value === 'true') },
      set (value) { that.value = (value === true) || (value === 'true') }
    })
  }

  defaults () {
    return {
      checked: false
    }
  }

  get value () {
    const state = this.getState()

    if (typeof state.checked !== 'undefined') {
      return state.checked
    }

    return this.props.checked
  }

  set value (checked) {
    this.state.checked = checked

    this.reRender(props => Object.assign(props, {
      checked
    }))
  }

  stylesheet () {
    return `
      tonic-toggle .tonic--toggle--wrapper {
        height: 30px;
        position: relative;
      }

      tonic-toggle .tonic--toggle--wrapper > label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
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
        font: bold 12px var(--subheader);
        text-transform: uppercase;
      }

      tonic-toggle .tonic--toggle {
        position: absolute;
        display: none;
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
        background-color: var(--border);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
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
        background-color: var(--border);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
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

      tonic-toggle .tonic--toggle:disabled {
        cursor: default;
        opacity: 0.5;
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
        background-color: var(--window);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--accent);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--accent);
        color: var(--background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--background);
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

    return `<label for="tonic--toggle--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    let checked

    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      checked = this.props.checked === 'true'
    }

    this.state.checked = checked
    checked = checked ? 'checked' : ''

    const attributes = [
      disabledAttr,
      checked
    ].join(' ')

    return `
      <div class="tonic--toggle--wrapper">
        <div class="tonic--switch">
          <input
            type="checkbox"
            class="tonic--toggle"
            id="tonic--toggle--${id}"
            ${attributes}/>
          <label for="tonic--toggle--${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(TonicToggle)

class TonicTooltip extends Tonic { /* global Tonic */
  constructor ({ node }) {
    super({ node })
    const target = node.getAttribute('for')
    const el = document.getElementById(target)
    let timer = null

    const leave = e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hide()
      }, 256)
    }

    el.addEventListener('mouseenter', e => this.show(el))
    node.addEventListener('mouseenter', e => clearTimeout(timer))
    node.addEventListener('mouseleave', leave)
    el.addEventListener('mouseleave', leave)
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto'
    }
  }

  stylesheet () {
    return `
      tonic-tooltip .tonic--tooltip {
        color: var(--primary);
        position: fixed;
        background: var(--window);
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        border: 1px solid var(--border);
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
        background-color: var(--window);
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
        border-top-color: var(--border);
        border-left-color: var(--border);
      }

      tonic-tooltip .tonic--bottom .tonic--tooltip-arrow {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--border);
        border-right-color: var(--border);
      }
    `
  }

  show (triggerNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.querySelector('.tonic--tooltip')
      const arrow = this.root.querySelector('.tonic--tooltip-arrow')

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
    if (!this.root) return

    const tooltip = this.root.querySelector('.tonic--tooltip')
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
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.html`
      <div class="tonic--tooltip" styles="tooltip">
        ${this.children}
        <span class="tonic--tooltip-arrow"></span>
      </div>
    `
  }
}

Tonic.add(TonicTooltip)

class Windowed extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.getRows = () => this.rows
    this.root.load = (rows) => this.load(rows)
    this.root.rePaint = () => this.rePaint()

    const that = this

    Object.defineProperty(this.root, 'length', {
      get () { return that.rows.length }
    })
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

  load (rows = []) {
    if (!this.root) return

    this.rows = rows
    this.reRender()

    const outer = this.root.querySelector('.tonic--windowed--outer')
    if (!outer) return

    this.outerHeight = outer.offsetHeight

    this.numPages = Math.ceil(this.rows.length / this.props.rowsPerPage)

    this.pages = {}
    this.pagesAvailable = this.pagesAvailable || []
    this.rowHeight = parseInt(this.props.rowHeight, 10)

    const inner = this.root.querySelector('.tonic--windowed--inner')
    inner.innerHTML = ''
    inner.style.height = `${this.rowHeight * this.rows.length}px`
    this.pageHeight = this.props.rowsPerPage * this.rowHeight
    this.padding = this.props.rowPadding * this.rowHeight

    this.rePaint()
  }

  setHeight (height, { render } = {}) {
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')
    if (!outer) return

    outer.style.height = height
    this.outerHeight = outer.offsetHeight

    if (render !== false) {
      this.rePaint()
    }
  }

  getPage (i) {
    let page, state

    ;[page, state] = this.pages[i]
      ? [this.pages[i], 'ok']
      : this.pagesAvailable.length
        ? [this.getAvailablePage(i), 'old']
        : [this.createNewPage(i), 'fresh']

    this.pages[i] = page

    page.style.height = i < this.numPages - 1
      ? `${this.pageHeight}px`
      : this.getLastPageHeight()

    page.style.top = this.getPageTop(i)
    return [page, state]
  }

  getAvailablePage (i) {
    const page = this.pagesAvailable.pop()
    const inner = this.root.querySelector('.tonic--windowed--inner')
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

    const inner = this.root.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    return page
  }

  async rePaint ({ refresh, load } = {}) {
    if (!this.root) return

    if (refresh && load !== false) this.load(this.rows)

    const outer = this.root.querySelector('.tonic--windowed--outer')
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

    const inner = this.root.querySelector('.tonic--windowed--inner')

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

    window.requestAnimationFrame(() => page.appendChild(frag))
  }

  async updatePage (i) {
    const page = this.pages[i]
    const start = i * this.props.rowsPerPage
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    const inner = this.root.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.pages[i]
      return
    }

    for (let j = start, rowIdx = 0; j < limit; j++, rowIdx++) {
      if (page.children[rowIdx] && this.updateRow) {
        this.updateRow(await this.getRow(j), page.children[rowIdx])
      } else {
        const div = document.createElement('div')
        div.innerHTML = this.renderRow(await this.getRow(j))
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
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')

    outer && outer.addEventListener('scroll', () => {
      this.state.scrollTop = outer.scrollTop
      this.rePaint()
    }, { passive: true })
  }

  renderLoadingState () {
    return `<div class="tonic--windowed--loader"></div>`
  }

  renderEmptyState () {
    return `<div class="tonic--windowed--empty"></div>`
  }

  render () {
    if (!this.rows) {
      return this.renderLoadingState()
    }

    if (!this.rows.length) {
      return this.renderEmptyState()
    }

    return `
      <div class="tonic--windowed--outer" styles="outer">
        <div class="tonic--windowed--inner" styles="inner">
        </div>
      </div>
    `
  }
}

Tonic.Windowed = Windowed

    }
  
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
class Tonic {
  constructor ({ node, state } = {}) {
    this.props = {}
    this.state = state || {}
    const name = Tonic._splitName(this.constructor.name)
    this.root = node || document.createElement(name)
    this.root._id = Tonic._createId()
    this.root.disconnect = index => this._disconnect(index)
    this.root.reRender = v => this.reRender(v)
    this.root.setState = v => this.setState(v)
    this.root.getProps = () => this.getProps()
    this.root.getState = () => this.getState()
    this._bindEventListeners()
    if (this.wrap) {
      const render = this.render
      this.render = () => this.wrap(render.bind(this))
    }

    this._connect()
    Tonic.refs.push(this.root)
  }

  static _createId () {
    return Math.random().toString(16).slice(2, 8)
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static add (c, root) {
    c.prototype._props = Object.getOwnPropertyNames(c.prototype)
    if (!c.name || c.name.length === 1) throw Error('Mangling detected. https://github.com/heapwolf/tonic/blob/master/HELP.md')

    const name = Tonic._splitName(c.name)
    Tonic.registry[name.toUpperCase()] = Tonic[c.name] = c
    Tonic.tags = Object.keys(Tonic.registry)
    if (c.registered) throw new Error(`Already registered ${c.name}`)
    c.registered = true

    if (!Tonic.styleNode) {
      const styleTag = document.createElement('style')
      Tonic.nonce && styleTag.setAttribute('nonce', Tonic.nonce)
      Tonic.styleNode = document.head.appendChild(styleTag)
    }

    if (root || c.name === 'App') Tonic.init(root || document.firstElementChild)
  }

  static init (node = document.firstElementChild, states = {}) {
    node = node.firstElementChild

    while (node) {
      const tagName = node.tagName

      if (Tonic.tags.includes(tagName) && !node._id) { /* eslint-disable no-new */
        new Tonic.registry[tagName]({ node, state: states[node.id] })
        node = node.nextElementSibling
        continue
      }

      Tonic.init(node, states)
      node = node.nextElementSibling
    }
  }

  static sanitize (o) {
    if (o === null) return o
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'object') o[k] = Tonic.sanitize(v)
      if (typeof v === 'string') o[k] = Tonic.escape(v)
    }
    return o
  }

  static escape (s) {
    return s.replace(Tonic.escapeRe, ch => Tonic.escapeMap[ch])
  }

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  html ([s, ...strings], ...values) {
    const reduce = (a, b) => a.concat(b, strings.shift())
    const filter = s => s && (s !== true || s === 0)
    const ref = v => {
      if (typeof v === 'object' && v.__children__) return this._children(v)
      if (typeof v === 'object' || typeof v === 'function') return this._prop(v)
      if (typeof v === 'number') return `${v}__float`
      if (typeof v === 'boolean') return `${v.toString()}`
      return v
    }
    return values.map(ref).reduce(reduce, [s]).filter(filter).join('')
  }

  setState (o) {
    this.state = typeof o === 'function' ? o(this.state) : o
  }

  getState () {
    return this.state
  }

  reRender (o = this.props) {
    const oldProps = JSON.parse(JSON.stringify(this.props))
    this.props = Tonic.sanitize(typeof o === 'function' ? o(this.props) : o)
    if (!this.root) throw new Error('.reRender called on destroyed component, see guide.')
    Tonic.init(this.root, this._setContent(this.root, this.render()))
    this.updated && this.updated(oldProps)
  }

  getProps () {
    return this.props
  }

  handleEvent (e) {
    this[e.type](e)
  }

  _bindEventListeners () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.root.addEventListener(p, this)
    }
  }

  _setContent (target, content = '') {
    const states = {}
    for (const tagName of Tonic.tags) {
      for (const node of target.getElementsByTagName(tagName)) {
        const index = Tonic.refs.findIndex(ref => ref === node)
        if (index === -1) continue
        states[node.id] = node.getState()
        node.disconnect(index)
      }
    }

    if (typeof content === 'string') {
      target.innerHTML = content.trim()

      if (this.styles) {
        const styles = this.styles()
        Array.from(target.querySelectorAll('[styles]')).forEach(el =>
          el.getAttribute('styles').split(/\s+/).forEach(s =>
            Object.assign(el.style, styles[s.trim()])))
      }

      Array.from(target.querySelectorAll('tonic-children')).forEach(el => {
        const root = Tonic._elements[this.root._id]
        Array.from(root[el.id]).forEach(node => {
          el.parentNode.insertBefore(node, el)
        })
        delete root[el.id]
        el.parentNode.removeChild(el)
      })
    } else {
      while (target.firstChild) target.removeChild(target.firstChild)
      target.appendChild(content.cloneNode(true))
    }
    this.root = target
    return states
  }

  _prop (o) {
    const id = this.root._id
    const p = `__${id}__${Tonic._createId()}__`
    if (!Tonic._data[id]) Tonic._data[id] = {}
    Tonic._data[id][p] = o
    return p
  }

  _children (r) {
    const id = this.root._id
    const ref = Tonic._createId()
    if (!Tonic._elements[id]) Tonic._elements[id] = {}
    Tonic._elements[id][ref] = r
    return `<tonic-children id="${ref}"/></tonic-children>`
  }

  _connect () {
    for (let { name, value } of this.root.attributes) {
      name = name.replace(/-(.)/g, (_, m) => m.toUpperCase())
      const p = this.props[name] = value

      if (/__\w+__\w+__/.test(p)) {
        const { 1: root } = p.split('__')
        this.props[name] = Tonic._data[root][p]
        continue
      } else if (/\d+__float/.test(p)) {
        this.props[name] = parseFloat(p, 10)
      }
    }

    this.props = Tonic.sanitize(this.props)

    for (const [k, v] of Object.entries(this.defaults ? this.defaults() : {})) {
      if (!this.props[k]) this.props[k] = v
    }

    this.willConnect && this.willConnect()
    this.children = [...this.root.childNodes].map(node => node.cloneNode(true))
    this.children.__children__ = true
    this._setContent(this.root, this.render())
    Tonic.init(this.root)
    const style = this.stylesheet && this.stylesheet()

    if (style && !Tonic.registry[this.root.tagName].styled) {
      Tonic.registry[this.root.tagName].styled = true
      Tonic.styleNode.appendChild(document.createTextNode(style))
    }

    this.connected && this.connected()
  }

  _disconnect (index) {
    this.disconnected && this.disconnected()
    delete Tonic._data[this.root._id]
    delete Tonic._elements[this.root._id]
    delete this.root
    Tonic.refs.splice(index, 1)
  }
}

Tonic.tags = []
Tonic.refs = []
Tonic._data = {}
Tonic._elements = {}
Tonic.registry = {}
Tonic.escapeRe = /["&'<>`]/g
Tonic.escapeMap = { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }

if (typeof module === 'object') module.exports = Tonic

},{}],6:[function(require,module,exports){
"use strict";

module.exports = exports = self.fetch;

// Needed for TypeScript and Webpack.
exports.default = self.fetch.bind(self);

exports.Headers = self.Headers;
exports.Request = self.Request;
exports.Response = self.Response;

},{}],7:[function(require,module,exports){
const qs = (s, p) => (p || document).querySelector(s)
const qsa = (s, p) => [...(p || document).querySelectorAll(s)]

module.exports = { qs, qsa }

},{}],8:[function(require,module,exports){
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

},{}]},{},[1]);
