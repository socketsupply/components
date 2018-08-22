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

  style () {
    return {
      '.tonic--dialog *': {
        boxSizing: 'border-box'
      },
      '.tonic--wrapper': {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        zIndex: '100',
        visibility: 'hidden',
        transition: 'visibility 0s ease 0.5s'
      },
      '.tonic--show': {
        visibility: 'visible',
        transition: 'visibility 0s ease 0s'
      },
      '.tonic--show .tonic--overlay': {
        opacity: '1'
      },
      '.tonic--show .tonic--dialog--content': {
        opacity: '1',
        '-webkit-transform': 'scale(1)',
        '-ms-transform': 'scale(1)',
        transform: 'scale(1)'
      },
      '.tonic--overlay': {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        opacity: '0',
        transition: 'opacity 0.3s ease-in-out'
      },
      '.tonic--dialog--content': {
        minWidth: '350px',
        minHeight: '250px',
        height: 'auto',
        width: 'auto',
        paddingTop: '70px',
        paddingBottom: '75px',
        margin: 'auto',
        position: 'relative',
        backgroundColor: 'var(--window)',
        boxShadow: '0px 30px 90px -20px rgba(0,0,0,0.3), 0 0 1px #a2a9b1',
        borderRadius: '4px',
        '-webkit-transform': 'scale(0.8)',
        '-ms-transform': 'scale(0.8)',
        transform: 'scale(0.8)',
        transition: 'all 0.3s ease-in-out',
        zIndex: '1',
        opacity: '0'
      },
      '.tonic--close': {
        width: '25px',
        height: '25px',
        position: 'absolute',
        top: '25px',
        right: '25px',
        cursor: 'pointer'
      }
    }
  }

  show (fn) {
    const node = this.root.firstElementChild
    node.classList.add('tonic--show')
    fn && node.addEventListener('transitionend', fn, { once: true })

    this._escapeHandler = e => {
      if (e.keyCode === 27) this.hide()
    }

    document.addEventListener('keyup', this._escapeHandler)
  }

  hide (fn) {
    const node = this.root.firstElementChild
    node.classList.remove('tonic--show')
    fn && node.addEventListener('transitionend', fn, { once: true })
    document.removeEventListener('keyup', this._escapeHandler)
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

    const isOpen = !!this.root.querySelector('.tonic--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--wrapper tonic--show' : 'tonic--wrapper'

    const content = render()

    typeof content === 'string'
      ? (template.innerHTML = content)
      : [...content.children].forEach(el => template.appendChild(el))

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay'
      overlayElement.setAttribute('style', `background-color: ${backgroundColor}`)
      wrapper.appendChild(overlayElement)
    }

    const dialog = document.createElement('div')
    dialog.className = 'tonic--dialog--content'
    dialog.setAttribute('style', style.join(''))

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
