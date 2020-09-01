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
        width: 100%;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--tonic-window, #fff);
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease;
        opacity: 0;
        z-index: 100;
      }

      @media (min-width: 500px) {
        .tonic--panel .tonic--panel--inner {
          width: 50%;
        }
      }

      .tonic--panel .tonic--left .tonic--panel--inner {
        left: 0;
        -webkit-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        transform: translateX(-100%);
        border-right: 1px solid var(--tonic-border, #333);
        visibility: hidden;
      }

      .tonic--panel .tonic--right .tonic--panel--inner {
        right: 0;
        -webkit-transform: translateX(100%);
        -ms-transform: translateX(100%);
        transform: translateX(100%);
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
      } else if (content.isTonicUnsafeString) {
        contentContainer.innerHTML = content.rawText
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
