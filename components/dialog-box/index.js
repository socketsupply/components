const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class DialogBox extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      :host {
        position: relative;
        display: inline-block;
      }
      :host .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        z-index: 100;
        visibility: hidden;
        transition: visibility 0s ease 0.5s;
      }
      :host .wrapper.show {
        visibility: visible;
        transition: visibility 0s ease 0s;
      }
      :host .wrapper.show .overlay {
        opacity: 1;
      }
      :host .wrapper.show .dialog {
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }
      :host .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      :host .dialog {
        background-color: #fff;
        margin: auto;
        position: relative;
        border-radius: 4px;
        box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3), 0 0 1px #a2a9b1;
        padding-top: 50px;
        z-index: 1;
        opacity: 0;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
        transition: all 0.3s ease-in-out;
      }
      :host .dialog header {
        height: 70px;
        font: 14px 'Poppins', sans-serif;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1.5px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 26px 65px 25px 65px;
      }
      :host .dialog main {
        width: auto;
        text-align: center;
        padding: 20px;
        margin: 0 auto;
      }
      :host .dialog .close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 25px;
        right: 25px;
      }
      :host .dialog .close svg {
        width: 100%;
        height: 100%;
      }
      :host .dialog .close svg use {
        fill: var(--primary);
        color: var(--primary);
      }
      :host .dialog footer {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 70px;
        padding: 15px;
      }
      :host .dialog footer input-button {
        display: inline-block;
        margin: 0 5px;
      }
      `

    this.defaults = {
      width: '450px',
      height: '275px',
      overlay: true,
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
      width,
      height,
      overlay,
      backgroundColor
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    while (this.firstChild) this.firstChild.remove()

    // create wrapper
    const wrapper = document.createElement('div')
    wrapper.id = 'wrapper'
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

Tonic.add(DialogBox, { shadow: true })
