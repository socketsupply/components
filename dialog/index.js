const Tonic = require('@optoolco/tonic')

class Dialog extends Tonic {
  constructor () {
    super()

    this.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--dialog-close')
      if (el) this.hide()

      const overlay = e.target.matches('.tonic--dialog-overlay')
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
        top: 16px;
        right: 16px;
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
          const close = Tonic.match(event.target, '.tonic--dialog-close')
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
      overlayElement.className = 'tonic--overlay tonic--dialog-overlay'
      overlayElement.style.backgroundColor = backgroundColor
      wrapper.appendChild(overlayElement)
    }

    const dialog = document.createElement('div')
    dialog.className = 'tonic--dialog--content'
    if (width) dialog.style.width = width
    if (height) dialog.style.height = height

    // create template
    const closeIcon = document.createElement('div')
    closeIcon.className = 'tonic--close tonic--dialog-close'

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
      } else if (content.isTonicRaw) {
        contentContainer.innerHTML = content.rawText
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
