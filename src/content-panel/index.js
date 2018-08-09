class ContentPanel extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.show = fn => this.show(fn)
    this.root.hide = fn => this.hide(fn)
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
    return `%style%`
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
    const computedStyles = window.getComputedStyle(this.root)
    const colorAttr = color || computedStyles.getPropertyValue('--primary')
    close.style.backgroundImage = `url("${this.props.closeIcon(colorAttr)}")`

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(clone)
    panel.appendChild(close)

    return wrapper
  }
}

ContentPanel.svg = {}

ContentPanel.svg.closeIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

Tonic.add(ContentPanel)
