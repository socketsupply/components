(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const scrollToY = require('scrolltoy')
const { qs, qsa } = require('qs')
const Tonic = require('@optoolco/tonic')
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
  readme(Tonic)
}

document.addEventListener('DOMContentLoaded', ready)

},{"../..":4,"./nonce":2,"./readme":3,"@optoolco/tonic":5,"qs":8,"scrolltoy":9}],2:[function(require,module,exports){

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
          class TonicDialog extends Tonic.Dialog { /* global Tonic */
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

Tonic.add(TonicDialog)

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

class TonicPanel extends Tonic.Panel { /* global Tonic */
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
  const { number } = page2.getState()
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
          class TonicWindowed extends Tonic.Windowed { /* global Tonic */
  async click (e) {
    const row = Tonic.match(e.target, '[data-id]')

    if (row) {
      console.log(await this.getRow(+row.dataset.id))
    }
  }

  updateRow (row, index, element) {
    element.setAttribute('data-updated', true)
    return element
  }

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

Tonic.add(TonicWindowed)

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
  
},{"node-fetch":6}],4:[function(require,module,exports){
(function (global,setImmediate){

    //
    // DO NOT EDIT! USE 'npm run build'!
    //
    module.exports = (Tonic, nonce) => {
      if (nonce) Tonic.nonce = nonce

      class TonicRouter extends Tonic { /* global Tonic */
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

class Panel extends Tonic { /* global Tonic */
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

  stylesheet () {
    return `
      .tonic--panel .tonic--panel--inner {
        color: var(--tonic-primary);
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--tonic-window);
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
        border-right: 1px solid var(--tonic-border);
        visibility: hidden;
      }

      .tonic--panel .tonic--right .tonic--panel--inner {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--tonic-border);
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

    const iconColor = color || `var(--tonic-primary)`

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

Tonic.Panel = Panel

class Dialog extends Tonic { /* global Tonic */
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
        color: var(--tonic-primary);
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
        background-color: var(--tonic-window);
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

    const iconColor = color || `var(--tonic-primary)`

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

Tonic.Dialog = Dialog

class TonicTabs extends Tonic { /* global Tonic */
  stylesheet () {
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
    const tab = this.getElementById(value)
    if (tab) tab.click()
  }

  qsa (s) {
    return [...this.querySelectorAll(s)]
  }

  setVisibility (id) {
    const tabs = this.querySelectorAll(`.tonic--tab`)

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
      case 'ArrowRight':
        const index = triggers.indexOf(e.target)
        const direction = (e.code === 'ArrowLeft') ? -1 : 1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
        break

      case 'Space':
        const isActive = Tonic.match(e.target, '.tonic--tab:focus')
        if (!isActive) return

        e.preventDefault()

        const id = isActive.getAttribute('id')
        this.setVisibility(id)
        break
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
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

Tonic.add(TonicTabs)

class TonicTabPanel extends Tonic { /* global Tonic */
  stylesheet () {
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
    this.setAttribute('role', 'tabpanel')

    return this.html`
      ${this.childNodes}
    `
  }
}

Tonic.add(TonicTabPanel)

class TonicAccordion extends Tonic { /* global Tonic */
  defaults () {
    return {
      multiple: false
    }
  }

  stylesheet () {
    return `
      tonic-accordion {
        display: block;
        border: 1px solid var(--tonic-border);
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
    const {
      multiple
    } = this.props

    if (multiple) this.setAttribute('data-allow-multiple', '')

    return this.html`
      ${this.nodes}
    `
  }
}

Tonic.add(TonicAccordion)

class TonicAccordionSection extends Tonic {
  stylesheet () {
    return `
      tonic-accordion-section {
        display: block;
      }

      tonic-accordion-section:not(:last-of-type) {
        border-bottom: 1px solid var(--tonic-border);
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
        border-top: 1px solid var(--tonic-primary);
        border-right: 1px solid var(--tonic-primary);
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

Tonic.add(TonicAccordionSection)

class Windowed extends Tonic { /* global Tonic */
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

    window.requestAnimationFrame(() => page.appendChild(frag))
  }

  async updatePage (i) {
    const page = this.pages[i]
    const start = i * this.props.rowsPerPage
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    const inner = this.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.pages[i]
      return
    }

    for (let j = start, rowIdx = 0; j < limit; j++, rowIdx++) {
      if (page.children[rowIdx] && this.updateRow) {
        this.updateRow(await this.getRow(j), rowIdx, page.children[rowIdx])
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
    const outer = this.querySelector('.tonic--windowed--outer')

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

class TonicTooltip extends Tonic { /* global Tonic */
  connected () {
    const target = this.props['for']
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

  stylesheet () {
    return `
      tonic-tooltip .tonic--tooltip {
        color: var(--tonic-primary);
        position: fixed;
        background: var(--tonic-window);
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        border: 1px solid var(--tonic-border);
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
        background-color: var(--tonic-window);
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
        border-top-color: var(--tonic-border);
        border-left-color: var(--tonic-border);
      }

      tonic-tooltip .tonic--bottom .tonic--tooltip-arrow {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--tonic-border);
        border-right-color: var(--tonic-border);
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

Tonic.add(TonicTooltip)

class TonicPopover extends Tonic { /* global Tonic */
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
        background: var(--tonic-window);
        border: 1px solid var(--tonic-border);
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

Tonic.add(TonicPopover)

class TonicBadge extends Tonic { /* global Tonic */
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
        background-color: var(--tonic-background);
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
        background-color: var(--tonic-notification);
        border: 2px solid var(--tonic-background);
        border-radius: 50%;
      }

      tonic-badge .tonic--notifications.tonic--new span:after {
        display: block;
      }

      tonic-badge span {
        color: var(--tonic-primary);
        font: 15px var(--tonic-subheader);
        letter-spacing: 1px;
        text-align: center;
      }
    `
  }

  willConnect () {
    this.state.count = this.props.count
  }

  render () {
    let {
      theme
    } = this.props

    let count = this.state.count

    if (typeof count === 'undefined') {
      count = this.props.count
    }

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const countAttr = (count > 99) ? '99' : count

    const newAttr = (count > 0) ? 'tonic--new' : ''

    return this.html`
      <div class="tonic--notifications ${newAttr}">
        <span>${String(countAttr)}</span>
      </div>
    `
  }
}

Tonic.add(TonicBadge)

class TonicButton extends Tonic { /* global Tonic */
  get value () {
    return this.props.value
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

  stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--tonic-button);
        width: auto;
        min-height: 40px;
        font: 12px var(--tonic-subheader);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--tonic-button);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--tonic-medium);
        background-color: var(--tonic-background);
        border-color: var(--tonic-background);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--tonic-window) !important;
        background-color: var(--tonic-button) !important;
        border-color: var(--tonic-button) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--tonic-medium);
        border-color: var(--tonic-medium);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--tonic-medium) !important;
        border-color: var(--tonic-medium) !important;
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

    const disabledAttr = disabled && disabled !== 'false' ? 'disabled' : ''
    const valueAttr = value ? `value="${value}"` : ''
    const typeAttr = type ? `type="${type}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''

    let classes = []

    if (active) classes.push(`tonic--active`)
    classes = classes.join(' ')

    if (tabindex) this.removeAttribute('tabindex')

    let label = ''

    if (this.querySelector('style')) {
      label = this.querySelector('button').textContent
    } else {
      label = this.textContent || type || 'Button'
    }

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

  draw (data = {}, options = {}) {
    const root = this.querySelector('canvas')
    //
    // Create the chart by passing the data and options..
    //
    if (!window.ChartJS) {
      //
      // ChartJS will violate your CSPs. So, only allow it's code to be run if
      // you actually instantiate a chart.
      //

      // eslint-disable-next-line
      !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Chart=e()}(this,function(){"use strict";var t={rgb2hsl:e,rgb2hsv:i,rgb2hwb:n,rgb2cmyk:a,rgb2keyword:o,rgb2xyz:s,rgb2lab:l,rgb2lch:function(t){return v(l(t))},hsl2rgb:u,hsl2hsv:function(t){var e=t[0],i=t[1]/100,n=t[2]/100;if(0===n)return[0,0,0];return[e,100*(2*(i*=(n*=2)<=1?n:2-n)/(n+i)),100*((n+i)/2)]},hsl2hwb:function(t){return n(u(t))},hsl2cmyk:function(t){return a(u(t))},hsl2keyword:function(t){return o(u(t))},hsv2rgb:d,hsv2hsl:function(t){var e,i,n=t[0],a=t[1]/100,r=t[2]/100;return e=a*r,[n,100*(e=(e/=(i=(2-a)*r)<=1?i:2-i)||0),100*(i/=2)]},hsv2hwb:function(t){return n(d(t))},hsv2cmyk:function(t){return a(d(t))},hsv2keyword:function(t){return o(d(t))},hwb2rgb:h,hwb2hsl:function(t){return e(h(t))},hwb2hsv:function(t){return i(h(t))},hwb2cmyk:function(t){return a(h(t))},hwb2keyword:function(t){return o(h(t))},cmyk2rgb:c,cmyk2hsl:function(t){return e(c(t))},cmyk2hsv:function(t){return i(c(t))},cmyk2hwb:function(t){return n(c(t))},cmyk2keyword:function(t){return o(c(t))},keyword2rgb:_,keyword2hsl:function(t){return e(_(t))},keyword2hsv:function(t){return i(_(t))},keyword2hwb:function(t){return n(_(t))},keyword2cmyk:function(t){return a(_(t))},keyword2lab:function(t){return l(_(t))},keyword2xyz:function(t){return s(_(t))},xyz2rgb:f,xyz2lab:m,xyz2lch:function(t){return v(m(t))},lab2xyz:p,lab2rgb:y,lab2lch:v,lch2lab:x,lch2xyz:function(t){return p(x(t))},lch2rgb:function(t){return y(x(t))}};function e(t){var e,i,n=t[0]/255,a=t[1]/255,r=t[2]/255,o=Math.min(n,a,r),s=Math.max(n,a,r),l=s-o;return s==o?e=0:n==s?e=(a-r)/l:a==s?e=2+(r-n)/l:r==s&&(e=4+(n-a)/l),(e=Math.min(60*e,360))<0&&(e+=360),i=(o+s)/2,[e,100*(s==o?0:i<=.5?l/(s+o):l/(2-s-o)),100*i]}function i(t){var e,i,n=t[0],a=t[1],r=t[2],o=Math.min(n,a,r),s=Math.max(n,a,r),l=s-o;return i=0==s?0:l/s*1e3/10,s==o?e=0:n==s?e=(a-r)/l:a==s?e=2+(r-n)/l:r==s&&(e=4+(n-a)/l),(e=Math.min(60*e,360))<0&&(e+=360),[e,i,s/255*1e3/10]}function n(t){var i=t[0],n=t[1],a=t[2];return[e(t)[0],100*(1/255*Math.min(i,Math.min(n,a))),100*(a=1-1/255*Math.max(i,Math.max(n,a)))]}function a(t){var e,i=t[0]/255,n=t[1]/255,a=t[2]/255;return[100*((1-i-(e=Math.min(1-i,1-n,1-a)))/(1-e)||0),100*((1-n-e)/(1-e)||0),100*((1-a-e)/(1-e)||0),100*e]}function o(t){return w[JSON.stringify(t)]}function s(t){var e=t[0]/255,i=t[1]/255,n=t[2]/255;return[100*(.4124*(e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92)+.3576*(i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92)+.1805*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)),100*(.2126*e+.7152*i+.0722*n),100*(.0193*e+.1192*i+.9505*n)]}function l(t){var e=s(t),i=e[0],n=e[1],a=e[2];return n/=100,a/=108.883,i=(i/=95.047)>.008856?Math.pow(i,1/3):7.787*i+16/116,[116*(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116)-16,500*(i-n),200*(n-(a=a>.008856?Math.pow(a,1/3):7.787*a+16/116))]}function u(t){var e,i,n,a,r,o=t[0]/360,s=t[1]/100,l=t[2]/100;if(0==s)return[r=255*l,r,r];e=2*l-(i=l<.5?l*(1+s):l+s-l*s),a=[0,0,0];for(var u=0;u<3;u++)(n=o+1/3*-(u-1))<0&&n++,n>1&&n--,r=6*n<1?e+6*(i-e)*n:2*n<1?i:3*n<2?e+(i-e)*(2/3-n)*6:e,a[u]=255*r;return a}function d(t){var e=t[0]/60,i=t[1]/100,n=t[2]/100,a=Math.floor(e)%6,r=e-Math.floor(e),o=255*n*(1-i),s=255*n*(1-i*r),l=255*n*(1-i*(1-r));n*=255;switch(a){case 0:return[n,l,o];case 1:return[s,n,o];case 2:return[o,n,l];case 3:return[o,s,n];case 4:return[l,o,n];case 5:return[n,o,s]}}function h(t){var e,i,n,a,o=t[0]/360,s=t[1]/100,l=t[2]/100,u=s+l;switch(u>1&&(s/=u,l/=u),n=6*o-(e=Math.floor(6*o)),0!=(1&e)&&(n=1-n),a=s+n*((i=1-l)-s),e){default:case 6:case 0:r=i,g=a,b=s;break;case 1:r=a,g=i,b=s;break;case 2:r=s,g=i,b=a;break;case 3:r=s,g=a,b=i;break;case 4:r=a,g=s,b=i;break;case 5:r=i,g=s,b=a}return[255*r,255*g,255*b]}function c(t){var e=t[0]/100,i=t[1]/100,n=t[2]/100,a=t[3]/100;return[255*(1-Math.min(1,e*(1-a)+a)),255*(1-Math.min(1,i*(1-a)+a)),255*(1-Math.min(1,n*(1-a)+a))]}function f(t){var e,i,n,a=t[0]/100,r=t[1]/100,o=t[2]/100;return i=-.9689*a+1.8758*r+.0415*o,n=.0557*a+-.204*r+1.057*o,e=(e=3.2406*a+-1.5372*r+-.4986*o)>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,[255*(e=Math.min(Math.max(0,e),1)),255*(i=Math.min(Math.max(0,i),1)),255*(n=Math.min(Math.max(0,n),1))]}function m(t){var e=t[0],i=t[1],n=t[2];return i/=100,n/=108.883,e=(e/=95.047)>.008856?Math.pow(e,1/3):7.787*e+16/116,[116*(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116)-16,500*(e-i),200*(i-(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116))]}function p(t){var e,i,n,a,r=t[0],o=t[1],s=t[2];return r<=8?a=(i=100*r/903.3)/100*7.787+16/116:(i=100*Math.pow((r+16)/116,3),a=Math.pow(i/100,1/3)),[e=e/95.047<=.008856?e=95.047*(o/500+a-16/116)/7.787:95.047*Math.pow(o/500+a,3),i,n=n/108.883<=.008859?n=108.883*(a-s/200-16/116)/7.787:108.883*Math.pow(a-s/200,3)]}function v(t){var e,i=t[0],n=t[1],a=t[2];return(e=360*Math.atan2(a,n)/2/Math.PI)<0&&(e+=360),[i,Math.sqrt(n*n+a*a),e]}function y(t){return f(p(t))}function x(t){var e,i=t[0],n=t[1];return e=t[2]/360*2*Math.PI,[i,n*Math.cos(e),n*Math.sin(e)]}function _(t){return k[t]}var k={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},w={};for(var M in k)w[JSON.stringify(k[M])]=M;var S=function(){return new O};for(var D in t){S[D+"Raw"]=function(e){return function(i){return"number"==typeof i&&(i=Array.prototype.slice.call(arguments)),t[e](i)}}(D);var C=/(\w+)2(\w+)/.exec(D),P=C[1],T=C[2];(S[P]=S[P]||{})[T]=S[D]=function(e){return function(i){"number"==typeof i&&(i=Array.prototype.slice.call(arguments));var n=t[e](i);if("string"==typeof n||void 0===n)return n;for(var a=0;a<n.length;a++)n[a]=Math.round(n[a]);return n}}(D)}var O=function(){this.convs={}};O.prototype.routeSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i))},O.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},O.prototype.getValues=function(t){var e=this.convs[t];if(!e){var i=this.space,n=this.convs[i];e=S[i][t](n),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){O.prototype[t]=function(e){return this.routeSpace(t,arguments)}});var I=S,A={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},F={getRgba:R,getHsla:L,getRgb:function(t){var e=R(t);return e&&e.slice(0,3)},getHsl:function(t){var e=L(t);return e&&e.slice(0,3)},getHwb:W,getAlpha:function(t){var e=R(t);if(e)return e[3];if(e=L(t))return e[3];if(e=W(t))return e[3]},hexString:function(t,e){var e=void 0!==e&&3===t.length?e:t[3];return"#"+H(t[0])+H(t[1])+H(t[2])+(e>=0&&e<1?H(Math.round(255*e)):"")},rgbString:function(t,e){if(e<1||t[3]&&t[3]<1)return Y(t,e);return"rgb("+t[0]+", "+t[1]+", "+t[2]+")"},rgbaString:Y,percentString:function(t,e){if(e<1||t[3]&&t[3]<1)return N(t,e);var i=Math.round(t[0]/255*100),n=Math.round(t[1]/255*100),a=Math.round(t[2]/255*100);return"rgb("+i+"%, "+n+"%, "+a+"%)"},percentaString:N,hslString:function(t,e){if(e<1||t[3]&&t[3]<1)return z(t,e);return"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"},hslaString:z,hwbString:function(t,e){void 0===e&&(e=void 0!==t[3]?t[3]:1);return"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"},keyword:function(t){return E[t.slice(0,3)]}};function R(t){if(t){var e=[0,0,0],i=1,n=t.match(/^#([a-fA-F0-9]{3,4})$/i),a="";if(n){a=(n=n[1])[3];for(var r=0;r<e.length;r++)e[r]=parseInt(n[r]+n[r],16);a&&(i=Math.round(parseInt(a+a,16)/255*100)/100)}else if(n=t.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i)){a=n[2],n=n[1];for(r=0;r<e.length;r++)e[r]=parseInt(n.slice(2*r,2*r+2),16);a&&(i=Math.round(parseInt(a,16)/255*100)/100)}else if(n=t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(r=0;r<e.length;r++)e[r]=parseInt(n[r+1]);i=parseFloat(n[4])}else if(n=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(r=0;r<e.length;r++)e[r]=Math.round(2.55*parseFloat(n[r+1]));i=parseFloat(n[4])}else if(n=t.match(/(\w+)/)){if("transparent"==n[1])return[0,0,0,0];if(!(e=A[n[1]]))return}for(r=0;r<e.length;r++)e[r]=V(e[r],0,255);return i=i||0==i?V(i,0,1):1,e[3]=i,e}}function L(t){if(t){var e=t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var i=parseFloat(e[4]);return[V(parseInt(e[1]),0,360),V(parseFloat(e[2]),0,100),V(parseFloat(e[3]),0,100),V(isNaN(i)?1:i,0,1)]}}}function W(t){if(t){var e=t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var i=parseFloat(e[4]);return[V(parseInt(e[1]),0,360),V(parseFloat(e[2]),0,100),V(parseFloat(e[3]),0,100),V(isNaN(i)?1:i,0,1)]}}}function Y(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function N(t,e){return"rgba("+Math.round(t[0]/255*100)+"%, "+Math.round(t[1]/255*100)+"%, "+Math.round(t[2]/255*100)+"%, "+(e||t[3]||1)+")"}function z(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function V(t,e,i){return Math.min(Math.max(e,t),i)}function H(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var E={};for(var B in A)E[A[B]]=B;var j=function(t){return t instanceof j?t:this instanceof j?(this.valid=!1,this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1},void("string"==typeof t?(e=F.getRgba(t))?this.setValues("rgb",e):(e=F.getHsla(t))?this.setValues("hsl",e):(e=F.getHwb(t))&&this.setValues("hwb",e):"object"==typeof t&&(void 0!==(e=t).r||void 0!==e.red?this.setValues("rgb",e):void 0!==e.l||void 0!==e.lightness?this.setValues("hsl",e):void 0!==e.v||void 0!==e.value?this.setValues("hsv",e):void 0!==e.w||void 0!==e.whiteness?this.setValues("hwb",e):void 0===e.c&&void 0===e.cyan||this.setValues("cmyk",e)))):new j(t);var e};j.prototype={isValid:function(){return this.valid},rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t=(t%=360)<0?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return F.hexString(this.values.rgb)},rgbString:function(){return F.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return F.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return F.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return F.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return F.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return F.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return F.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],i=0;i<t.length;i++){var n=t[i]/255;e[i]=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),i=t.luminosity();return e>i?(e+.05)/(i+.05):(i+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb;return(299*t[0]+587*t[1]+114*t[2])/1e3<128},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;e<3;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,i=(e[0]+t)%360;return e[0]=i<0?360+i:i,this.setValues("hsl",e),this},mix:function(t,e){var i=t,n=void 0===e?.5:e,a=2*n-1,r=this.alpha()-i.alpha(),o=((a*r==-1?a:(a+r)/(1+a*r))+1)/2,s=1-o;return this.rgb(o*this.red()+s*i.red(),o*this.green()+s*i.green(),o*this.blue()+s*i.blue()).alpha(this.alpha()*n+i.alpha()*(1-n))},toJSON:function(){return this.rgb()},clone:function(){var t,e,i=new j,n=this.values,a=i.values;for(var r in n)n.hasOwnProperty(r)&&(t=n[r],"[object Array]"===(e={}.toString.call(t))?a[r]=t.slice(0):"[object Number]"===e?a[r]=t:console.error("unexpected color value:",t));return i}},j.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},j.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},j.prototype.getValues=function(t){for(var e=this.values,i={},n=0;n<t.length;n++)i[t.charAt(n)]=e[t][n];return 1!==e.alpha&&(i.a=e.alpha),i},j.prototype.setValues=function(t,e){var i,n,a=this.values,r=this.spaces,o=this.maxes,s=1;if(this.valid=!0,"alpha"===t)s=e;else if(e.length)a[t]=e.slice(0,t.length),s=e[t.length];else if(void 0!==e[t.charAt(0)]){for(i=0;i<t.length;i++)a[t][i]=e[t.charAt(i)];s=e.a}else if(void 0!==e[r[t][0]]){var l=r[t];for(i=0;i<t.length;i++)a[t][i]=e[l[i]];s=e.alpha}if(a.alpha=Math.max(0,Math.min(1,void 0===s?a.alpha:s)),"alpha"===t)return!1;for(i=0;i<t.length;i++)n=Math.max(0,Math.min(o[t][i],a[t][i])),a[t][i]=Math.round(n);for(var u in r)u!==t&&(a[u]=I[t][u](a[t]));return!0},j.prototype.setSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i),this)},j.prototype.setChannel=function(t,e,i){var n=this.values[t];return void 0===i?n[e]:i===n[e]?this:(n[e]=i,this.setValues(t,n),this)},"undefined"!=typeof window&&(window.Color=j);var U,G=j,q={noop:function(){},uid:(U=0,function(){return U++}),isNullOrUndef:function(t){return null==t},isArray:function(t){if(Array.isArray&&Array.isArray(t))return!0;var e=Object.prototype.toString.call(t);return"[object"===e.substr(0,7)&&"Array]"===e.substr(-6)},isObject:function(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)},isFinite:function(t){return("number"==typeof t||t instanceof Number)&&isFinite(t)},valueOrDefault:function(t,e){return void 0===t?e:t},valueAtIndexOrDefault:function(t,e,i){return q.valueOrDefault(q.isArray(t)?t[e]:t,i)},callback:function(t,e,i){if(t&&"function"==typeof t.call)return t.apply(i,e)},each:function(t,e,i,n){var a,r,o;if(q.isArray(t))if(r=t.length,n)for(a=r-1;a>=0;a--)e.call(i,t[a],a);else for(a=0;a<r;a++)e.call(i,t[a],a);else if(q.isObject(t))for(r=(o=Object.keys(t)).length,a=0;a<r;a++)e.call(i,t[o[a]],o[a])},arrayEquals:function(t,e){var i,n,a,r;if(!t||!e||t.length!==e.length)return!1;for(i=0,n=t.length;i<n;++i)if(a=t[i],r=e[i],a instanceof Array&&r instanceof Array){if(!q.arrayEquals(a,r))return!1}else if(a!==r)return!1;return!0},clone:function(t){if(q.isArray(t))return t.map(q.clone);if(q.isObject(t)){for(var e={},i=Object.keys(t),n=i.length,a=0;a<n;++a)e[i[a]]=q.clone(t[i[a]]);return e}return t},_merger:function(t,e,i,n){var a=e[t],r=i[t];q.isObject(a)&&q.isObject(r)?q.merge(a,r,n):e[t]=q.clone(r)},_mergerIf:function(t,e,i){var n=e[t],a=i[t];q.isObject(n)&&q.isObject(a)?q.mergeIf(n,a):e.hasOwnProperty(t)||(e[t]=q.clone(a))},merge:function(t,e,i){var n,a,r,o,s,l=q.isArray(e)?e:[e],u=l.length;if(!q.isObject(t))return t;for(n=(i=i||{}).merger||q._merger,a=0;a<u;++a)if(e=l[a],q.isObject(e))for(s=0,o=(r=Object.keys(e)).length;s<o;++s)n(r[s],t,e,i);return t},mergeIf:function(t,e){return q.merge(t,e,{merger:q._mergerIf})},extend:function(t){for(var e=function(e,i){t[i]=e},i=1,n=arguments.length;i<n;++i)q.each(arguments[i],e);return t},inherits:function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},n=function(){this.constructor=i};return n.prototype=e.prototype,i.prototype=new n,i.extend=q.inherits,t&&q.extend(i.prototype,t),i.__super__=e.prototype,i}},Z=q;q.callCallback=q.callback,q.indexOf=function(t,e,i){return Array.prototype.indexOf.call(t,e,i)},q.getValueOrDefault=q.valueOrDefault,q.getValueAtIndexOrDefault=q.valueAtIndexOrDefault;var $={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return(t-=1)*t*t+1},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-((t-=1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return(t-=1)*t*t*t*t+1},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return 1-Math.cos(t*(Math.PI/2))},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:1-Math.pow(2,-10*t)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t){return t>=1?t:-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-(t-=1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1===t?1:(i||(i=.3),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),-n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i))},easeOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:1===t?1:(i||(i=.3),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),n*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,n=1;return 0===t?0:2==(t/=.5)?1:(i||(i=.45),n<1?(n=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/n),t<1?n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i)*-.5:n*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){var e=1.70158;return t*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:function(t){return 1-$.easeOutBounce(1-t)},easeOutBounce:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:function(t){return t<.5?.5*$.easeInBounce(2*t):.5*$.easeOutBounce(2*t-1)+.5}},X={effects:$};Z.easingEffects=$;var K=Math.PI,J=K/180,Q=2*K,tt=K/2,et=K/4,it=2*K/3,nt={clear:function(t){t.ctx.clearRect(0,0,t.width,t.height)},roundedRect:function(t,e,i,n,a,r){if(r){var o=Math.min(r,a/2,n/2),s=e+o,l=i+o,u=e+n-o,d=i+a-o;t.moveTo(e,l),s<u&&l<d?(t.arc(s,l,o,-K,-tt),t.arc(u,l,o,-tt,0),t.arc(u,d,o,0,tt),t.arc(s,d,o,tt,K)):s<u?(t.moveTo(s,i),t.arc(u,l,o,-tt,tt),t.arc(s,l,o,tt,K+tt)):l<d?(t.arc(s,l,o,-K,0),t.arc(s,d,o,0,K)):t.arc(s,l,o,-K,K),t.closePath(),t.moveTo(e,i)}else t.rect(e,i,n,a)},drawPoint:function(t,e,i,n,a,r){var o,s,l,u,d,h=(r||0)*J;if(!e||"object"!=typeof e||"[object HTMLImageElement]"!==(o=e.toString())&&"[object HTMLCanvasElement]"!==o){if(!(isNaN(i)||i<=0)){switch(t.beginPath(),e){default:t.arc(n,a,i,0,Q),t.closePath();break;case"triangle":t.moveTo(n+Math.sin(h)*i,a-Math.cos(h)*i),h+=it,t.lineTo(n+Math.sin(h)*i,a-Math.cos(h)*i),h+=it,t.lineTo(n+Math.sin(h)*i,a-Math.cos(h)*i),t.closePath();break;case"rectRounded":u=i-(d=.516*i),s=Math.cos(h+et)*u,l=Math.sin(h+et)*u,t.arc(n-s,a-l,d,h-K,h-tt),t.arc(n+l,a-s,d,h-tt,h),t.arc(n+s,a+l,d,h,h+tt),t.arc(n-l,a+s,d,h+tt,h+K),t.closePath();break;case"rect":if(!r){u=Math.SQRT1_2*i,t.rect(n-u,a-u,2*u,2*u);break}h+=et;case"rectRot":s=Math.cos(h)*i,l=Math.sin(h)*i,t.moveTo(n-s,a-l),t.lineTo(n+l,a-s),t.lineTo(n+s,a+l),t.lineTo(n-l,a+s),t.closePath();break;case"crossRot":h+=et;case"cross":s=Math.cos(h)*i,l=Math.sin(h)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l),t.moveTo(n+l,a-s),t.lineTo(n-l,a+s);break;case"star":s=Math.cos(h)*i,l=Math.sin(h)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l),t.moveTo(n+l,a-s),t.lineTo(n-l,a+s),h+=et,s=Math.cos(h)*i,l=Math.sin(h)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l),t.moveTo(n+l,a-s),t.lineTo(n-l,a+s);break;case"line":s=Math.cos(h)*i,l=Math.sin(h)*i,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l);break;case"dash":t.moveTo(n,a),t.lineTo(n+Math.cos(h)*i,a+Math.sin(h)*i)}t.fill(),t.stroke()}}else t.drawImage(e,n-e.width/2,a-e.height/2,e.width,e.height)},_isPointInArea:function(t,e){return t.x>e.left-1e-6&&t.x<e.right+1e-6&&t.y>e.top-1e-6&&t.y<e.bottom+1e-6},clipArea:function(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()},unclipArea:function(t){t.restore()},lineTo:function(t,e,i,n){var a=i.steppedLine;if(a){if("middle"===a){var r=(e.x+i.x)/2;t.lineTo(r,n?i.y:e.y),t.lineTo(r,n?e.y:i.y)}else"after"===a&&!n||"after"!==a&&n?t.lineTo(e.x,i.y):t.lineTo(i.x,e.y);t.lineTo(i.x,i.y)}else i.tension?t.bezierCurveTo(n?e.controlPointPreviousX:e.controlPointNextX,n?e.controlPointPreviousY:e.controlPointNextY,n?i.controlPointNextX:i.controlPointPreviousX,n?i.controlPointNextY:i.controlPointPreviousY,i.x,i.y):t.lineTo(i.x,i.y)}},at=nt;Z.clear=nt.clear,Z.drawRoundedRectangle=function(t){t.beginPath(),nt.roundedRect.apply(nt,arguments)};var rt={_set:function(t,e){return Z.merge(this[t]||(this[t]={}),e)}};rt._set("global",{defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",defaultLineHeight:1.2,showLines:!0});var ot=rt,st=Z.valueOrDefault;var lt={toLineHeight:function(t,e){var i=(""+t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);if(!i||"normal"===i[1])return 1.2*e;switch(t=+i[2],i[3]){case"px":return t;case"%":t/=100}return e*t},toPadding:function(t){var e,i,n,a;return Z.isObject(t)?(e=+t.top||0,i=+t.right||0,n=+t.bottom||0,a=+t.left||0):e=i=n=a=+t||0,{top:e,right:i,bottom:n,left:a,height:e+n,width:a+i}},_parseFont:function(t){var e=ot.global,i=st(t.fontSize,e.defaultFontSize),n={family:st(t.fontFamily,e.defaultFontFamily),lineHeight:Z.options.toLineHeight(st(t.lineHeight,e.defaultLineHeight),i),size:i,style:st(t.fontStyle,e.defaultFontStyle),weight:null,string:""};return n.string=function(t){return!t||Z.isNullOrUndef(t.size)||Z.isNullOrUndef(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}(n),n},resolve:function(t,e,i){var n,a,r;for(n=0,a=t.length;n<a;++n)if(void 0!==(r=t[n])&&(void 0!==e&&"function"==typeof r&&(r=r(e)),void 0!==i&&Z.isArray(r)&&(r=r[i]),void 0!==r))return r}},ut=Z,dt=X,ht=at,ct=lt;ut.easing=dt,ut.canvas=ht,ut.options=ct;var ft=function(t){ut.extend(this,t),this.initialize.apply(this,arguments)};ut.extend(ft.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=ut.clone(t._model)),t._start={},t},transition:function(t){var e=this,i=e._model,n=e._start,a=e._view;return i&&1!==t?(a||(a=e._view={}),n||(n=e._start={}),function(t,e,i,n){var a,r,o,s,l,u,d,h,c,f=Object.keys(i);for(a=0,r=f.length;a<r;++a)if(u=i[o=f[a]],e.hasOwnProperty(o)||(e[o]=u),(s=e[o])!==u&&"_"!==o[0]){if(t.hasOwnProperty(o)||(t[o]=s),(d=typeof u)==typeof(l=t[o]))if("string"===d){if((h=G(l)).valid&&(c=G(u)).valid){e[o]=c.mix(h,n).rgbString();continue}}else if(ut.isFinite(l)&&ut.isFinite(u)){e[o]=l+(u-l)*n;continue}e[o]=u}}(n,a,i,t),e):(e._view=i,e._start=null,e)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return ut.isNumber(this._model.x)&&ut.isNumber(this._model.y)}}),ft.extend=ut.inherits;var gt=ft,mt=gt.extend({chart:null,currentStep:0,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),pt=mt;Object.defineProperty(mt.prototype,"animationObject",{get:function(){return this}}),Object.defineProperty(mt.prototype,"chartInstance",{get:function(){return this.chart},set:function(t){this.chart=t}}),ot._set("global",{animation:{duration:1e3,easing:"easeOutQuart",onProgress:ut.noop,onComplete:ut.noop}});var vt={animations:[],request:null,addAnimation:function(t,e,i,n){var a,r,o=this.animations;for(e.chart=t,e.startTime=Date.now(),e.duration=i,n||(t.animating=!0),a=0,r=o.length;a<r;++a)if(o[a].chart===t)return void(o[a]=e);o.push(e),1===o.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var e=ut.findIndex(this.animations,function(e){return e.chart===t});-1!==e&&(this.animations.splice(e,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=ut.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){this.advance(),this.animations.length>0&&this.requestAnimationFrame()},advance:function(){for(var t,e,i,n,a=this.animations,r=0;r<a.length;)e=(t=a[r]).chart,i=t.numSteps,n=Math.floor((Date.now()-t.startTime)/t.duration*i)+1,t.currentStep=Math.min(n,i),ut.callback(t.render,[e,t],e),ut.callback(t.onAnimationProgress,[t],e),t.currentStep>=i?(ut.callback(t.onAnimationComplete,[t],e),e.animating=!1,a.splice(r,1)):++r}},yt=ut.options.resolve,bt=["push","pop","shift","splice","unshift"];function xt(t,e){var i=t._chartjs;if(i){var n=i.listeners,a=n.indexOf(e);-1!==a&&n.splice(a,1),n.length>0||(bt.forEach(function(e){delete t[e]}),delete t._chartjs)}}var _t=function(t,e){this.initialize(t,e)};ut.extend(_t.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this,e=t.getMeta(),i=t.getDataset();null!==e.xAxisID&&e.xAxisID in t.chart.scales||(e.xAxisID=i.xAxisID||t.chart.options.scales.xAxes[0].id),null!==e.yAxisID&&e.yAxisID in t.chart.scales||(e.yAxisID=i.yAxisID||t.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},_getValueScaleId:function(){return this.getMeta().yAxisID},_getIndexScaleId:function(){return this.getMeta().xAxisID},_getValueScale:function(){return this.getScaleForId(this._getValueScaleId())},_getIndexScale:function(){return this.getScaleForId(this._getIndexScaleId())},reset:function(){this.update(!0)},destroy:function(){this._data&&xt(this._data,this)},createMetaDataset:function(){var t=this.datasetElementType;return t&&new t({_chart:this.chart,_datasetIndex:this.index})},createMetaData:function(t){var e=this.dataElementType;return e&&new e({_chart:this.chart,_datasetIndex:this.index,_index:t})},addElements:function(){var t,e,i=this.getMeta(),n=this.getDataset().data||[],a=i.data;for(t=0,e=n.length;t<e;++t)a[t]=a[t]||this.createMetaData(t);i.dataset=i.dataset||this.createMetaDataset()},addElementAndReset:function(t){var e=this.createMetaData(t);this.getMeta().data.splice(t,0,e),this.updateElement(e,t,!0)},buildOrUpdateElements:function(){var t,e,i=this,n=i.getDataset(),a=n.data||(n.data=[]);i._data!==a&&(i._data&&xt(i._data,i),a&&Object.isExtensible(a)&&(e=i,(t=a)._chartjs?t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),bt.forEach(function(e){var i="onData"+e.charAt(0).toUpperCase()+e.slice(1),n=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:function(){var e=Array.prototype.slice.call(arguments),a=n.apply(this,e);return ut.each(t._chartjs.listeners,function(t){"function"==typeof t[i]&&t[i].apply(t,e)}),a}})}))),i._data=a),i.resyncElements()},update:ut.noop,transition:function(t){for(var e=this.getMeta(),i=e.data||[],n=i.length,a=0;a<n;++a)i[a].transition(t);e.dataset&&e.dataset.transition(t)},draw:function(){var t=this.getMeta(),e=t.data||[],i=e.length,n=0;for(t.dataset&&t.dataset.draw();n<i;++n)e[n].draw()},removeHoverStyle:function(t){ut.merge(t._model,t.$previousStyle||{}),delete t.$previousStyle},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},a=t._model,r=ut.getHoverColor;t.$previousStyle={backgroundColor:a.backgroundColor,borderColor:a.borderColor,borderWidth:a.borderWidth},a.backgroundColor=yt([n.hoverBackgroundColor,e.hoverBackgroundColor,r(a.backgroundColor)],void 0,i),a.borderColor=yt([n.hoverBorderColor,e.hoverBorderColor,r(a.borderColor)],void 0,i),a.borderWidth=yt([n.hoverBorderWidth,e.hoverBorderWidth,a.borderWidth],void 0,i)},resyncElements:function(){var t=this.getMeta(),e=this.getDataset().data,i=t.data.length,n=e.length;n<i?t.data.splice(n,i-n):n>i&&this.insertElements(i,n-i)},insertElements:function(t,e){for(var i=0;i<e;++i)this.addElementAndReset(t+i)},onDataPush:function(){var t=arguments.length;this.insertElements(this.getDataset().data.length-t,t)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(t,e){this.getMeta().data.splice(t,e),this.insertElements(t,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),_t.extend=ut.inherits;var kt=_t;ot._set("global",{elements:{arc:{backgroundColor:ot.global.defaultColor,borderColor:"#fff",borderWidth:2,borderAlign:"center"}}});var wt=gt.extend({inLabelRange:function(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2)},inRange:function(t,e){var i=this._view;if(i){for(var n=ut.getAngleFromPoint(i,{x:t,y:e}),a=n.angle,r=n.distance,o=i.startAngle,s=i.endAngle;s<o;)s+=2*Math.PI;for(;a>s;)a-=2*Math.PI;for(;a<o;)a+=2*Math.PI;var l=a>=o&&a<=s,u=r>=i.innerRadius&&r<=i.outerRadius;return l&&u}return!1},getCenterPoint:function(){var t=this._view,e=(t.startAngle+t.endAngle)/2,i=(t.innerRadius+t.outerRadius)/2;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},getArea:function(){var t=this._view;return Math.PI*((t.endAngle-t.startAngle)/(2*Math.PI))*(Math.pow(t.outerRadius,2)-Math.pow(t.innerRadius,2))},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,i=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},draw:function(){var t,e=this._chart.ctx,i=this._view,n=i.startAngle,a=i.endAngle,r="inner"===i.borderAlign?.33:0;e.save(),e.beginPath(),e.arc(i.x,i.y,Math.max(i.outerRadius-r,0),n,a),e.arc(i.x,i.y,i.innerRadius,a,n,!0),e.closePath(),e.fillStyle=i.backgroundColor,e.fill(),i.borderWidth&&("inner"===i.borderAlign?(e.beginPath(),t=r/i.outerRadius,e.arc(i.x,i.y,i.outerRadius,n-t,a+t),i.innerRadius>r?(t=r/i.innerRadius,e.arc(i.x,i.y,i.innerRadius-r,a+t,n-t,!0)):e.arc(i.x,i.y,r,a+Math.PI/2,n-Math.PI/2),e.closePath(),e.clip(),e.beginPath(),e.arc(i.x,i.y,i.outerRadius,n,a),e.arc(i.x,i.y,i.innerRadius,a,n,!0),e.closePath(),e.lineWidth=2*i.borderWidth,e.lineJoin="round"):(e.lineWidth=i.borderWidth,e.lineJoin="bevel"),e.strokeStyle=i.borderColor,e.stroke()),e.restore()}}),Mt=ut.valueOrDefault,St=ot.global.defaultColor;ot._set("global",{elements:{line:{tension:.4,backgroundColor:St,borderWidth:3,borderColor:St,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0}}});var Dt=gt.extend({draw:function(){var t,e,i,n,a=this._view,r=this._chart.ctx,o=a.spanGaps,s=this._children.slice(),l=ot.global,u=l.elements.line,d=-1;for(this._loop&&s.length&&s.push(s[0]),r.save(),r.lineCap=a.borderCapStyle||u.borderCapStyle,r.setLineDash&&r.setLineDash(a.borderDash||u.borderDash),r.lineDashOffset=Mt(a.borderDashOffset,u.borderDashOffset),r.lineJoin=a.borderJoinStyle||u.borderJoinStyle,r.lineWidth=Mt(a.borderWidth,u.borderWidth),r.strokeStyle=a.borderColor||l.defaultColor,r.beginPath(),d=-1,t=0;t<s.length;++t)e=s[t],i=ut.previousItem(s,t),n=e._view,0===t?n.skip||(r.moveTo(n.x,n.y),d=t):(i=-1===d?i:s[d],n.skip||(d!==t-1&&!o||-1===d?r.moveTo(n.x,n.y):ut.canvas.lineTo(r,i._view,e._view),d=t));r.stroke(),r.restore()}}),Ct=ut.valueOrDefault,Pt=ot.global.defaultColor;function Tt(t){var e=this._view;return!!e&&Math.abs(t-e.x)<e.radius+e.hitRadius}ot._set("global",{elements:{point:{radius:3,pointStyle:"circle",backgroundColor:Pt,borderColor:Pt,borderWidth:1,hitRadius:1,hoverRadius:4,hoverBorderWidth:1}}});var Ot=gt.extend({inRange:function(t,e){var i=this._view;return!!i&&Math.pow(t-i.x,2)+Math.pow(e-i.y,2)<Math.pow(i.hitRadius+i.radius,2)},inLabelRange:Tt,inXRange:Tt,inYRange:function(t){var e=this._view;return!!e&&Math.abs(t-e.y)<e.radius+e.hitRadius},getCenterPoint:function(){var t=this._view;return{x:t.x,y:t.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(t){var e=this._view,i=this._chart.ctx,n=e.pointStyle,a=e.rotation,r=e.radius,o=e.x,s=e.y,l=ot.global,u=l.defaultColor;e.skip||(void 0===t||ut.canvas._isPointInArea(e,t))&&(i.strokeStyle=e.borderColor||u,i.lineWidth=Ct(e.borderWidth,l.elements.point.borderWidth),i.fillStyle=e.backgroundColor||u,ut.canvas.drawPoint(i,n,r,o,s,a))}}),It=ot.global.defaultColor;function At(t){return t&&void 0!==t.width}function Ft(t){var e,i,n,a,r;return At(t)?(r=t.width/2,e=t.x-r,i=t.x+r,n=Math.min(t.y,t.base),a=Math.max(t.y,t.base)):(r=t.height/2,e=Math.min(t.x,t.base),i=Math.max(t.x,t.base),n=t.y-r,a=t.y+r),{left:e,top:n,right:i,bottom:a}}function Rt(t,e,i){return t===e?i:t===i?e:t}function Lt(t,e,i){var n,a,r,o,s=t.borderWidth,l=function(t){var e=t.borderSkipped,i={};return e?(t.horizontal?t.base>t.x&&(e=Rt(e,"left","right")):t.base<t.y&&(e=Rt(e,"bottom","top")),i[e]=!0,i):i}(t);return ut.isObject(s)?(n=+s.top||0,a=+s.right||0,r=+s.bottom||0,o=+s.left||0):n=a=r=o=+s||0,{t:l.top||n<0?0:n>i?i:n,r:l.right||a<0?0:a>e?e:a,b:l.bottom||r<0?0:r>i?i:r,l:l.left||o<0?0:o>e?e:o}}function Wt(t,e,i){var n=null===e,a=null===i,r=!(!t||n&&a)&&Ft(t);return r&&(n||e>=r.left&&e<=r.right)&&(a||i>=r.top&&i<=r.bottom)}ot._set("global",{elements:{rectangle:{backgroundColor:It,borderColor:It,borderSkipped:"bottom",borderWidth:0}}});var Yt=gt.extend({draw:function(){var t=this._chart.ctx,e=this._view,i=function(t){var e=Ft(t),i=e.right-e.left,n=e.bottom-e.top,a=Lt(t,i/2,n/2);return{outer:{x:e.left,y:e.top,w:i,h:n},inner:{x:e.left+a.l,y:e.top+a.t,w:i-a.l-a.r,h:n-a.t-a.b}}}(e),n=i.outer,a=i.inner;t.fillStyle=e.backgroundColor,t.fillRect(n.x,n.y,n.w,n.h),n.w===a.w&&n.h===a.h||(t.save(),t.beginPath(),t.rect(n.x,n.y,n.w,n.h),t.clip(),t.fillStyle=e.borderColor,t.rect(a.x,a.y,a.w,a.h),t.fill("evenodd"),t.restore())},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){return Wt(this._view,t,e)},inLabelRange:function(t,e){var i=this._view;return At(i)?Wt(i,t,null):Wt(i,null,e)},inXRange:function(t){return Wt(this._view,t,null)},inYRange:function(t){return Wt(this._view,null,t)},getCenterPoint:function(){var t,e,i=this._view;return At(i)?(t=i.x,e=(i.y+i.base)/2):(t=(i.x+i.base)/2,e=i.y),{x:t,y:e}},getArea:function(){var t=this._view;return At(t)?t.width*Math.abs(t.y-t.base):t.height*Math.abs(t.x-t.base)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}}),Nt={},zt=wt,Vt=Dt,Ht=Ot,Et=Yt;Nt.Arc=zt,Nt.Line=Vt,Nt.Point=Ht,Nt.Rectangle=Et;var Bt=ut.options.resolve;ot._set("bar",{hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,offset:!0,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}});var jt=kt.extend({dataElementType:Nt.Rectangle,initialize:function(){var t;kt.prototype.initialize.apply(this,arguments),(t=this.getMeta()).stack=this.getDataset().stack,t.bar=!0},update:function(t){var e,i,n=this.getMeta().data;for(this._ruler=this.getRuler(),e=0,i=n.length;e<i;++e)this.updateElement(n[e],e,t)},updateElement:function(t,e,i){var n=this,a=n.getMeta(),r=n.getDataset(),o=n._resolveElementOptions(t,e);t._xScale=n.getScaleForId(a.xAxisID),t._yScale=n.getScaleForId(a.yAxisID),t._datasetIndex=n.index,t._index=e,t._model={backgroundColor:o.backgroundColor,borderColor:o.borderColor,borderSkipped:o.borderSkipped,borderWidth:o.borderWidth,datasetLabel:r.label,label:n.chart.data.labels[e]},n._updateElementGeometry(t,e,i),t.pivot()},_updateElementGeometry:function(t,e,i){var n=this,a=t._model,r=n._getValueScale(),o=r.getBasePixel(),s=r.isHorizontal(),l=n._ruler||n.getRuler(),u=n.calculateBarValuePixels(n.index,e),d=n.calculateBarIndexPixels(n.index,e,l);a.horizontal=s,a.base=i?o:u.base,a.x=s?i?o:u.head:d.center,a.y=s?d.center:i?o:u.head,a.height=s?d.size:void 0,a.width=s?void 0:d.size},_getStacks:function(t){var e,i,n=this.chart,a=this._getIndexScale().options.stacked,r=void 0===t?n.data.datasets.length:t+1,o=[];for(e=0;e<r;++e)(i=n.getDatasetMeta(e)).bar&&n.isDatasetVisible(e)&&(!1===a||!0===a&&-1===o.indexOf(i.stack)||void 0===a&&(void 0===i.stack||-1===o.indexOf(i.stack)))&&o.push(i.stack);return o},getStackCount:function(){return this._getStacks().length},getStackIndex:function(t,e){var i=this._getStacks(t),n=void 0!==e?i.indexOf(e):-1;return-1===n?i.length-1:n},getRuler:function(){var t,e,i=this._getIndexScale(),n=this.getStackCount(),a=this.index,r=i.isHorizontal(),o=r?i.left:i.top,s=o+(r?i.width:i.height),l=[];for(t=0,e=this.getMeta().data.length;t<e;++t)l.push(i.getPixelForValue(null,t,a));return{min:ut.isNullOrUndef(i.options.barThickness)?function(t,e){var i,n,a,r,o=t.isHorizontal()?t.width:t.height,s=t.getTicks();for(a=1,r=e.length;a<r;++a)o=Math.min(o,Math.abs(e[a]-e[a-1]));for(a=0,r=s.length;a<r;++a)n=t.getPixelForTick(a),o=a>0?Math.min(o,n-i):o,i=n;return o}(i,l):-1,pixels:l,start:o,end:s,stackCount:n,scale:i}},calculateBarValuePixels:function(t,e){var i,n,a,r,o,s,l=this.chart,u=this.getMeta(),d=this._getValueScale(),h=d.isHorizontal(),c=l.data.datasets,f=+d.getRightValue(c[t].data[e]),g=d.options.minBarLength,m=d.options.stacked,p=u.stack,v=0;if(m||void 0===m&&void 0!==p)for(i=0;i<t;++i)(n=l.getDatasetMeta(i)).bar&&n.stack===p&&n.controller._getValueScaleId()===d.id&&l.isDatasetVisible(i)&&(a=+d.getRightValue(c[i].data[e]),(f<0&&a<0||f>=0&&a>0)&&(v+=a));return r=d.getPixelForValue(v),s=(o=d.getPixelForValue(v+f))-r,void 0!==g&&Math.abs(s)<g&&(s=g,o=f>=0&&!h||f<0&&h?r-g:r+g),{size:s,base:r,head:o,center:o+s/2}},calculateBarIndexPixels:function(t,e,i){var n=i.scale.options,a="flex"===n.barThickness?function(t,e,i){var n,a=e.pixels,r=a[t],o=t>0?a[t-1]:null,s=t<a.length-1?a[t+1]:null,l=i.categoryPercentage;return null===o&&(o=r-(null===s?e.end-e.start:s-r)),null===s&&(s=r+r-o),n=r-(r-Math.min(o,s))/2*l,{chunk:Math.abs(s-o)/2*l/e.stackCount,ratio:i.barPercentage,start:n}}(e,i,n):function(t,e,i){var n,a,r=i.barThickness,o=e.stackCount,s=e.pixels[t];return ut.isNullOrUndef(r)?(n=e.min*i.categoryPercentage,a=i.barPercentage):(n=r*o,a=1),{chunk:n/o,ratio:a,start:s-n/2}}(e,i,n),r=this.getStackIndex(t,this.getMeta().stack),o=a.start+a.chunk*r+a.chunk/2,s=Math.min(ut.valueOrDefault(n.maxBarThickness,1/0),a.chunk*a.ratio);return{base:o-s/2,head:o+s/2,center:o,size:s}},draw:function(){var t=this.chart,e=this._getValueScale(),i=this.getMeta().data,n=this.getDataset(),a=i.length,r=0;for(ut.canvas.clipArea(t.ctx,t.chartArea);r<a;++r)isNaN(e.getRightValue(n.data[r]))||i[r].draw();ut.canvas.unclipArea(t.ctx)},_resolveElementOptions:function(t,e){var i,n,a,r=this.chart,o=r.data.datasets[this.index],s=t.custom||{},l=r.options.elements.rectangle,u={},d={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},h=["backgroundColor","borderColor","borderSkipped","borderWidth"];for(i=0,n=h.length;i<n;++i)u[a=h[i]]=Bt([s[a],o[a],l[a]],d,e);return u}}),Ut=ut.valueOrDefault,Gt=ut.options.resolve;ot._set("bubble",{hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(t,e){var i=e.datasets[t.datasetIndex].label||"",n=e.datasets[t.datasetIndex].data[t.index];return i+": ("+t.xLabel+", "+t.yLabel+", "+n.r+")"}}}});var qt=kt.extend({dataElementType:Nt.Point,update:function(t){var e=this,i=e.getMeta().data;ut.each(i,function(i,n){e.updateElement(i,n,t)})},updateElement:function(t,e,i){var n=this,a=n.getMeta(),r=t.custom||{},o=n.getScaleForId(a.xAxisID),s=n.getScaleForId(a.yAxisID),l=n._resolveElementOptions(t,e),u=n.getDataset().data[e],d=n.index,h=i?o.getPixelForDecimal(.5):o.getPixelForValue("object"==typeof u?u:NaN,e,d),c=i?s.getBasePixel():s.getPixelForValue(u,e,d);t._xScale=o,t._yScale=s,t._options=l,t._datasetIndex=d,t._index=e,t._model={backgroundColor:l.backgroundColor,borderColor:l.borderColor,borderWidth:l.borderWidth,hitRadius:l.hitRadius,pointStyle:l.pointStyle,rotation:l.rotation,radius:i?0:l.radius,skip:r.skip||isNaN(h)||isNaN(c),x:h,y:c},t.pivot()},setHoverStyle:function(t){var e=t._model,i=t._options,n=ut.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=Ut(i.hoverBackgroundColor,n(i.backgroundColor)),e.borderColor=Ut(i.hoverBorderColor,n(i.borderColor)),e.borderWidth=Ut(i.hoverBorderWidth,i.borderWidth),e.radius=i.radius+i.hoverRadius},_resolveElementOptions:function(t,e){var i,n,a,r=this.chart,o=r.data.datasets[this.index],s=t.custom||{},l=r.options.elements.point,u=o.data[e],d={},h={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},c=["backgroundColor","borderColor","borderWidth","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth","hoverRadius","hitRadius","pointStyle","rotation"];for(i=0,n=c.length;i<n;++i)d[a=c[i]]=Gt([s[a],o[a],l[a]],h,e);return d.radius=Gt([s.radius,u?u.r:void 0,o.radius,l.radius],h,e),d}}),Zt=ut.options.resolve,$t=ut.valueOrDefault;ot._set("doughnut",{animation:{animateRotate:!0,animateScale:!1},hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,n=i.datasets,a=i.labels;if(n.length)for(var r=0;r<n[0].data.length;++r)e.push('<li><span style="background-color:'+n[0].backgroundColor[r]+'"></span>'),a[r]&&e.push(a[r]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map(function(i,n){var a=t.getDatasetMeta(0),r=e.datasets[0],o=a.data[n],s=o&&o.custom||{},l=t.options.elements.arc;return{text:i,fillStyle:Zt([s.backgroundColor,r.backgroundColor,l.backgroundColor],void 0,n),strokeStyle:Zt([s.borderColor,r.borderColor,l.borderColor],void 0,n),lineWidth:Zt([s.borderWidth,r.borderWidth,l.borderWidth],void 0,n),hidden:isNaN(r.data[n])||a.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var i,n,a,r=e.index,o=this.chart;for(i=0,n=(o.data.datasets||[]).length;i<n;++i)(a=o.getDatasetMeta(i)).data[r]&&(a.data[r].hidden=!a.data[r].hidden);o.update()}},cutoutPercentage:50,rotation:-.5*Math.PI,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,e){var i=e.labels[t.index],n=": "+e.datasets[t.datasetIndex].data[t.index];return ut.isArray(i)?(i=i.slice())[0]+=n:i+=n,i}}}});var Xt=kt.extend({dataElementType:Nt.Arc,linkScales:ut.noop,getRingIndex:function(t){for(var e=0,i=0;i<t;++i)this.chart.isDatasetVisible(i)&&++e;return e},update:function(t){var e,i,n=this,a=n.chart,r=a.chartArea,o=a.options,s=r.right-r.left,l=r.bottom-r.top,u=Math.min(s,l),d={x:0,y:0},h=n.getMeta(),c=h.data,f=o.cutoutPercentage,g=o.circumference,m=n._getRingWeight(n.index);if(g<2*Math.PI){var p=o.rotation%(2*Math.PI),v=(p+=2*Math.PI*(p>=Math.PI?-1:p<-Math.PI?1:0))+g,y={x:Math.cos(p),y:Math.sin(p)},b={x:Math.cos(v),y:Math.sin(v)},x=p<=0&&v>=0||p<=2*Math.PI&&2*Math.PI<=v,_=p<=.5*Math.PI&&.5*Math.PI<=v||p<=2.5*Math.PI&&2.5*Math.PI<=v,k=p<=-Math.PI&&-Math.PI<=v||p<=Math.PI&&Math.PI<=v,w=p<=.5*-Math.PI&&.5*-Math.PI<=v||p<=1.5*Math.PI&&1.5*Math.PI<=v,M=f/100,S={x:k?-1:Math.min(y.x*(y.x<0?1:M),b.x*(b.x<0?1:M)),y:w?-1:Math.min(y.y*(y.y<0?1:M),b.y*(b.y<0?1:M))},D={x:x?1:Math.max(y.x*(y.x>0?1:M),b.x*(b.x>0?1:M)),y:_?1:Math.max(y.y*(y.y>0?1:M),b.y*(b.y>0?1:M))},C={width:.5*(D.x-S.x),height:.5*(D.y-S.y)};u=Math.min(s/C.width,l/C.height),d={x:-.5*(D.x+S.x),y:-.5*(D.y+S.y)}}for(e=0,i=c.length;e<i;++e)c[e]._options=n._resolveElementOptions(c[e],e);for(a.borderWidth=n.getMaxBorderWidth(),a.outerRadius=Math.max((u-a.borderWidth)/2,0),a.innerRadius=Math.max(f?a.outerRadius/100*f:0,0),a.radiusLength=(a.outerRadius-a.innerRadius)/(n._getVisibleDatasetWeightTotal()||1),a.offsetX=d.x*a.outerRadius,a.offsetY=d.y*a.outerRadius,h.total=n.calculateTotal(),n.outerRadius=a.outerRadius-a.radiusLength*n._getRingWeightOffset(n.index),n.innerRadius=Math.max(n.outerRadius-a.radiusLength*m,0),e=0,i=c.length;e<i;++e)n.updateElement(c[e],e,t)},updateElement:function(t,e,i){var n=this,a=n.chart,r=a.chartArea,o=a.options,s=o.animation,l=(r.left+r.right)/2,u=(r.top+r.bottom)/2,d=o.rotation,h=o.rotation,c=n.getDataset(),f=i&&s.animateRotate?0:t.hidden?0:n.calculateCircumference(c.data[e])*(o.circumference/(2*Math.PI)),g=i&&s.animateScale?0:n.innerRadius,m=i&&s.animateScale?0:n.outerRadius,p=t._options||{};ut.extend(t,{_datasetIndex:n.index,_index:e,_model:{backgroundColor:p.backgroundColor,borderColor:p.borderColor,borderWidth:p.borderWidth,borderAlign:p.borderAlign,x:l+a.offsetX,y:u+a.offsetY,startAngle:d,endAngle:h,circumference:f,outerRadius:m,innerRadius:g,label:ut.valueAtIndexOrDefault(c.label,e,a.data.labels[e])}});var v=t._model;i&&s.animateRotate||(v.startAngle=0===e?o.rotation:n.getMeta().data[e-1]._model.endAngle,v.endAngle=v.startAngle+v.circumference),t.pivot()},calculateTotal:function(){var t,e=this.getDataset(),i=this.getMeta(),n=0;return ut.each(i.data,function(i,a){t=e.data[a],isNaN(t)||i.hidden||(n+=Math.abs(t))}),n},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(Math.abs(t)/e):0},getMaxBorderWidth:function(t){var e,i,n,a,r,o,s,l,u=0,d=this.chart;if(!t)for(e=0,i=d.data.datasets.length;e<i;++e)if(d.isDatasetVisible(e)){t=(n=d.getDatasetMeta(e)).data,e!==this.index&&(r=n.controller);break}if(!t)return 0;for(e=0,i=t.length;e<i;++e)a=t[e],"inner"!==(o=r?r._resolveElementOptions(a,e):a._options).borderAlign&&(s=o.borderWidth,u=(l=o.hoverBorderWidth)>(u=s>u?s:u)?l:u);return u},setHoverStyle:function(t){var e=t._model,i=t._options,n=ut.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth},e.backgroundColor=$t(i.hoverBackgroundColor,n(i.backgroundColor)),e.borderColor=$t(i.hoverBorderColor,n(i.borderColor)),e.borderWidth=$t(i.hoverBorderWidth,i.borderWidth)},_resolveElementOptions:function(t,e){var i,n,a,r=this.chart,o=this.getDataset(),s=t.custom||{},l=r.options.elements.arc,u={},d={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},h=["backgroundColor","borderColor","borderWidth","borderAlign","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth"];for(i=0,n=h.length;i<n;++i)u[a=h[i]]=Zt([s[a],o[a],l[a]],d,e);return u},_getRingWeightOffset:function(t){for(var e=0,i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e},_getRingWeight:function(t){return Math.max($t(this.chart.data.datasets[t].weight,1),0)},_getVisibleDatasetWeightTotal:function(){return this._getRingWeightOffset(this.chart.data.datasets.length)}});ot._set("horizontalBar",{hover:{mode:"index",axis:"y"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{type:"category",position:"left",categoryPercentage:.8,barPercentage:.9,offset:!0,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{mode:"index",axis:"y"}});var Kt=jt.extend({_getValueScaleId:function(){return this.getMeta().xAxisID},_getIndexScaleId:function(){return this.getMeta().yAxisID}}),Jt=ut.valueOrDefault,Qt=ut.options.resolve,te=ut.canvas._isPointInArea;function ee(t,e){return Jt(t.showLine,e.showLines)}ot._set("line",{showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}});var ie=kt.extend({datasetElementType:Nt.Line,dataElementType:Nt.Point,update:function(t){var e,i,n=this,a=n.getMeta(),r=a.dataset,o=a.data||[],s=n.getScaleForId(a.yAxisID),l=n.getDataset(),u=ee(l,n.chart.options);for(u&&(void 0!==l.tension&&void 0===l.lineTension&&(l.lineTension=l.tension),r._scale=s,r._datasetIndex=n.index,r._children=o,r._model=n._resolveLineOptions(r),r.pivot()),e=0,i=o.length;e<i;++e)n.updateElement(o[e],e,t);for(u&&0!==r._model.tension&&n.updateBezierControlPoints(),e=0,i=o.length;e<i;++e)o[e].pivot()},updateElement:function(t,e,i){var n,a,r=this,o=r.getMeta(),s=t.custom||{},l=r.getDataset(),u=r.index,d=l.data[e],h=r.getScaleForId(o.yAxisID),c=r.getScaleForId(o.xAxisID),f=o.dataset._model,g=r._resolvePointOptions(t,e);n=c.getPixelForValue("object"==typeof d?d:NaN,e,u),a=i?h.getBasePixel():r.calculatePointY(d,e,u),t._xScale=c,t._yScale=h,t._options=g,t._datasetIndex=u,t._index=e,t._model={x:n,y:a,skip:s.skip||isNaN(n)||isNaN(a),radius:g.radius,pointStyle:g.pointStyle,rotation:g.rotation,backgroundColor:g.backgroundColor,borderColor:g.borderColor,borderWidth:g.borderWidth,tension:Jt(s.tension,f?f.tension:0),steppedLine:!!f&&f.steppedLine,hitRadius:g.hitRadius}},_resolvePointOptions:function(t,e){var i,n,a,r=this.chart,o=r.data.datasets[this.index],s=t.custom||{},l=r.options.elements.point,u={},d={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},h={backgroundColor:"pointBackgroundColor",borderColor:"pointBorderColor",borderWidth:"pointBorderWidth",hitRadius:"pointHitRadius",hoverBackgroundColor:"pointHoverBackgroundColor",hoverBorderColor:"pointHoverBorderColor",hoverBorderWidth:"pointHoverBorderWidth",hoverRadius:"pointHoverRadius",pointStyle:"pointStyle",radius:"pointRadius",rotation:"pointRotation"},c=Object.keys(h);for(i=0,n=c.length;i<n;++i)u[a=c[i]]=Qt([s[a],o[h[a]],o[a],l[a]],d,e);return u},_resolveLineOptions:function(t){var e,i,n,a=this.chart,r=a.data.datasets[this.index],o=t.custom||{},s=a.options,l=s.elements.line,u={},d=["backgroundColor","borderWidth","borderColor","borderCapStyle","borderDash","borderDashOffset","borderJoinStyle","fill","cubicInterpolationMode"];for(e=0,i=d.length;e<i;++e)u[n=d[e]]=Qt([o[n],r[n],l[n]]);return u.spanGaps=Jt(r.spanGaps,s.spanGaps),u.tension=Jt(r.lineTension,l.tension),u.steppedLine=Qt([o.steppedLine,r.steppedLine,l.stepped]),u},calculatePointY:function(t,e,i){var n,a,r,o=this.chart,s=this.getMeta(),l=this.getScaleForId(s.yAxisID),u=0,d=0;if(l.options.stacked){for(n=0;n<i;n++)if(a=o.data.datasets[n],"line"===(r=o.getDatasetMeta(n)).type&&r.yAxisID===l.id&&o.isDatasetVisible(n)){var h=Number(l.getRightValue(a.data[e]));h<0?d+=h||0:u+=h||0}var c=Number(l.getRightValue(t));return c<0?l.getPixelForValue(d+c):l.getPixelForValue(u+c)}return l.getPixelForValue(t)},updateBezierControlPoints:function(){var t,e,i,n,a=this.chart,r=this.getMeta(),o=r.dataset._model,s=a.chartArea,l=r.data||[];function u(t,e,i){return Math.max(Math.min(t,i),e)}if(o.spanGaps&&(l=l.filter(function(t){return!t._model.skip})),"monotone"===o.cubicInterpolationMode)ut.splineCurveMonotone(l);else for(t=0,e=l.length;t<e;++t)i=l[t]._model,n=ut.splineCurve(ut.previousItem(l,t)._model,i,ut.nextItem(l,t)._model,o.tension),i.controlPointPreviousX=n.previous.x,i.controlPointPreviousY=n.previous.y,i.controlPointNextX=n.next.x,i.controlPointNextY=n.next.y;if(a.options.elements.line.capBezierPoints)for(t=0,e=l.length;t<e;++t)i=l[t]._model,te(i,s)&&(t>0&&te(l[t-1]._model,s)&&(i.controlPointPreviousX=u(i.controlPointPreviousX,s.left,s.right),i.controlPointPreviousY=u(i.controlPointPreviousY,s.top,s.bottom)),t<l.length-1&&te(l[t+1]._model,s)&&(i.controlPointNextX=u(i.controlPointNextX,s.left,s.right),i.controlPointNextY=u(i.controlPointNextY,s.top,s.bottom)))},draw:function(){var t,e=this.chart,i=this.getMeta(),n=i.data||[],a=e.chartArea,r=n.length,o=0;for(ee(this.getDataset(),e.options)&&(t=(i.dataset._model.borderWidth||0)/2,ut.canvas.clipArea(e.ctx,{left:a.left,right:a.right,top:a.top-t,bottom:a.bottom+t}),i.dataset.draw(),ut.canvas.unclipArea(e.ctx));o<r;++o)n[o].draw(a)},setHoverStyle:function(t){var e=t._model,i=t._options,n=ut.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=Jt(i.hoverBackgroundColor,n(i.backgroundColor)),e.borderColor=Jt(i.hoverBorderColor,n(i.borderColor)),e.borderWidth=Jt(i.hoverBorderWidth,i.borderWidth),e.radius=Jt(i.hoverRadius,i.radius)}}),ne=ut.options.resolve;ot._set("polarArea",{scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,n=i.datasets,a=i.labels;if(n.length)for(var r=0;r<n[0].data.length;++r)e.push('<li><span style="background-color:'+n[0].backgroundColor[r]+'"></span>'),a[r]&&e.push(a[r]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map(function(i,n){var a=t.getDatasetMeta(0),r=e.datasets[0],o=a.data[n].custom||{},s=t.options.elements.arc;return{text:i,fillStyle:ne([o.backgroundColor,r.backgroundColor,s.backgroundColor],void 0,n),strokeStyle:ne([o.borderColor,r.borderColor,s.borderColor],void 0,n),lineWidth:ne([o.borderWidth,r.borderWidth,s.borderWidth],void 0,n),hidden:isNaN(r.data[n])||a.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var i,n,a,r=e.index,o=this.chart;for(i=0,n=(o.data.datasets||[]).length;i<n;++i)(a=o.getDatasetMeta(i)).data[r].hidden=!a.data[r].hidden;o.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}});var ae=kt.extend({dataElementType:Nt.Arc,linkScales:ut.noop,update:function(t){var e,i,n,a=this,r=a.getDataset(),o=a.getMeta(),s=a.chart.options.startAngle||0,l=a._starts=[],u=a._angles=[],d=o.data;for(a._updateRadius(),o.count=a.countVisibleElements(),e=0,i=r.data.length;e<i;e++)l[e]=s,n=a._computeAngle(e),u[e]=n,s+=n;for(e=0,i=d.length;e<i;++e)d[e]._options=a._resolveElementOptions(d[e],e),a.updateElement(d[e],e,t)},_updateRadius:function(){var t=this,e=t.chart,i=e.chartArea,n=e.options,a=Math.min(i.right-i.left,i.bottom-i.top);e.outerRadius=Math.max(a/2,0),e.innerRadius=Math.max(n.cutoutPercentage?e.outerRadius/100*n.cutoutPercentage:1,0),e.radiusLength=(e.outerRadius-e.innerRadius)/e.getVisibleDatasetCount(),t.outerRadius=e.outerRadius-e.radiusLength*t.index,t.innerRadius=t.outerRadius-e.radiusLength},updateElement:function(t,e,i){var n=this,a=n.chart,r=n.getDataset(),o=a.options,s=o.animation,l=a.scale,u=a.data.labels,d=l.xCenter,h=l.yCenter,c=o.startAngle,f=t.hidden?0:l.getDistanceFromCenterForValue(r.data[e]),g=n._starts[e],m=g+(t.hidden?0:n._angles[e]),p=s.animateScale?0:l.getDistanceFromCenterForValue(r.data[e]),v=t._options||{};ut.extend(t,{_datasetIndex:n.index,_index:e,_scale:l,_model:{backgroundColor:v.backgroundColor,borderColor:v.borderColor,borderWidth:v.borderWidth,borderAlign:v.borderAlign,x:d,y:h,innerRadius:0,outerRadius:i?p:f,startAngle:i&&s.animateRotate?c:g,endAngle:i&&s.animateRotate?c:m,label:ut.valueAtIndexOrDefault(u,e,u[e])}}),t.pivot()},countVisibleElements:function(){var t=this.getDataset(),e=this.getMeta(),i=0;return ut.each(e.data,function(e,n){isNaN(t.data[n])||e.hidden||i++}),i},setHoverStyle:function(t){var e=t._model,i=t._options,n=ut.getHoverColor,a=ut.valueOrDefault;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth},e.backgroundColor=a(i.hoverBackgroundColor,n(i.backgroundColor)),e.borderColor=a(i.hoverBorderColor,n(i.borderColor)),e.borderWidth=a(i.hoverBorderWidth,i.borderWidth)},_resolveElementOptions:function(t,e){var i,n,a,r=this.chart,o=this.getDataset(),s=t.custom||{},l=r.options.elements.arc,u={},d={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},h=["backgroundColor","borderColor","borderWidth","borderAlign","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth"];for(i=0,n=h.length;i<n;++i)u[a=h[i]]=ne([s[a],o[a],l[a]],d,e);return u},_computeAngle:function(t){var e=this,i=this.getMeta().count,n=e.getDataset(),a=e.getMeta();if(isNaN(n.data[t])||a.data[t].hidden)return 0;var r={chart:e.chart,dataIndex:t,dataset:n,datasetIndex:e.index};return ne([e.chart.options.elements.arc.angle,2*Math.PI/i],r,t)}});ot._set("pie",ut.clone(ot.doughnut)),ot._set("pie",{cutoutPercentage:0});var re=Xt,oe=ut.valueOrDefault,se=ut.options.resolve;ot._set("radar",{scale:{type:"radialLinear"},elements:{line:{tension:0}}});var le=kt.extend({datasetElementType:Nt.Line,dataElementType:Nt.Point,linkScales:ut.noop,update:function(t){var e,i,n=this,a=n.getMeta(),r=a.dataset,o=a.data||[],s=n.chart.scale,l=n.getDataset();for(void 0!==l.tension&&void 0===l.lineTension&&(l.lineTension=l.tension),r._scale=s,r._datasetIndex=n.index,r._children=o,r._loop=!0,r._model=n._resolveLineOptions(r),r.pivot(),e=0,i=o.length;e<i;++e)n.updateElement(o[e],e,t);for(n.updateBezierControlPoints(),e=0,i=o.length;e<i;++e)o[e].pivot()},updateElement:function(t,e,i){var n=this,a=t.custom||{},r=n.getDataset(),o=n.chart.scale,s=o.getPointPositionForValue(e,r.data[e]),l=n._resolvePointOptions(t,e),u=n.getMeta().dataset._model,d=i?o.xCenter:s.x,h=i?o.yCenter:s.y;t._scale=o,t._options=l,t._datasetIndex=n.index,t._index=e,t._model={x:d,y:h,skip:a.skip||isNaN(d)||isNaN(h),radius:l.radius,pointStyle:l.pointStyle,rotation:l.rotation,backgroundColor:l.backgroundColor,borderColor:l.borderColor,borderWidth:l.borderWidth,tension:oe(a.tension,u?u.tension:0),hitRadius:l.hitRadius}},_resolvePointOptions:function(t,e){var i,n,a,r=this.chart,o=r.data.datasets[this.index],s=t.custom||{},l=r.options.elements.point,u={},d={chart:r,dataIndex:e,dataset:o,datasetIndex:this.index},h={backgroundColor:"pointBackgroundColor",borderColor:"pointBorderColor",borderWidth:"pointBorderWidth",hitRadius:"pointHitRadius",hoverBackgroundColor:"pointHoverBackgroundColor",hoverBorderColor:"pointHoverBorderColor",hoverBorderWidth:"pointHoverBorderWidth",hoverRadius:"pointHoverRadius",pointStyle:"pointStyle",radius:"pointRadius",rotation:"pointRotation"},c=Object.keys(h);for(i=0,n=c.length;i<n;++i)u[a=c[i]]=se([s[a],o[h[a]],o[a],l[a]],d,e);return u},_resolveLineOptions:function(t){var e,i,n,a=this.chart,r=a.data.datasets[this.index],o=t.custom||{},s=a.options.elements.line,l={},u=["backgroundColor","borderWidth","borderColor","borderCapStyle","borderDash","borderDashOffset","borderJoinStyle","fill"];for(e=0,i=u.length;e<i;++e)l[n=u[e]]=se([o[n],r[n],s[n]]);return l.tension=oe(r.lineTension,s.tension),l},updateBezierControlPoints:function(){var t,e,i,n,a=this.getMeta(),r=this.chart.chartArea,o=a.data||[];function s(t,e,i){return Math.max(Math.min(t,i),e)}for(t=0,e=o.length;t<e;++t)i=o[t]._model,n=ut.splineCurve(ut.previousItem(o,t,!0)._model,i,ut.nextItem(o,t,!0)._model,i.tension),i.controlPointPreviousX=s(n.previous.x,r.left,r.right),i.controlPointPreviousY=s(n.previous.y,r.top,r.bottom),i.controlPointNextX=s(n.next.x,r.left,r.right),i.controlPointNextY=s(n.next.y,r.top,r.bottom)},setHoverStyle:function(t){var e=t._model,i=t._options,n=ut.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=oe(i.hoverBackgroundColor,n(i.backgroundColor)),e.borderColor=oe(i.hoverBorderColor,n(i.borderColor)),e.borderWidth=oe(i.hoverBorderWidth,i.borderWidth),e.radius=oe(i.hoverRadius,i.radius)}});ot._set("scatter",{hover:{mode:"single"},scales:{xAxes:[{id:"x-axis-1",type:"linear",position:"bottom"}],yAxes:[{id:"y-axis-1",type:"linear",position:"left"}]},showLines:!1,tooltips:{callbacks:{title:function(){return""},label:function(t){return"("+t.xLabel+", "+t.yLabel+")"}}}});var ue={bar:jt,bubble:qt,doughnut:Xt,horizontalBar:Kt,line:ie,polarArea:ae,pie:re,radar:le,scatter:ie};function de(t,e){return t.native?{x:t.x,y:t.y}:ut.getRelativePosition(t,e)}function he(t,e){var i,n,a,r,o;for(n=0,r=t.data.datasets.length;n<r;++n)if(t.isDatasetVisible(n))for(a=0,o=(i=t.getDatasetMeta(n)).data.length;a<o;++a){var s=i.data[a];s._view.skip||e(s)}}function ce(t,e){var i=[];return he(t,function(t){t.inRange(e.x,e.y)&&i.push(t)}),i}function fe(t,e,i,n){var a=Number.POSITIVE_INFINITY,r=[];return he(t,function(t){if(!i||t.inRange(e.x,e.y)){var o=t.getCenterPoint(),s=n(e,o);s<a?(r=[t],a=s):s===a&&r.push(t)}}),r}function ge(t){var e=-1!==t.indexOf("x"),i=-1!==t.indexOf("y");return function(t,n){var a=e?Math.abs(t.x-n.x):0,r=i?Math.abs(t.y-n.y):0;return Math.sqrt(Math.pow(a,2)+Math.pow(r,2))}}function me(t,e,i){var n=de(e,t);i.axis=i.axis||"x";var a=ge(i.axis),r=i.intersect?ce(t,n):fe(t,n,!1,a),o=[];return r.length?(t.data.datasets.forEach(function(e,i){if(t.isDatasetVisible(i)){var n=t.getDatasetMeta(i).data[r[0]._index];n&&!n._view.skip&&o.push(n)}}),o):[]}var pe={modes:{single:function(t,e){var i=de(e,t),n=[];return he(t,function(t){if(t.inRange(i.x,i.y))return n.push(t),n}),n.slice(0,1)},label:me,index:me,dataset:function(t,e,i){var n=de(e,t);i.axis=i.axis||"xy";var a=ge(i.axis),r=i.intersect?ce(t,n):fe(t,n,!1,a);return r.length>0&&(r=t.getDatasetMeta(r[0]._datasetIndex).data),r},"x-axis":function(t,e){return me(t,e,{intersect:!1})},point:function(t,e){return ce(t,de(e,t))},nearest:function(t,e,i){var n=de(e,t);i.axis=i.axis||"xy";var a=ge(i.axis);return fe(t,n,i.intersect,a)},x:function(t,e,i){var n=de(e,t),a=[],r=!1;return he(t,function(t){t.inXRange(n.x)&&a.push(t),t.inRange(n.x,n.y)&&(r=!0)}),i.intersect&&!r&&(a=[]),a},y:function(t,e,i){var n=de(e,t),a=[],r=!1;return he(t,function(t){t.inYRange(n.y)&&a.push(t),t.inRange(n.x,n.y)&&(r=!0)}),i.intersect&&!r&&(a=[]),a}}};function ve(t,e){return ut.where(t,function(t){return t.position===e})}function ye(t,e){t.forEach(function(t,e){return t._tmpIndex_=e,t}),t.sort(function(t,i){var n=e?i:t,a=e?t:i;return n.weight===a.weight?n._tmpIndex_-a._tmpIndex_:n.weight-a.weight}),t.forEach(function(t){delete t._tmpIndex_})}function be(t,e){ut.each(t,function(t){e[t.position]+=t.isHorizontal()?t.height:t.width})}ot._set("global",{layout:{padding:{top:0,right:0,bottom:0,left:0}}});var xe={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),e.fullWidth=e.fullWidth||!1,e.position=e.position||"top",e.weight=e.weight||0,t.boxes.push(e)},removeBox:function(t,e){var i=t.boxes?t.boxes.indexOf(e):-1;-1!==i&&t.boxes.splice(i,1)},configure:function(t,e,i){for(var n,a=["fullWidth","position","weight"],r=a.length,o=0;o<r;++o)n=a[o],i.hasOwnProperty(n)&&(e[n]=i[n])},update:function(t,e,i){if(t){var n=t.options.layout||{},a=ut.options.toPadding(n.padding),r=a.left,o=a.right,s=a.top,l=a.bottom,u=ve(t.boxes,"left"),d=ve(t.boxes,"right"),h=ve(t.boxes,"top"),c=ve(t.boxes,"bottom"),f=ve(t.boxes,"chartArea");ye(u,!0),ye(d,!1),ye(h,!0),ye(c,!1);var g,m=u.concat(d),p=h.concat(c),v=m.concat(p),y=e-r-o,b=i-s-l,x=(e-y/2)/m.length,_=y,k=b,w={top:s,left:r,bottom:l,right:o},M=[];ut.each(v,function(t){var e,i=t.isHorizontal();i?(e=t.update(t.fullWidth?y:_,b/2),k-=e.height):(e=t.update(x,k),_-=e.width),M.push({horizontal:i,width:e.width,box:t})}),g=function(t){var e=0,i=0,n=0,a=0;return ut.each(t,function(t){if(t.getPadding){var r=t.getPadding();e=Math.max(e,r.top),i=Math.max(i,r.left),n=Math.max(n,r.bottom),a=Math.max(a,r.right)}}),{top:e,left:i,bottom:n,right:a}}(v),ut.each(m,I),be(m,w),ut.each(p,I),be(p,w),ut.each(m,function(t){var e=ut.findNextWhere(M,function(e){return e.box===t}),i={left:0,right:0,top:w.top,bottom:w.bottom};e&&t.update(e.width,k,i)}),be(v,w={top:s,left:r,bottom:l,right:o});var S=Math.max(g.left-w.left,0);w.left+=S,w.right+=Math.max(g.right-w.right,0);var D=Math.max(g.top-w.top,0);w.top+=D,w.bottom+=Math.max(g.bottom-w.bottom,0);var C=i-w.top-w.bottom,P=e-w.left-w.right;P===_&&C===k||(ut.each(m,function(t){t.height=C}),ut.each(p,function(t){t.fullWidth||(t.width=P)}),k=C,_=P);var T=r+S,O=s+D;ut.each(u.concat(h),A),T+=_,O+=k,ut.each(d,A),ut.each(c,A),t.chartArea={left:w.left,top:w.top,right:w.left+_,bottom:w.top+k},ut.each(f,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(_,k)})}function I(t){var e=ut.findNextWhere(M,function(e){return e.box===t});if(e)if(e.horizontal){var i={left:Math.max(w.left,g.left),right:Math.max(w.right,g.right),top:0,bottom:0};t.update(t.fullWidth?y:_,b/2,i)}else t.update(e.width,k)}function A(t){t.isHorizontal()?(t.left=t.fullWidth?r:w.left,t.right=t.fullWidth?e-o:w.left+_,t.top=O,t.bottom=O+t.height,O=t.bottom):(t.left=T,t.right=T+t.width,t.top=w.top,t.bottom=w.top+k,T=t.right)}}};"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function _e(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}var ke,we=(ke=Object.freeze({default:"@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}"}))&&ke.default||ke,Me="$chartjs",Se="chartjs-size-monitor",De="chartjs-render-monitor",Ce="chartjs-render-animation",Pe=["animationstart","webkitAnimationStart"],Te={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"};function Oe(t,e){var i=ut.getStyle(t,e),n=i&&i.match(/^(\d+)(\.\d+)?px$/);return n?Number(n[1]):void 0}var Ie=!!function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("e",null,e)}catch(t){}return t}()&&{passive:!0};function Ae(t,e,i){t.addEventListener(e,i,Ie)}function Fe(t,e,i){t.removeEventListener(e,i,Ie)}function Re(t,e,i,n,a){return{type:t,chart:e,native:a||null,x:void 0!==i?i:null,y:void 0!==n?n:null}}function Le(t){var e=document.createElement("div");return e.className=t||"",e}function We(t,e,i){var n,a,r,o,s=t[Me]||(t[Me]={}),l=s.resizer=function(t){var e=Le(Se),i=Le(Se+"-expand"),n=Le(Se+"-shrink");i.appendChild(Le()),n.appendChild(Le()),e.appendChild(i),e.appendChild(n),e._reset=function(){i.scrollLeft=1e6,i.scrollTop=1e6,n.scrollLeft=1e6,n.scrollTop=1e6};var a=function(){e._reset(),t()};return Ae(i,"scroll",a.bind(i,"expand")),Ae(n,"scroll",a.bind(n,"shrink")),e}((n=function(){if(s.resizer){var n=i.options.maintainAspectRatio&&t.parentNode,a=n?n.clientWidth:0;e(Re("resize",i)),n&&n.clientWidth<a&&i.canvas&&e(Re("resize",i))}},r=!1,o=[],function(){o=Array.prototype.slice.call(arguments),a=a||this,r||(r=!0,ut.requestAnimFrame.call(window,function(){r=!1,n.apply(a,o)}))}));!function(t,e){var i=t[Me]||(t[Me]={}),n=i.renderProxy=function(t){t.animationName===Ce&&e()};ut.each(Pe,function(e){Ae(t,e,n)}),i.reflow=!!t.offsetParent,t.classList.add(De)}(t,function(){if(s.resizer){var e=t.parentNode;e&&e!==l.parentNode&&e.insertBefore(l,e.firstChild),l._reset()}})}function Ye(t){var e=t[Me]||{},i=e.resizer;delete e.resizer,function(t){var e=t[Me]||{},i=e.renderProxy;i&&(ut.each(Pe,function(e){Fe(t,e,i)}),delete e.renderProxy),t.classList.remove(De)}(t),i&&i.parentNode&&i.parentNode.removeChild(i)}var Ne={disableCSSInjection:!1,_enabled:"undefined"!=typeof window&&"undefined"!=typeof document,_ensureLoaded:function(){var t,e,i;this._loaded||(this._loaded=!0,this.disableCSSInjection||(e=we,i=(t=this)._style||document.createElement("style"),t._style||(t._style=i,e="/* Chart.js */\n"+e,i.setAttribute("type","text/css"),document.getElementsByTagName("head")[0].appendChild(i)),i.appendChild(document.createTextNode(e))))},acquireContext:function(t,e){"string"==typeof t?t=document.getElementById(t):t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas);var i=t&&t.getContext&&t.getContext("2d");return this._ensureLoaded(),i&&i.canvas===t?(function(t,e){var i=t.style,n=t.getAttribute("height"),a=t.getAttribute("width");if(t[Me]={initial:{height:n,width:a,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",null===a||""===a){var r=Oe(t,"width");void 0!==r&&(t.width=r)}if(null===n||""===n)if(""===t.style.height)t.height=t.width/(e.options.aspectRatio||2);else{var o=Oe(t,"height");void 0!==r&&(t.height=o)}}(t,e),i):null},releaseContext:function(t){var e=t.canvas;if(e[Me]){var i=e[Me].initial;["height","width"].forEach(function(t){var n=i[t];ut.isNullOrUndef(n)?e.removeAttribute(t):e.setAttribute(t,n)}),ut.each(i.style||{},function(t,i){e.style[i]=t}),e.width=e.width,delete e[Me]}},addEventListener:function(t,e,i){var n=t.canvas;if("resize"!==e){var a=i[Me]||(i[Me]={});Ae(n,e,(a.proxies||(a.proxies={}))[t.id+"_"+e]=function(e){i(function(t,e){var i=Te[t.type]||t.type,n=ut.getRelativePosition(t,e);return Re(i,e,n.x,n.y,t)}(e,t))})}else We(n,i,t)},removeEventListener:function(t,e,i){var n=t.canvas;if("resize"!==e){var a=((i[Me]||{}).proxies||{})[t.id+"_"+e];a&&Fe(n,e,a)}else Ye(n)}};ut.addEvent=Ae,ut.removeEvent=Fe;var ze=Ne._enabled?Ne:{acquireContext:function(t){return t&&t.canvas&&(t=t.canvas),t&&t.getContext("2d")||null}},Ve=ut.extend({initialize:function(){},acquireContext:function(){},releaseContext:function(){},addEventListener:function(){},removeEventListener:function(){}},ze);ot._set("global",{plugins:{}});var He={_plugins:[],_cacheId:0,register:function(t){var e=this._plugins;[].concat(t).forEach(function(t){-1===e.indexOf(t)&&e.push(t)}),this._cacheId++},unregister:function(t){var e=this._plugins;[].concat(t).forEach(function(t){var i=e.indexOf(t);-1!==i&&e.splice(i,1)}),this._cacheId++},clear:function(){this._plugins=[],this._cacheId++},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e,i){var n,a,r,o,s,l=this.descriptors(t),u=l.length;for(n=0;n<u;++n)if("function"==typeof(s=(r=(a=l[n]).plugin)[e])&&((o=[t].concat(i||[])).push(a.options),!1===s.apply(r,o)))return!1;return!0},descriptors:function(t){var e=t.$plugins||(t.$plugins={});if(e.id===this._cacheId)return e.descriptors;var i=[],n=[],a=t&&t.config||{},r=a.options&&a.options.plugins||{};return this._plugins.concat(a.plugins||[]).forEach(function(t){if(-1===i.indexOf(t)){var e=t.id,a=r[e];!1!==a&&(!0===a&&(a=ut.clone(ot.global.plugins[e])),i.push(t),n.push({plugin:t,options:a||{}}))}}),e.descriptors=n,e.id=this._cacheId,n},_invalidate:function(t){delete t.$plugins}},Ee={constructors:{},defaults:{},registerScaleType:function(t,e,i){this.constructors[t]=e,this.defaults[t]=ut.clone(i)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(t){return this.defaults.hasOwnProperty(t)?ut.merge({},[ot.scale,this.defaults[t]]):{}},updateScaleDefaults:function(t,e){this.defaults.hasOwnProperty(t)&&(this.defaults[t]=ut.extend(this.defaults[t],e))},addScalesToLayout:function(t){ut.each(t.scales,function(e){e.fullWidth=e.options.fullWidth,e.position=e.options.position,e.weight=e.options.weight,xe.addBox(t,e)})}},Be=ut.valueOrDefault;ot._set("global",{tooltips:{enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretPadding:2,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,borderColor:"rgba(0,0,0,0)",borderWidth:0,callbacks:{beforeTitle:ut.noop,title:function(t,e){var i="",n=e.labels,a=n?n.length:0;if(t.length>0){var r=t[0];r.label?i=r.label:r.xLabel?i=r.xLabel:a>0&&r.index<a&&(i=n[r.index])}return i},afterTitle:ut.noop,beforeBody:ut.noop,beforeLabel:ut.noop,label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i&&(i+=": "),ut.isNullOrUndef(t.value)?i+=t.yLabel:i+=t.value,i},labelColor:function(t,e){var i=e.getDatasetMeta(t.datasetIndex).data[t.index]._view;return{borderColor:i.borderColor,backgroundColor:i.backgroundColor}},labelTextColor:function(){return this._options.bodyFontColor},afterLabel:ut.noop,afterBody:ut.noop,beforeFooter:ut.noop,footer:ut.noop,afterFooter:ut.noop}}});var je={average:function(t){if(!t.length)return!1;var e,i,n=0,a=0,r=0;for(e=0,i=t.length;e<i;++e){var o=t[e];if(o&&o.hasValue()){var s=o.tooltipPosition();n+=s.x,a+=s.y,++r}}return{x:n/r,y:a/r}},nearest:function(t,e){var i,n,a,r=e.x,o=e.y,s=Number.POSITIVE_INFINITY;for(i=0,n=t.length;i<n;++i){var l=t[i];if(l&&l.hasValue()){var u=l.getCenterPoint(),d=ut.distanceBetweenPoints(e,u);d<s&&(s=d,a=l)}}if(a){var h=a.tooltipPosition();r=h.x,o=h.y}return{x:r,y:o}}};function Ue(t,e){return e&&(ut.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Ge(t){return("string"==typeof t||t instanceof String)&&t.indexOf("\n")>-1?t.split("\n"):t}function qe(t){var e=ot.global;return{xPadding:t.xPadding,yPadding:t.yPadding,xAlign:t.xAlign,yAlign:t.yAlign,bodyFontColor:t.bodyFontColor,_bodyFontFamily:Be(t.bodyFontFamily,e.defaultFontFamily),_bodyFontStyle:Be(t.bodyFontStyle,e.defaultFontStyle),_bodyAlign:t.bodyAlign,bodyFontSize:Be(t.bodyFontSize,e.defaultFontSize),bodySpacing:t.bodySpacing,titleFontColor:t.titleFontColor,_titleFontFamily:Be(t.titleFontFamily,e.defaultFontFamily),_titleFontStyle:Be(t.titleFontStyle,e.defaultFontStyle),titleFontSize:Be(t.titleFontSize,e.defaultFontSize),_titleAlign:t.titleAlign,titleSpacing:t.titleSpacing,titleMarginBottom:t.titleMarginBottom,footerFontColor:t.footerFontColor,_footerFontFamily:Be(t.footerFontFamily,e.defaultFontFamily),_footerFontStyle:Be(t.footerFontStyle,e.defaultFontStyle),footerFontSize:Be(t.footerFontSize,e.defaultFontSize),_footerAlign:t.footerAlign,footerSpacing:t.footerSpacing,footerMarginTop:t.footerMarginTop,caretSize:t.caretSize,cornerRadius:t.cornerRadius,backgroundColor:t.backgroundColor,opacity:0,legendColorBackground:t.multiKeyBackground,displayColors:t.displayColors,borderColor:t.borderColor,borderWidth:t.borderWidth}}function Ze(t,e){return"center"===e?t.x+t.width/2:"right"===e?t.x+t.width-t.xPadding:t.x+t.xPadding}function $e(t){return Ue([],Ge(t))}var Xe=gt.extend({initialize:function(){this._model=qe(this._options),this._lastActive=[]},getTitle:function(){var t=this._options.callbacks,e=t.beforeTitle.apply(this,arguments),i=t.title.apply(this,arguments),n=t.afterTitle.apply(this,arguments),a=[];return a=Ue(a,Ge(e)),a=Ue(a,Ge(i)),a=Ue(a,Ge(n))},getBeforeBody:function(){return $e(this._options.callbacks.beforeBody.apply(this,arguments))},getBody:function(t,e){var i=this,n=i._options.callbacks,a=[];return ut.each(t,function(t){var r={before:[],lines:[],after:[]};Ue(r.before,Ge(n.beforeLabel.call(i,t,e))),Ue(r.lines,n.label.call(i,t,e)),Ue(r.after,Ge(n.afterLabel.call(i,t,e))),a.push(r)}),a},getAfterBody:function(){return $e(this._options.callbacks.afterBody.apply(this,arguments))},getFooter:function(){var t=this._options.callbacks,e=t.beforeFooter.apply(this,arguments),i=t.footer.apply(this,arguments),n=t.afterFooter.apply(this,arguments),a=[];return a=Ue(a,Ge(e)),a=Ue(a,Ge(i)),a=Ue(a,Ge(n))},update:function(t){var e,i,n,a,r,o,s,l,u,d,h=this,c=h._options,f=h._model,g=h._model=qe(c),m=h._active,p=h._data,v={xAlign:f.xAlign,yAlign:f.yAlign},y={x:f.x,y:f.y},b={width:f.width,height:f.height},x={x:f.caretX,y:f.caretY};if(m.length){g.opacity=1;var _=[],k=[];x=je[c.position].call(h,m,h._eventPosition);var w=[];for(e=0,i=m.length;e<i;++e)w.push((n=m[e],a=void 0,r=void 0,o=void 0,s=void 0,l=void 0,u=void 0,d=void 0,a=n._xScale,r=n._yScale||n._scale,o=n._index,s=n._datasetIndex,l=n._chart.getDatasetMeta(s).controller,u=l._getIndexScale(),d=l._getValueScale(),{xLabel:a?a.getLabelForIndex(o,s):"",yLabel:r?r.getLabelForIndex(o,s):"",label:u?""+u.getLabelForIndex(o,s):"",value:d?""+d.getLabelForIndex(o,s):"",index:o,datasetIndex:s,x:n._model.x,y:n._model.y}));c.filter&&(w=w.filter(function(t){return c.filter(t,p)})),c.itemSort&&(w=w.sort(function(t,e){return c.itemSort(t,e,p)})),ut.each(w,function(t){_.push(c.callbacks.labelColor.call(h,t,h._chart)),k.push(c.callbacks.labelTextColor.call(h,t,h._chart))}),g.title=h.getTitle(w,p),g.beforeBody=h.getBeforeBody(w,p),g.body=h.getBody(w,p),g.afterBody=h.getAfterBody(w,p),g.footer=h.getFooter(w,p),g.x=x.x,g.y=x.y,g.caretPadding=c.caretPadding,g.labelColors=_,g.labelTextColors=k,g.dataPoints=w,b=function(t,e){var i=t._chart.ctx,n=2*e.yPadding,a=0,r=e.body,o=r.reduce(function(t,e){return t+e.before.length+e.lines.length+e.after.length},0);o+=e.beforeBody.length+e.afterBody.length;var s=e.title.length,l=e.footer.length,u=e.titleFontSize,d=e.bodyFontSize,h=e.footerFontSize;n+=s*u,n+=s?(s-1)*e.titleSpacing:0,n+=s?e.titleMarginBottom:0,n+=o*d,n+=o?(o-1)*e.bodySpacing:0,n+=l?e.footerMarginTop:0,n+=l*h,n+=l?(l-1)*e.footerSpacing:0;var c=0,f=function(t){a=Math.max(a,i.measureText(t).width+c)};return i.font=ut.fontString(u,e._titleFontStyle,e._titleFontFamily),ut.each(e.title,f),i.font=ut.fontString(d,e._bodyFontStyle,e._bodyFontFamily),ut.each(e.beforeBody.concat(e.afterBody),f),c=e.displayColors?d+2:0,ut.each(r,function(t){ut.each(t.before,f),ut.each(t.lines,f),ut.each(t.after,f)}),c=0,i.font=ut.fontString(h,e._footerFontStyle,e._footerFontFamily),ut.each(e.footer,f),{width:a+=2*e.xPadding,height:n}}(this,g),y=function(t,e,i,n){var a=t.x,r=t.y,o=t.caretSize,s=t.caretPadding,l=t.cornerRadius,u=i.xAlign,d=i.yAlign,h=o+s,c=l+s;return"right"===u?a-=e.width:"center"===u&&((a-=e.width/2)+e.width>n.width&&(a=n.width-e.width),a<0&&(a=0)),"top"===d?r+=h:r-="bottom"===d?e.height+h:e.height/2,"center"===d?"left"===u?a+=h:"right"===u&&(a-=h):"left"===u?a-=c:"right"===u&&(a+=c),{x:a,y:r}}(g,b,v=function(t,e){var i,n,a,r,o,s=t._model,l=t._chart,u=t._chart.chartArea,d="center",h="center";s.y<e.height?h="top":s.y>l.height-e.height&&(h="bottom");var c=(u.left+u.right)/2,f=(u.top+u.bottom)/2;"center"===h?(i=function(t){return t<=c},n=function(t){return t>c}):(i=function(t){return t<=e.width/2},n=function(t){return t>=l.width-e.width/2}),a=function(t){return t+e.width+s.caretSize+s.caretPadding>l.width},r=function(t){return t-e.width-s.caretSize-s.caretPadding<0},o=function(t){return t<=f?"top":"bottom"},i(s.x)?(d="left",a(s.x)&&(d="center",h=o(s.y))):n(s.x)&&(d="right",r(s.x)&&(d="center",h=o(s.y)));var g=t._options;return{xAlign:g.xAlign?g.xAlign:d,yAlign:g.yAlign?g.yAlign:h}}(this,b),h._chart)}else g.opacity=0;return g.xAlign=v.xAlign,g.yAlign=v.yAlign,g.x=y.x,g.y=y.y,g.width=b.width,g.height=b.height,g.caretX=x.x,g.caretY=x.y,h._model=g,t&&c.custom&&c.custom.call(h,g),h},drawCaret:function(t,e){var i=this._chart.ctx,n=this._view,a=this.getCaretPosition(t,e,n);i.lineTo(a.x1,a.y1),i.lineTo(a.x2,a.y2),i.lineTo(a.x3,a.y3)},getCaretPosition:function(t,e,i){var n,a,r,o,s,l,u=i.caretSize,d=i.cornerRadius,h=i.xAlign,c=i.yAlign,f=t.x,g=t.y,m=e.width,p=e.height;if("center"===c)s=g+p/2,"left"===h?(a=(n=f)-u,r=n,o=s+u,l=s-u):(a=(n=f+m)+u,r=n,o=s-u,l=s+u);else if("left"===h?(n=(a=f+d+u)-u,r=a+u):"right"===h?(n=(a=f+m-d-u)-u,r=a+u):(n=(a=i.caretX)-u,r=a+u),"top"===c)s=(o=g)-u,l=o;else{s=(o=g+p)+u,l=o;var v=r;r=n,n=v}return{x1:n,x2:a,x3:r,y1:o,y2:s,y3:l}},drawTitle:function(t,e,i){var n=e.title;if(n.length){t.x=Ze(e,e._titleAlign),i.textAlign=e._titleAlign,i.textBaseline="top";var a,r,o=e.titleFontSize,s=e.titleSpacing;for(i.fillStyle=e.titleFontColor,i.font=ut.fontString(o,e._titleFontStyle,e._titleFontFamily),a=0,r=n.length;a<r;++a)i.fillText(n[a],t.x,t.y),t.y+=o+s,a+1===n.length&&(t.y+=e.titleMarginBottom-s)}},drawBody:function(t,e,i){var n,a=e.bodyFontSize,r=e.bodySpacing,o=e._bodyAlign,s=e.body,l=e.displayColors,u=e.labelColors,d=0,h=l?Ze(e,"left"):0;i.textAlign=o,i.textBaseline="top",i.font=ut.fontString(a,e._bodyFontStyle,e._bodyFontFamily),t.x=Ze(e,o);var c=function(e){i.fillText(e,t.x+d,t.y),t.y+=a+r};i.fillStyle=e.bodyFontColor,ut.each(e.beforeBody,c),d=l&&"right"!==o?"center"===o?a/2+1:a+2:0,ut.each(s,function(r,o){n=e.labelTextColors[o],i.fillStyle=n,ut.each(r.before,c),ut.each(r.lines,function(r){l&&(i.fillStyle=e.legendColorBackground,i.fillRect(h,t.y,a,a),i.lineWidth=1,i.strokeStyle=u[o].borderColor,i.strokeRect(h,t.y,a,a),i.fillStyle=u[o].backgroundColor,i.fillRect(h+1,t.y+1,a-2,a-2),i.fillStyle=n),c(r)}),ut.each(r.after,c)}),d=0,ut.each(e.afterBody,c),t.y-=r},drawFooter:function(t,e,i){var n=e.footer;n.length&&(t.x=Ze(e,e._footerAlign),t.y+=e.footerMarginTop,i.textAlign=e._footerAlign,i.textBaseline="top",i.fillStyle=e.footerFontColor,i.font=ut.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),ut.each(n,function(n){i.fillText(n,t.x,t.y),t.y+=e.footerFontSize+e.footerSpacing}))},drawBackground:function(t,e,i,n){i.fillStyle=e.backgroundColor,i.strokeStyle=e.borderColor,i.lineWidth=e.borderWidth;var a=e.xAlign,r=e.yAlign,o=t.x,s=t.y,l=n.width,u=n.height,d=e.cornerRadius;i.beginPath(),i.moveTo(o+d,s),"top"===r&&this.drawCaret(t,n),i.lineTo(o+l-d,s),i.quadraticCurveTo(o+l,s,o+l,s+d),"center"===r&&"right"===a&&this.drawCaret(t,n),i.lineTo(o+l,s+u-d),i.quadraticCurveTo(o+l,s+u,o+l-d,s+u),"bottom"===r&&this.drawCaret(t,n),i.lineTo(o+d,s+u),i.quadraticCurveTo(o,s+u,o,s+u-d),"center"===r&&"left"===a&&this.drawCaret(t,n),i.lineTo(o,s+d),i.quadraticCurveTo(o,s,o+d,s),i.closePath(),i.fill(),e.borderWidth>0&&i.stroke()},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var i={width:e.width,height:e.height},n={x:e.x,y:e.y},a=Math.abs(e.opacity<.001)?0:e.opacity,r=e.title.length||e.beforeBody.length||e.body.length||e.afterBody.length||e.footer.length;this._options.enabled&&r&&(t.save(),t.globalAlpha=a,this.drawBackground(n,e,t,i),n.y+=e.yPadding,this.drawTitle(n,e,t),this.drawBody(n,e,t),this.drawFooter(n,e,t),t.restore())}},handleEvent:function(t){var e,i=this,n=i._options;return i._lastActive=i._lastActive||[],"mouseout"===t.type?i._active=[]:i._active=i._chart.getElementsAtEventForMode(t,n.mode,n),(e=!ut.arrayEquals(i._active,i._lastActive))&&(i._lastActive=i._active,(n.enabled||n.custom)&&(i._eventPosition={x:t.x,y:t.y},i.update(!0),i.pivot())),e}}),Ke=je,Je=Xe;Je.positioners=Ke;var Qe=ut.valueOrDefault;function ti(){return ut.merge({},[].slice.call(arguments),{merger:function(t,e,i,n){if("xAxes"===t||"yAxes"===t){var a,r,o,s=i[t].length;for(e[t]||(e[t]=[]),a=0;a<s;++a)o=i[t][a],r=Qe(o.type,"xAxes"===t?"category":"linear"),a>=e[t].length&&e[t].push({}),!e[t][a].type||o.type&&o.type!==e[t][a].type?ut.merge(e[t][a],[Ee.getScaleDefaults(r),o]):ut.merge(e[t][a],o)}else ut._merger(t,e,i,n)}})}function ei(){return ut.merge({},[].slice.call(arguments),{merger:function(t,e,i,n){var a=e[t]||{},r=i[t];"scales"===t?e[t]=ti(a,r):"scale"===t?e[t]=ut.merge(a,[Ee.getScaleDefaults(r.type),r]):ut._merger(t,e,i,n)}})}function ii(t){return"top"===t||"bottom"===t}ot._set("global",{elements:{},events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,maintainAspectRatio:!0,responsive:!0,responsiveAnimationDuration:0});var ni=function(t,e){return this.construct(t,e),this};ut.extend(ni.prototype,{construct:function(t,e){var i=this;e=function(t){var e=(t=t||{}).data=t.data||{};return e.datasets=e.datasets||[],e.labels=e.labels||[],t.options=ei(ot.global,ot[t.type],t.options||{}),t}(e);var n=Ve.acquireContext(t,e),a=n&&n.canvas,r=a&&a.height,o=a&&a.width;i.id=ut.uid(),i.ctx=n,i.canvas=a,i.config=e,i.width=o,i.height=r,i.aspectRatio=r?o/r:null,i.options=e.options,i._bufferedRender=!1,i.chart=i,i.controller=i,ni.instances[i.id]=i,Object.defineProperty(i,"data",{get:function(){return i.config.data},set:function(t){i.config.data=t}}),n&&a?(i.initialize(),i.update()):console.error("Failed to create chart: can't acquire context from the given item")},initialize:function(){var t=this;return He.notify(t,"beforeInit"),ut.retinaScale(t,t.options.devicePixelRatio),t.bindEvents(),t.options.responsive&&t.resize(!0),t.ensureScalesHaveIDs(),t.buildOrUpdateScales(),t.initToolTip(),He.notify(t,"afterInit"),t},clear:function(){return ut.canvas.clear(this),this},stop:function(){return vt.cancelAnimation(this),this},resize:function(t){var e=this,i=e.options,n=e.canvas,a=i.maintainAspectRatio&&e.aspectRatio||null,r=Math.max(0,Math.floor(ut.getMaximumWidth(n))),o=Math.max(0,Math.floor(a?r/a:ut.getMaximumHeight(n)));if((e.width!==r||e.height!==o)&&(n.width=e.width=r,n.height=e.height=o,n.style.width=r+"px",n.style.height=o+"px",ut.retinaScale(e,i.devicePixelRatio),!t)){var s={width:r,height:o};He.notify(e,"resize",[s]),i.onResize&&i.onResize(e,s),e.stop(),e.update({duration:i.responsiveAnimationDuration})}},ensureScalesHaveIDs:function(){var t=this.options,e=t.scales||{},i=t.scale;ut.each(e.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),ut.each(e.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),i&&(i.id=i.id||"scale")},buildOrUpdateScales:function(){var t=this,e=t.options,i=t.scales||{},n=[],a=Object.keys(i).reduce(function(t,e){return t[e]=!1,t},{});e.scales&&(n=n.concat((e.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category",dposition:"bottom"}}),(e.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear",dposition:"left"}}))),e.scale&&n.push({options:e.scale,dtype:"radialLinear",isDefault:!0,dposition:"chartArea"}),ut.each(n,function(e){var n=e.options,r=n.id,o=Qe(n.type,e.dtype);ii(n.position)!==ii(e.dposition)&&(n.position=e.dposition),a[r]=!0;var s=null;if(r in i&&i[r].type===o)(s=i[r]).options=n,s.ctx=t.ctx,s.chart=t;else{var l=Ee.getScaleConstructor(o);if(!l)return;s=new l({id:r,type:o,options:n,ctx:t.ctx,chart:t}),i[s.id]=s}s.mergeTicksOptions(),e.isDefault&&(t.scale=s)}),ut.each(a,function(t,e){t||delete i[e]}),t.scales=i,Ee.addScalesToLayout(this)},buildOrUpdateControllers:function(){var t=this,e=[];return ut.each(t.data.datasets,function(i,n){var a=t.getDatasetMeta(n),r=i.type||t.config.type;if(a.type&&a.type!==r&&(t.destroyDatasetMeta(n),a=t.getDatasetMeta(n)),a.type=r,a.controller)a.controller.updateIndex(n),a.controller.linkScales();else{var o=ue[a.type];if(void 0===o)throw new Error('"'+a.type+'" is not a chart type.');a.controller=new o(t,n),e.push(a.controller)}},t),e},resetElements:function(){var t=this;ut.each(t.data.datasets,function(e,i){t.getDatasetMeta(i).controller.reset()},t)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(t){var e,i,n=this;if(t&&"object"==typeof t||(t={duration:t,lazy:arguments[1]}),i=(e=n).options,ut.each(e.scales,function(t){xe.removeBox(e,t)}),i=ei(ot.global,ot[e.config.type],i),e.options=e.config.options=i,e.ensureScalesHaveIDs(),e.buildOrUpdateScales(),e.tooltip._options=i.tooltips,e.tooltip.initialize(),He._invalidate(n),!1!==He.notify(n,"beforeUpdate")){n.tooltip._data=n.data;var a=n.buildOrUpdateControllers();ut.each(n.data.datasets,function(t,e){n.getDatasetMeta(e).controller.buildOrUpdateElements()},n),n.updateLayout(),n.options.animation&&n.options.animation.duration&&ut.each(a,function(t){t.reset()}),n.updateDatasets(),n.tooltip.initialize(),n.lastActive=[],He.notify(n,"afterUpdate"),n._bufferedRender?n._bufferedRequest={duration:t.duration,easing:t.easing,lazy:t.lazy}:n.render(t)}},updateLayout:function(){!1!==He.notify(this,"beforeLayout")&&(xe.update(this,this.width,this.height),He.notify(this,"afterScaleUpdate"),He.notify(this,"afterLayout"))},updateDatasets:function(){if(!1!==He.notify(this,"beforeDatasetsUpdate")){for(var t=0,e=this.data.datasets.length;t<e;++t)this.updateDataset(t);He.notify(this,"afterDatasetsUpdate")}},updateDataset:function(t){var e=this.getDatasetMeta(t),i={meta:e,index:t};!1!==He.notify(this,"beforeDatasetUpdate",[i])&&(e.controller.update(),He.notify(this,"afterDatasetUpdate",[i]))},render:function(t){var e=this;t&&"object"==typeof t||(t={duration:t,lazy:arguments[1]});var i=e.options.animation,n=Qe(t.duration,i&&i.duration),a=t.lazy;if(!1!==He.notify(e,"beforeRender")){var r=function(t){He.notify(e,"afterRender"),ut.callback(i&&i.onComplete,[t],e)};if(i&&n){var o=new pt({numSteps:n/16.66,easing:t.easing||i.easing,render:function(t,e){var i=ut.easing.effects[e.easing],n=e.currentStep,a=n/e.numSteps;t.draw(i(a),a,n)},onAnimationProgress:i.onProgress,onAnimationComplete:r});vt.addAnimation(e,o,n,a)}else e.draw(),r(new pt({numSteps:0,chart:e}));return e}},draw:function(t){var e=this;e.clear(),ut.isNullOrUndef(t)&&(t=1),e.transition(t),e.width<=0||e.height<=0||!1!==He.notify(e,"beforeDraw",[t])&&(ut.each(e.boxes,function(t){t.draw(e.chartArea)},e),e.drawDatasets(t),e._drawTooltip(t),He.notify(e,"afterDraw",[t]))},transition:function(t){for(var e=0,i=(this.data.datasets||[]).length;e<i;++e)this.isDatasetVisible(e)&&this.getDatasetMeta(e).controller.transition(t);this.tooltip.transition(t)},drawDatasets:function(t){var e=this;if(!1!==He.notify(e,"beforeDatasetsDraw",[t])){for(var i=(e.data.datasets||[]).length-1;i>=0;--i)e.isDatasetVisible(i)&&e.drawDataset(i,t);He.notify(e,"afterDatasetsDraw",[t])}},drawDataset:function(t,e){var i=this.getDatasetMeta(t),n={meta:i,index:t,easingValue:e};!1!==He.notify(this,"beforeDatasetDraw",[n])&&(i.controller.draw(e),He.notify(this,"afterDatasetDraw",[n]))},_drawTooltip:function(t){var e=this.tooltip,i={tooltip:e,easingValue:t};!1!==He.notify(this,"beforeTooltipDraw",[i])&&(e.draw(),He.notify(this,"afterTooltipDraw",[i]))},getElementAtEvent:function(t){return pe.modes.single(this,t)},getElementsAtEvent:function(t){return pe.modes.label(this,t,{intersect:!0})},getElementsAtXAxis:function(t){return pe.modes["x-axis"](this,t,{intersect:!0})},getElementsAtEventForMode:function(t,e,i){var n=pe.modes[e];return"function"==typeof n?n(this,t,i):[]},getDatasetAtEvent:function(t){return pe.modes.dataset(this,t,{intersect:!0})},getDatasetMeta:function(t){var e=this.data.datasets[t];e._meta||(e._meta={});var i=e._meta[this.id];return i||(i=e._meta[this.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,i=this.data.datasets.length;e<i;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroyDatasetMeta:function(t){var e=this.id,i=this.data.datasets[t],n=i._meta&&i._meta[e];n&&(n.controller.destroy(),delete i._meta[e])},destroy:function(){var t,e,i=this,n=i.canvas;for(i.stop(),t=0,e=i.data.datasets.length;t<e;++t)i.destroyDatasetMeta(t);n&&(i.unbindEvents(),ut.canvas.clear(i),Ve.releaseContext(i.ctx),i.canvas=null,i.ctx=null),He.notify(i,"destroy"),delete ni.instances[i.id]},toBase64Image:function(){return this.canvas.toDataURL.apply(this.canvas,arguments)},initToolTip:function(){var t=this;t.tooltip=new Je({_chart:t,_chartInstance:t,_data:t.data,_options:t.options.tooltips},t)},bindEvents:function(){var t=this,e=t._listeners={},i=function(){t.eventHandler.apply(t,arguments)};ut.each(t.options.events,function(n){Ve.addEventListener(t,n,i),e[n]=i}),t.options.responsive&&(i=function(){t.resize()},Ve.addEventListener(t,"resize",i),e.resize=i)},unbindEvents:function(){var t=this,e=t._listeners;e&&(delete t._listeners,ut.each(e,function(e,i){Ve.removeEventListener(t,i,e)}))},updateHoverStyle:function(t,e,i){var n,a,r,o=i?"setHoverStyle":"removeHoverStyle";for(a=0,r=t.length;a<r;++a)(n=t[a])&&this.getDatasetMeta(n._datasetIndex).controller[o](n)},eventHandler:function(t){var e=this,i=e.tooltip;if(!1!==He.notify(e,"beforeEvent",[t])){e._bufferedRender=!0,e._bufferedRequest=null;var n=e.handleEvent(t);i&&(n=i._start?i.handleEvent(t):n|i.handleEvent(t)),He.notify(e,"afterEvent",[t]);var a=e._bufferedRequest;return a?e.render(a):n&&!e.animating&&(e.stop(),e.render({duration:e.options.hover.animationDuration,lazy:!0})),e._bufferedRender=!1,e._bufferedRequest=null,e}},handleEvent:function(t){var e,i=this,n=i.options||{},a=n.hover;return i.lastActive=i.lastActive||[],"mouseout"===t.type?i.active=[]:i.active=i.getElementsAtEventForMode(t,a.mode,a),ut.callback(n.onHover||n.hover.onHover,[t.native,i.active],i),"mouseup"!==t.type&&"click"!==t.type||n.onClick&&n.onClick.call(i,t.native,i.active),i.lastActive.length&&i.updateHoverStyle(i.lastActive,a.mode,!1),i.active.length&&a.mode&&i.updateHoverStyle(i.active,a.mode,!0),e=!ut.arrayEquals(i.active,i.lastActive),i.lastActive=i.active,e}}),ni.instances={};var ai=ni;ni.Controller=ni,ni.types={},ut.configMerge=ei,ut.scaleMerge=ti;function ri(){throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.")}function oi(t){this.options=t||{}}ut.extend(oi.prototype,{formats:ri,parse:ri,format:ri,add:ri,diff:ri,startOf:ri,endOf:ri,_create:function(t){return t}}),oi.override=function(t){ut.extend(oi.prototype,t)};var si={_date:oi},li={formatters:{values:function(t){return ut.isArray(t)?t:""+t},linear:function(t,e,i){var n=i.length>3?i[2]-i[1]:i[1]-i[0];Math.abs(n)>1&&t!==Math.floor(t)&&(n=t-Math.floor(t));var a=ut.log10(Math.abs(n)),r="";if(0!==t)if(Math.max(Math.abs(i[0]),Math.abs(i[i.length-1]))<1e-4){var o=ut.log10(Math.abs(t));r=t.toExponential(Math.floor(o)-Math.floor(a))}else{var s=-1*Math.floor(a);s=Math.max(Math.min(s,20),0),r=t.toFixed(s)}else r="0";return r},logarithmic:function(t,e,i){var n=t/Math.pow(10,Math.floor(ut.log10(t)));return 0===t?"0":1===n||2===n||5===n||0===e||e===i.length-1?t.toExponential():""}}},ui=ut.valueOrDefault,di=ut.valueAtIndexOrDefault;function hi(t){var e,i,n=[];for(e=0,i=t.length;e<i;++e)n.push(t[e].label);return n}function ci(t,e,i){return ut.isArray(e)?ut.longestText(t,i,e):t.measureText(e).width}ot._set("scale",{display:!0,position:"left",offset:!1,gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",zeroLineBorderDash:[],zeroLineBorderDashOffset:0,offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{display:!1,labelString:"",padding:{top:4,bottom:4}},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:0,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:li.formatters.values,minor:{},major:{}}});var fi=gt.extend({getPadding:function(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}},getTicks:function(){return this._ticks},mergeTicksOptions:function(){var t=this.options.ticks;for(var e in!1===t.minor&&(t.minor={display:!1}),!1===t.major&&(t.major={display:!1}),t)"major"!==e&&"minor"!==e&&(void 0===t.minor[e]&&(t.minor[e]=t[e]),void 0===t.major[e]&&(t.major[e]=t[e]))},beforeUpdate:function(){ut.callback(this.options.beforeUpdate,[this])},update:function(t,e,i){var n,a,r,o,s,l,u=this;for(u.beforeUpdate(),u.maxWidth=t,u.maxHeight=e,u.margins=ut.extend({left:0,right:0,top:0,bottom:0},i),u._maxLabelLines=0,u.longestLabelWidth=0,u.longestTextCache=u.longestTextCache||{},u.beforeSetDimensions(),u.setDimensions(),u.afterSetDimensions(),u.beforeDataLimits(),u.determineDataLimits(),u.afterDataLimits(),u.beforeBuildTicks(),s=u.buildTicks()||[],s=u.afterBuildTicks(s)||s,u.beforeTickToLabelConversion(),r=u.convertTicksToLabels(s)||u.ticks,u.afterTickToLabelConversion(),u.ticks=r,n=0,a=r.length;n<a;++n)o=r[n],(l=s[n])?l.label=o:s.push(l={label:o,major:!1});return u._ticks=s,u.beforeCalculateTickRotation(),u.calculateTickRotation(),u.afterCalculateTickRotation(),u.beforeFit(),u.fit(),u.afterFit(),u.afterUpdate(),u.minSize},afterUpdate:function(){ut.callback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){ut.callback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){ut.callback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){ut.callback(this.options.beforeDataLimits,[this])},determineDataLimits:ut.noop,afterDataLimits:function(){ut.callback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){ut.callback(this.options.beforeBuildTicks,[this])},buildTicks:ut.noop,afterBuildTicks:function(t){var e=this;return ut.isArray(t)&&t.length?ut.callback(e.options.afterBuildTicks,[e,t]):(e.ticks=ut.callback(e.options.afterBuildTicks,[e,e.ticks])||e.ticks,t)},beforeTickToLabelConversion:function(){ut.callback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this.options.ticks;this.ticks=this.ticks.map(t.userCallback||t.callback,this)},afterTickToLabelConversion:function(){ut.callback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){ut.callback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var t=this,e=t.ctx,i=t.options.ticks,n=hi(t._ticks),a=ut.options._parseFont(i);e.font=a.string;var r=i.minRotation||0;if(n.length&&t.options.display&&t.isHorizontal())for(var o,s=ut.longestText(e,a.string,n,t.longestTextCache),l=s,u=t.getPixelForTick(1)-t.getPixelForTick(0)-6;l>u&&r<i.maxRotation;){var d=ut.toRadians(r);if(o=Math.cos(d),Math.sin(d)*s>t.maxHeight){r--;break}r++,l=o*s}t.labelRotation=r},afterCalculateTickRotation:function(){ut.callback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){ut.callback(this.options.beforeFit,[this])},fit:function(){var t=this,e=t.minSize={width:0,height:0},i=hi(t._ticks),n=t.options,a=n.ticks,r=n.scaleLabel,o=n.gridLines,s=t._isVisible(),l=n.position,u=t.isHorizontal(),d=ut.options._parseFont,h=d(a),c=n.gridLines.tickMarkLength;if(e.width=u?t.isFullWidth()?t.maxWidth-t.margins.left-t.margins.right:t.maxWidth:s&&o.drawTicks?c:0,e.height=u?s&&o.drawTicks?c:0:t.maxHeight,r.display&&s){var f=d(r),g=ut.options.toPadding(r.padding),m=f.lineHeight+g.height;u?e.height+=m:e.width+=m}if(a.display&&s){var p=ut.longestText(t.ctx,h.string,i,t.longestTextCache),v=ut.numberOfLabelLines(i),y=.5*h.size,b=t.options.ticks.padding;if(t._maxLabelLines=v,t.longestLabelWidth=p,u){var x=ut.toRadians(t.labelRotation),_=Math.cos(x),k=Math.sin(x)*p+h.lineHeight*v+y;e.height=Math.min(t.maxHeight,e.height+k+b),t.ctx.font=h.string;var w,M,S=ci(t.ctx,i[0],h.string),D=ci(t.ctx,i[i.length-1],h.string),C=t.getPixelForTick(0)-t.left,P=t.right-t.getPixelForTick(i.length-1);0!==t.labelRotation?(w="bottom"===l?_*S:_*y,M="bottom"===l?_*y:_*D):(w=S/2,M=D/2),t.paddingLeft=Math.max(w-C,0)+3,t.paddingRight=Math.max(M-P,0)+3}else a.mirror?p=0:p+=b+y,e.width=Math.min(t.maxWidth,e.width+p),t.paddingTop=h.size/2,t.paddingBottom=h.size/2}t.handleMargins(),t.width=e.width,t.height=e.height},handleMargins:function(){var t=this;t.margins&&(t.paddingLeft=Math.max(t.paddingLeft-t.margins.left,0),t.paddingTop=Math.max(t.paddingTop-t.margins.top,0),t.paddingRight=Math.max(t.paddingRight-t.margins.right,0),t.paddingBottom=Math.max(t.paddingBottom-t.margins.bottom,0))},afterFit:function(){ut.callback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(t){if(ut.isNullOrUndef(t))return NaN;if(("number"==typeof t||t instanceof Number)&&!isFinite(t))return NaN;if(t)if(this.isHorizontal()){if(void 0!==t.x)return this.getRightValue(t.x)}else if(void 0!==t.y)return this.getRightValue(t.y);return t},getLabelForIndex:ut.noop,getPixelForValue:ut.noop,getValueForPixel:ut.noop,getPixelForTick:function(t){var e=this,i=e.options.offset;if(e.isHorizontal()){var n=(e.width-(e.paddingLeft+e.paddingRight))/Math.max(e._ticks.length-(i?0:1),1),a=n*t+e.paddingLeft;i&&(a+=n/2);var r=e.left+a;return r+=e.isFullWidth()?e.margins.left:0}var o=e.height-(e.paddingTop+e.paddingBottom);return e.top+t*(o/(e._ticks.length-1))},getPixelForDecimal:function(t){var e=this;if(e.isHorizontal()){var i=(e.width-(e.paddingLeft+e.paddingRight))*t+e.paddingLeft,n=e.left+i;return n+=e.isFullWidth()?e.margins.left:0}return e.top+t*e.height},getBasePixel:function(){return this.getPixelForValue(this.getBaseValue())},getBaseValue:function(){var t=this.min,e=this.max;return this.beginAtZero?0:t<0&&e<0?e:t>0&&e>0?t:0},_autoSkip:function(t){var e,i,n=this,a=n.isHorizontal(),r=n.options.ticks.minor,o=t.length,s=!1,l=r.maxTicksLimit,u=n._tickSize()*(o-1),d=a?n.width-(n.paddingLeft+n.paddingRight):n.height-(n.paddingTop+n.PaddingBottom),h=[];for(u>d&&(s=1+Math.floor(u/d)),o>l&&(s=Math.max(s,1+Math.floor(o/l))),e=0;e<o;e++)i=t[e],s>1&&e%s>0&&delete i.label,h.push(i);return h},_tickSize:function(){var t=this,e=t.isHorizontal(),i=t.options.ticks.minor,n=ut.toRadians(t.labelRotation),a=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),o=i.autoSkipPadding||0,s=t.longestLabelWidth+o||0,l=ut.options._parseFont(i),u=t._maxLabelLines*l.lineHeight+o||0;return e?u*a>s*r?s/a:u/r:u*r<s*a?u/a:s/r},_isVisible:function(){var t,e,i,n=this.chart,a=this.options.display;if("auto"!==a)return!!a;for(t=0,e=n.data.datasets.length;t<e;++t)if(n.isDatasetVisible(t)&&((i=n.getDatasetMeta(t)).xAxisID===this.id||i.yAxisID===this.id))return!0;return!1},draw:function(t){var e=this,i=e.options;if(e._isVisible()){var n,a,r,o=e.chart,s=e.ctx,l=ot.global.defaultFontColor,u=i.ticks.minor,d=i.ticks.major||u,h=i.gridLines,c=i.scaleLabel,f=i.position,g=0!==e.labelRotation,m=u.mirror,p=e.isHorizontal(),v=ut.options._parseFont,y=u.display&&u.autoSkip?e._autoSkip(e.getTicks()):e.getTicks(),b=ui(u.fontColor,l),x=v(u),_=x.lineHeight,k=ui(d.fontColor,l),w=v(d),M=u.padding,S=u.labelOffset,D=h.drawTicks?h.tickMarkLength:0,C=ui(c.fontColor,l),P=v(c),T=ut.options.toPadding(c.padding),O=ut.toRadians(e.labelRotation),I=[],A=h.drawBorder?di(h.lineWidth,0,0):0,F=ut._alignPixel;"top"===f?(n=F(o,e.bottom,A),a=e.bottom-D,r=n-A/2):"bottom"===f?(n=F(o,e.top,A),a=n+A/2,r=e.top+D):"left"===f?(n=F(o,e.right,A),a=e.right-D,r=n-A/2):(n=F(o,e.left,A),a=n+A/2,r=e.left+D);if(ut.each(y,function(n,s){if(!ut.isNullOrUndef(n.label)){var l,u,d,c,v,y,b,x,k,w,C,P,T,R,L,W,Y=n.label;s===e.zeroLineIndex&&i.offset===h.offsetGridLines?(l=h.zeroLineWidth,u=h.zeroLineColor,d=h.zeroLineBorderDash||[],c=h.zeroLineBorderDashOffset||0):(l=di(h.lineWidth,s),u=di(h.color,s),d=h.borderDash||[],c=h.borderDashOffset||0);var N=ut.isArray(Y)?Y.length:1,z=function(t,e,i){var n=t.getPixelForTick(e);return i&&(1===t.getTicks().length?n-=t.isHorizontal()?Math.max(n-t.left,t.right-n):Math.max(n-t.top,t.bottom-n):n-=0===e?(t.getPixelForTick(1)-n)/2:(n-t.getPixelForTick(e-1))/2),n}(e,s,h.offsetGridLines);if(p){var V=D+M;z<e.left-1e-7&&(u="rgba(0,0,0,0)"),v=b=k=C=F(o,z,l),y=a,x=r,T=e.getPixelForTick(s)+S,"top"===f?(w=F(o,t.top,A)+A/2,P=t.bottom,L=((g?1:.5)-N)*_,W=g?"left":"center",R=e.bottom-V):(w=t.top,P=F(o,t.bottom,A)-A/2,L=(g?0:.5)*_,W=g?"right":"center",R=e.top+V)}else{var H=(m?0:D)+M;z<e.top-1e-7&&(u="rgba(0,0,0,0)"),v=a,b=r,y=x=w=P=F(o,z,l),R=e.getPixelForTick(s)+S,L=(1-N)*_/2,"left"===f?(k=F(o,t.left,A)+A/2,C=t.right,W=m?"left":"right",T=e.right-H):(k=t.left,C=F(o,t.right,A)-A/2,W=m?"right":"left",T=e.left+H)}I.push({tx1:v,ty1:y,tx2:b,ty2:x,x1:k,y1:w,x2:C,y2:P,labelX:T,labelY:R,glWidth:l,glColor:u,glBorderDash:d,glBorderDashOffset:c,rotation:-1*O,label:Y,major:n.major,textOffset:L,textAlign:W})}}),ut.each(I,function(t){var e=t.glWidth,i=t.glColor;if(h.display&&e&&i&&(s.save(),s.lineWidth=e,s.strokeStyle=i,s.setLineDash&&(s.setLineDash(t.glBorderDash),s.lineDashOffset=t.glBorderDashOffset),s.beginPath(),h.drawTicks&&(s.moveTo(t.tx1,t.ty1),s.lineTo(t.tx2,t.ty2)),h.drawOnChartArea&&(s.moveTo(t.x1,t.y1),s.lineTo(t.x2,t.y2)),s.stroke(),s.restore()),u.display){s.save(),s.translate(t.labelX,t.labelY),s.rotate(t.rotation),s.font=t.major?w.string:x.string,s.fillStyle=t.major?k:b,s.textBaseline="middle",s.textAlign=t.textAlign;var n=t.label,a=t.textOffset;if(ut.isArray(n))for(var r=0;r<n.length;++r)s.fillText(""+n[r],0,a),a+=_;else s.fillText(n,0,a);s.restore()}}),c.display){var R,L,W=0,Y=P.lineHeight/2;if(p)R=e.left+(e.right-e.left)/2,L="bottom"===f?e.bottom-Y-T.bottom:e.top+Y+T.top;else{var N="left"===f;R=N?e.left+Y+T.top:e.right-Y-T.top,L=e.top+(e.bottom-e.top)/2,W=N?-.5*Math.PI:.5*Math.PI}s.save(),s.translate(R,L),s.rotate(W),s.textAlign="center",s.textBaseline="middle",s.fillStyle=C,s.font=P.string,s.fillText(c.labelString,0,0),s.restore()}if(A){var z,V,H,E,B=A,j=di(h.lineWidth,y.length-1,0);p?(z=F(o,e.left,B)-B/2,V=F(o,e.right,j)+j/2,H=E=n):(H=F(o,e.top,B)-B/2,E=F(o,e.bottom,j)+j/2,z=V=n),s.lineWidth=A,s.strokeStyle=di(h.color,0),s.beginPath(),s.moveTo(z,H),s.lineTo(V,E),s.stroke()}}}}),gi=fi.extend({getLabels:function(){var t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels},determineDataLimits:function(){var t,e=this,i=e.getLabels();e.minIndex=0,e.maxIndex=i.length-1,void 0!==e.options.ticks.min&&(t=i.indexOf(e.options.ticks.min),e.minIndex=-1!==t?t:e.minIndex),void 0!==e.options.ticks.max&&(t=i.indexOf(e.options.ticks.max),e.maxIndex=-1!==t?t:e.maxIndex),e.min=i[e.minIndex],e.max=i[e.maxIndex]},buildTicks:function(){var t=this,e=t.getLabels();t.ticks=0===t.minIndex&&t.maxIndex===e.length-1?e:e.slice(t.minIndex,t.maxIndex+1)},getLabelForIndex:function(t,e){var i=this,n=i.chart;return n.getDatasetMeta(e).controller._getValueScaleId()===i.id?i.getRightValue(n.data.datasets[e].data[t]):i.ticks[t-i.minIndex]},getPixelForValue:function(t,e){var i,n=this,a=n.options.offset,r=Math.max(n.maxIndex+1-n.minIndex-(a?0:1),1);if(null!=t&&(i=n.isHorizontal()?t.x:t.y),void 0!==i||void 0!==t&&isNaN(e)){t=i||t;var o=n.getLabels().indexOf(t);e=-1!==o?o:e}if(n.isHorizontal()){var s=n.width/r,l=s*(e-n.minIndex);return a&&(l+=s/2),n.left+l}var u=n.height/r,d=u*(e-n.minIndex);return a&&(d+=u/2),n.top+d},getPixelForTick:function(t){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null)},getValueForPixel:function(t){var e=this,i=e.options.offset,n=Math.max(e._ticks.length-(i?0:1),1),a=e.isHorizontal(),r=(a?e.width:e.height)/n;return t-=a?e.left:e.top,i&&(t-=r/2),(t<=0?0:Math.round(t/r))+e.minIndex},getBasePixel:function(){return this.bottom}}),mi={position:"bottom"};gi._defaults=mi;var pi=ut.noop,vi=ut.isNullOrUndef;var yi=fi.extend({getRightValue:function(t){return"string"==typeof t?+t:fi.prototype.getRightValue.call(this,t)},handleTickRangeOptions:function(){var t=this,e=t.options.ticks;if(e.beginAtZero){var i=ut.sign(t.min),n=ut.sign(t.max);i<0&&n<0?t.max=0:i>0&&n>0&&(t.min=0)}var a=void 0!==e.min||void 0!==e.suggestedMin,r=void 0!==e.max||void 0!==e.suggestedMax;void 0!==e.min?t.min=e.min:void 0!==e.suggestedMin&&(null===t.min?t.min=e.suggestedMin:t.min=Math.min(t.min,e.suggestedMin)),void 0!==e.max?t.max=e.max:void 0!==e.suggestedMax&&(null===t.max?t.max=e.suggestedMax:t.max=Math.max(t.max,e.suggestedMax)),a!==r&&t.min>=t.max&&(a?t.max=t.min+1:t.min=t.max-1),t.min===t.max&&(t.max++,e.beginAtZero||t.min--)},getTickLimit:function(){var t,e=this.options.ticks,i=e.stepSize,n=e.maxTicksLimit;return i?t=Math.ceil(this.max/i)-Math.floor(this.min/i)+1:(t=this._computeTickLimit(),n=n||11),n&&(t=Math.min(n,t)),t},_computeTickLimit:function(){return Number.POSITIVE_INFINITY},handleDirectionalChanges:pi,buildTicks:function(){var t=this,e=t.options.ticks,i=t.getTickLimit(),n={maxTicks:i=Math.max(2,i),min:e.min,max:e.max,precision:e.precision,stepSize:ut.valueOrDefault(e.fixedStepSize,e.stepSize)},a=t.ticks=function(t,e){var i,n,a,r,o=[],s=t.stepSize,l=s||1,u=t.maxTicks-1,d=t.min,h=t.max,c=t.precision,f=e.min,g=e.max,m=ut.niceNum((g-f)/u/l)*l;if(m<1e-14&&vi(d)&&vi(h))return[f,g];(r=Math.ceil(g/m)-Math.floor(f/m))>u&&(m=ut.niceNum(r*m/u/l)*l),s||vi(c)?i=Math.pow(10,ut._decimalPlaces(m)):(i=Math.pow(10,c),m=Math.ceil(m*i)/i),n=Math.floor(f/m)*m,a=Math.ceil(g/m)*m,s&&(!vi(d)&&ut.almostWhole(d/m,m/1e3)&&(n=d),!vi(h)&&ut.almostWhole(h/m,m/1e3)&&(a=h)),r=(a-n)/m,r=ut.almostEquals(r,Math.round(r),m/1e3)?Math.round(r):Math.ceil(r),n=Math.round(n*i)/i,a=Math.round(a*i)/i,o.push(vi(d)?n:d);for(var p=1;p<r;++p)o.push(Math.round((n+p*m)*i)/i);return o.push(vi(h)?a:h),o}(n,t);t.handleDirectionalChanges(),t.max=ut.max(a),t.min=ut.min(a),e.reverse?(a.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){var t=this;t.ticksAsNumbers=t.ticks.slice(),t.zeroLineIndex=t.ticks.indexOf(0),fi.prototype.convertTicksToLabels.call(t)}}),bi={position:"left",ticks:{callback:li.formatters.linear}},xi=yi.extend({determineDataLimits:function(){var t=this,e=t.options,i=t.chart,n=i.data.datasets,a=t.isHorizontal();function r(e){return a?e.xAxisID===t.id:e.yAxisID===t.id}t.min=null,t.max=null;var o=e.stacked;if(void 0===o&&ut.each(n,function(t,e){if(!o){var n=i.getDatasetMeta(e);i.isDatasetVisible(e)&&r(n)&&void 0!==n.stack&&(o=!0)}}),e.stacked||o){var s={};ut.each(n,function(n,a){var o=i.getDatasetMeta(a),l=[o.type,void 0===e.stacked&&void 0===o.stack?a:"",o.stack].join(".");void 0===s[l]&&(s[l]={positiveValues:[],negativeValues:[]});var u=s[l].positiveValues,d=s[l].negativeValues;i.isDatasetVisible(a)&&r(o)&&ut.each(n.data,function(i,n){var a=+t.getRightValue(i);isNaN(a)||o.data[n].hidden||(u[n]=u[n]||0,d[n]=d[n]||0,e.relativePoints?u[n]=100:a<0?d[n]+=a:u[n]+=a)})}),ut.each(s,function(e){var i=e.positiveValues.concat(e.negativeValues),n=ut.min(i),a=ut.max(i);t.min=null===t.min?n:Math.min(t.min,n),t.max=null===t.max?a:Math.max(t.max,a)})}else ut.each(n,function(e,n){var a=i.getDatasetMeta(n);i.isDatasetVisible(n)&&r(a)&&ut.each(e.data,function(e,i){var n=+t.getRightValue(e);isNaN(n)||a.data[i].hidden||(null===t.min?t.min=n:n<t.min&&(t.min=n),null===t.max?t.max=n:n>t.max&&(t.max=n))})});t.min=isFinite(t.min)&&!isNaN(t.min)?t.min:0,t.max=isFinite(t.max)&&!isNaN(t.max)?t.max:1,this.handleTickRangeOptions()},_computeTickLimit:function(){var t;return this.isHorizontal()?Math.ceil(this.width/40):(t=ut.options._parseFont(this.options.ticks),Math.ceil(this.height/t.lineHeight))},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t){var e=this,i=e.start,n=+e.getRightValue(t),a=e.end-i;return e.isHorizontal()?e.left+e.width/a*(n-i):e.bottom-e.height/a*(n-i)},getValueForPixel:function(t){var e=this,i=e.isHorizontal(),n=i?e.width:e.height,a=(i?t-e.left:e.bottom-t)/n;return e.start+(e.end-e.start)*a},getPixelForTick:function(t){return this.getPixelForValue(this.ticksAsNumbers[t])}}),_i=bi;xi._defaults=_i;var ki=ut.valueOrDefault;var wi={position:"left",ticks:{callback:li.formatters.logarithmic}};function Mi(t,e){return ut.isFinite(t)&&t>=0?t:e}var Si=fi.extend({determineDataLimits:function(){var t=this,e=t.options,i=t.chart,n=i.data.datasets,a=t.isHorizontal();function r(e){return a?e.xAxisID===t.id:e.yAxisID===t.id}t.min=null,t.max=null,t.minNotZero=null;var o=e.stacked;if(void 0===o&&ut.each(n,function(t,e){if(!o){var n=i.getDatasetMeta(e);i.isDatasetVisible(e)&&r(n)&&void 0!==n.stack&&(o=!0)}}),e.stacked||o){var s={};ut.each(n,function(n,a){var o=i.getDatasetMeta(a),l=[o.type,void 0===e.stacked&&void 0===o.stack?a:"",o.stack].join(".");i.isDatasetVisible(a)&&r(o)&&(void 0===s[l]&&(s[l]=[]),ut.each(n.data,function(e,i){var n=s[l],a=+t.getRightValue(e);isNaN(a)||o.data[i].hidden||a<0||(n[i]=n[i]||0,n[i]+=a)}))}),ut.each(s,function(e){if(e.length>0){var i=ut.min(e),n=ut.max(e);t.min=null===t.min?i:Math.min(t.min,i),t.max=null===t.max?n:Math.max(t.max,n)}})}else ut.each(n,function(e,n){var a=i.getDatasetMeta(n);i.isDatasetVisible(n)&&r(a)&&ut.each(e.data,function(e,i){var n=+t.getRightValue(e);isNaN(n)||a.data[i].hidden||n<0||(null===t.min?t.min=n:n<t.min&&(t.min=n),null===t.max?t.max=n:n>t.max&&(t.max=n),0!==n&&(null===t.minNotZero||n<t.minNotZero)&&(t.minNotZero=n))})});this.handleTickRangeOptions()},handleTickRangeOptions:function(){var t=this,e=t.options.ticks;t.min=Mi(e.min,t.min),t.max=Mi(e.max,t.max),t.min===t.max&&(0!==t.min&&null!==t.min?(t.min=Math.pow(10,Math.floor(ut.log10(t.min))-1),t.max=Math.pow(10,Math.floor(ut.log10(t.max))+1)):(t.min=1,t.max=10)),null===t.min&&(t.min=Math.pow(10,Math.floor(ut.log10(t.max))-1)),null===t.max&&(t.max=0!==t.min?Math.pow(10,Math.floor(ut.log10(t.min))+1):10),null===t.minNotZero&&(t.min>0?t.minNotZero=t.min:t.max<1?t.minNotZero=Math.pow(10,Math.floor(ut.log10(t.max))):t.minNotZero=1)},buildTicks:function(){var t=this,e=t.options.ticks,i=!t.isHorizontal(),n={min:Mi(e.min),max:Mi(e.max)},a=t.ticks=function(t,e){var i,n,a=[],r=ki(t.min,Math.pow(10,Math.floor(ut.log10(e.min)))),o=Math.floor(ut.log10(e.max)),s=Math.ceil(e.max/Math.pow(10,o));0===r?(i=Math.floor(ut.log10(e.minNotZero)),n=Math.floor(e.minNotZero/Math.pow(10,i)),a.push(r),r=n*Math.pow(10,i)):(i=Math.floor(ut.log10(r)),n=Math.floor(r/Math.pow(10,i)));var l=i<0?Math.pow(10,Math.abs(i)):1;do{a.push(r),10==++n&&(n=1,l=++i>=0?1:l),r=Math.round(n*Math.pow(10,i)*l)/l}while(i<o||i===o&&n<s);var u=ki(t.max,r);return a.push(u),a}(n,t);t.max=ut.max(a),t.min=ut.min(a),e.reverse?(i=!i,t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max),i&&a.reverse()},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),fi.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t){return this.getPixelForValue(this.tickValues[t])},_getFirstTickValue:function(t){var e=Math.floor(ut.log10(t));return Math.floor(t/Math.pow(10,e))*Math.pow(10,e)},getPixelForValue:function(t){var e,i,n,a,r,o=this,s=o.options.ticks,l=s.reverse,u=ut.log10,d=o._getFirstTickValue(o.minNotZero),h=0;return t=+o.getRightValue(t),l?(n=o.end,a=o.start,r=-1):(n=o.start,a=o.end,r=1),o.isHorizontal()?(e=o.width,i=l?o.right:o.left):(e=o.height,r*=-1,i=l?o.top:o.bottom),t!==n&&(0===n&&(e-=h=ki(s.fontSize,ot.global.defaultFontSize),n=d),0!==t&&(h+=e/(u(a)-u(n))*(u(t)-u(n))),i+=r*h),i},getValueForPixel:function(t){var e,i,n,a,r=this,o=r.options.ticks,s=o.reverse,l=ut.log10,u=r._getFirstTickValue(r.minNotZero);if(s?(i=r.end,n=r.start):(i=r.start,n=r.end),r.isHorizontal()?(e=r.width,a=s?r.right-t:t-r.left):(e=r.height,a=s?t-r.top:r.bottom-t),a!==i){if(0===i){var d=ki(o.fontSize,ot.global.defaultFontSize);a-=d,e-=d,i=u}a*=l(n)-l(i),a/=e,a=Math.pow(10,l(i)+a)}return a}}),Di=wi;Si._defaults=Di;var Ci=ut.valueOrDefault,Pi=ut.valueAtIndexOrDefault,Ti=ut.options.resolve,Oi={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,borderDash:[],borderDashOffset:0},gridLines:{circular:!1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:li.formatters.linear},pointLabels:{display:!0,fontSize:10,callback:function(t){return t}}};function Ii(t){var e=t.options;return e.angleLines.display||e.pointLabels.display?t.chart.data.labels.length:0}function Ai(t){var e=t.ticks;return e.display&&t.display?Ci(e.fontSize,ot.global.defaultFontSize)+2*e.backdropPaddingY:0}function Fi(t,e,i,n,a){return t===n||t===a?{start:e-i/2,end:e+i/2}:t<n||t>a?{start:e-i,end:e}:{start:e,end:e+i}}function Ri(t){return 0===t||180===t?"center":t<180?"left":"right"}function Li(t,e,i,n){var a,r,o=i.y+n/2;if(ut.isArray(e))for(a=0,r=e.length;a<r;++a)t.fillText(e[a],i.x,o),o+=n;else t.fillText(e,i.x,o)}function Wi(t,e,i){90===t||270===t?i.y-=e.h/2:(t>270||t<90)&&(i.y-=e.h)}function Yi(t){return ut.isNumber(t)?t:0}var Ni=yi.extend({setDimensions:function(){var t=this;t.width=t.maxWidth,t.height=t.maxHeight,t.paddingTop=Ai(t.options)/2,t.xCenter=Math.floor(t.width/2),t.yCenter=Math.floor((t.height-t.paddingTop)/2),t.drawingArea=Math.min(t.height-t.paddingTop,t.width)/2},determineDataLimits:function(){var t=this,e=t.chart,i=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY;ut.each(e.data.datasets,function(a,r){if(e.isDatasetVisible(r)){var o=e.getDatasetMeta(r);ut.each(a.data,function(e,a){var r=+t.getRightValue(e);isNaN(r)||o.data[a].hidden||(i=Math.min(r,i),n=Math.max(r,n))})}}),t.min=i===Number.POSITIVE_INFINITY?0:i,t.max=n===Number.NEGATIVE_INFINITY?0:n,t.handleTickRangeOptions()},_computeTickLimit:function(){return Math.ceil(this.drawingArea/Ai(this.options))},convertTicksToLabels:function(){var t=this;yi.prototype.convertTicksToLabels.call(t),t.pointLabels=t.chart.data.labels.map(t.options.pointLabels.callback,t)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var t=this.options;t.display&&t.pointLabels.display?function(t){var e,i,n,a=ut.options._parseFont(t.options.pointLabels),r={l:0,r:t.width,t:0,b:t.height-t.paddingTop},o={};t.ctx.font=a.string,t._pointLabelSizes=[];var s,l,u,d=Ii(t);for(e=0;e<d;e++){n=t.getPointPosition(e,t.drawingArea+5),s=t.ctx,l=a.lineHeight,u=t.pointLabels[e]||"",i=ut.isArray(u)?{w:ut.longestText(s,s.font,u),h:u.length*l}:{w:s.measureText(u).width,h:l},t._pointLabelSizes[e]=i;var h=t.getIndexAngle(e),c=ut.toDegrees(h)%360,f=Fi(c,n.x,i.w,0,180),g=Fi(c,n.y,i.h,90,270);f.start<r.l&&(r.l=f.start,o.l=h),f.end>r.r&&(r.r=f.end,o.r=h),g.start<r.t&&(r.t=g.start,o.t=h),g.end>r.b&&(r.b=g.end,o.b=h)}t.setReductions(t.drawingArea,r,o)}(this):this.setCenterPoint(0,0,0,0)},setReductions:function(t,e,i){var n=this,a=e.l/Math.sin(i.l),r=Math.max(e.r-n.width,0)/Math.sin(i.r),o=-e.t/Math.cos(i.t),s=-Math.max(e.b-(n.height-n.paddingTop),0)/Math.cos(i.b);a=Yi(a),r=Yi(r),o=Yi(o),s=Yi(s),n.drawingArea=Math.min(Math.floor(t-(a+r)/2),Math.floor(t-(o+s)/2)),n.setCenterPoint(a,r,o,s)},setCenterPoint:function(t,e,i,n){var a=this,r=a.width-e-a.drawingArea,o=t+a.drawingArea,s=i+a.drawingArea,l=a.height-a.paddingTop-n-a.drawingArea;a.xCenter=Math.floor((o+r)/2+a.left),a.yCenter=Math.floor((s+l)/2+a.top+a.paddingTop)},getIndexAngle:function(t){return t*(2*Math.PI/Ii(this))+(this.chart.options&&this.chart.options.startAngle?this.chart.options.startAngle:0)*Math.PI*2/360},getDistanceFromCenterForValue:function(t){var e=this;if(null===t)return 0;var i=e.drawingArea/(e.max-e.min);return e.options.ticks.reverse?(e.max-t)*i:(t-e.min)*i},getPointPosition:function(t,e){var i=this.getIndexAngle(t)-Math.PI/2;return{x:Math.cos(i)*e+this.xCenter,y:Math.sin(i)*e+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this.min,e=this.max;return this.getPointPositionForValue(0,this.beginAtZero?0:t<0&&e<0?e:t>0&&e>0?t:0)},draw:function(){var t=this,e=t.options,i=e.gridLines,n=e.ticks;if(e.display){var a=t.ctx,r=this.getIndexAngle(0),o=ut.options._parseFont(n);(e.angleLines.display||e.pointLabels.display)&&function(t){var e=t.ctx,i=t.options,n=i.angleLines,a=i.gridLines,r=i.pointLabels,o=Ci(n.lineWidth,a.lineWidth),s=Ci(n.color,a.color),l=Ai(i);e.save(),e.lineWidth=o,e.strokeStyle=s,e.setLineDash&&(e.setLineDash(Ti([n.borderDash,a.borderDash,[]])),e.lineDashOffset=Ti([n.borderDashOffset,a.borderDashOffset,0]));var u=t.getDistanceFromCenterForValue(i.ticks.reverse?t.min:t.max),d=ut.options._parseFont(r);e.font=d.string,e.textBaseline="middle";for(var h=Ii(t)-1;h>=0;h--){if(n.display&&o&&s){var c=t.getPointPosition(h,u);e.beginPath(),e.moveTo(t.xCenter,t.yCenter),e.lineTo(c.x,c.y),e.stroke()}if(r.display){var f=0===h?l/2:0,g=t.getPointPosition(h,u+f+5),m=Pi(r.fontColor,h,ot.global.defaultFontColor);e.fillStyle=m;var p=t.getIndexAngle(h),v=ut.toDegrees(p);e.textAlign=Ri(v),Wi(v,t._pointLabelSizes[h],g),Li(e,t.pointLabels[h]||"",g,d.lineHeight)}}e.restore()}(t),ut.each(t.ticks,function(e,s){if(s>0||n.reverse){var l=t.getDistanceFromCenterForValue(t.ticksAsNumbers[s]);if(i.display&&0!==s&&function(t,e,i,n){var a,r=t.ctx,o=e.circular,s=Ii(t),l=Pi(e.color,n-1),u=Pi(e.lineWidth,n-1);if((o||s)&&l&&u){if(r.save(),r.strokeStyle=l,r.lineWidth=u,r.setLineDash&&(r.setLineDash(e.borderDash||[]),r.lineDashOffset=e.borderDashOffset||0),r.beginPath(),o)r.arc(t.xCenter,t.yCenter,i,0,2*Math.PI);else{a=t.getPointPosition(0,i),r.moveTo(a.x,a.y);for(var d=1;d<s;d++)a=t.getPointPosition(d,i),r.lineTo(a.x,a.y)}r.closePath(),r.stroke(),r.restore()}}(t,i,l,s),n.display){var u=Ci(n.fontColor,ot.global.defaultFontColor);if(a.font=o.string,a.save(),a.translate(t.xCenter,t.yCenter),a.rotate(r),n.showLabelBackdrop){var d=a.measureText(e).width;a.fillStyle=n.backdropColor,a.fillRect(-d/2-n.backdropPaddingX,-l-o.size/2-n.backdropPaddingY,d+2*n.backdropPaddingX,o.size+2*n.backdropPaddingY)}a.textAlign="center",a.textBaseline="middle",a.fillStyle=u,a.fillText(e,0,-l),a.restore()}}})}}}),zi=Oi;Ni._defaults=zi;var Vi=ut.valueOrDefault,Hi=Number.MIN_SAFE_INTEGER||-9007199254740991,Ei=Number.MAX_SAFE_INTEGER||9007199254740991,Bi={millisecond:{common:!0,size:1,steps:[1,2,5,10,20,50,100,250,500]},second:{common:!0,size:1e3,steps:[1,2,5,10,15,30]},minute:{common:!0,size:6e4,steps:[1,2,5,10,15,30]},hour:{common:!0,size:36e5,steps:[1,2,3,6,12]},day:{common:!0,size:864e5,steps:[1,2,5]},week:{common:!1,size:6048e5,steps:[1,2,3,4]},month:{common:!0,size:2628e6,steps:[1,2,3]},quarter:{common:!1,size:7884e6,steps:[1,2,3,4]},year:{common:!0,size:3154e7}},ji=Object.keys(Bi);function Ui(t,e){return t-e}function Gi(t){var e,i,n,a={},r=[];for(e=0,i=t.length;e<i;++e)a[n=t[e]]||(a[n]=!0,r.push(n));return r}function qi(t,e,i,n){var a=function(t,e,i){for(var n,a,r,o=0,s=t.length-1;o>=0&&o<=s;){if(a=t[(n=o+s>>1)-1]||null,r=t[n],!a)return{lo:null,hi:r};if(r[e]<i)o=n+1;else{if(!(a[e]>i))return{lo:a,hi:r};s=n-1}}return{lo:r,hi:null}}(t,e,i),r=a.lo?a.hi?a.lo:t[t.length-2]:t[0],o=a.lo?a.hi?a.hi:t[t.length-1]:t[1],s=o[e]-r[e],l=s?(i-r[e])/s:0,u=(o[n]-r[n])*l;return r[n]+u}function Zi(t,e){var i=t._adapter,n=t.options.time,a=n.parser,r=a||n.format,o=e;return"function"==typeof a&&(o=a(o)),ut.isFinite(o)||(o="string"==typeof r?i.parse(o,r):i.parse(o)),null!==o?+o:(a||"function"!=typeof r||(o=r(e),ut.isFinite(o)||(o=i.parse(o))),o)}function $i(t,e){if(ut.isNullOrUndef(e))return null;var i=t.options.time,n=Zi(t,t.getRightValue(e));return null===n?n:(i.round&&(n=+t._adapter.startOf(n,i.round)),n)}function Xi(t){for(var e=ji.indexOf(t)+1,i=ji.length;e<i;++e)if(Bi[ji[e]].common)return ji[e]}function Ki(t,e,i,n){var a,r=t._adapter,o=t.options,s=o.time,l=s.unit||function(t,e,i,n){var a,r,o,s=ji.length;for(a=ji.indexOf(t);a<s-1;++a)if(o=(r=Bi[ji[a]]).steps?r.steps[r.steps.length-1]:Ei,r.common&&Math.ceil((i-e)/(o*r.size))<=n)return ji[a];return ji[s-1]}(s.minUnit,e,i,n),u=Xi(l),d=Vi(s.stepSize,s.unitStepSize),h="week"===l&&s.isoWeekday,c=o.ticks.major.enabled,f=Bi[l],g=e,m=i,p=[];for(d||(d=function(t,e,i,n){var a,r,o,s=e-t,l=Bi[i],u=l.size,d=l.steps;if(!d)return Math.ceil(s/(n*u));for(a=0,r=d.length;a<r&&(o=d[a],!(Math.ceil(s/(u*o))<=n));++a);return o}(e,i,l,n)),h&&(g=+r.startOf(g,"isoWeek",h),m=+r.startOf(m,"isoWeek",h)),g=+r.startOf(g,h?"day":l),(m=+r.startOf(m,h?"day":l))<i&&(m=+r.add(m,1,l)),a=g,c&&u&&!h&&!s.round&&(a=+r.startOf(a,u),a=+r.add(a,~~((g-a)/(f.size*d))*d,l));a<m;a=+r.add(a,d,l))p.push(+a);return p.push(+a),p}var Ji=fi.extend({initialize:function(){this.mergeTicksOptions(),fi.prototype.initialize.call(this)},update:function(){var t=this.options,e=t.time||(t.time={}),i=this._adapter=new si._date(t.adapters.date);return e.format&&console.warn("options.time.format is deprecated and replaced by options.time.parser."),ut.mergeIf(e.displayFormats,i.formats()),fi.prototype.update.apply(this,arguments)},getRightValue:function(t){return t&&void 0!==t.t&&(t=t.t),fi.prototype.getRightValue.call(this,t)},determineDataLimits:function(){var t,e,i,n,a,r,o=this,s=o.chart,l=o._adapter,u=o.options.time,d=u.unit||"day",h=Ei,c=Hi,f=[],g=[],m=[],p=s.data.labels||[];for(t=0,i=p.length;t<i;++t)m.push($i(o,p[t]));for(t=0,i=(s.data.datasets||[]).length;t<i;++t)if(s.isDatasetVisible(t))if(a=s.data.datasets[t].data,ut.isObject(a[0]))for(g[t]=[],e=0,n=a.length;e<n;++e)r=$i(o,a[e]),f.push(r),g[t][e]=r;else{for(e=0,n=m.length;e<n;++e)f.push(m[e]);g[t]=m.slice(0)}else g[t]=[];m.length&&(m=Gi(m).sort(Ui),h=Math.min(h,m[0]),c=Math.max(c,m[m.length-1])),f.length&&(f=Gi(f).sort(Ui),h=Math.min(h,f[0]),c=Math.max(c,f[f.length-1])),h=$i(o,u.min)||h,c=$i(o,u.max)||c,h=h===Ei?+l.startOf(Date.now(),d):h,c=c===Hi?+l.endOf(Date.now(),d)+1:c,o.min=Math.min(h,c),o.max=Math.max(h+1,c),o._horizontal=o.isHorizontal(),o._table=[],o._timestamps={data:f,datasets:g,labels:m}},buildTicks:function(){var t,e,i,n=this,a=n.min,r=n.max,o=n.options,s=o.time,l=[],u=[];switch(o.ticks.source){case"data":l=n._timestamps.data;break;case"labels":l=n._timestamps.labels;break;case"auto":default:l=Ki(n,a,r,n.getLabelCapacity(a))}for("ticks"===o.bounds&&l.length&&(a=l[0],r=l[l.length-1]),a=$i(n,s.min)||a,r=$i(n,s.max)||r,t=0,e=l.length;t<e;++t)(i=l[t])>=a&&i<=r&&u.push(i);return n.min=a,n.max=r,n._unit=s.unit||function(t,e,i,n,a){var r,o;for(r=ji.length-1;r>=ji.indexOf(i);r--)if(o=ji[r],Bi[o].common&&t._adapter.diff(a,n,o)>=e.length)return o;return ji[i?ji.indexOf(i):0]}(n,u,s.minUnit,n.min,n.max),n._majorUnit=Xi(n._unit),n._table=function(t,e,i,n){if("linear"===n||!t.length)return[{time:e,pos:0},{time:i,pos:1}];var a,r,o,s,l,u=[],d=[e];for(a=0,r=t.length;a<r;++a)(s=t[a])>e&&s<i&&d.push(s);for(d.push(i),a=0,r=d.length;a<r;++a)l=d[a+1],o=d[a-1],s=d[a],void 0!==o&&void 0!==l&&Math.round((l+o)/2)===s||u.push({time:s,pos:a/(r-1)});return u}(n._timestamps.data,a,r,o.distribution),n._offsets=function(t,e,i,n,a){var r,o,s=0,l=0;return a.offset&&e.length&&(a.time.min||(r=qi(t,"time",e[0],"pos"),s=1===e.length?1-r:(qi(t,"time",e[1],"pos")-r)/2),a.time.max||(o=qi(t,"time",e[e.length-1],"pos"),l=1===e.length?o:(o-qi(t,"time",e[e.length-2],"pos"))/2)),{start:s,end:l}}(n._table,u,0,0,o),o.ticks.reverse&&u.reverse(),function(t,e,i){var n,a,r,o,s=[];for(n=0,a=e.length;n<a;++n)r=e[n],o=!!i&&r===+t._adapter.startOf(r,i),s.push({value:r,major:o});return s}(n,u,n._majorUnit)},getLabelForIndex:function(t,e){var i=this,n=i._adapter,a=i.chart.data,r=i.options.time,o=a.labels&&t<a.labels.length?a.labels[t]:"",s=a.datasets[e].data[t];return ut.isObject(s)&&(o=i.getRightValue(s)),r.tooltipFormat?n.format(Zi(i,o),r.tooltipFormat):"string"==typeof o?o:n.format(Zi(i,o),r.displayFormats.datetime)},tickFormatFunction:function(t,e,i,n){var a=this._adapter,r=this.options,o=r.time.displayFormats,s=o[this._unit],l=this._majorUnit,u=o[l],d=+a.startOf(t,l),h=r.ticks.major,c=h.enabled&&l&&u&&t===d,f=a.format(t,n||(c?u:s)),g=c?h:r.ticks.minor,m=Vi(g.callback,g.userCallback);return m?m(f,e,i):f},convertTicksToLabels:function(t){var e,i,n=[];for(e=0,i=t.length;e<i;++e)n.push(this.tickFormatFunction(t[e].value,e,t));return n},getPixelForOffset:function(t){var e=this,i=e.options.ticks.reverse,n=e._horizontal?e.width:e.height,a=e._horizontal?i?e.right:e.left:i?e.bottom:e.top,r=qi(e._table,"time",t,"pos"),o=n*(e._offsets.start+r)/(e._offsets.start+1+e._offsets.end);return i?a-o:a+o},getPixelForValue:function(t,e,i){var n=null;if(void 0!==e&&void 0!==i&&(n=this._timestamps.datasets[i][e]),null===n&&(n=$i(this,t)),null!==n)return this.getPixelForOffset(n)},getPixelForTick:function(t){var e=this.getTicks();return t>=0&&t<e.length?this.getPixelForOffset(e[t].value):null},getValueForPixel:function(t){var e=this,i=e._horizontal?e.width:e.height,n=e._horizontal?e.left:e.top,a=(i?(t-n)/i:0)*(e._offsets.start+1+e._offsets.start)-e._offsets.end,r=qi(e._table,"pos",a,"time");return e._adapter._create(r)},getLabelWidth:function(t){var e=this.options.ticks,i=this.ctx.measureText(t).width,n=ut.toRadians(e.maxRotation),a=Math.cos(n),r=Math.sin(n);return i*a+Vi(e.fontSize,ot.global.defaultFontSize)*r},getLabelCapacity:function(t){var e=this,i=e.options.time.displayFormats.millisecond,n=e.tickFormatFunction(t,0,[],i),a=e.getLabelWidth(n),r=e.isHorizontal()?e.width:e.height,o=Math.floor(r/a);return o>0?o:1}}),Qi={position:"bottom",distribution:"linear",bounds:"data",adapters:{},time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{autoSkip:!1,source:"auto",major:{enabled:!1}}};Ji._defaults=Qi;var tn,en={category:gi,linear:xi,logarithmic:Si,radialLinear:Ni,time:Ji},nn=(function(t,e){t.exports=function(){var e,i;function n(){return e.apply(null,arguments)}function a(t){return t instanceof Array||"[object Array]"===Object.prototype.toString.call(t)}function r(t){return null!=t&&"[object Object]"===Object.prototype.toString.call(t)}function o(t){return void 0===t}function s(t){return"number"==typeof t||"[object Number]"===Object.prototype.toString.call(t)}function l(t){return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t)}function u(t,e){var i,n=[];for(i=0;i<t.length;++i)n.push(e(t[i],i));return n}function d(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function h(t,e){for(var i in e)d(e,i)&&(t[i]=e[i]);return d(e,"toString")&&(t.toString=e.toString),d(e,"valueOf")&&(t.valueOf=e.valueOf),t}function c(t,e,i,n){return Oe(t,e,i,n,!0).utc()}function f(t){return null==t._pf&&(t._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),t._pf}function g(t){if(null==t._isValid){var e=f(t),n=i.call(e.parsedDateParts,function(t){return null!=t}),a=!isNaN(t._d.getTime())&&e.overflow<0&&!e.empty&&!e.invalidMonth&&!e.invalidWeekday&&!e.weekdayMismatch&&!e.nullInput&&!e.invalidFormat&&!e.userInvalidated&&(!e.meridiem||e.meridiem&&n);if(t._strict&&(a=a&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour),null!=Object.isFrozen&&Object.isFrozen(t))return a;t._isValid=a}return t._isValid}function m(t){var e=c(NaN);return null!=t?h(f(e),t):f(e).userInvalidated=!0,e}i=Array.prototype.some?Array.prototype.some:function(t){for(var e=Object(this),i=e.length>>>0,n=0;n<i;n++)if(n in e&&t.call(this,e[n],n,e))return!0;return!1};var p=n.momentProperties=[];function v(t,e){var i,n,a;if(o(e._isAMomentObject)||(t._isAMomentObject=e._isAMomentObject),o(e._i)||(t._i=e._i),o(e._f)||(t._f=e._f),o(e._l)||(t._l=e._l),o(e._strict)||(t._strict=e._strict),o(e._tzm)||(t._tzm=e._tzm),o(e._isUTC)||(t._isUTC=e._isUTC),o(e._offset)||(t._offset=e._offset),o(e._pf)||(t._pf=f(e)),o(e._locale)||(t._locale=e._locale),p.length>0)for(i=0;i<p.length;i++)n=p[i],o(a=e[n])||(t[n]=a);return t}var y=!1;function b(t){v(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===y&&(y=!0,n.updateOffset(this),y=!1)}function x(t){return t instanceof b||null!=t&&null!=t._isAMomentObject}function _(t){return t<0?Math.ceil(t)||0:Math.floor(t)}function k(t){var e=+t,i=0;return 0!==e&&isFinite(e)&&(i=_(e)),i}function w(t,e,i){var n,a=Math.min(t.length,e.length),r=Math.abs(t.length-e.length),o=0;for(n=0;n<a;n++)(i&&t[n]!==e[n]||!i&&k(t[n])!==k(e[n]))&&o++;return o+r}function M(t){!1===n.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function S(t,e){var i=!0;return h(function(){if(null!=n.deprecationHandler&&n.deprecationHandler(null,t),i){for(var a,r=[],o=0;o<arguments.length;o++){if(a="","object"==typeof arguments[o]){for(var s in a+="\n["+o+"] ",arguments[0])a+=s+": "+arguments[0][s]+", ";a=a.slice(0,-2)}else a=arguments[o];r.push(a)}M(t+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),i=!1}return e.apply(this,arguments)},e)}var D,C={};function P(t,e){null!=n.deprecationHandler&&n.deprecationHandler(t,e),C[t]||(M(e),C[t]=!0)}function T(t){return t instanceof Function||"[object Function]"===Object.prototype.toString.call(t)}function O(t,e){var i,n=h({},t);for(i in e)d(e,i)&&(r(t[i])&&r(e[i])?(n[i]={},h(n[i],t[i]),h(n[i],e[i])):null!=e[i]?n[i]=e[i]:delete n[i]);for(i in t)d(t,i)&&!d(e,i)&&r(t[i])&&(n[i]=h({},n[i]));return n}function I(t){null!=t&&this.set(t)}n.suppressDeprecationWarnings=!1,n.deprecationHandler=null,D=Object.keys?Object.keys:function(t){var e,i=[];for(e in t)d(t,e)&&i.push(e);return i};var A={};function F(t,e){var i=t.toLowerCase();A[i]=A[i+"s"]=A[e]=t}function R(t){return"string"==typeof t?A[t]||A[t.toLowerCase()]:void 0}function L(t){var e,i,n={};for(i in t)d(t,i)&&(e=R(i))&&(n[e]=t[i]);return n}var W={};function Y(t,e){W[t]=e}function N(t,e,i){var n=""+Math.abs(t),a=e-n.length,r=t>=0;return(r?i?"+":"":"-")+Math.pow(10,Math.max(0,a)).toString().substr(1)+n}var z=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,V=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,H={},E={};function B(t,e,i,n){var a=n;"string"==typeof n&&(a=function(){return this[n]()}),t&&(E[t]=a),e&&(E[e[0]]=function(){return N(a.apply(this,arguments),e[1],e[2])}),i&&(E[i]=function(){return this.localeData().ordinal(a.apply(this,arguments),t)})}function j(t,e){return t.isValid()?(e=U(e,t.localeData()),H[e]=H[e]||function(t){var e,i,n,a=t.match(z);for(e=0,i=a.length;e<i;e++)E[a[e]]?a[e]=E[a[e]]:a[e]=(n=a[e]).match(/\[[\s\S]/)?n.replace(/^\[|\]$/g,""):n.replace(/\\/g,"");return function(e){var n,r="";for(n=0;n<i;n++)r+=T(a[n])?a[n].call(e,t):a[n];return r}}(e),H[e](t)):t.localeData().invalidDate()}function U(t,e){var i=5;function n(t){return e.longDateFormat(t)||t}for(V.lastIndex=0;i>=0&&V.test(t);)t=t.replace(V,n),V.lastIndex=0,i-=1;return t}var G=/\d/,q=/\d\d/,Z=/\d{3}/,$=/\d{4}/,X=/[+-]?\d{6}/,K=/\d\d?/,J=/\d\d\d\d?/,Q=/\d\d\d\d\d\d?/,tt=/\d{1,3}/,et=/\d{1,4}/,it=/[+-]?\d{1,6}/,nt=/\d+/,at=/[+-]?\d+/,rt=/Z|[+-]\d\d:?\d\d/gi,ot=/Z|[+-]\d\d(?::?\d\d)?/gi,st=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,lt={};function ut(t,e,i){lt[t]=T(e)?e:function(t,n){return t&&i?i:e}}function dt(t,e){return d(lt,t)?lt[t](e._strict,e._locale):new RegExp(ht(t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,i,n,a){return e||i||n||a})))}function ht(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var ct={};function ft(t,e){var i,n=e;for("string"==typeof t&&(t=[t]),s(e)&&(n=function(t,i){i[e]=k(t)}),i=0;i<t.length;i++)ct[t[i]]=n}function gt(t,e){ft(t,function(t,i,n,a){n._w=n._w||{},e(t,n._w,n,a)})}function mt(t,e,i){null!=e&&d(ct,t)&&ct[t](e,i._a,i,t)}var pt=0,vt=1,yt=2,bt=3,xt=4,_t=5,kt=6,wt=7,Mt=8;function St(t){return Dt(t)?366:365}function Dt(t){return t%4==0&&t%100!=0||t%400==0}B("Y",0,0,function(){var t=this.year();return t<=9999?""+t:"+"+t}),B(0,["YY",2],0,function(){return this.year()%100}),B(0,["YYYY",4],0,"year"),B(0,["YYYYY",5],0,"year"),B(0,["YYYYYY",6,!0],0,"year"),F("year","y"),Y("year",1),ut("Y",at),ut("YY",K,q),ut("YYYY",et,$),ut("YYYYY",it,X),ut("YYYYYY",it,X),ft(["YYYYY","YYYYYY"],pt),ft("YYYY",function(t,e){e[pt]=2===t.length?n.parseTwoDigitYear(t):k(t)}),ft("YY",function(t,e){e[pt]=n.parseTwoDigitYear(t)}),ft("Y",function(t,e){e[pt]=parseInt(t,10)}),n.parseTwoDigitYear=function(t){return k(t)+(k(t)>68?1900:2e3)};var Ct,Pt=Tt("FullYear",!0);function Tt(t,e){return function(i){return null!=i?(It(this,t,i),n.updateOffset(this,e),this):Ot(this,t)}}function Ot(t,e){return t.isValid()?t._d["get"+(t._isUTC?"UTC":"")+e]():NaN}function It(t,e,i){t.isValid()&&!isNaN(i)&&("FullYear"===e&&Dt(t.year())&&1===t.month()&&29===t.date()?t._d["set"+(t._isUTC?"UTC":"")+e](i,t.month(),At(i,t.month())):t._d["set"+(t._isUTC?"UTC":"")+e](i))}function At(t,e){if(isNaN(t)||isNaN(e))return NaN;var i,n=(e%(i=12)+i)%i;return t+=(e-n)/12,1===n?Dt(t)?29:28:31-n%7%2}Ct=Array.prototype.indexOf?Array.prototype.indexOf:function(t){var e;for(e=0;e<this.length;++e)if(this[e]===t)return e;return-1},B("M",["MM",2],"Mo",function(){return this.month()+1}),B("MMM",0,0,function(t){return this.localeData().monthsShort(this,t)}),B("MMMM",0,0,function(t){return this.localeData().months(this,t)}),F("month","M"),Y("month",8),ut("M",K),ut("MM",K,q),ut("MMM",function(t,e){return e.monthsShortRegex(t)}),ut("MMMM",function(t,e){return e.monthsRegex(t)}),ft(["M","MM"],function(t,e){e[vt]=k(t)-1}),ft(["MMM","MMMM"],function(t,e,i,n){var a=i._locale.monthsParse(t,n,i._strict);null!=a?e[vt]=a:f(i).invalidMonth=t});var Ft=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Rt="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Lt="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Wt(t,e){var i;if(!t.isValid())return t;if("string"==typeof e)if(/^\d+$/.test(e))e=k(e);else if(!s(e=t.localeData().monthsParse(e)))return t;return i=Math.min(t.date(),At(t.year(),e)),t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,i),t}function Yt(t){return null!=t?(Wt(this,t),n.updateOffset(this,!0),this):Ot(this,"Month")}var Nt=st,zt=st;function Vt(){function t(t,e){return e.length-t.length}var e,i,n=[],a=[],r=[];for(e=0;e<12;e++)i=c([2e3,e]),n.push(this.monthsShort(i,"")),a.push(this.months(i,"")),r.push(this.months(i,"")),r.push(this.monthsShort(i,""));for(n.sort(t),a.sort(t),r.sort(t),e=0;e<12;e++)n[e]=ht(n[e]),a[e]=ht(a[e]);for(e=0;e<24;e++)r[e]=ht(r[e]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+a.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+n.join("|")+")","i")}function Ht(t){var e;if(t<100&&t>=0){var i=Array.prototype.slice.call(arguments);i[0]=t+400,e=new Date(Date.UTC.apply(null,i)),isFinite(e.getUTCFullYear())&&e.setUTCFullYear(t)}else e=new Date(Date.UTC.apply(null,arguments));return e}function Et(t,e,i){var n=7+e-i,a=(7+Ht(t,0,n).getUTCDay()-e)%7;return-a+n-1}function Bt(t,e,i,n,a){var r,o,s=(7+i-n)%7,l=Et(t,n,a),u=1+7*(e-1)+s+l;return u<=0?o=St(r=t-1)+u:u>St(t)?(r=t+1,o=u-St(t)):(r=t,o=u),{year:r,dayOfYear:o}}function jt(t,e,i){var n,a,r=Et(t.year(),e,i),o=Math.floor((t.dayOfYear()-r-1)/7)+1;return o<1?(a=t.year()-1,n=o+Ut(a,e,i)):o>Ut(t.year(),e,i)?(n=o-Ut(t.year(),e,i),a=t.year()+1):(a=t.year(),n=o),{week:n,year:a}}function Ut(t,e,i){var n=Et(t,e,i),a=Et(t+1,e,i);return(St(t)-n+a)/7}function Gt(t,e){return t.slice(e,7).concat(t.slice(0,e))}B("w",["ww",2],"wo","week"),B("W",["WW",2],"Wo","isoWeek"),F("week","w"),F("isoWeek","W"),Y("week",5),Y("isoWeek",5),ut("w",K),ut("ww",K,q),ut("W",K),ut("WW",K,q),gt(["w","ww","W","WW"],function(t,e,i,n){e[n.substr(0,1)]=k(t)}),B("d",0,"do","day"),B("dd",0,0,function(t){return this.localeData().weekdaysMin(this,t)}),B("ddd",0,0,function(t){return this.localeData().weekdaysShort(this,t)}),B("dddd",0,0,function(t){return this.localeData().weekdays(this,t)}),B("e",0,0,"weekday"),B("E",0,0,"isoWeekday"),F("day","d"),F("weekday","e"),F("isoWeekday","E"),Y("day",11),Y("weekday",11),Y("isoWeekday",11),ut("d",K),ut("e",K),ut("E",K),ut("dd",function(t,e){return e.weekdaysMinRegex(t)}),ut("ddd",function(t,e){return e.weekdaysShortRegex(t)}),ut("dddd",function(t,e){return e.weekdaysRegex(t)}),gt(["dd","ddd","dddd"],function(t,e,i,n){var a=i._locale.weekdaysParse(t,n,i._strict);null!=a?e.d=a:f(i).invalidWeekday=t}),gt(["d","e","E"],function(t,e,i,n){e[n]=k(t)});var qt="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Zt="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),$t="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),Xt=st,Kt=st,Jt=st;function Qt(){function t(t,e){return e.length-t.length}var e,i,n,a,r,o=[],s=[],l=[],u=[];for(e=0;e<7;e++)i=c([2e3,1]).day(e),n=this.weekdaysMin(i,""),a=this.weekdaysShort(i,""),r=this.weekdays(i,""),o.push(n),s.push(a),l.push(r),u.push(n),u.push(a),u.push(r);for(o.sort(t),s.sort(t),l.sort(t),u.sort(t),e=0;e<7;e++)s[e]=ht(s[e]),l[e]=ht(l[e]),u[e]=ht(u[e]);this._weekdaysRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+o.join("|")+")","i")}function te(){return this.hours()%12||12}function ee(t,e){B(t,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),e)})}function ie(t,e){return e._meridiemParse}B("H",["HH",2],0,"hour"),B("h",["hh",2],0,te),B("k",["kk",2],0,function(){return this.hours()||24}),B("hmm",0,0,function(){return""+te.apply(this)+N(this.minutes(),2)}),B("hmmss",0,0,function(){return""+te.apply(this)+N(this.minutes(),2)+N(this.seconds(),2)}),B("Hmm",0,0,function(){return""+this.hours()+N(this.minutes(),2)}),B("Hmmss",0,0,function(){return""+this.hours()+N(this.minutes(),2)+N(this.seconds(),2)}),ee("a",!0),ee("A",!1),F("hour","h"),Y("hour",13),ut("a",ie),ut("A",ie),ut("H",K),ut("h",K),ut("k",K),ut("HH",K,q),ut("hh",K,q),ut("kk",K,q),ut("hmm",J),ut("hmmss",Q),ut("Hmm",J),ut("Hmmss",Q),ft(["H","HH"],bt),ft(["k","kk"],function(t,e,i){var n=k(t);e[bt]=24===n?0:n}),ft(["a","A"],function(t,e,i){i._isPm=i._locale.isPM(t),i._meridiem=t}),ft(["h","hh"],function(t,e,i){e[bt]=k(t),f(i).bigHour=!0}),ft("hmm",function(t,e,i){var n=t.length-2;e[bt]=k(t.substr(0,n)),e[xt]=k(t.substr(n)),f(i).bigHour=!0}),ft("hmmss",function(t,e,i){var n=t.length-4,a=t.length-2;e[bt]=k(t.substr(0,n)),e[xt]=k(t.substr(n,2)),e[_t]=k(t.substr(a)),f(i).bigHour=!0}),ft("Hmm",function(t,e,i){var n=t.length-2;e[bt]=k(t.substr(0,n)),e[xt]=k(t.substr(n))}),ft("Hmmss",function(t,e,i){var n=t.length-4,a=t.length-2;e[bt]=k(t.substr(0,n)),e[xt]=k(t.substr(n,2)),e[_t]=k(t.substr(a))});var ne,ae=Tt("Hours",!0),re={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Rt,monthsShort:Lt,week:{dow:0,doy:6},weekdays:qt,weekdaysMin:$t,weekdaysShort:Zt,meridiemParse:/[ap]\.?m?\.?/i},oe={},se={};function le(t){return t?t.toLowerCase().replace("_","-"):t}function ue(e){var i=null;if(!oe[e]&&t&&t.exports)try{i=ne._abbr;var n=_e;n("./locale/"+e),de(i)}catch(t){}return oe[e]}function de(t,e){var i;return t&&((i=o(e)?ce(t):he(t,e))?ne=i:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+t+" not found. Did you forget to load it?")),ne._abbr}function he(t,e){if(null!==e){var i,n=re;if(e.abbr=t,null!=oe[t])P("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=oe[t]._config;else if(null!=e.parentLocale)if(null!=oe[e.parentLocale])n=oe[e.parentLocale]._config;else{if(null==(i=ue(e.parentLocale)))return se[e.parentLocale]||(se[e.parentLocale]=[]),se[e.parentLocale].push({name:t,config:e}),null;n=i._config}return oe[t]=new I(O(n,e)),se[t]&&se[t].forEach(function(t){he(t.name,t.config)}),de(t),oe[t]}return delete oe[t],null}function ce(t){var e;if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return ne;if(!a(t)){if(e=ue(t))return e;t=[t]}return function(t){for(var e,i,n,a,r=0;r<t.length;){for(a=le(t[r]).split("-"),e=a.length,i=(i=le(t[r+1]))?i.split("-"):null;e>0;){if(n=ue(a.slice(0,e).join("-")))return n;if(i&&i.length>=e&&w(a,i,!0)>=e-1)break;e--}r++}return ne}(t)}function fe(t){var e,i=t._a;return i&&-2===f(t).overflow&&(e=i[vt]<0||i[vt]>11?vt:i[yt]<1||i[yt]>At(i[pt],i[vt])?yt:i[bt]<0||i[bt]>24||24===i[bt]&&(0!==i[xt]||0!==i[_t]||0!==i[kt])?bt:i[xt]<0||i[xt]>59?xt:i[_t]<0||i[_t]>59?_t:i[kt]<0||i[kt]>999?kt:-1,f(t)._overflowDayOfYear&&(e<pt||e>yt)&&(e=yt),f(t)._overflowWeeks&&-1===e&&(e=wt),f(t)._overflowWeekday&&-1===e&&(e=Mt),f(t).overflow=e),t}function ge(t,e,i){return null!=t?t:null!=e?e:i}function me(t){var e,i,a,r,o,s=[];if(!t._d){for(a=function(t){var e=new Date(n.now());return t._useUTC?[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()]:[e.getFullYear(),e.getMonth(),e.getDate()]}(t),t._w&&null==t._a[yt]&&null==t._a[vt]&&function(t){var e,i,n,a,r,o,s,l;if(null!=(e=t._w).GG||null!=e.W||null!=e.E)r=1,o=4,i=ge(e.GG,t._a[pt],jt(Ie(),1,4).year),n=ge(e.W,1),((a=ge(e.E,1))<1||a>7)&&(l=!0);else{r=t._locale._week.dow,o=t._locale._week.doy;var u=jt(Ie(),r,o);i=ge(e.gg,t._a[pt],u.year),n=ge(e.w,u.week),null!=e.d?((a=e.d)<0||a>6)&&(l=!0):null!=e.e?(a=e.e+r,(e.e<0||e.e>6)&&(l=!0)):a=r}n<1||n>Ut(i,r,o)?f(t)._overflowWeeks=!0:null!=l?f(t)._overflowWeekday=!0:(s=Bt(i,n,a,r,o),t._a[pt]=s.year,t._dayOfYear=s.dayOfYear)}(t),null!=t._dayOfYear&&(o=ge(t._a[pt],a[pt]),(t._dayOfYear>St(o)||0===t._dayOfYear)&&(f(t)._overflowDayOfYear=!0),i=Ht(o,0,t._dayOfYear),t._a[vt]=i.getUTCMonth(),t._a[yt]=i.getUTCDate()),e=0;e<3&&null==t._a[e];++e)t._a[e]=s[e]=a[e];for(;e<7;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];24===t._a[bt]&&0===t._a[xt]&&0===t._a[_t]&&0===t._a[kt]&&(t._nextDay=!0,t._a[bt]=0),t._d=(t._useUTC?Ht:function(t,e,i,n,a,r,o){var s;return t<100&&t>=0?(s=new Date(t+400,e,i,n,a,r,o),isFinite(s.getFullYear())&&s.setFullYear(t)):s=new Date(t,e,i,n,a,r,o),s}).apply(null,s),r=t._useUTC?t._d.getUTCDay():t._d.getDay(),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),t._nextDay&&(t._a[bt]=24),t._w&&void 0!==t._w.d&&t._w.d!==r&&(f(t).weekdayMismatch=!0)}}var pe=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ve=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ye=/Z|[+-]\d\d(?::?\d\d)?/,be=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],xe=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],ke=/^\/?Date\((\-?\d+)/i;function we(t){var e,i,n,a,r,o,s=t._i,l=pe.exec(s)||ve.exec(s);if(l){for(f(t).iso=!0,e=0,i=be.length;e<i;e++)if(be[e][1].exec(l[1])){a=be[e][0],n=!1!==be[e][2];break}if(null==a)return void(t._isValid=!1);if(l[3]){for(e=0,i=xe.length;e<i;e++)if(xe[e][1].exec(l[3])){r=(l[2]||" ")+xe[e][0];break}if(null==r)return void(t._isValid=!1)}if(!n&&null!=r)return void(t._isValid=!1);if(l[4]){if(!ye.exec(l[4]))return void(t._isValid=!1);o="Z"}t._f=a+(r||"")+(o||""),Pe(t)}else t._isValid=!1}var Me=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Se(t){var e=parseInt(t,10);return e<=49?2e3+e:e<=999?1900+e:e}var De={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Ce(t){var e,i,n,a,r,o,s,l=Me.exec(t._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(l){var u=(e=l[4],i=l[3],n=l[2],a=l[5],r=l[6],o=l[7],s=[Se(e),Lt.indexOf(i),parseInt(n,10),parseInt(a,10),parseInt(r,10)],o&&s.push(parseInt(o,10)),s);if(!function(t,e,i){if(t){var n=Zt.indexOf(t),a=new Date(e[0],e[1],e[2]).getDay();if(n!==a)return f(i).weekdayMismatch=!0,i._isValid=!1,!1}return!0}(l[1],u,t))return;t._a=u,t._tzm=function(t,e,i){if(t)return De[t];if(e)return 0;var n=parseInt(i,10),a=n%100,r=(n-a)/100;return 60*r+a}(l[8],l[9],l[10]),t._d=Ht.apply(null,t._a),t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),f(t).rfc2822=!0}else t._isValid=!1}function Pe(t){if(t._f!==n.ISO_8601)if(t._f!==n.RFC_2822){t._a=[],f(t).empty=!0;var e,i,a,r,o,s=""+t._i,l=s.length,u=0;for(a=U(t._f,t._locale).match(z)||[],e=0;e<a.length;e++)r=a[e],(i=(s.match(dt(r,t))||[])[0])&&((o=s.substr(0,s.indexOf(i))).length>0&&f(t).unusedInput.push(o),s=s.slice(s.indexOf(i)+i.length),u+=i.length),E[r]?(i?f(t).empty=!1:f(t).unusedTokens.push(r),mt(r,i,t)):t._strict&&!i&&f(t).unusedTokens.push(r);f(t).charsLeftOver=l-u,s.length>0&&f(t).unusedInput.push(s),t._a[bt]<=12&&!0===f(t).bigHour&&t._a[bt]>0&&(f(t).bigHour=void 0),f(t).parsedDateParts=t._a.slice(0),f(t).meridiem=t._meridiem,t._a[bt]=(d=t._locale,h=t._a[bt],null==(c=t._meridiem)?h:null!=d.meridiemHour?d.meridiemHour(h,c):null!=d.isPM?((g=d.isPM(c))&&h<12&&(h+=12),g||12!==h||(h=0),h):h),me(t),fe(t)}else Ce(t);else we(t);var d,h,c,g}function Te(t){var e=t._i,i=t._f;return t._locale=t._locale||ce(t._l),null===e||void 0===i&&""===e?m({nullInput:!0}):("string"==typeof e&&(t._i=e=t._locale.preparse(e)),x(e)?new b(fe(e)):(l(e)?t._d=e:a(i)?function(t){var e,i,n,a,r;if(0===t._f.length)return f(t).invalidFormat=!0,void(t._d=new Date(NaN));for(a=0;a<t._f.length;a++)r=0,e=v({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[a],Pe(e),g(e)&&(r+=f(e).charsLeftOver,r+=10*f(e).unusedTokens.length,f(e).score=r,(null==n||r<n)&&(n=r,i=e));h(t,i||e)}(t):i?Pe(t):function(t){var e=t._i;o(e)?t._d=new Date(n.now()):l(e)?t._d=new Date(e.valueOf()):"string"==typeof e?function(t){var e=ke.exec(t._i);null===e?(we(t),!1===t._isValid&&(delete t._isValid,Ce(t),!1===t._isValid&&(delete t._isValid,n.createFromInputFallback(t)))):t._d=new Date(+e[1])}(t):a(e)?(t._a=u(e.slice(0),function(t){return parseInt(t,10)}),me(t)):r(e)?function(t){if(!t._d){var e=L(t._i);t._a=u([e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],function(t){return t&&parseInt(t,10)}),me(t)}}(t):s(e)?t._d=new Date(e):n.createFromInputFallback(t)}(t),g(t)||(t._d=null),t))}function Oe(t,e,i,n,o){var s,l={};return!0!==i&&!1!==i||(n=i,i=void 0),(r(t)&&function(t){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(t).length;var e;for(e in t)if(t.hasOwnProperty(e))return!1;return!0}(t)||a(t)&&0===t.length)&&(t=void 0),l._isAMomentObject=!0,l._useUTC=l._isUTC=o,l._l=i,l._i=t,l._f=e,l._strict=n,(s=new b(fe(Te(l))))._nextDay&&(s.add(1,"d"),s._nextDay=void 0),s}function Ie(t,e,i,n){return Oe(t,e,i,n,!1)}n.createFromInputFallback=S("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(t){t._d=new Date(t._i+(t._useUTC?" UTC":""))}),n.ISO_8601=function(){},n.RFC_2822=function(){};var Ae=S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var t=Ie.apply(null,arguments);return this.isValid()&&t.isValid()?t<this?this:t:m()}),Fe=S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var t=Ie.apply(null,arguments);return this.isValid()&&t.isValid()?t>this?this:t:m()});function Re(t,e){var i,n;if(1===e.length&&a(e[0])&&(e=e[0]),!e.length)return Ie();for(i=e[0],n=1;n<e.length;++n)e[n].isValid()&&!e[n][t](i)||(i=e[n]);return i}var Le=["year","quarter","month","week","day","hour","minute","second","millisecond"];function We(t){var e=L(t),i=e.year||0,n=e.quarter||0,a=e.month||0,r=e.week||e.isoWeek||0,o=e.day||0,s=e.hour||0,l=e.minute||0,u=e.second||0,d=e.millisecond||0;this._isValid=function(t){for(var e in t)if(-1===Ct.call(Le,e)||null!=t[e]&&isNaN(t[e]))return!1;for(var i=!1,n=0;n<Le.length;++n)if(t[Le[n]]){if(i)return!1;parseFloat(t[Le[n]])!==k(t[Le[n]])&&(i=!0)}return!0}(e),this._milliseconds=+d+1e3*u+6e4*l+1e3*s*60*60,this._days=+o+7*r,this._months=+a+3*n+12*i,this._data={},this._locale=ce(),this._bubble()}function Ye(t){return t instanceof We}function Ne(t){return t<0?-1*Math.round(-1*t):Math.round(t)}function ze(t,e){B(t,0,0,function(){var t=this.utcOffset(),i="+";return t<0&&(t=-t,i="-"),i+N(~~(t/60),2)+e+N(~~t%60,2)})}ze("Z",":"),ze("ZZ",""),ut("Z",ot),ut("ZZ",ot),ft(["Z","ZZ"],function(t,e,i){i._useUTC=!0,i._tzm=He(ot,t)});var Ve=/([\+\-]|\d\d)/gi;function He(t,e){var i=(e||"").match(t);if(null===i)return null;var n=i[i.length-1]||[],a=(n+"").match(Ve)||["-",0,0],r=60*a[1]+k(a[2]);return 0===r?0:"+"===a[0]?r:-r}function Ee(t,e){var i,a;return e._isUTC?(i=e.clone(),a=(x(t)||l(t)?t.valueOf():Ie(t).valueOf())-i.valueOf(),i._d.setTime(i._d.valueOf()+a),n.updateOffset(i,!1),i):Ie(t).local()}function Be(t){return 15*-Math.round(t._d.getTimezoneOffset()/15)}function je(){return!!this.isValid()&&this._isUTC&&0===this._offset}n.updateOffset=function(){};var Ue=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Ge=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function qe(t,e){var i,n,a,r,o,l,u=t,h=null;return Ye(t)?u={ms:t._milliseconds,d:t._days,M:t._months}:s(t)?(u={},e?u[e]=t:u.milliseconds=t):(h=Ue.exec(t))?(i="-"===h[1]?-1:1,u={y:0,d:k(h[yt])*i,h:k(h[bt])*i,m:k(h[xt])*i,s:k(h[_t])*i,ms:k(Ne(1e3*h[kt]))*i}):(h=Ge.exec(t))?(i="-"===h[1]?-1:1,u={y:Ze(h[2],i),M:Ze(h[3],i),w:Ze(h[4],i),d:Ze(h[5],i),h:Ze(h[6],i),m:Ze(h[7],i),s:Ze(h[8],i)}):null==u?u={}:"object"==typeof u&&("from"in u||"to"in u)&&(r=Ie(u.from),o=Ie(u.to),a=r.isValid()&&o.isValid()?(o=Ee(o,r),r.isBefore(o)?l=$e(r,o):((l=$e(o,r)).milliseconds=-l.milliseconds,l.months=-l.months),l):{milliseconds:0,months:0},(u={}).ms=a.milliseconds,u.M=a.months),n=new We(u),Ye(t)&&d(t,"_locale")&&(n._locale=t._locale),n}function Ze(t,e){var i=t&&parseFloat(t.replace(",","."));return(isNaN(i)?0:i)*e}function $e(t,e){var i={};return i.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(i.months,"M").isAfter(e)&&--i.months,i.milliseconds=+e-+t.clone().add(i.months,"M"),i}function Xe(t,e){return function(i,n){var a;return null===n||isNaN(+n)||(P(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),a=i,i=n,n=a),Ke(this,qe(i="string"==typeof i?+i:i,n),t),this}}function Ke(t,e,i,a){var r=e._milliseconds,o=Ne(e._days),s=Ne(e._months);t.isValid()&&(a=null==a||a,s&&Wt(t,Ot(t,"Month")+s*i),o&&It(t,"Date",Ot(t,"Date")+o*i),r&&t._d.setTime(t._d.valueOf()+r*i),a&&n.updateOffset(t,o||s))}qe.fn=We.prototype,qe.invalid=function(){return qe(NaN)};var Je=Xe(1,"add"),Qe=Xe(-1,"subtract");function ti(t,e){var i,n,a=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(a,"months");return e-r<0?(i=t.clone().add(a-1,"months"),n=(e-r)/(r-i)):(i=t.clone().add(a+1,"months"),n=(e-r)/(i-r)),-(a+n)||0}function ei(t){var e;return void 0===t?this._locale._abbr:(null!=(e=ce(t))&&(this._locale=e),this)}n.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",n.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var ii=S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){return void 0===t?this.localeData():this.locale(t)});function ni(){return this._locale}var ai=1e3,ri=60*ai,oi=60*ri,si=3506328*oi;function li(t,e){return(t%e+e)%e}function ui(t,e,i){return t<100&&t>=0?new Date(t+400,e,i)-si:new Date(t,e,i).valueOf()}function di(t,e,i){return t<100&&t>=0?Date.UTC(t+400,e,i)-si:Date.UTC(t,e,i)}function hi(t,e){B(0,[t,t.length],0,e)}function ci(t,e,i,n,a){var r;return null==t?jt(this,n,a).year:(r=Ut(t,n,a),e>r&&(e=r),function(t,e,i,n,a){var r=Bt(t,e,i,n,a),o=Ht(r.year,0,r.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}.call(this,t,e,i,n,a))}B(0,["gg",2],0,function(){return this.weekYear()%100}),B(0,["GG",2],0,function(){return this.isoWeekYear()%100}),hi("gggg","weekYear"),hi("ggggg","weekYear"),hi("GGGG","isoWeekYear"),hi("GGGGG","isoWeekYear"),F("weekYear","gg"),F("isoWeekYear","GG"),Y("weekYear",1),Y("isoWeekYear",1),ut("G",at),ut("g",at),ut("GG",K,q),ut("gg",K,q),ut("GGGG",et,$),ut("gggg",et,$),ut("GGGGG",it,X),ut("ggggg",it,X),gt(["gggg","ggggg","GGGG","GGGGG"],function(t,e,i,n){e[n.substr(0,2)]=k(t)}),gt(["gg","GG"],function(t,e,i,a){e[a]=n.parseTwoDigitYear(t)}),B("Q",0,"Qo","quarter"),F("quarter","Q"),Y("quarter",7),ut("Q",G),ft("Q",function(t,e){e[vt]=3*(k(t)-1)}),B("D",["DD",2],"Do","date"),F("date","D"),Y("date",9),ut("D",K),ut("DD",K,q),ut("Do",function(t,e){return t?e._dayOfMonthOrdinalParse||e._ordinalParse:e._dayOfMonthOrdinalParseLenient}),ft(["D","DD"],yt),ft("Do",function(t,e){e[yt]=k(t.match(K)[0])});var fi=Tt("Date",!0);B("DDD",["DDDD",3],"DDDo","dayOfYear"),F("dayOfYear","DDD"),Y("dayOfYear",4),ut("DDD",tt),ut("DDDD",Z),ft(["DDD","DDDD"],function(t,e,i){i._dayOfYear=k(t)}),B("m",["mm",2],0,"minute"),F("minute","m"),Y("minute",14),ut("m",K),ut("mm",K,q),ft(["m","mm"],xt);var gi=Tt("Minutes",!1);B("s",["ss",2],0,"second"),F("second","s"),Y("second",15),ut("s",K),ut("ss",K,q),ft(["s","ss"],_t);var mi,pi=Tt("Seconds",!1);for(B("S",0,0,function(){return~~(this.millisecond()/100)}),B(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),B(0,["SSS",3],0,"millisecond"),B(0,["SSSS",4],0,function(){return 10*this.millisecond()}),B(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),B(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),B(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),B(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),B(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),F("millisecond","ms"),Y("millisecond",16),ut("S",tt,G),ut("SS",tt,q),ut("SSS",tt,Z),mi="SSSS";mi.length<=9;mi+="S")ut(mi,nt);function vi(t,e){e[kt]=k(1e3*("0."+t))}for(mi="S";mi.length<=9;mi+="S")ft(mi,vi);var yi=Tt("Milliseconds",!1);B("z",0,0,"zoneAbbr"),B("zz",0,0,"zoneName");var bi=b.prototype;function xi(t){return t}bi.add=Je,bi.calendar=function(t,e){var i=t||Ie(),a=Ee(i,this).startOf("day"),r=n.calendarFormat(this,a)||"sameElse",o=e&&(T(e[r])?e[r].call(this,i):e[r]);return this.format(o||this.localeData().calendar(r,this,Ie(i)))},bi.clone=function(){return new b(this)},bi.diff=function(t,e,i){var n,a,r;if(!this.isValid())return NaN;if(!(n=Ee(t,this)).isValid())return NaN;switch(a=6e4*(n.utcOffset()-this.utcOffset()),e=R(e)){case"year":r=ti(this,n)/12;break;case"month":r=ti(this,n);break;case"quarter":r=ti(this,n)/3;break;case"second":r=(this-n)/1e3;break;case"minute":r=(this-n)/6e4;break;case"hour":r=(this-n)/36e5;break;case"day":r=(this-n-a)/864e5;break;case"week":r=(this-n-a)/6048e5;break;default:r=this-n}return i?r:_(r)},bi.endOf=function(t){var e;if(void 0===(t=R(t))||"millisecond"===t||!this.isValid())return this;var i=this._isUTC?di:ui;switch(t){case"year":e=i(this.year()+1,0,1)-1;break;case"quarter":e=i(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":e=i(this.year(),this.month()+1,1)-1;break;case"week":e=i(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":e=i(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":e=i(this.year(),this.month(),this.date()+1)-1;break;case"hour":e=this._d.valueOf(),e+=oi-li(e+(this._isUTC?0:this.utcOffset()*ri),oi)-1;break;case"minute":e=this._d.valueOf(),e+=ri-li(e,ri)-1;break;case"second":e=this._d.valueOf(),e+=ai-li(e,ai)-1}return this._d.setTime(e),n.updateOffset(this,!0),this},bi.format=function(t){t||(t=this.isUtc()?n.defaultFormatUtc:n.defaultFormat);var e=j(this,t);return this.localeData().postformat(e)},bi.from=function(t,e){return this.isValid()&&(x(t)&&t.isValid()||Ie(t).isValid())?qe({to:this,from:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()},bi.fromNow=function(t){return this.from(Ie(),t)},bi.to=function(t,e){return this.isValid()&&(x(t)&&t.isValid()||Ie(t).isValid())?qe({from:this,to:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()},bi.toNow=function(t){return this.to(Ie(),t)},bi.get=function(t){return T(this[t=R(t)])?this[t]():this},bi.invalidAt=function(){return f(this).overflow},bi.isAfter=function(t,e){var i=x(t)?t:Ie(t);return!(!this.isValid()||!i.isValid())&&("millisecond"===(e=R(e)||"millisecond")?this.valueOf()>i.valueOf():i.valueOf()<this.clone().startOf(e).valueOf())},bi.isBefore=function(t,e){var i=x(t)?t:Ie(t);return!(!this.isValid()||!i.isValid())&&("millisecond"===(e=R(e)||"millisecond")?this.valueOf()<i.valueOf():this.clone().endOf(e).valueOf()<i.valueOf())},bi.isBetween=function(t,e,i,n){var a=x(t)?t:Ie(t),r=x(e)?e:Ie(e);return!!(this.isValid()&&a.isValid()&&r.isValid())&&(("("===(n=n||"()")[0]?this.isAfter(a,i):!this.isBefore(a,i))&&(")"===n[1]?this.isBefore(r,i):!this.isAfter(r,i)))},bi.isSame=function(t,e){var i,n=x(t)?t:Ie(t);return!(!this.isValid()||!n.isValid())&&("millisecond"===(e=R(e)||"millisecond")?this.valueOf()===n.valueOf():(i=n.valueOf(),this.clone().startOf(e).valueOf()<=i&&i<=this.clone().endOf(e).valueOf()))},bi.isSameOrAfter=function(t,e){return this.isSame(t,e)||this.isAfter(t,e)},bi.isSameOrBefore=function(t,e){return this.isSame(t,e)||this.isBefore(t,e)},bi.isValid=function(){return g(this)},bi.lang=ii,bi.locale=ei,bi.localeData=ni,bi.max=Fe,bi.min=Ae,bi.parsingFlags=function(){return h({},f(this))},bi.set=function(t,e){if("object"==typeof t)for(var i=function(t){var e=[];for(var i in t)e.push({unit:i,priority:W[i]});return e.sort(function(t,e){return t.priority-e.priority}),e}(t=L(t)),n=0;n<i.length;n++)this[i[n].unit](t[i[n].unit]);else if(T(this[t=R(t)]))return this[t](e);return this},bi.startOf=function(t){var e;if(void 0===(t=R(t))||"millisecond"===t||!this.isValid())return this;var i=this._isUTC?di:ui;switch(t){case"year":e=i(this.year(),0,1);break;case"quarter":e=i(this.year(),this.month()-this.month()%3,1);break;case"month":e=i(this.year(),this.month(),1);break;case"week":e=i(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":e=i(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":e=i(this.year(),this.month(),this.date());break;case"hour":e=this._d.valueOf(),e-=li(e+(this._isUTC?0:this.utcOffset()*ri),oi);break;case"minute":e=this._d.valueOf(),e-=li(e,ri);break;case"second":e=this._d.valueOf(),e-=li(e,ai)}return this._d.setTime(e),n.updateOffset(this,!0),this},bi.subtract=Qe,bi.toArray=function(){var t=this;return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()]},bi.toObject=function(){var t=this;return{years:t.year(),months:t.month(),date:t.date(),hours:t.hours(),minutes:t.minutes(),seconds:t.seconds(),milliseconds:t.milliseconds()}},bi.toDate=function(){return new Date(this.valueOf())},bi.toISOString=function(t){if(!this.isValid())return null;var e=!0!==t,i=e?this.clone().utc():this;return i.year()<0||i.year()>9999?j(i,e?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):T(Date.prototype.toISOString)?e?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",j(i,"Z")):j(i,e?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},bi.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var t="moment",e="";this.isLocal()||(t=0===this.utcOffset()?"moment.utc":"moment.parseZone",e="Z");var i="["+t+'("]',n=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",a=e+'[")]';return this.format(i+n+"-MM-DD[T]HH:mm:ss.SSS"+a)},bi.toJSON=function(){return this.isValid()?this.toISOString():null},bi.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},bi.unix=function(){return Math.floor(this.valueOf()/1e3)},bi.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},bi.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},bi.year=Pt,bi.isLeapYear=function(){return Dt(this.year())},bi.weekYear=function(t){return ci.call(this,t,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},bi.isoWeekYear=function(t){return ci.call(this,t,this.isoWeek(),this.isoWeekday(),1,4)},bi.quarter=bi.quarters=function(t){return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3)},bi.month=Yt,bi.daysInMonth=function(){return At(this.year(),this.month())},bi.week=bi.weeks=function(t){var e=this.localeData().week(this);return null==t?e:this.add(7*(t-e),"d")},bi.isoWeek=bi.isoWeeks=function(t){var e=jt(this,1,4).week;return null==t?e:this.add(7*(t-e),"d")},bi.weeksInYear=function(){var t=this.localeData()._week;return Ut(this.year(),t.dow,t.doy)},bi.isoWeeksInYear=function(){return Ut(this.year(),1,4)},bi.date=fi,bi.day=bi.days=function(t){if(!this.isValid())return null!=t?this:NaN;var e=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=t?(t=function(t,e){return"string"!=typeof t?t:isNaN(t)?"number"==typeof(t=e.weekdaysParse(t))?t:null:parseInt(t,10)}(t,this.localeData()),this.add(t-e,"d")):e},bi.weekday=function(t){if(!this.isValid())return null!=t?this:NaN;var e=(this.day()+7-this.localeData()._week.dow)%7;return null==t?e:this.add(t-e,"d")},bi.isoWeekday=function(t){if(!this.isValid())return null!=t?this:NaN;if(null!=t){var e=function(t,e){return"string"==typeof t?e.weekdaysParse(t)%7||7:isNaN(t)?null:t}(t,this.localeData());return this.day(this.day()%7?e:e-7)}return this.day()||7},bi.dayOfYear=function(t){var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==t?e:this.add(t-e,"d")},bi.hour=bi.hours=ae,bi.minute=bi.minutes=gi,bi.second=bi.seconds=pi,bi.millisecond=bi.milliseconds=yi,bi.utcOffset=function(t,e,i){var a,r=this._offset||0;if(!this.isValid())return null!=t?this:NaN;if(null!=t){if("string"==typeof t){if(null===(t=He(ot,t)))return this}else Math.abs(t)<16&&!i&&(t*=60);return!this._isUTC&&e&&(a=Be(this)),this._offset=t,this._isUTC=!0,null!=a&&this.add(a,"m"),r!==t&&(!e||this._changeInProgress?Ke(this,qe(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,n.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Be(this)},bi.utc=function(t){return this.utcOffset(0,t)},bi.local=function(t){return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(Be(this),"m")),this},bi.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var t=He(rt,this._i);null!=t?this.utcOffset(t):this.utcOffset(0,!0)}return this},bi.hasAlignedHourOffset=function(t){return!!this.isValid()&&(t=t?Ie(t).utcOffset():0,(this.utcOffset()-t)%60==0)},bi.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},bi.isLocal=function(){return!!this.isValid()&&!this._isUTC},bi.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},bi.isUtc=je,bi.isUTC=je,bi.zoneAbbr=function(){return this._isUTC?"UTC":""},bi.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},bi.dates=S("dates accessor is deprecated. Use date instead.",fi),bi.months=S("months accessor is deprecated. Use month instead",Yt),bi.years=S("years accessor is deprecated. Use year instead",Pt),bi.zone=S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(t,e){return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset()}),bi.isDSTShifted=S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!o(this._isDSTShifted))return this._isDSTShifted;var t={};if(v(t,this),(t=Te(t))._a){var e=t._isUTC?c(t._a):Ie(t._a);this._isDSTShifted=this.isValid()&&w(t._a,e.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var _i=I.prototype;function ki(t,e,i,n){var a=ce(),r=c().set(n,e);return a[i](r,t)}function wi(t,e,i){if(s(t)&&(e=t,t=void 0),t=t||"",null!=e)return ki(t,e,i,"month");var n,a=[];for(n=0;n<12;n++)a[n]=ki(t,n,i,"month");return a}function Mi(t,e,i,n){"boolean"==typeof t?(s(e)&&(i=e,e=void 0),e=e||""):(i=e=t,t=!1,s(e)&&(i=e,e=void 0),e=e||"");var a,r=ce(),o=t?r._week.dow:0;if(null!=i)return ki(e,(i+o)%7,n,"day");var l=[];for(a=0;a<7;a++)l[a]=ki(e,(a+o)%7,n,"day");return l}_i.calendar=function(t,e,i){var n=this._calendar[t]||this._calendar.sameElse;return T(n)?n.call(e,i):n},_i.longDateFormat=function(t){var e=this._longDateFormat[t],i=this._longDateFormat[t.toUpperCase()];return e||!i?e:(this._longDateFormat[t]=i.replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t])},_i.invalidDate=function(){return this._invalidDate},_i.ordinal=function(t){return this._ordinal.replace("%d",t)},_i.preparse=xi,_i.postformat=xi,_i.relativeTime=function(t,e,i,n){var a=this._relativeTime[i];return T(a)?a(t,e,i,n):a.replace(/%d/i,t)},_i.pastFuture=function(t,e){var i=this._relativeTime[t>0?"future":"past"];return T(i)?i(e):i.replace(/%s/i,e)},_i.set=function(t){var e,i;for(i in t)T(e=t[i])?this[i]=e:this["_"+i]=e;this._config=t,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},_i.months=function(t,e){return t?a(this._months)?this._months[t.month()]:this._months[(this._months.isFormat||Ft).test(e)?"format":"standalone"][t.month()]:a(this._months)?this._months:this._months.standalone},_i.monthsShort=function(t,e){return t?a(this._monthsShort)?this._monthsShort[t.month()]:this._monthsShort[Ft.test(e)?"format":"standalone"][t.month()]:a(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},_i.monthsParse=function(t,e,i){var n,a,r;if(this._monthsParseExact)return function(t,e,i){var n,a,r,o=t.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],n=0;n<12;++n)r=c([2e3,n]),this._shortMonthsParse[n]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[n]=this.months(r,"").toLocaleLowerCase();return i?"MMM"===e?-1!==(a=Ct.call(this._shortMonthsParse,o))?a:null:-1!==(a=Ct.call(this._longMonthsParse,o))?a:null:"MMM"===e?-1!==(a=Ct.call(this._shortMonthsParse,o))?a:-1!==(a=Ct.call(this._longMonthsParse,o))?a:null:-1!==(a=Ct.call(this._longMonthsParse,o))?a:-1!==(a=Ct.call(this._shortMonthsParse,o))?a:null}.call(this,t,e,i);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),n=0;n<12;n++){if(a=c([2e3,n]),i&&!this._longMonthsParse[n]&&(this._longMonthsParse[n]=new RegExp("^"+this.months(a,"").replace(".","")+"$","i"),this._shortMonthsParse[n]=new RegExp("^"+this.monthsShort(a,"").replace(".","")+"$","i")),i||this._monthsParse[n]||(r="^"+this.months(a,"")+"|^"+this.monthsShort(a,""),this._monthsParse[n]=new RegExp(r.replace(".",""),"i")),i&&"MMMM"===e&&this._longMonthsParse[n].test(t))return n;if(i&&"MMM"===e&&this._shortMonthsParse[n].test(t))return n;if(!i&&this._monthsParse[n].test(t))return n}},_i.monthsRegex=function(t){return this._monthsParseExact?(d(this,"_monthsRegex")||Vt.call(this),t?this._monthsStrictRegex:this._monthsRegex):(d(this,"_monthsRegex")||(this._monthsRegex=zt),this._monthsStrictRegex&&t?this._monthsStrictRegex:this._monthsRegex)},_i.monthsShortRegex=function(t){return this._monthsParseExact?(d(this,"_monthsRegex")||Vt.call(this),t?this._monthsShortStrictRegex:this._monthsShortRegex):(d(this,"_monthsShortRegex")||(this._monthsShortRegex=Nt),this._monthsShortStrictRegex&&t?this._monthsShortStrictRegex:this._monthsShortRegex)},_i.week=function(t){return jt(t,this._week.dow,this._week.doy).week},_i.firstDayOfYear=function(){return this._week.doy},_i.firstDayOfWeek=function(){return this._week.dow},_i.weekdays=function(t,e){var i=a(this._weekdays)?this._weekdays:this._weekdays[t&&!0!==t&&this._weekdays.isFormat.test(e)?"format":"standalone"];return!0===t?Gt(i,this._week.dow):t?i[t.day()]:i},_i.weekdaysMin=function(t){return!0===t?Gt(this._weekdaysMin,this._week.dow):t?this._weekdaysMin[t.day()]:this._weekdaysMin},_i.weekdaysShort=function(t){return!0===t?Gt(this._weekdaysShort,this._week.dow):t?this._weekdaysShort[t.day()]:this._weekdaysShort},_i.weekdaysParse=function(t,e,i){var n,a,r;if(this._weekdaysParseExact)return function(t,e,i){var n,a,r,o=t.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],n=0;n<7;++n)r=c([2e3,1]).day(n),this._minWeekdaysParse[n]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[n]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[n]=this.weekdays(r,"").toLocaleLowerCase();return i?"dddd"===e?-1!==(a=Ct.call(this._weekdaysParse,o))?a:null:"ddd"===e?-1!==(a=Ct.call(this._shortWeekdaysParse,o))?a:null:-1!==(a=Ct.call(this._minWeekdaysParse,o))?a:null:"dddd"===e?-1!==(a=Ct.call(this._weekdaysParse,o))?a:-1!==(a=Ct.call(this._shortWeekdaysParse,o))?a:-1!==(a=Ct.call(this._minWeekdaysParse,o))?a:null:"ddd"===e?-1!==(a=Ct.call(this._shortWeekdaysParse,o))?a:-1!==(a=Ct.call(this._weekdaysParse,o))?a:-1!==(a=Ct.call(this._minWeekdaysParse,o))?a:null:-1!==(a=Ct.call(this._minWeekdaysParse,o))?a:-1!==(a=Ct.call(this._weekdaysParse,o))?a:-1!==(a=Ct.call(this._shortWeekdaysParse,o))?a:null}.call(this,t,e,i);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),n=0;n<7;n++){if(a=c([2e3,1]).day(n),i&&!this._fullWeekdaysParse[n]&&(this._fullWeekdaysParse[n]=new RegExp("^"+this.weekdays(a,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[n]=new RegExp("^"+this.weekdaysShort(a,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[n]=new RegExp("^"+this.weekdaysMin(a,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[n]||(r="^"+this.weekdays(a,"")+"|^"+this.weekdaysShort(a,"")+"|^"+this.weekdaysMin(a,""),this._weekdaysParse[n]=new RegExp(r.replace(".",""),"i")),i&&"dddd"===e&&this._fullWeekdaysParse[n].test(t))return n;if(i&&"ddd"===e&&this._shortWeekdaysParse[n].test(t))return n;if(i&&"dd"===e&&this._minWeekdaysParse[n].test(t))return n;if(!i&&this._weekdaysParse[n].test(t))return n}},_i.weekdaysRegex=function(t){return this._weekdaysParseExact?(d(this,"_weekdaysRegex")||Qt.call(this),t?this._weekdaysStrictRegex:this._weekdaysRegex):(d(this,"_weekdaysRegex")||(this._weekdaysRegex=Xt),this._weekdaysStrictRegex&&t?this._weekdaysStrictRegex:this._weekdaysRegex)},_i.weekdaysShortRegex=function(t){return this._weekdaysParseExact?(d(this,"_weekdaysRegex")||Qt.call(this),t?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(d(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Kt),this._weekdaysShortStrictRegex&&t?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},_i.weekdaysMinRegex=function(t){return this._weekdaysParseExact?(d(this,"_weekdaysRegex")||Qt.call(this),t?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(d(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Jt),this._weekdaysMinStrictRegex&&t?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},_i.isPM=function(t){return"p"===(t+"").toLowerCase().charAt(0)},_i.meridiem=function(t,e,i){return t>11?i?"pm":"PM":i?"am":"AM"},de("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(t){var e=t%10,i=1===k(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";return t+i}}),n.lang=S("moment.lang is deprecated. Use moment.locale instead.",de),n.langData=S("moment.langData is deprecated. Use moment.localeData instead.",ce);var Si=Math.abs;function Di(t,e,i,n){var a=qe(e,i);return t._milliseconds+=n*a._milliseconds,t._days+=n*a._days,t._months+=n*a._months,t._bubble()}function Ci(t){return t<0?Math.floor(t):Math.ceil(t)}function Pi(t){return 4800*t/146097}function Ti(t){return 146097*t/4800}function Oi(t){return function(){return this.as(t)}}var Ii=Oi("ms"),Ai=Oi("s"),Fi=Oi("m"),Ri=Oi("h"),Li=Oi("d"),Wi=Oi("w"),Yi=Oi("M"),Ni=Oi("Q"),zi=Oi("y");function Vi(t){return function(){return this.isValid()?this._data[t]:NaN}}var Hi=Vi("milliseconds"),Ei=Vi("seconds"),Bi=Vi("minutes"),ji=Vi("hours"),Ui=Vi("days"),Gi=Vi("months"),qi=Vi("years"),Zi=Math.round,$i={ss:44,s:45,m:45,h:22,d:26,M:11},Xi=Math.abs;function Ki(t){return(t>0)-(t<0)||+t}function Ji(){if(!this.isValid())return this.localeData().invalidDate();var t,e,i=Xi(this._milliseconds)/1e3,n=Xi(this._days),a=Xi(this._months);t=_(i/60),e=_(t/60),i%=60,t%=60;var r=_(a/12),o=a%=12,s=n,l=e,u=t,d=i?i.toFixed(3).replace(/\.?0+$/,""):"",h=this.asSeconds();if(!h)return"P0D";var c=h<0?"-":"",f=Ki(this._months)!==Ki(h)?"-":"",g=Ki(this._days)!==Ki(h)?"-":"",m=Ki(this._milliseconds)!==Ki(h)?"-":"";return c+"P"+(r?f+r+"Y":"")+(o?f+o+"M":"")+(s?g+s+"D":"")+(l||u||d?"T":"")+(l?m+l+"H":"")+(u?m+u+"M":"")+(d?m+d+"S":"")}var Qi=We.prototype;return Qi.isValid=function(){return this._isValid},Qi.abs=function(){var t=this._data;return this._milliseconds=Si(this._milliseconds),this._days=Si(this._days),this._months=Si(this._months),t.milliseconds=Si(t.milliseconds),t.seconds=Si(t.seconds),t.minutes=Si(t.minutes),t.hours=Si(t.hours),t.months=Si(t.months),t.years=Si(t.years),this},Qi.add=function(t,e){return Di(this,t,e,1)},Qi.subtract=function(t,e){return Di(this,t,e,-1)},Qi.as=function(t){if(!this.isValid())return NaN;var e,i,n=this._milliseconds;if("month"===(t=R(t))||"quarter"===t||"year"===t)switch(e=this._days+n/864e5,i=this._months+Pi(e),t){case"month":return i;case"quarter":return i/3;case"year":return i/12}else switch(e=this._days+Math.round(Ti(this._months)),t){case"week":return e/7+n/6048e5;case"day":return e+n/864e5;case"hour":return 24*e+n/36e5;case"minute":return 1440*e+n/6e4;case"second":return 86400*e+n/1e3;case"millisecond":return Math.floor(864e5*e)+n;default:throw new Error("Unknown unit "+t)}},Qi.asMilliseconds=Ii,Qi.asSeconds=Ai,Qi.asMinutes=Fi,Qi.asHours=Ri,Qi.asDays=Li,Qi.asWeeks=Wi,Qi.asMonths=Yi,Qi.asQuarters=Ni,Qi.asYears=zi,Qi.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*k(this._months/12):NaN},Qi._bubble=function(){var t,e,i,n,a,r=this._milliseconds,o=this._days,s=this._months,l=this._data;return r>=0&&o>=0&&s>=0||r<=0&&o<=0&&s<=0||(r+=864e5*Ci(Ti(s)+o),o=0,s=0),l.milliseconds=r%1e3,t=_(r/1e3),l.seconds=t%60,e=_(t/60),l.minutes=e%60,i=_(e/60),l.hours=i%24,o+=_(i/24),a=_(Pi(o)),s+=a,o-=Ci(Ti(a)),n=_(s/12),s%=12,l.days=o,l.months=s,l.years=n,this},Qi.clone=function(){return qe(this)},Qi.get=function(t){return t=R(t),this.isValid()?this[t+"s"]():NaN},Qi.milliseconds=Hi,Qi.seconds=Ei,Qi.minutes=Bi,Qi.hours=ji,Qi.days=Ui,Qi.weeks=function(){return _(this.days()/7)},Qi.months=Gi,Qi.years=qi,Qi.humanize=function(t){if(!this.isValid())return this.localeData().invalidDate();var e=this.localeData(),i=function(t,e,i){var n=qe(t).abs(),a=Zi(n.as("s")),r=Zi(n.as("m")),o=Zi(n.as("h")),s=Zi(n.as("d")),l=Zi(n.as("M")),u=Zi(n.as("y")),d=a<=$i.ss&&["s",a]||a<$i.s&&["ss",a]||r<=1&&["m"]||r<$i.m&&["mm",r]||o<=1&&["h"]||o<$i.h&&["hh",o]||s<=1&&["d"]||s<$i.d&&["dd",s]||l<=1&&["M"]||l<$i.M&&["MM",l]||u<=1&&["y"]||["yy",u];return d[2]=e,d[3]=+t>0,d[4]=i,function(t,e,i,n,a){return a.relativeTime(e||1,!!i,t,n)}.apply(null,d)}(this,!t,e);return t&&(i=e.pastFuture(+this,i)),e.postformat(i)},Qi.toISOString=Ji,Qi.toString=Ji,Qi.toJSON=Ji,Qi.locale=ei,Qi.localeData=ni,Qi.toIsoString=S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Ji),Qi.lang=ii,B("X",0,0,"unix"),B("x",0,0,"valueOf"),ut("x",at),ut("X",/[+-]?\d+(\.\d{1,3})?/),ft("X",function(t,e,i){i._d=new Date(1e3*parseFloat(t,10))}),ft("x",function(t,e,i){i._d=new Date(k(t))}),n.version="2.24.0",e=Ie,n.fn=bi,n.min=function(){return Re("isBefore",[].slice.call(arguments,0))},n.max=function(){return Re("isAfter",[].slice.call(arguments,0))},n.now=function(){return Date.now?Date.now():+new Date},n.utc=c,n.unix=function(t){return Ie(1e3*t)},n.months=function(t,e){return wi(t,e,"months")},n.isDate=l,n.locale=de,n.invalid=m,n.duration=qe,n.isMoment=x,n.weekdays=function(t,e,i){return Mi(t,e,i,"weekdays")},n.parseZone=function(){return Ie.apply(null,arguments).parseZone()},n.localeData=ce,n.isDuration=Ye,n.monthsShort=function(t,e){return wi(t,e,"monthsShort")},n.weekdaysMin=function(t,e,i){return Mi(t,e,i,"weekdaysMin")},n.defineLocale=he,n.updateLocale=function(t,e){if(null!=e){var i,n,a=re;null!=(n=ue(t))&&(a=n._config),e=O(a,e),(i=new I(e)).parentLocale=oe[t],oe[t]=i,de(t)}else null!=oe[t]&&(null!=oe[t].parentLocale?oe[t]=oe[t].parentLocale:null!=oe[t]&&delete oe[t]);return oe[t]},n.locales=function(){return D(oe)},n.weekdaysShort=function(t,e,i){return Mi(t,e,i,"weekdaysShort")},n.normalizeUnits=R,n.relativeTimeRounding=function(t){return void 0===t?Zi:"function"==typeof t&&(Zi=t,!0)},n.relativeTimeThreshold=function(t,e){return void 0!==$i[t]&&(void 0===e?$i[t]:($i[t]=e,"s"===t&&($i.ss=e-1),!0))},n.calendarFormat=function(t,e){var i=t.diff(e,"days",!0);return i<-6?"sameElse":i<-1?"lastWeek":i<0?"lastDay":i<1?"sameDay":i<2?"nextDay":i<7?"nextWeek":"sameElse"},n.prototype=bi,n.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},n}()}(tn={exports:{}},tn.exports),tn.exports),an={datetime:"MMM D, YYYY, h:mm:ss a",millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm a",hour:"hA",day:"MMM D",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"};si._date.override("function"==typeof nn?{_id:"moment",formats:function(){return an},parse:function(t,e){return"string"==typeof t&&"string"==typeof e?t=nn(t,e):t instanceof nn||(t=nn(t)),t.isValid()?t.valueOf():null},format:function(t,e){return nn(t).format(e)},add:function(t,e,i){return nn(t).add(e,i).valueOf()},diff:function(t,e,i){return nn.duration(nn(t).diff(nn(e))).as(i)},startOf:function(t,e,i){return t=nn(t),"isoWeek"===e?t.isoWeekday(i).valueOf():t.startOf(e).valueOf()},endOf:function(t,e){return nn(t).endOf(e).valueOf()},_create:function(t){return nn(t)}}:{}),ot._set("global",{plugins:{filler:{propagate:!0}}});var rn={dataset:function(t){var e=t.fill,i=t.chart,n=i.getDatasetMeta(e),a=n&&i.isDatasetVisible(e)&&n.dataset._children||[],r=a.length||0;return r?function(t,e){return e<r&&a[e]._view||null}:null},boundary:function(t){var e=t.boundary,i=e?e.x:null,n=e?e.y:null;return function(t){return{x:null===i?t.x:i,y:null===n?t.y:n}}}};function on(t,e,i){var n,a=t._model||{},r=a.fill;if(void 0===r&&(r=!!a.backgroundColor),!1===r||null===r)return!1;if(!0===r)return"origin";if(n=parseFloat(r,10),isFinite(n)&&Math.floor(n)===n)return"-"!==r[0]&&"+"!==r[0]||(n=e+n),!(n===e||n<0||n>=i)&&n;switch(r){case"bottom":return"start";case"top":return"end";case"zero":return"origin";case"origin":case"start":case"end":return r;default:return!1}}function sn(t){var e,i=t.el._model||{},n=t.el._scale||{},a=t.fill,r=null;if(isFinite(a))return null;if("start"===a?r=void 0===i.scaleBottom?n.bottom:i.scaleBottom:"end"===a?r=void 0===i.scaleTop?n.top:i.scaleTop:void 0!==i.scaleZero?r=i.scaleZero:n.getBasePosition?r=n.getBasePosition():n.getBasePixel&&(r=n.getBasePixel()),null!=r){if(void 0!==r.x&&void 0!==r.y)return r;if(ut.isFinite(r))return{x:(e=n.isHorizontal())?r:null,y:e?null:r}}return null}function ln(t,e,i){var n,a=t[e].fill,r=[e];if(!i)return a;for(;!1!==a&&-1===r.indexOf(a);){if(!isFinite(a))return a;if(!(n=t[a]))return!1;if(n.visible)return a;r.push(a),a=n.fill}return!1}function un(t){var e=t.fill,i="dataset";return!1===e?null:(isFinite(e)||(i="boundary"),rn[i](t))}function dn(t){return t&&!t.skip}function hn(t,e,i,n,a){var r;if(n&&a){for(t.moveTo(e[0].x,e[0].y),r=1;r<n;++r)ut.canvas.lineTo(t,e[r-1],e[r]);for(t.lineTo(i[a-1].x,i[a-1].y),r=a-1;r>0;--r)ut.canvas.lineTo(t,i[r],i[r-1],!0)}}var cn={id:"filler",afterDatasetsUpdate:function(t,e){var i,n,a,r,o=(t.data.datasets||[]).length,s=e.propagate,l=[];for(n=0;n<o;++n)r=null,(a=(i=t.getDatasetMeta(n)).dataset)&&a._model&&a instanceof Nt.Line&&(r={visible:t.isDatasetVisible(n),fill:on(a,n,o),chart:t,el:a}),i.$filler=r,l.push(r);for(n=0;n<o;++n)(r=l[n])&&(r.fill=ln(l,n,s),r.boundary=sn(r),r.mapper=un(r))},beforeDatasetDraw:function(t,e){var i=e.meta.$filler;if(i){var n=t.ctx,a=i.el,r=a._view,o=a._children||[],s=i.mapper,l=r.backgroundColor||ot.global.defaultColor;s&&l&&o.length&&(ut.canvas.clipArea(n,t.chartArea),function(t,e,i,n,a,r){var o,s,l,u,d,h,c,f=e.length,g=n.spanGaps,m=[],p=[],v=0,y=0;for(t.beginPath(),o=0,s=f+!!r;o<s;++o)d=i(u=e[l=o%f]._view,l,n),h=dn(u),c=dn(d),h&&c?(v=m.push(u),y=p.push(d)):v&&y&&(g?(h&&m.push(u),c&&p.push(d)):(hn(t,m,p,v,y),v=y=0,m=[],p=[]));hn(t,m,p,v,y),t.closePath(),t.fillStyle=a,t.fill()}(n,o,s,r,l,a._loop),ut.canvas.unclipArea(n))}}},fn=ut.noop,gn=ut.valueOrDefault;function mn(t,e){return t.usePointStyle&&t.boxWidth>e?e:t.boxWidth}ot._set("global",{legend:{display:!0,position:"top",fullWidth:!0,reverse:!1,weight:1e3,onClick:function(t,e){var i=e.datasetIndex,n=this.chart,a=n.getDatasetMeta(i);a.hidden=null===a.hidden?!n.data.datasets[i].hidden:null,n.update()},onHover:null,onLeave:null,labels:{boxWidth:40,padding:10,generateLabels:function(t){var e=t.data;return ut.isArray(e.datasets)?e.datasets.map(function(e,i){return{text:e.label,fillStyle:ut.isArray(e.backgroundColor)?e.backgroundColor[0]:e.backgroundColor,hidden:!t.isDatasetVisible(i),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,pointStyle:e.pointStyle,datasetIndex:i}},this):[]}}},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var i=0;i<t.data.datasets.length;i++)e.push('<li><span style="background-color:'+t.data.datasets[i].backgroundColor+'"></span>'),t.data.datasets[i].label&&e.push(t.data.datasets[i].label),e.push("</li>");return e.push("</ul>"),e.join("")}});var pn=gt.extend({initialize:function(t){ut.extend(this,t),this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1},beforeUpdate:fn,update:function(t,e,i){var n=this;return n.beforeUpdate(),n.maxWidth=t,n.maxHeight=e,n.margins=i,n.beforeSetDimensions(),n.setDimensions(),n.afterSetDimensions(),n.beforeBuildLabels(),n.buildLabels(),n.afterBuildLabels(),n.beforeFit(),n.fit(),n.afterFit(),n.afterUpdate(),n.minSize},afterUpdate:fn,beforeSetDimensions:fn,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:fn,beforeBuildLabels:fn,buildLabels:function(){var t=this,e=t.options.labels||{},i=ut.callback(e.generateLabels,[t.chart],t)||[];e.filter&&(i=i.filter(function(i){return e.filter(i,t.chart.data)})),t.options.reverse&&i.reverse(),t.legendItems=i},afterBuildLabels:fn,beforeFit:fn,fit:function(){var t=this,e=t.options,i=e.labels,n=e.display,a=t.ctx,r=ut.options._parseFont(i),o=r.size,s=t.legendHitBoxes=[],l=t.minSize,u=t.isHorizontal();if(u?(l.width=t.maxWidth,l.height=n?10:0):(l.width=n?10:0,l.height=t.maxHeight),n)if(a.font=r.string,u){var d=t.lineWidths=[0],h=0;a.textAlign="left",a.textBaseline="top",ut.each(t.legendItems,function(t,e){var n=mn(i,o)+o/2+a.measureText(t.text).width;(0===e||d[d.length-1]+n+i.padding>l.width)&&(h+=o+i.padding,d[d.length-(e>0?0:1)]=i.padding),s[e]={left:0,top:0,width:n,height:o},d[d.length-1]+=n+i.padding}),l.height+=h}else{var c=i.padding,f=t.columnWidths=[],g=i.padding,m=0,p=0,v=o+c;ut.each(t.legendItems,function(t,e){var n=mn(i,o)+o/2+a.measureText(t.text).width;e>0&&p+v>l.height-c&&(g+=m+i.padding,f.push(m),m=0,p=0),m=Math.max(m,n),p+=v,s[e]={left:0,top:0,width:n,height:o}}),g+=m,f.push(m),l.width+=g}t.width=l.width,t.height=l.height},afterFit:fn,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var t=this,e=t.options,i=e.labels,n=ot.global,a=n.defaultColor,r=n.elements.line,o=t.width,s=t.lineWidths;if(e.display){var l,u=t.ctx,d=gn(i.fontColor,n.defaultFontColor),h=ut.options._parseFont(i),c=h.size;u.textAlign="left",u.textBaseline="middle",u.lineWidth=.5,u.strokeStyle=d,u.fillStyle=d,u.font=h.string;var f=mn(i,c),g=t.legendHitBoxes,m=t.isHorizontal();l=m?{x:t.left+(o-s[0])/2+i.padding,y:t.top+i.padding,line:0}:{x:t.left+i.padding,y:t.top+i.padding,line:0};var p=c+i.padding;ut.each(t.legendItems,function(n,d){var h=u.measureText(n.text).width,v=f+c/2+h,y=l.x,b=l.y;m?d>0&&y+v+i.padding>t.left+t.minSize.width&&(b=l.y+=p,l.line++,y=l.x=t.left+(o-s[l.line])/2+i.padding):d>0&&b+p>t.top+t.minSize.height&&(y=l.x=y+t.columnWidths[l.line]+i.padding,b=l.y=t.top+i.padding,l.line++),function(t,i,n){if(!(isNaN(f)||f<=0)){u.save();var o=gn(n.lineWidth,r.borderWidth);if(u.fillStyle=gn(n.fillStyle,a),u.lineCap=gn(n.lineCap,r.borderCapStyle),u.lineDashOffset=gn(n.lineDashOffset,r.borderDashOffset),u.lineJoin=gn(n.lineJoin,r.borderJoinStyle),u.lineWidth=o,u.strokeStyle=gn(n.strokeStyle,a),u.setLineDash&&u.setLineDash(gn(n.lineDash,r.borderDash)),e.labels&&e.labels.usePointStyle){var s=f*Math.SQRT2/2,l=t+f/2,d=i+c/2;ut.canvas.drawPoint(u,n.pointStyle,s,l,d)}else 0!==o&&u.strokeRect(t,i,f,c),u.fillRect(t,i,f,c);u.restore()}}(y,b,n),g[d].left=y,g[d].top=b,function(t,e,i,n){var a=c/2,r=f+a+t,o=e+a;u.fillText(i.text,r,o),i.hidden&&(u.beginPath(),u.lineWidth=2,u.moveTo(r,o),u.lineTo(r+n,o),u.stroke())}(y,b,n,h),m?l.x+=v+i.padding:l.y+=p})}},_getLegendItemAt:function(t,e){var i,n,a,r=this;if(t>=r.left&&t<=r.right&&e>=r.top&&e<=r.bottom)for(a=r.legendHitBoxes,i=0;i<a.length;++i)if(t>=(n=a[i]).left&&t<=n.left+n.width&&e>=n.top&&e<=n.top+n.height)return r.legendItems[i];return null},handleEvent:function(t){var e,i=this,n=i.options,a="mouseup"===t.type?"click":t.type;if("mousemove"===a){if(!n.onHover&&!n.onLeave)return}else{if("click"!==a)return;if(!n.onClick)return}e=i._getLegendItemAt(t.x,t.y),"click"===a?e&&n.onClick&&n.onClick.call(i,t.native,e):(n.onLeave&&e!==i._hoveredItem&&(i._hoveredItem&&n.onLeave.call(i,t.native,i._hoveredItem),i._hoveredItem=e),n.onHover&&e&&n.onHover.call(i,t.native,e))}});function vn(t,e){var i=new pn({ctx:t.ctx,options:e,chart:t});xe.configure(t,i,e),xe.addBox(t,i),t.legend=i}var yn={id:"legend",_element:pn,beforeInit:function(t){var e=t.options.legend;e&&vn(t,e)},beforeUpdate:function(t){var e=t.options.legend,i=t.legend;e?(ut.mergeIf(e,ot.global.legend),i?(xe.configure(t,i,e),i.options=e):vn(t,e)):i&&(xe.removeBox(t,i),delete t.legend)},afterEvent:function(t,e){var i=t.legend;i&&i.handleEvent(e)}},bn=ut.noop;ot._set("global",{title:{display:!1,fontStyle:"bold",fullWidth:!0,padding:10,position:"top",text:"",weight:2e3}});var xn=gt.extend({initialize:function(t){ut.extend(this,t),this.legendHitBoxes=[]},beforeUpdate:bn,update:function(t,e,i){var n=this;return n.beforeUpdate(),n.maxWidth=t,n.maxHeight=e,n.margins=i,n.beforeSetDimensions(),n.setDimensions(),n.afterSetDimensions(),n.beforeBuildLabels(),n.buildLabels(),n.afterBuildLabels(),n.beforeFit(),n.fit(),n.afterFit(),n.afterUpdate(),n.minSize},afterUpdate:bn,beforeSetDimensions:bn,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:bn,beforeBuildLabels:bn,buildLabels:bn,afterBuildLabels:bn,beforeFit:bn,fit:function(){var t=this,e=t.options,i=e.display,n=t.minSize,a=ut.isArray(e.text)?e.text.length:1,r=ut.options._parseFont(e),o=i?a*r.lineHeight+2*e.padding:0;t.isHorizontal()?(n.width=t.maxWidth,n.height=o):(n.width=o,n.height=t.maxHeight),t.width=n.width,t.height=n.height},afterFit:bn,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var t=this,e=t.ctx,i=t.options;if(i.display){var n,a,r,o=ut.options._parseFont(i),s=o.lineHeight,l=s/2+i.padding,u=0,d=t.top,h=t.left,c=t.bottom,f=t.right;e.fillStyle=ut.valueOrDefault(i.fontColor,ot.global.defaultFontColor),e.font=o.string,t.isHorizontal()?(a=h+(f-h)/2,r=d+l,n=f-h):(a="left"===i.position?h+l:f-l,r=d+(c-d)/2,n=c-d,u=Math.PI*("left"===i.position?-.5:.5)),e.save(),e.translate(a,r),e.rotate(u),e.textAlign="center",e.textBaseline="middle";var g=i.text;if(ut.isArray(g))for(var m=0,p=0;p<g.length;++p)e.fillText(g[p],0,m,n),m+=s;else e.fillText(g,0,0,n);e.restore()}}});function _n(t,e){var i=new xn({ctx:t.ctx,options:e,chart:t});xe.configure(t,i,e),xe.addBox(t,i),t.titleBlock=i}var kn={},wn=cn,Mn=yn,Sn={id:"title",_element:xn,beforeInit:function(t){var e=t.options.title;e&&_n(t,e)},beforeUpdate:function(t){var e=t.options.title,i=t.titleBlock;e?(ut.mergeIf(e,ot.global.title),i?(xe.configure(t,i,e),i.options=e):_n(t,e)):i&&(xe.removeBox(t,i),delete t.titleBlock)}};for(var Dn in kn.filler=wn,kn.legend=Mn,kn.title=Sn,ai.helpers=ut,function(){function t(t,e,i){var n;return"string"==typeof t?(n=parseInt(t,10),-1!==t.indexOf("%")&&(n=n/100*e.parentNode[i])):n=t,n}function e(t){return null!=t&&"none"!==t}function i(i,n,a){var r=document.defaultView,o=ut._getParentNode(i),s=r.getComputedStyle(i)[n],l=r.getComputedStyle(o)[n],u=e(s),d=e(l),h=Number.POSITIVE_INFINITY;return u||d?Math.min(u?t(s,i,a):h,d?t(l,o,a):h):"none"}ut.where=function(t,e){if(ut.isArray(t)&&Array.prototype.filter)return t.filter(e);var i=[];return ut.each(t,function(t){e(t)&&i.push(t)}),i},ut.findIndex=Array.prototype.findIndex?function(t,e,i){return t.findIndex(e,i)}:function(t,e,i){i=void 0===i?t:i;for(var n=0,a=t.length;n<a;++n)if(e.call(i,t[n],n,t))return n;return-1},ut.findNextWhere=function(t,e,i){ut.isNullOrUndef(i)&&(i=-1);for(var n=i+1;n<t.length;n++){var a=t[n];if(e(a))return a}},ut.findPreviousWhere=function(t,e,i){ut.isNullOrUndef(i)&&(i=t.length);for(var n=i-1;n>=0;n--){var a=t[n];if(e(a))return a}},ut.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},ut.almostEquals=function(t,e,i){return Math.abs(t-e)<i},ut.almostWhole=function(t,e){var i=Math.round(t);return i-e<t&&i+e>t},ut.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},ut.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},ut.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return 0==(t=+t)||isNaN(t)?t:t>0?1:-1},ut.log10=Math.log10?function(t){return Math.log10(t)}:function(t){var e=Math.log(t)*Math.LOG10E,i=Math.round(e);return t===Math.pow(10,i)?i:e},ut.toRadians=function(t){return t*(Math.PI/180)},ut.toDegrees=function(t){return t*(180/Math.PI)},ut._decimalPlaces=function(t){if(ut.isFinite(t)){for(var e=1,i=0;Math.round(t*e)/e!==t;)e*=10,i++;return i}},ut.getAngleFromPoint=function(t,e){var i=e.x-t.x,n=e.y-t.y,a=Math.sqrt(i*i+n*n),r=Math.atan2(n,i);return r<-.5*Math.PI&&(r+=2*Math.PI),{angle:r,distance:a}},ut.distanceBetweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},ut.aliasPixel=function(t){return t%2==0?0:.5},ut._alignPixel=function(t,e,i){var n=t.currentDevicePixelRatio,a=i/2;return Math.round((e-a)*n)/n+a},ut.splineCurve=function(t,e,i,n){var a=t.skip?e:t,r=e,o=i.skip?e:i,s=Math.sqrt(Math.pow(r.x-a.x,2)+Math.pow(r.y-a.y,2)),l=Math.sqrt(Math.pow(o.x-r.x,2)+Math.pow(o.y-r.y,2)),u=s/(s+l),d=l/(s+l),h=n*(u=isNaN(u)?0:u),c=n*(d=isNaN(d)?0:d);return{previous:{x:r.x-h*(o.x-a.x),y:r.y-h*(o.y-a.y)},next:{x:r.x+c*(o.x-a.x),y:r.y+c*(o.y-a.y)}}},ut.EPSILON=Number.EPSILON||1e-14,ut.splineCurveMonotone=function(t){var e,i,n,a,r,o,s,l,u,d=(t||[]).map(function(t){return{model:t._model,deltaK:0,mK:0}}),h=d.length;for(e=0;e<h;++e)if(!(n=d[e]).model.skip){if(i=e>0?d[e-1]:null,(a=e<h-1?d[e+1]:null)&&!a.model.skip){var c=a.model.x-n.model.x;n.deltaK=0!==c?(a.model.y-n.model.y)/c:0}!i||i.model.skip?n.mK=n.deltaK:!a||a.model.skip?n.mK=i.deltaK:this.sign(i.deltaK)!==this.sign(n.deltaK)?n.mK=0:n.mK=(i.deltaK+n.deltaK)/2}for(e=0;e<h-1;++e)n=d[e],a=d[e+1],n.model.skip||a.model.skip||(ut.almostEquals(n.deltaK,0,this.EPSILON)?n.mK=a.mK=0:(r=n.mK/n.deltaK,o=a.mK/n.deltaK,(l=Math.pow(r,2)+Math.pow(o,2))<=9||(s=3/Math.sqrt(l),n.mK=r*s*n.deltaK,a.mK=o*s*n.deltaK)));for(e=0;e<h;++e)(n=d[e]).model.skip||(i=e>0?d[e-1]:null,a=e<h-1?d[e+1]:null,i&&!i.model.skip&&(u=(n.model.x-i.model.x)/3,n.model.controlPointPreviousX=n.model.x-u,n.model.controlPointPreviousY=n.model.y-u*n.mK),a&&!a.model.skip&&(u=(a.model.x-n.model.x)/3,n.model.controlPointNextX=n.model.x+u,n.model.controlPointNextY=n.model.y+u*n.mK))},ut.nextItem=function(t,e,i){return i?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},ut.previousItem=function(t,e,i){return i?e<=0?t[t.length-1]:t[e-1]:e<=0?t[0]:t[e-1]},ut.niceNum=function(t,e){var i=Math.floor(ut.log10(t)),n=t/Math.pow(10,i);return(e?n<1.5?1:n<3?2:n<7?5:10:n<=1?1:n<=2?2:n<=5?5:10)*Math.pow(10,i)},ut.requestAnimFrame="undefined"==typeof window?function(t){t()}:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},ut.getRelativePosition=function(t,e){var i,n,a=t.originalEvent||t,r=t.target||t.srcElement,o=r.getBoundingClientRect(),s=a.touches;s&&s.length>0?(i=s[0].clientX,n=s[0].clientY):(i=a.clientX,n=a.clientY);var l=parseFloat(ut.getStyle(r,"padding-left")),u=parseFloat(ut.getStyle(r,"padding-top")),d=parseFloat(ut.getStyle(r,"padding-right")),h=parseFloat(ut.getStyle(r,"padding-bottom")),c=o.right-o.left-l-d,f=o.bottom-o.top-u-h;return{x:i=Math.round((i-o.left-l)/c*r.width/e.currentDevicePixelRatio),y:n=Math.round((n-o.top-u)/f*r.height/e.currentDevicePixelRatio)}},ut.getConstraintWidth=function(t){return i(t,"max-width","clientWidth")},ut.getConstraintHeight=function(t){return i(t,"max-height","clientHeight")},ut._calculatePadding=function(t,e,i){return(e=ut.getStyle(t,e)).indexOf("%")>-1?i*parseInt(e,10)/100:parseInt(e,10)},ut._getParentNode=function(t){var e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e},ut.getMaximumWidth=function(t){var e=ut._getParentNode(t);if(!e)return t.clientWidth;var i=e.clientWidth,n=i-ut._calculatePadding(e,"padding-left",i)-ut._calculatePadding(e,"padding-right",i),a=ut.getConstraintWidth(t);return isNaN(a)?n:Math.min(n,a)},ut.getMaximumHeight=function(t){var e=ut._getParentNode(t);if(!e)return t.clientHeight;var i=e.clientHeight,n=i-ut._calculatePadding(e,"padding-top",i)-ut._calculatePadding(e,"padding-bottom",i),a=ut.getConstraintHeight(t);return isNaN(a)?n:Math.min(n,a)},ut.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},ut.retinaScale=function(t,e){var i=t.currentDevicePixelRatio=e||"undefined"!=typeof window&&window.devicePixelRatio||1;if(1!==i){var n=t.canvas,a=t.height,r=t.width;n.height=a*i,n.width=r*i,t.ctx.scale(i,i),n.style.height||n.style.width||(n.style.height=a+"px",n.style.width=r+"px")}},ut.fontString=function(t,e,i){return e+" "+t+"px "+i},ut.longestText=function(t,e,i,n){var a=(n=n||{}).data=n.data||{},r=n.garbageCollect=n.garbageCollect||[];n.font!==e&&(a=n.data={},r=n.garbageCollect=[],n.font=e),t.font=e;var o=0;ut.each(i,function(e){null!=e&&!0!==ut.isArray(e)?o=ut.measureText(t,a,r,o,e):ut.isArray(e)&&ut.each(e,function(e){null==e||ut.isArray(e)||(o=ut.measureText(t,a,r,o,e))})});var s=r.length/2;if(s>i.length){for(var l=0;l<s;l++)delete a[r[l]];r.splice(0,s)}return o},ut.measureText=function(t,e,i,n,a){var r=e[a];return r||(r=e[a]=t.measureText(a).width,i.push(a)),r>n&&(n=r),n},ut.numberOfLabelLines=function(t){var e=1;return ut.each(t,function(t){ut.isArray(t)&&t.length>e&&(e=t.length)}),e},ut.color=G?function(t){return t instanceof CanvasGradient&&(t=ot.global.defaultColor),G(t)}:function(t){return console.error("Color.js not found!"),t},ut.getHoverColor=function(t){return t instanceof CanvasPattern||t instanceof CanvasGradient?t:ut.color(t).saturate(.5).darken(.1).rgbString()}}(),ai._adapters=si,ai.Animation=pt,ai.animationService=vt,ai.controllers=ue,ai.DatasetController=kt,ai.defaults=ot,ai.Element=gt,ai.elements=Nt,ai.Interaction=pe,ai.layouts=xe,ai.platform=Ve,ai.plugins=He,ai.Scale=fi,ai.scaleService=Ee,ai.Ticks=li,ai.Tooltip=Je,ai.helpers.each(en,function(t,e){ai.scaleService.registerScaleType(e,t,t._defaults)}),kn)kn.hasOwnProperty(Dn)&&ai.plugins.register(kn[Dn]);ai.platform.initialize();var Cn=ai;return"undefined"!=typeof window&&(window.Chart=ai),ai.Chart=ai,ai.Legend=kn.legend._element,ai.Title=kn.title._element,ai.pluginService=ai.plugins,ai.PluginBase=ai.Element.extend({}),ai.canvasHelpers=ai.helpers.canvas,ai.layoutService=ai.layouts,ai.LinearScaleBase=yi,ai.helpers.each(["Bar","Bubble","Doughnut","Line","PolarArea","Radar","Scatter"],function(t){ai[t]=function(e,i){return new ai(e,ai.helpers.merge(i||{},{type:t.charAt(0).toLowerCase()+t.slice(1)}))}}),Cn});
      window.ChartJS = window.Chart
    }

    const type = this.props.type || options.type

    return new window.ChartJS(root, {
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

    if (data.chartData) {
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

    return `
      <canvas width="${width}" height="${height}">
      </canvas>
    `
  }
}

Tonic.add(TonicChart)

class TonicCheckbox extends Tonic { /* global Tonic */
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
    this.reRender()
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
        color: var(--tonic-primary);
        font: 12px var(--tonic-subheader);
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
    if (this.state._changing) return

    e.stopPropagation()

    this.setState(state => Object.assign({}, state, {
      checked: !state.checked,
      _changing: true
    }))

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
    let checked = this.state.checked
    if (typeof checked === 'undefined') {
      checked = this.state.checked = this.props.checked
    }

    const iconState = checked ? 'checked' : 'unchecked'

    return this.html`
      <svg>
        <use
          href="#${iconState}"
          xlink:href="#${iconState}"
          color="var(--tonic-primary)"
          fill="var(--tonic-primary)">
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

    return this.html`<label styles="label" for="tonic--checkbox--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
      title,
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
    const disabledAttr = disabled && disabled === 'true' ? `disabled` : ''

    const titleAttr = title ? `title="${title}"` : ''

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.removeAttribute('tabindex')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const attributes = [
      disabledAttr,
      titleAttr,
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
          ${this.renderIcon()}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

Tonic.add(TonicCheckbox)

class TonicIcon extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      fill: 'var(--tonic-primary)'
    }
  }

  stylesheet () {
    return `
      tonic-icon svg path {
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
      src,
      tabindex
    } = this.props

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.removeAttribute('tabindex')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <svg
        ${tabAttr}
        styles="icon">
        <use
          href="${src || ''}#${symbolId}"
          xlink:href="${src || ''}#${symbolId}"
          width="${size}"
          ${fill ? `fill="${fill}" color="${fill}"` : ''}
          height="${size}">
      </svg>
    `
  }
}

Tonic.add(TonicIcon)

class TonicInput extends Tonic { /* global Tonic */
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
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
        color: var(--tonic-primary);
        font: 14px var(--tonic-monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-input input:invalid {
        border-color: var(--tonic-error);
      }

      tonic-input input:invalid:focus {
        border-color: var(--tonic-error);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--tonic-primary);
      }

      tonic-input input[disabled] {
        background-color: var(--tonic-background);
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
        background-color: var(--tonic-error);
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
        border-top: 6px solid var(--tonic-error);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label for="tonic--input_${this.props.id}">${this.props.label}</label>`
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
    const input = this.querySelector('input')

    const set = (k, v, event) => {
      this.setState(state => Object.assign({}, state, { [k]: v }))
    }

    const relay = name => {
      this.dispatchEvent(new window.Event(name))
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

    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const ariaLabelAttr = label ? `aria-label="${label}"` : ''
    const ariaLabelledByAttr = ariaLabelledby ? `aria-labelledby="${ariaLabelledby}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled` : ''
    const maxAttr = max ? `max="${max}"` : ''
    const maxLengthAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = min ? `min="${min}"` : ''
    const minLengthAttr = minlength ? `minlength="${minlength}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''
    const readonlyAttr = readonly && readonly === 'true' ? `readonly` : ''
    const requiredAttr = required && required === 'true' ? `required` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const titleAttr = title ? `title="${title}"` : ''
    const value = this.state.value || this.props.value
    const valueAttr = value && value !== 'undefined' ? `value="${value.replace(/"/g, '&quot;')}"` : ''

    if (ariaLabelledByAttr) this.removeAttribute('ariaLabelled')
    if (height) this.style.width = height
    if (name) this.removeAttribute('name')
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const attributes = [
      ariaInvalidAttr,
      ariaLabelAttr,
      ariaLabelledByAttr,
      disabledAttr,
      maxAttr,
      maxLengthAttr,
      minAttr,
      minLengthAttr,
      nameAttr,
      patternAttr,
      placeholderAttr,
      readonlyAttr,
      requiredAttr,
      spellcheckAttr,
      tabAttr,
      titleAttr,
      valueAttr
    ].join(' ')

    const errorMessage = this.props.errorMessage ||
      this.props.errormessage || 'Invalid'

    return `
      <div class="tonic--wrapper ${positionAttr}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input
          styles="input"
          type="${type}"
          id="tonic--input_${this.props.id}"
          ${attributes}/>
        <div class="tonic--invalid">
          <span id="tonic--error-${this.props.id}">${errorMessage}</span>
        </div>
      </div>
    `
  }
}

Tonic.add(TonicInput)

class TonicProgressBar extends Tonic { /* global Tonic */
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

  stylesheet () {
    return `
      tonic-progress-bar {
        display: inline-block;
        user-select: none;
      }

      tonic-progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--tonic-background);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--tonic-accent);
        width: 0%;
        height: 100%;
      }
    `
  }

  styles () {
    let progress = this.state.progress || this.props.progress
    return {
      wrapper: {
        width: this.props.width,
        height: this.props.height
      },
      progress: {
        width: progress + '%',
        backgroundColor: this.props.color || 'var(--tonic-accent)'
      }
    }
  }

  setProgress (progress) {
    this.setState(state => Object.assign({}, state, {
      progress
    }))

    this.reRender()
  }

  render () {
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

Tonic.add(TonicProgressBar)

class TonicProfileImage extends Tonic { /* global Tonic */
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
    let {
      theme,
      editable
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)
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

Tonic.add(TonicProfileImage)

class TonicRange extends Tonic { /* global Tonic */
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
        font: 13px var(--tonic-subheader);
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
        background-color: var(--tonic-background);
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-accent)), color-stop(100%, var(--tonic-accent)));
        background-image: -webkit-linear-gradient(var(--tonic-accent), var(--tonic-accent));
        background-image: -moz-linear-gradient(var(--tonic-accent), var(--tonic-accent));
        background-image: -o-linear-gradient(var(--tonic-accent), var(--tonic-accent));
        background-image: linear-gradient(var(--tonic-accent), var(--tonic-accent));
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 0;
        cursor: pointer;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]:disabled {
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-border)), color-stop(100%, var(--tonic-border)));
        background-image: -webkit-linear-gradient(var(--tonic-border), var(--tonic-border));
        background-image: -moz-linear-gradient(var(--tonic-border), var(--tonic-border));
        background-image: -o-linear-gradient(var(--tonic-border), var(--tonic-border));
        background-image: linear-gradient(var(--tonic-border), var(--tonic-border));
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

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.removeAttribute('tabindex')

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

class TonicSelect extends Tonic { /* global Tonic */
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
        background-color: var(--tonic-window);
        border-color: var(--tonic-border);
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
        border: 2px solid var(--tonic-medium);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-select select {
        color: var(--tonic-primary);
        font: 14px var(--tonic-monospace);
        background-color: var(--tonic-window);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--tonic-border);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
      }

      tonic-select select:not([multiple]) {
        padding: 10px 30px 10px 10px;
      }

      tonic-select select[disabled] {
        background-color: var(--tonic-background);
      }

      tonic-select label {
        color: var(--tonic-medium);
        font: 12px/14px var(--tonic-subheader);
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

    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const multipleAttr = multiple && multiple === 'true' ? `multiple="true"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const sizeAttr = size ? `size="${size}"` : ''

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.removeAttribute('tabindex')

    const attributes = [
      disabledAttr,
      multipleAttr,
      nameAttr,
      required,
      sizeAttr,
      tabAttr
    ].join(' ')

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        ${this.renderLabel()}
        <select styles="select" ${attributes}>
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

Tonic.add(TonicSelect)

class TonicSprite extends Tonic { /* global Tonic */
  stylesheet () {
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

Tonic.add(TonicSprite)

class TonicTextarea extends Tonic { /* global Tonic */
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
        color: var(--tonic-primary);
        width: 100%;
        font: 14px var(--tonic-monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--tonic-primary);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--tonic-danger);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--tonic-background);
      }

      tonic-textarea label {
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
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
    if (!this.props.label) return ''
    return `<label for="tonic--textarea_${this.props.id}">${this.props.label}</label>`
  }

  willConnect () {
    this.props.value = this.props.value || this.textContent
  }

  render () {
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

    const ariaLabelAttr = label ? `aria-label="${label}"` : ''
    const ariaLabelledByAttr = ariaLabelledby ? `aria-labelledby="${ariaLabelledby}"` : ''
    const colsAttr = cols ? `cols="${cols}"` : ''
    const disabledAttr = disabled && disabled === 'true' ? `disabled="true"` : ''
    const maxAttr = maxlength ? `maxlength="${maxlength}"` : ''
    const minAttr = minlength ? `minlength="${minlength}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const rowsAttr = rows ? `rows="${rows}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    const autofocusAttr = autofocus ? 'autofocus' : ''
    const requiredAttr = required ? 'required' : ''
    const readonlyAttr = readonly ? 'readonly' : ''

    if (ariaLabelledByAttr) this.removeAttribute('ariaLabelled')
    if (width) this.style.width = width
    if (height) this.style.height = height
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')

    if (this.props.value === 'undefined') this.props.value = ''

    const attributes = [
      ariaLabelAttr,
      ariaLabelledByAttr,
      autofocusAttr,
      colsAttr,
      disabledAttr,
      maxAttr,
      minAttr,
      nameAttr,
      placeholderAttr,
      readonlyAttr,
      requiredAttr,
      rowsAttr,
      spellcheckAttr,
      tabAttr
    ].join(' ')

    return `
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea
          styles="textarea"
          id="tonic--textarea_${this.props.id}"
          ${attributes}>${this.props.value}</textarea>
      </div>
    `
  }
}

Tonic.add(TonicTextarea)

class TonicToaster extends Tonic { /* global Tonic */
  defaults () {
    return {
      position: 'center'
    }
  }

  stylesheet () {
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

    const positionAttr = position ? `tonic--${position}` : ''

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return `<div class="tonic--wrapper ${positionAttr}"></div>`
  }
}

Tonic.add(TonicToaster)

class TonicToasterInline extends Tonic { /* global Tonic */
  defaults () {
    return {
      display: 'true'
    }
  }

  stylesheet () {
    return `
      tonic-toaster-inline svg {
        width: inherit;
        height: inherit;
      }

      tonic-toaster-inline .tonic--notification {
        max-height: 0;
        position: relative;
        background-color: var(--tonic-window);
        border: 1px solid var(--tonic-border);
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
        color: var(--tonic-primary);
        font: 14px/18px var(--tonic-subheader);
      }

      tonic-toaster-inline .tonic--message {
        font: 14px/18px var(--tonic-subheader);
        color: var(--tonic-medium);
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
            color="var(--tonic-primary)"
            fill="var(--tonic-primary)">
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
            color="var(--tonic-${type})"
            fill="var(--tonic-${type})">
          </use>
        </svg>
      </div>
    `
  }

  styles () {
    return {
      type: {
        'border-color': `var(--tonic-${this.props.type})`
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

    let typeClasses = ''
    let styles = []

    if (type) {
      typeClasses = `tonic--alert tonic--${type}`
      styles.push('type')
    }

    styles = styles.join('')

    return this.html`
      <div class="tonic--notification ${typeClasses}" styles="${styles}">
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

Tonic.add(TonicToasterInline)

class TonicToggle extends Tonic { /* global Tonic */
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

  stylesheet () {
    return `
      tonic-toggle .tonic--toggle--wrapper {
        height: 30px;
        position: relative;
      }

      tonic-toggle .tonic--toggle--wrapper > label {
        color: var(--tonic-medium);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader);
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
        font: bold 12px var(--tonic-subheader);
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
        background-color: var(--tonic-border);
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
        background-color: var(--tonic-border);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--tonic-window);
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
        background-color: var(--tonic-window);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--tonic-accent);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--tonic-accent);
        color: var(--tonic-background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--tonic-background);
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
      theme,
      tabindex
    } = this.props

    const disabledAttr = disabled && disabled === 'true' ? `disabled` : ''

    const tabAttr = tabindex ? `tabindex="${tabindex}"` : ''
    if (tabindex) this.removeAttribute('tabindex')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

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
            ${tabAttr}
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

    }
  
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"timers":10}],5:[function(require,module,exports){
(function (setImmediate){
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
    return Math.random().toString(16).slice(2)
  }

  static _handleMaybePromise (p) {
    if (p && typeof p.then === 'function' && typeof p.catch === 'function') {
      p.catch(err => setImmediate(() => { throw err }))
    }
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static add (c) {
    c.prototype._props = Object.getOwnPropertyNames(c.prototype)

    if (!c.name || c.name.length === 1) {
      throw Error('Mangling. https://bit.ly/2TkJ6zP')
    }

    const name = Tonic._splitName(c.name).toLowerCase()
    if (window.customElements.get(name)) return

    Tonic._reg[name] = c
    Tonic._tags = Object.keys(Tonic._reg).join()
    window.customElements.define(name, c)
  }

  static sanitize (o) {
    if (!o) return o
    for (const [k, v] of Object.entries(o)) {
      if (({}).toString.call(v) === '[object HTMLElement]') continue
      if (typeof v === 'object') o[k] = Tonic.sanitize(v)
      if (typeof v === 'string') o[k] = Tonic.escape(v)
    }
    return o
  }

  static escape (s) {
    return s.replace(Tonic.ESC, c => Tonic.MAP[c])
  }

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  static _normalizeAttrs (o, x = {}) {
    [...o].forEach(o => (x[o.name] = o.value))
    return x
  }

  html ([s, ...strings], ...values) {
    const refs = o => {
      if (o && o.__children__) return this._placehold(o)
      switch (({}).toString.call(o)) {
        case '[object HTMLCollection]':
        case '[object NodeList]': return this._placehold([...o])
        case '[object Array]':
        case '[object Object]':
        case '[object Function]': return this._prop(o)
        case '[object NamedNodeMap]': return this._prop(Tonic._normalizeAttrs(o))
        case '[object Number]': return `${o}__float`
        case '[object Boolean]': return `${o}__boolean`
        case '[object HTMLElement]':
          return o.isTonicComponent ? this._prop(o) : o
      }
      return o
    }
    const reduce = (a, b) => a.concat(b, strings.shift())
    return values.map(refs).reduce(reduce, [s]).join('')
  }

  setState (o) {
    this.state = typeof o === 'function' ? o(this.state) : o
  }

  getState () {
    return this.state
  }

  reRender (o = this.props) {
    const oldProps = { ...this.props }
    this.props = Tonic.sanitize(typeof o === 'function' ? o(this.props) : o)

    return new Promise(resolve => window.requestAnimationFrame(() => {
      this._set(this, this.render)

      if (this.updated) {
        this.updated(oldProps)
      }
      resolve()
    }))
  }

  getProps () {
    return this.props
  }

  handleEvent (e) {
    const p = this[e.type](e)
    Tonic._handleMaybePromise(p)
  }

  _events () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.addEventListener(p, this)
    }
  }

  async _set (target, render, content = '') {
    for (const node of target.querySelectorAll(Tonic._tags)) {
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

    if (typeof content === 'string') {
      content = content.replace(Tonic.SPREAD, (_, p) => {
        const o = Tonic._data[p.split('__')[1]][p]
        return Object.entries(o).map(([key, value]) => {
          const k = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          return `${k}="${Tonic.escape(String(value))}"`
        }).join(' ')
      })

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
          if (children[id]) return fn(node, children[id])
        }
        node = node.firstChild
        while (node) {
          walk(node, fn)
          node = node.nextSibling
        }
      }

      walk(target, (node, children) => {
        for (const child of children) {
          node.parentNode.appendChild(child)
        }
        delete Tonic._children[this._id][node.id]
        node.parentNode.removeChild(node)
      })
    } else {
      target.innerHTML = ''
      target.appendChild(content.cloneNode(true))
    }

    if (this.stylesheet) {
      const styleNode = document.createElement('style')
      styleNode.appendChild(document.createTextNode(this.stylesheet()))
      target.insertBefore(styleNode, target.firstChild)
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
    const ref = `__${Tonic._createId()}__`
    Tonic._children[this._id] = Tonic._children[this._id] || {}
    Tonic._children[this._id][ref] = r
    return ref
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
      } else if (/\w+__boolean/.test(p)) {
        this.props[name] = p.includes('true')
      }
    }

    this.props = Object.assign(
      (this.defaults && this.defaults()) || {},
      Tonic.sanitize(this.props))

    if (!this._id) {
      this.source = this.innerHTML
    } else {
      this.innerHTML = this.source
    }

    this._id = this._id || Tonic._createId()

    this.willConnect && this.willConnect()
    this._set(this, this.render)
    const p = (this.connected && this.connected())
    Tonic._handleMaybePromise(p)
  }

  disconnectedCallback () {
    const p = (this.disconnected && this.disconnected())
    Tonic._handleMaybePromise(p)
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
  SPREAD: /\.\.\.(__\w+__\w+__)/g,
  ESC: /["&'<>`]/g,
  AsyncFunctionGenerator: async function * () {}.constructor,
  AsyncFunction: async function () {}.constructor,
  MAP: { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }
})

if (typeof module === 'object') module.exports = Tonic

}).call(this,require("timers").setImmediate)
},{"timers":10}],6:[function(require,module,exports){
(function (global){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
exports.default = global.fetch.bind(global);

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
const qs = (s, p) => (p || document).querySelector(s)
const qsa = (s, p) => [...(p || document).querySelectorAll(s)]

module.exports = { qs, qsa }

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
},{"process/browser.js":7,"timers":10}]},{},[1]);
