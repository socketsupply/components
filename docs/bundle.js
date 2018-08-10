(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const scrollToY = require('scrolltoy')
const main = document.querySelector('main')

window.Tonic = require('tonic')
require('../../index.js')

function ready () {
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
      scrollToY(main, section.offsetTop, 500)
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

  const themePicker = document.querySelector('.theme-picker')
  themePicker.addEventListener('click', e => {
    document.body.classList.toggle('theme-dark')
  })

  main.addEventListener('scroll', onscroll)
}

document.addEventListener('DOMContentLoaded', ready)

},{"../../index.js":2,"scrolltoy":4,"tonic":6}],2:[function(require,module,exports){
(function (setImmediate){
class ContentDialog extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.show = () => this.show()
    this.root.hide = () => this.hide()
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
      closeIcon: ContentDialog.svg.closeIcon(this.getPropertyValue('primary')),
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  compile (s) {
    // eslint-disable-next-line
    return new Function(`return \`${s}\``).bind(this)
  }

  template (id) {
    const node = document.querySelector(`template[for="${id}"]`)
    const template = this.compile(node.innerHTML)
    const div = document.createElement('div')
    div.innerHTML = template()
    return div
  }

  style () {
    return `content-dialog * {
  box-sizing: border-box;
}
content-dialog > .wrapper {
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
content-dialog > .wrapper.show {
  visibility: visible;
  transition: visibility 0s ease 0s;
}
content-dialog > .wrapper.show .overlay {
  opacity: 1;
}
content-dialog > .wrapper.show .dialog {
  opacity: 1;
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}
content-dialog .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
content-dialog .dialog {
  min-width: 350px;
  min-height: 250px;
  height: auto;
  width: auto;
  padding-top: 70px;
  padding-bottom: 75px;
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
content-dialog .dialog header {
  height: 70px;
  font: 14px var(--subheader);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 26px 65px 25px 65px;
}
content-dialog .dialog main {
  width: auto;
  padding: 20px;
  margin: 0 auto;
}
content-dialog .dialog .close {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
}
content-dialog .dialog footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  padding: 12px;
  display: flex;
  justify-content: center;
}
`
  }

  setContent (s) {
    this.root.querySelector('main').innerHTML = s
  }

  show (fn) {
    const node = this.root.firstElementChild
    node.classList.add('show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  hide (fn) {
    const node = this.root.firstElementChild
    node.classList.remove('show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (el) this.hide()

    const overlay = e.target.matches('.overlay')
    if (overlay) this.hide()
  }

  render () {
    const {
      width,
      height,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    const id = this.root.getAttribute('id')

    if (this.state.rendered) {
      const div = this.root.querySelector('.dialog div')
      div.parentNode.replaceChild(this.template(id), div)
      return this.root.firstChild
    }

    this.state.rendered = true

    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'

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

    // close button
    const close = document.createElement('div')
    close.className = 'close'

    const iconColor = color || this.getPropertyValue('primary')
    const url = ContentDialog.svg.closeIcon(iconColor)
    close.style.backgroundImage = `url("${url}")`

    // append everything
    wrapper.appendChild(dialog)
    dialog.appendChild(this.template(id))
    dialog.appendChild(close)

    return wrapper
  }
}

ContentDialog.svg = {}
ContentDialog.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
ContentDialog.svg.closeIcon = color => ContentDialog.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

Tonic.add(ContentDialog)

class ContentPanel extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.show = fn => this.show(fn)
    this.root.hide = fn => this.hide(fn)
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      position: 'right',
      overlay: false,
      closeIcon: ContentPanel.svg.closeIcon,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  style () {
    return `content-panel * {
  box-sizing: border-box;
}
content-panel .wrapper .panel {
  width: 500px;
  position: fixed;
  bottom: 0;
  top: 0;
  background-color: var(--window);
  box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
  z-index: 100;
  transition: transform 0.3s ease-in-out;
}
content-panel .wrapper.left .panel {
  left: 0;
  -webkit-transform: translateX(-500px);
  -ms-transform: translateX(-500px);
  transform: translateX(-500px);
  border-right: 1px solid var(--border);
}
content-panel .wrapper.right .panel {
  right: 0;
  -webkit-transform: translateX(500px);
  -ms-transform: translateX(500px);
  transform: translateX(500px);
  border-left: 1px solid var(--border);
}
content-panel .wrapper.show.right .panel,
content-panel .wrapper.show.left .panel {
  -webkit-transform: translateX(0);
  -ms-transform: translateX(0);
  transform: translateX(0);
}
content-panel .wrapper.show.right[overlay="true"] .overlay,
content-panel .wrapper.show.left[overlay="true"] .overlay {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease-in-out, visibility 0s ease 0s;
}
content-panel .wrapper .overlay {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.3s ease-in-out, visibility 0s ease 1s;
}
content-panel .wrapper .close {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}
content-panel .wrapper header {
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
}
content-panel .wrapper main {
  padding: 20px;
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 70px;
  overflow: scroll;
}
content-panel .wrapper footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70px;
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--border);
}
`
  }

  show (fn) {
    const node = this.root.firstChild
    node.classList.add('show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  hide (fn) {
    const node = this.root.firstChild
    node.classList.remove('show')
    fn && node.addEventListener('transitionend', fn, { once: true })
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (el) this.hide()

    const overlay = Tonic.match(e.target, '.overlay')
    if (overlay) this.hide()

    this.value = {}
  }

  render () {
    const {
      name,
      position,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    const id = this.root.getAttribute('id')

    if (theme) this.root.classList.add(`theme-${theme}`)

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.id = 'wrapper'
    wrapper.classList.add('wrapper')
    wrapper.classList.add(position)

    if (overlay) wrapper.setAttribute('overlay', true)
    if (name) wrapper.setAttribute('name', name)

    // create panel
    const panel = document.createElement('div')
    panel.className = 'panel'

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

    const iconColor = color || this.getPropertyValue('primary')
    const url = ContentPanel.svg.closeIcon(iconColor)
    close.style.backgroundImage = `url("${url}")`

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(clone)
    panel.appendChild(close)

    return wrapper
  }
}

ContentPanel.svg = {}
ContentPanel.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
ContentPanel.svg.closeIcon = color => ContentPanel.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

Tonic.add(ContentPanel)

class ContentRoute extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    if (ContentRoute.patched) return
    ContentRoute.patched = true

    const createEvent = function (type) {
      const orig = window.history[type]
      return function (...args) {
        var value = orig.call(this, ...args)
        window.dispatchEvent(new window.Event(type.toLowerCase()))
        const nodes = document.getElementsByTagName('content-route')
        for (const node of nodes) node.setProps(p => p)
        return value
      }
    }

    window.addEventListener('popstate', e => this.setProps(p => p))

    window.history.pushState = createEvent('pushState')
    window.history.replaceState = createEvent('replaceState')
  }

  willConnect () {
    this.html = this.root.innerHTML
  }

  compile (s) {
    // eslint-disable-next-line
    return new Function(`return \`${s}\``).bind(this)
  }

  render () {
    const template = this.compile(this.html)

    const none = this.root.hasAttribute('none')

    if (none) {
      if (ContentRoute.matches) return
      this.root.classList.add('show')
      return template()
    }

    const path = this.root.getAttribute('path')
    const keys = []
    const matcher = ContentRoute.matcher(path, keys)
    const match = matcher.exec(window.location.pathname)

    if (match) {
      ContentRoute.matches = true

      match.slice(1).forEach((m, i) => {
        this.state[keys[i].name] = m
      })

      this.root.classList.add('show')
      return template()
    }

    return ''
  }
}

ContentRoute.matches = false
ContentRoute.matcher = (() => {
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

Tonic.add(ContentRoute)

class ContentTabs extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  style () {
    return `content-tabs {
  display: block;
}
[data-tab-name]:not([data-tab-group]) {
  user-select: none;
  font-family: var(--subheader);
  font-size: 14px;
  border-bottom: 1px solid transparent;
  margin-right: 8px;
}
[data-tab-name]:not([data-tab-group]).selected {
  color: var(--accent);
  border-bottom: 1px solid var(--accent);
}
[data-tab-group] {
  margin-top: 15px;
  display: none;
  border-top: 1px solid var(--border);
  padding-top: 15px;
}
[data-tab-group].show {
  display: block;
}
`
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  click (e) {
    e.preventDefault()
    if (!Tonic.match(e.target, '[data-tab-name]:not([data-tab-group])')) return

    const group = this.props.group
    const currentContent = this.qs(`[data-tab-group="${group}"].show`)
    if (currentContent) currentContent.classList.remove('show')

    const name = e.target.dataset.tabName
    const target = this.qs(`[data-tab-group="${group}"][data-tab-name="${name}"]`)

    if (!target) {
      console.warn(`Not found '[data-tab-group="${group}"][data-tab-name="${name}"]'`)
      return
    }

    const currentLink = this.qs(`[data-tab-name].selected`)
    if (currentLink) currentLink.classList.remove('selected')

    target.classList.add('show')
    e.target.classList.add('selected')
  }

  render () {
    let {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    return this.root.innerHTML
  }
}

Tonic.add(ContentTabs)

class ContentTooltip extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
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
      width: '450px',
      height: 'auto'
    }
  }

  style () {
    return `content-tooltip .tooltip {
  position: absolute;
  top: 30px;
  background: var(--window);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: opacity 0.3s ease-in-out, z-index 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  visibility: hidden;
  z-index: -1;
  opacity: 0;
}
content-tooltip .tooltip.show {
  box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3);
  visibility: visible;
  opacity: 1;
  z-index: 1;
}
content-tooltip .tooltip .tooltip-arrow {
  width: 12px;
  height: 12px;
  position: absolute;
  z-index: -1;
  background-color: var(--window);
  border: 1px solid transparent;
  border-radius: 2px;
  pointer-events: none;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 50%;
}
content-tooltip .tooltip.top .tooltip-arrow {
  margin-bottom: -6px;
  bottom: 100%;
  border-top-color: var(--border);
  border-left-color: var(--border);
}
content-tooltip .tooltip.bottom .tooltip-arrow {
  margin-top: -6px;
  position: absolute;
  top: 100%;
  border-bottom-color: var(--border);
  border-right-color: var(--border);
}
`
  }

  show (relativeNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.querySelector('.tooltip')
      const arrow = this.root.querySelector('.tooltip-arrow')
      let scrollableArea = relativeNode.parentNode

      while (true) {
        if (!scrollableArea || scrollableArea.tagName === 'BODY') break
        if (window.getComputedStyle(scrollableArea).overflow === 'scroll') break
        scrollableArea = scrollableArea.parentNode
      }

      let { top, left } = relativeNode.getBoundingClientRect()
      let pos = top + scrollableArea.scrollTop

      left -= scrollableArea.offsetLeft + (tooltip.offsetWidth / 2)
      left += relativeNode.offsetWidth / 2

      const offset = relativeNode.offsetHeight + (arrow.offsetHeight / 2)

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('bottom')
        tooltip.classList.add('top')
        pos += offset
      } else {
        tooltip.classList.remove('top')
        tooltip.classList.add('bottom')
        pos -= offset + tooltip.offsetHeight
      }

      tooltip.style.top = `${pos}px`
      tooltip.style.left = `${left}px`
      tooltip.classList.add('show')
    }, 128)
  }

  hide () {
    clearTimeout(this.timer)
    const tooltip = this.root.querySelector('.tooltip')
    tooltip.classList.remove('show')
  }

  render () {
    const {
      theme,
      width,
      height
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    return `
      <div style="${style}" class="tooltip">
        ${this.root.innerHTML}
        <span class="tooltip-arrow"></span>
      </div>
    `
  }
}

Tonic.add(ContentTooltip)

class IconContainer extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '25px',
      color: 'var(--primary)',
      src: './sprite.svg#example'
    }
  }

  style () {
    return `icon-container svg {
  width: 100%;
  height: 100%;
}
`
  }

  render () {
    let {
      color,
      size,
      theme,
      src
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

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

Tonic.add(IconContainer)

class InputButton extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)
    this.root.done = () => this.done()
  }
  defaults () {
    return {
      value: 'Submit',
      disabled: false,
      autofocus: false,
      height: '40px',
      width: '150px',
      radius: '2px'
    }
  }

  style () {
    return `input-button {
  display: inline-block;
}
input-button[width="100%"] {
  display: block;
}
input-button .wrapper {
  margin: 5px;
}
input-button button {
  color: var(--primary);
  width: auto;
  min-height: 40px;
  font: 12px var(--subheader);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 8px 5px 8px;
  position: relative;
  background-color: transparent;
  border: 1px solid var(--primary);
  outline: none;
  transition: all 0.3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input-button button[disabled],
input-button button.active {
  color: var(--medium);
  background-color: var(--background);
  border-color: var(--background);
}
input-button button:not([disabled]):hover {
  color: var(--window);
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
  cursor: pointer;
}
input-button button.loading {
  color: transparent;
  background: var(--medium);
  border-color: var(--medium);
  pointer-events: none;
  transition: background 0.3s ease;
}
input-button button.loading:hover {
  background: var(--medium);
  border-color: var(--medium);
}
input-button button.loading:before {
  margin-top: -8px;
  margin-left: -8px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  -webkit-animation: spin 1s linear 0s infinite;
  animation: spin 1s linear 0s infinite;
  transition: opacity 0.3s ease;
}
input-button button:before {
  content: '';
  width: 14px;
  height: 14px;
  opacity: 0;
}
@-moz-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`
  }

  done () {
    setImmediate(() => {
      const button = this.root.querySelector('button')
      button.classList.remove('loading')
    })
  }

  click () {
    if (!this.props.async) return

    setImmediate(() => {
      const button = this.root.querySelector('button')
      button.classList.add('loading')
    })
  }

  render () {
    const {
      id,
      name,
      value,
      type,
      disabled,
      autofocus,
      active,
      width,
      height,
      radius,
      theme,
      fill,
      textColor
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

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

    let classes = []
    if (active) classes.push(`active`)
    classes = classes.join(' ')

    return `
      <div class="wrapper">
        <button
          ${idAttr}
          ${nameAttr}
          ${valueAttr}
          ${typeAttr}
          ${disabled ? 'disabled' : ''}
          ${autofocus ? 'autofocus' : ''}
          class="${classes}"
          style="${style}">${value}</button>
      </div>
    `
  }
}

Tonic.add(InputButton)

class InputCheckbox extends Tonic { /* global Tonic */
  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      disabled: false,
      checked: false,
      size: '18px'
    }
  }

  style () {
    return `input-checkbox .wrapper {
  display: inline-block;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
input-checkbox input[type="checkbox"] {
  display: none;
}
input-checkbox input[type="checkbox"][disabled] + label {
  opacity: 0.35;
}
input-checkbox label {
  color: var(--primary);
  font: 12px var(--subheader);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  vertical-align: middle;
}
input-checkbox label:nth-of-type(2) {
  padding-top: 2px;
  margin-left: 10px;
}
`
  }

  change (e) {
    const state = this.props.checked = !this.props.checked
    const color = this.props.color || this.getPropertyValue('primary')
    const url = InputCheckbox.svg[state ? 'iconOn' : 'iconOff'](color)
    this.root.querySelector('label.icon').style.backgroundImage = `url("${url}")`
  }

  connected () {
    this.label = this.root.querySelector('label')
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.root.dispatchEvent(new window.Event('change'))
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
      theme,
      iconOn,
      iconOff,
      size
    } = this.props

    if (theme) this.classList.add(`theme-${theme}`)

    if (!color) this.props.color = this.getPropertyValue('primary')
    if (!iconOn) this.props.iconOn = InputCheckbox.svg.iconOn(this.props.color)
    if (!iconOff) this.props.iconOff = InputCheckbox.svg.iconOff(this.props.color)

    let url = this.props[checked ? 'iconOn' : 'iconOff']

    const nameAttr = name ? `name="${name}"` : ''

    //
    // the id attribute can be removed from the component
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

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
          class="icon"
          style="
            width: ${size};
            height: ${size};
            background-image: url('${url}');">
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

InputCheckbox.svg = {}
InputCheckbox.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

InputCheckbox.svg.iconOn = (color) => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
    <polygon fill="${color}" points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
  </svg>
`)

InputCheckbox.svg.iconOff = (color) => InputCheckbox.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
  </svg>
`)

Tonic.add(InputCheckbox)

class InputSelect extends Tonic { /* global Tonic */
  defaults () {
    return {
      disabled: false,
      iconArrow: InputSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  style () {
    return `input-select select {
  font: 14px var(--monospace);
  padding: 10px 20px 10px 10px;
  background-color: var(--window);
  background-repeat: no-repeat;
  background-position: center right;
  border: 1px solid var(--border);
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input-select label {
  color: var(--medium);
  font: 12px/14px var(--subheader);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 10px;
  display: block;
}
`
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
      required,
      width,
      height,
      padding,
      theme,
      radius
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (id) this.root.removeAttribute('id')
    if (theme) this.root.classList.add(`theme-${theme}`)

    this.root.style.width = width

    let style = []
    if (width) style.push(`width: ${width}`)
    if (height) style.push(`height: ${height}`)
    if (radius) style.push(`border-radius: ${radius}`)
    if (padding) style.push(`padding: ${padding}`)

    style.push(`background-image: url('${this.props.iconArrow}')`)
    style = style.join('; ')

    const options = this.root.innerHTML

    return `
      <div class="wrapper">
        ${this.renderLabel()}

        <select
          ${idAttr}
          ${nameAttr}
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
InputSelect.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
InputSelect.svg.default = () => InputSelect.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/>
  </svg>
`)

Tonic.add(InputSelect)

class InputText extends Tonic { /* global Tonic */
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      width: '250px',
      position: 'right'
    }
  }

  style () {
    return `input-text .wrapper {
  position: relative;
}
input-text .wrapper.right icon-container {
  right: 10px;
}
input-text .wrapper.right input {
  padding-right: 40px;
}
input-text .wrapper.left icon-container {
  left: 10px;
}
input-text .wrapper.left input {
  padding-left: 40px;
}
input-text icon-container {
  position: absolute;
  bottom: 7px;
}
input-text label {
  color: var(--medium);
  font-weight: 500;
  font: 12px/14px var(--subheader);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 10px;
  display: block;
}
input-text input {
  color: var(--primary);
  font: 14px var(--monospace);
  padding: 10px;
  background-color: transparent;
  border: 1px solid var(--border);
  transition: border 0.2s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
}
input-text input:focus {
  border-color: var(--primary);
}
input-text input[disabled] {
  background-color: var(--background);
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
      invalid,
      disabled,
      required,
      pattern,
      width,
      height,
      padding,
      theme,
      radius,
      position
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const valueAttr = (value && value !== 'undefined') ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const invalidAttr = invalid ? `invalid="${invalid}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

    let style = []

    if (width) {
      this.root.style.width = width
      style.push(`width: ${width}`)
    }

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
          ${patternAttr}
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${invalidAttr}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          style="${style}"
        />
      </div>
    `
  }
}

Tonic.add(InputText)

class InputTextarea extends Tonic { /* global Tonic */
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

  style () {
    return `input-textarea textarea {
  color: var(--primary);
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
input-textarea textarea:focus {
  border: 1px solid var(--primary);
}
input-textarea textarea:invalid {
  border-color: var(--danger);
}
input-textarea textarea[disabled] {
  background-color: var(--background);
}
input-textarea label {
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
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

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

Tonic.add(InputTextarea)

class InputToggle extends Tonic { /* global Tonic */
  defaults () {
    return {
      checked: false
    }
  }

  style () {
    return `input-toggle .wrapper {
  height: 30px;
  width: 47px;
  position: relative;
}
input-toggle .wrapper > label {
  color: var(--medium);
  font-weight: 500;
  font: 12px/14px 'Poppins', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: 58px;
  padding-top: 9px;
  display: block;
}
input-toggle .switch {
  position: absolute;
  left: 0;
  top: 0;
}
input-toggle .switch label:before {
  font: bold 12px 'Poppins', sans-serif;
  text-transform: uppercase;
}
input-toggle .switch input.toggle {
  position: absolute;
  display: none;
  outline: none;
  user-select: none;
  z-index: 1;
}
input-toggle .switch input.toggle + label {
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
input-toggle .switch input.toggle + label:before {
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
input-toggle .switch input.toggle + label:after {
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
input-toggle .switch input.toggle:disabled {
  cursor: default;
  background-color: var(--background);
}
input-toggle .switch input.toggle:disabled + label {
  cursor: default;
  background-color: var(--background);
}
input-toggle .switch input.toggle:disabled + label:before {
  background-color: var(--background);
}
input-toggle .switch input.toggle:disabled + label:after {
  background-color: var(--window);
}
input-toggle .switch input.toggle:checked + label {
  background-color: var(--accent);
}
input-toggle .switch input.toggle:checked + label:before {
  content: ' ';
  background-color: var(--accent);
  color: var(--background);
}
input-toggle .switch input.toggle:checked + label:after {
  margin-left: 18px;
  background-color: var(--background);
}
`
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
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    //
    // the id attribute can be removed to the input
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

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

Tonic.add(InputToggle)

class NotificationBadge extends Tonic { /* global Tonic */
  defaults () {
    return {
      count: 0
    }
  }

  style () {
    return `notification-badge * {
  box-sizing: border-box;
}
notification-badge .notifications {
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 10px;
  position: relative;
  background-color: var(--background);
  border-radius: 8px;
}
notification-badge .notifications span {
  color: var(--primary);
  font: 15px var(--subheader);
  letter-spacing: 1px;
  text-align: center;
}
notification-badge .notifications span:after {
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
notification-badge .notifications.new span:after {
  display: block;
}
`
  }

  render () {
    let {
      count,
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    //
    // the id attribute can be removed from the component
    // and added to the input inside the component.
    //
    this.root.removeAttribute('id')

    // if (count > 0) {
    //   const badge = this.root.firstElementChild
    //   badge.classList.add('new')
    // }

    const newAttr = (count > 0) ? 'new' : ''

    return `
      <div class="notifications ${newAttr}">
        <span>${count}</span>
      </div>
    `
  }
}

Tonic.add(NotificationBadge)

class NotificationCenter extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      closeIcon: NotificationCenter.svg.closeIcon(this.getPropertyValue('primary')),
      dangerIcon: NotificationCenter.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: NotificationCenter.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: NotificationCenter.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: NotificationCenter.svg.infoIcon(this.getPropertyValue('info')),
      position: 'center'
    }
  }

  style () {
    return `notification-center * {
  box-sizing: border-box;
}
notification-center .wrapper {
  user-select: none;
  position: fixed;
  top: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  visibility: hidden;
  z-index: 102;
}
notification-center .wrapper.show {
  visibility: visible;
}
notification-center .wrapper.center {
  left: 50%;
  align-items: center;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
notification-center .wrapper.left {
  align-items: flex-start;
  left: 10px;
}
notification-center .wrapper.right {
  align-items: flex-end;
  right: 10px;
}
notification-center .notification {
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
notification-center .notification.show {
  opacity: 1;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
notification-center .notification.close {
  padding-right: 50px;
}
notification-center .notification.alert {
  padding-left: 35px;
}
notification-center .notification main {
  padding: 17px 15px 15px 15px;
}
notification-center .notification main .title {
  font: 14px/18px var(--subheader);
}
notification-center .notification main .message {
  font: 14px/18px var(--subheader);
  color: var(--medium);
}
notification-center .notification .icon {
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
notification-center .notification .close {
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
notification-center .notification .close svg path {
  fill: var(--primary);
  color: var(--primary);
}
`
  }

  create ({ message, title, duration, type } = {}) {
    const notification = document.createElement('div')
    notification.className = 'notification'
    const main = document.createElement('main')
    if (type) {
      notification.classList.add('alert')
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'message'
    messageElement.textContent = message || this.props.message

    if (!duration) {
      const close = document.createElement('div')
      close.className = 'close'
      close.style.backgroundImage = `url("${this.props.closeIcon}")`
      notification.appendChild(close)
      notification.classList.add('close')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'icon'
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
    this.root.querySelector('.wrapper').appendChild(notification)
    this.show()

    setTimeout(() => {
      notification.classList.add('show')
    }, 64)

    if (duration) {
      setTimeout(() => this.destroy(notification), duration)
    }
  }

  destroy (notification) {
    notification.classList.remove('show')
    notification.addEventListener('transitionend', e => {
      notification.parentNode.removeChild(notification)
    })
  }

  show () {
    const node = this.root.firstElementChild
    node.classList.add('show')
  }

  hide () {
    const node = this.root.firstElementChild
    node.classList.remove('show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (!el) return

    const notification = el.closest('.notification')
    if (notification) this.destroy(notification)
  }

  render () {
    const {
      theme,
      position
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    return `<div class="wrapper ${position}"></div>`
  }
}

NotificationCenter.svg = {}
NotificationCenter.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

NotificationCenter.svg.closeIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

NotificationCenter.svg.dangerIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

NotificationCenter.svg.warningIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

NotificationCenter.svg.successIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

NotificationCenter.svg.infoIcon = color => NotificationCenter.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(NotificationCenter)

class NotificationInline extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      closeIcon: NotificationInline.svg.closeIcon(),
      dangerIcon: NotificationInline.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: NotificationInline.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: NotificationInline.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: NotificationInline.svg.infoIcon(this.getPropertyValue('info'))
    }
  }

  style () {
    return `notification-inline * {
  box-sizing: border-box;
}
notification-inline .wrapper {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  transform: translateX(-50%);
  visibility: hidden;
  border: 1px solid #f00;
}
notification-inline .wrapper.show {
  visibility: visible;
}
notification-inline .notification {
  margin: 10px 0;
  position: relative;
  background-color: var(--window);
  border-radius: 3px;
  -webkit-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
  transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
  border: 1px solid var(--border);
  z-index: 1;
  opacity: 0;
}
notification-inline .notification.warning {
  border-color: var(--warning);
}
notification-inline .notification.danger {
  border-color: var(--danger);
}
notification-inline .notification.success {
  border-color: var(--success);
}
notification-inline .notification.info {
  border-color: var(--secondary);
}
notification-inline .notification.show {
  opacity: 1;
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}
notification-inline .notification.close {
  padding-right: 50px;
}
notification-inline .notification.alert {
  padding-left: 35px;
}
notification-inline .notification main {
  padding: 17px 15px 15px 15px;
}
notification-inline .notification main .title {
  font: 14px/18px var(--subheader);
}
notification-inline .notification main .message {
  font: 14px/18px var(--subheader);
  color: var(--medium);
}
notification-inline .notification .icon {
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
notification-inline .notification .close {
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
notification-inline .notification .close svg path {
  fill: var(--primary);
  color: var(--primary);
}
`
  }

  create ({ message, title, duration, type } = {}) {
    this.show()

    while (this.root.firstChild) this.root.firstChild.remove()

    const notification = document.createElement('div')
    notification.className = 'notification'
    const main = document.createElement('main')
    if (type) {
      notification.classList.add('alert')
      notification.classList.add(type)
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'message'
    messageElement.textContent = message || this.props.message

    if (!duration) {
      const close = document.createElement('div')
      close.className = 'close'
      close.style.backgroundImage = `url("${this.props.closeIcon}")`
      notification.appendChild(close)
      notification.classList.add('close')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'icon'
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

    if (!type && !message && !title) {
      messageElement.textContent = 'Empty message'
    }

    this.root.appendChild(notification)
    notification.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    setImmediate(() => notification.classList.add('show'))

    if (duration) {
      setTimeout(() => this.destroy(notification), duration)
    }
  }

  destroy (notification) {
    notification.classList.remove('show')
    notification.addEventListener('transitionend', e => {
      notification.parentNode.removeChild(notification)
    })
  }

  show () {
    setImmediate(() => {
      this.root.firstChild.classList.add('show')
    })
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (!el) return

    const notification = el.closest('.notification')
    if (notification) this.destroy(notification)
  }

  render () {
    const {
      theme
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    return `<div class="wrapper"></div>`
  }
}

NotificationInline.svg = {}
NotificationInline.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

NotificationInline.svg.closeIcon = color => NotificationInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

NotificationInline.svg.dangerIcon = color => NotificationInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

NotificationInline.svg.warningIcon = color => NotificationInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

NotificationInline.svg.successIcon = color => NotificationInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

NotificationInline.svg.infoIcon = color => NotificationInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(NotificationInline)

class ProfileImage extends Tonic { /* global Tonic */
  defaults () {
    return {
      size: '50px',
      src: ProfileImage.svg.default(),
      iconEdit: ProfileImage.svg.edit(),
      radius: '5px'
    }
  }

  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  style () {
    return `profile-image .wrapper {
  position: relative;
  overflow: hidden;
}
profile-image .wrapper .image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
profile-image .wrapper .overlay {
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
profile-image .wrapper .overlay div {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  background-position: center center;
}
profile-image .wrapper.editable:hover .overlay {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}
`
  }

  getPictureData (src, cb) {
    const reader = new window.FileReader()
    reader.onerror = err => cb(err)
    reader.onload = e => cb(null, e.target.result)
    reader.readAsDataURL(src)
  }

  click (e) {
    const fileInput = this.root.getElementsByTagName('input')[0]
    fileInput.click()
  }

  change (e) {
    const fileInput = this.root.getElementsByTagName('input')[0]
    const data = fileInput.files[0]

    this.getPictureData(data, (err, data) => {
      if (err) return this.emit('error', err)

      const slot = this.root.querySelector('.image')
      slot.style.backgroundImage = 'url("' + data + '")'
      this.emit('changed', data)
    })
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
    } = this.props

    const idAttr = id ? `id="${id}"` : ''
    const nameAttr = name ? `name="${name}"` : ''

    if (theme) this.root.classList.add(`theme-${theme}`)

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
          style="background-image: url('${src}');">
        </div>
        <input type="file" style="display:none"/>
        <div class="overlay">
          <div style="background-image: url('${this.props.iconEdit}')"></div>
        </div>
      </div>
    `
  }
}

ProfileImage.svg = {}
ProfileImage.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
ProfileImage.svg.default = () => ProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect fill="#F0F0F0" width="100" height="100"></rect>
    <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
    <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
  </svg>
`)

ProfileImage.svg.edit = () => ProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#fff" d="M79.8,32.8L67.5,20.5c-0.2-0.2-0.5-0.2-0.7,0L25.2,62.1c-0.1,0.1-0.1,0.1-0.1,0.2L20.8,79c0,0.2,0,0.4,0.1,0.5c0.1,0.1,0.2,0.1,0.4,0.1c0,0,0.1,0,0.1,0l16.6-4.4c0.1,0,0.2-0.1,0.2-0.1l41.6-41.6C79.9,33.3,79.9,33,79.8,32.8z M67.1,25.8l7.3,7.3L36.9,70.7l-7.3-7.3L67.1,25.8z M33,72.4l-6.8,1.8l1.8-6.9L33,72.4z"/>
  </svg>
`)

Tonic.add(ProfileImage)

}).call(this,require("timers").setImmediate)
},{"timers":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{"process/browser.js":3,"timers":5}],6:[function(require,module,exports){
class Tonic {
  constructor (node) {
    this.props = {}
    this.state = {}
    const name = Tonic._splitName(this.constructor.name)
    this.root = node || document.createElement(name.toLowerCase())
    Tonic.refs.push(this.root)
    this.root.destroy = index => this._disconnect(index)
    this.root.setProps = v => this.setProps(v)
    this.root.setState = v => this.setState(v)
    this._bindEventListeners()
    this._connect()
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static add (c) {
    c.prototype._props = Object.getOwnPropertyNames(c.prototype)
    if (!c.name) throw Error('Mangling detected, see guide.')

    const name = Tonic._splitName(c.name).toUpperCase()
    Tonic.registry[name] = c
    if (c.registered) throw new Error(`Already registered ${c.name}`)
    c.registered = true

    if (!Tonic.styleNode) {
      Tonic.styleNode = document.head.appendChild(document.createElement('style'))
    }

    Tonic._constructTags()
  }

  static _constructTags () {
    for (const tagName of Object.keys(Tonic.registry)) {
      for (const node of document.getElementsByTagName(tagName.toLowerCase())) {
        if (!Tonic.registry[tagName] || node.destroy) continue
        const t = new Tonic.registry[tagName](node)
        if (!t) throw Error('Unable to construct component, see guide.')
      }
    }
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

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  emit (name, detail) {
    this.root.dispatchEvent(new window.Event(name, { detail }))
  }

  html ([s, ...strings], ...values) {
    const reducer = (a, b) => a.concat(b, strings.shift())
    const filter = s => s && (s !== true || s === 0)
    return Tonic.sanitize(values).reduce(reducer, [s]).filter(filter).join('')
  }

  setState (o) {
    this.state = typeof o === 'function' ? o(this.state) : o
  }

  setProps (o) {
    const oldProps = JSON.parse(JSON.stringify(this.props))
    this.props = Tonic.sanitize(typeof o === 'function' ? o(this.props) : o)
    this._setContent(this.root, this.render())
    Tonic._constructTags()
    this.updated && this.updated(oldProps)
  }

  _bindEventListeners () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.root.addEventListener(p, e => this[p](e))
    }
  }

  _setContent (target, content) {
    if (typeof content === 'string') {
      target.innerHTML = content
    } else {
      while (target.firstChild) target.firstChild.remove()
      target.appendChild(content)
    }
    Tonic.refs.forEach((e, i) => !e.parentNode && e.destroy(i))
  }

  _connect () {
    for (let { name, value } of this.root.attributes) {
      name = name.replace(/-(.)/gui, (_, m) => m.toUpperCase())
      this.props[name] = value || name
    }

    if (this.props.data) {
      try { this.props.data = JSON.parse(this.props.data) } catch (e) {}
    }

    this.props = Tonic.sanitize(this.props)

    for (const [k, v] of Object.entries(this.defaults ? this.defaults() : {})) {
      if (!this.props[k]) this.props[k] = v
    }

    this.willConnect && this.willConnect()
    this._setContent(this.root, this.render())
    Tonic._constructTags()

    if (this.style && !Tonic.registry[this.root.tagName].styled) {
      Tonic.registry[this.root.tagName].styled = true
      const textNode = document.createTextNode(this.style())
      Tonic.styleNode.appendChild(textNode)
    }

    this.connected && this.connected()
  }

  _disconnect (index) {
    this.disconnected && this.disconnected()
    delete this.styleNode
    delete this.root
    Tonic.refs.splice(index, 1)
  }
}

Tonic.refs = []
Tonic.registry = {}
Tonic.escapeRe = /["&'<>`]/g
Tonic.escapeMap = { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }

if (typeof module === 'object') module.exports = Tonic

},{}]},{},[1,2]);
