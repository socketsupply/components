class ContentDialog extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.show = () => this.show()
    this.root.hide = () => this.hide()
  }

  defaults () {
    return {
      width: '450px',
      height: '275px',
      overlay: true,
      closeIcon: ContentDialog.svg.closeIcon,
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
    return `%style%`
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

    const computedStyles = window.getComputedStyle(this.root)
    const colorAttr = color || computedStyles.getPropertyValue('--primary')
    close.style.backgroundImage = `url("${this.props.closeIcon(colorAttr)}")`

    // append everything
    wrapper.appendChild(dialog)
    dialog.appendChild(this.template(id))
    dialog.appendChild(close)

    return wrapper
  }
}

ContentDialog.svg = {}

ContentDialog.svg.closeIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${window.btoa(svg)}`
}

Tonic.add(ContentDialog)
