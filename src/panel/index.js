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

  style () {
    return ``
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
    panel.className = 'tonic--panel'

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay'
      overlayElement.setAttribute('style', `background-color: ${backgroundColor}`)
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
