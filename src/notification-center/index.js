class NotificationCenter extends Tonic { /* global Tonic */
  constructor (props) {
    super(props)

    this.root.create = (o) => this.create(o)
    this.root.hide = () => this.hide()
  }

  defaults () {
    return {
    }
  }

  style () {
    return `%style%`
  }

  create ({ message, title, duration } = {}) {
    this.show()
    const toaster = document.createElement('div')
    toaster.className = 'toaster'
    const main = document.createElement('main')

    const titleElement = document.createElement('div')
    titleElement.className = 'title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'message'
    messageElement.textContent = message || this.props.message

    // create close button
    const close = document.createElement('div')
    close.className = 'close'

    // create svg
    const file = './sprite.svg#close'
    const nsSvg = 'http://www.w3.org/2000/svg'
    const nsXlink = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(nsSvg, 'svg')
    const use = document.createElementNS(nsSvg, 'use')
    use.setAttributeNS(nsXlink, 'xlink:href', file)

    toaster.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    toaster.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)
    this.root.querySelector('.wrapper').appendChild(toaster)

    setImmediate(() => toaster.classList.add('show'))

    if (duration) {
      setTimeout(() => this.destroy(toaster), duration)
    }
  }

  destroy (toaster) {
    toaster.classList.remove('show')
    toaster.addEventListener('transitionend', e => {
      toaster.parentNode.removeChild(toaster)
    })
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (!el) return

    const toaster = el.closest('.toaster')
    if (toaster) this.destroy(toaster)
  }

  render () {
    const {
      theme
    } = this.props

    // const id = this.root.getAttribute('id')
    if (theme) this.root.classList.add(`theme-${theme}`)

    return `
      <div class="wrapper"></div>
    `
  }
}

Tonic.add(NotificationCenter)
