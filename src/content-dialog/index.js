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
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  compile (s) {
    const body = `return \`${s}\``
    return o => {
      const keys = Object.keys(o)
      const values = Tonic.sanitize(Object.values(o))
      //
      // We have sanitized the strings that are being
      // passed into the template, so this is ok.
      //
      // eslint-disable-next-line
      return new Function(...keys, body)(...values)
    }
  }

  template (id) {
    const node = document.querySelector(`template[for="${id}"]`)
    const template = this.compile(node.innerHTML)
    const div = document.createElement('div')
    div.innerHTML = template({ data: this.props })
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

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'

    // create overlay
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

    // create svg
    const file = './sprite.svg#close'
    const nsSvg = 'http://www.w3.org/2000/svg'
    const nsXlink = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(nsSvg, 'svg')
    const use = document.createElementNS(nsSvg, 'use')
    use.setAttributeNS(nsXlink, 'xlink:href', file)

    // append everything
    wrapper.appendChild(dialog)
    dialog.appendChild(this.template(id))
    dialog.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)

    return wrapper
  }
}

Tonic.add(ContentDialog)
