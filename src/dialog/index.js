class Dialog extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.show = () => this.show()
    this.root.hide = () => this.hide()
    this.root.event = name => this.event(name)

    this.root.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.close')
      if (el) this.hide()

      const overlay = e.target.matches('.overlay')
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
    return `%style%`
  }

  show (fn) {
    const node = this.root.firstElementChild
    node.classList.add('show')
    fn && node.addEventListener('transitionend', fn, { once: true })

    this._escapeHandler = e => {
      if (e.keyCode === 27) this.hide()
    }

    document.addEventListener('keyup', this._escapeHandler)
  }

  hide (fn) {
    const node = this.root.firstElementChild
    node.classList.remove('show')
    fn && node.addEventListener('transitionend', fn, { once: true })
    document.removeEventListener('keyup', this._escapeHandler)
  }

  event (eventName) {
    const that = this

    return {
      then (resolve) {
        const listener = event => {
          const close = Tonic.match(event.target, '.close')
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

    this.root.classList.add('dialog')

    const template = document.createElement('template')
    const wrapper = document.createElement('div')

    const isOpen = !!this.root.querySelector('.wrapper.show')
    wrapper.className = isOpen ? 'wrapper show' : 'wrapper'

    const content = render()

    typeof content === 'string'
      ? (template.innerHTML = content)
      : [...content.children].forEach(el => template.appendChild(el))

    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'overlay'
      overlayElement.setAttribute('style', `background-color: ${backgroundColor}`)
      wrapper.appendChild(overlayElement)
    }

    const dialog = document.createElement('div')
    dialog.className = 'dialog'
    dialog.setAttribute('style', style.join(''))

    const close = document.createElement('div')
    close.className = 'close'

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
