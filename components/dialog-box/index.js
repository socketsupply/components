const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class DialogBox extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
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
        background-color: rgba(0,0,0,0.25);
        display: flex;
        opacity: 0;
        z-index: -100;
        visibility: hidden;
      }
      :host .wrapper.show {
        opacity: 1;
        z-index: 100;
        visibility: visible;
      }
      :host .dialog {
        background-color: #fff;
        margin: auto;
        position: relative;
        border-radius: 2px;
        box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3), 0 0 1px #a2a9b1;
        padding-top: 50px;
      }
      :host .dialog header {
        position: absolute;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        font: 14px 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
      :host .dialog main {
        width: auto;
        text-align: center;
        padding: 10px 30px 30px 30px;
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
        border: 1px solid #f00;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
      }
      `

    this.defaults = {
      width: '450px',
      height: '250px'
    }
  }

  setContent (s) {
    
  }

  show () {
    this.root.firstChild.classList.add('show')
  }

  hide () {
    this.root.firstChild.classList.remove('show')
  }

  click ({ target }) {
    const el = Tonic.match(target, '.close')
    if (el) this.hide()
    this.value = {}
  }

  willConnect () {
    const {
      width,
      height
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
