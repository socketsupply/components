const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class ContentTooltip extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      :host {
        position: relative;
        display: inline-block;
      }
      :host span #tooltip {
        opacity: 0;
        position: absolute;
        z-index: -1;
        transition: all 0.3s;
        box-shadow: 4px 0px 8px rgba(0,0,0,0.4);
      }
      :host span #tooltip.show {
        opacity: 1;
        z-index: 1;
      }
      `

    this.defaults = {
      width: '250px',
      height: '150px'
    }
  }

  show () {
    console.log('show')
    this.tooltip.classList.add('show')
  }

  hide () {
    console.log('hide')
    this.tooltip.classList.remove('show')
  }

  mouseenter (e) {
    this.show()
  }

  mouseleave (e) {
    this.hide()
  }

  willConnect () {
    const id = this.getAttribute('id')
    this.text = this.getAttribute('text')
    while (this.firstChild) this.firstChild.remove()
    this.template = document.querySelector(`template[for="${id}"]`)
  }

  connected () {
    this.tooltip = this.root.getElementById('tooltip')
  }

  render () {
    const {
      width,
      height
    } = { ...this.defaults, ...this.props }

    const style = []

    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    return `
      <span id="text">${this.text.trim()}
        <div id="tooltip" class="content" style="${style.join('')}">
          ${this.template.innerHTML}
        </div>
      </span>
    `
  }
}

Tonic.add(ContentTooltip, { shadow: true })
