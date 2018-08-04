const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class SidePanel extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      .wrapper .panel {
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: #fff;
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        z-index: 100;
        transition: transform 0.3s ease-in-out;
      }
      .wrapper.left .panel {
        left: 0;
        -webkit-transform: translateX(-500px);
        -ms-transform: translateX(-500px);
        transform: translateX(-500px);
        border-right: 1px solid var(--border);
      }
      .wrapper.right .panel {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--border);
      }
      .wrapper.show.right .panel,
      .wrapper.show.left .panel {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
      }
      .wrapper.show.right[overlay="true"] .overlay,
      .wrapper.show.left[overlay="true"] .overlay {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 0s;
      }
      .wrapper .overlay {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 1s;
      }
      .wrapper .close {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: 30px;
      }
      .wrapper .close svg {
        width: 100%;
        height: 100%;
      }
      .wrapper header {
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 90px;
        border-bottom: 1px solid var(--border);
      }
      .wrapper main {
        padding: 20px;
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        bottom: 70px;
        overflow: scroll;
      }
      .wrapper footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 70px;
        padding: 20px;
        text-align: right;
        border-top: 1px solid var(--border);
      }
      `

    this.defaults = {
      position: 'right',
      overlay: false,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click (e, target) {
    const el = Tonic.match(target, '.close')
    if (el) this.hide()

    const overlay = Tonic.match(target, '.overlay')
    if (overlay) this.hide()

    this.value = {}
  }

  willConnect () {
    const {
      name,
      position,
      overlay,
      backgroundColor
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.id = 'wrapper'
    wrapper.classList.add('wrapper')
    wrapper.classList.add(position)
    if (overlay) {
      wrapper.setAttribute('overlay', true)
    }
    if (name) {
      wrapper.setAttribute('name', name)
    }

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

Tonic.add(SidePanel, { shadow: true })
