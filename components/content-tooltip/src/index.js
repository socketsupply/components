const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class ContentTooltip extends Tonic {
  constructor () {
    super()
    this.stylesheet = `%style%`

    this.defaults = {
      width: '250px',
      height: '150px'
    }
  }

  mouseenter (e) {
    this.tooltip.classList.add('show')
  }

  mouseleave (e) {
    this.tooltip.classList.remove('show')
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
