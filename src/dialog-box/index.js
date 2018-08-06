class DialogBox extends Tonic { /* global Tonic */
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

  style () {
    return `%style%`
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.close')
    if (el) this.hide()

    const overlay = Tonic.match(e.target, '.overlay')
    if (overlay) this.hide()

    this.value = {}
  }

  willConnect () {
    const {
      width,
      height,
      overlay,
      theme,
      backgroundColor
    } = { ...this.defaults, ...this.props }

    const id = this.root.getAttribute('id')
    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    while (this.root.firstChild) this.root.firstChild.remove()

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

    // create template
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)
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
    dialog.appendChild(clone)
    dialog.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)

    this.structure = wrapper
  }

  render () {
    return this.structure
  }
}

Tonic.add(DialogBox)
