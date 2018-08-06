class SidePanel extends Tonic { /* global Tonic */
  defaults () {
    return {
      position: 'right',
      overlay: false,
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
      name,
      position,
      overlay,
      theme,
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

    // create overlay
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

    // create svg
    const file = './sprite.svg#close'
    const nsSvg = 'http://www.w3.org/2000/svg'
    const nsXlink = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(nsSvg, 'svg')
    const use = document.createElementNS(nsSvg, 'use')
    use.setAttributeNS(nsXlink, 'xlink:href', file)

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(clone)
    panel.appendChild(close)
    close.appendChild(svg)
    svg.appendChild(use)

    this.structure = wrapper
  }

  render () {
    return this.structure
  }
}

Tonic.add(SidePanel)
