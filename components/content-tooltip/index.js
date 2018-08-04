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
      :host span {
        all: inherit;
      }
      :host span .tooltip {
        position: absolute;
        top: 30px;
        background: #fff;
        box-shadow: 0px 30px 90px -20px rgba(0,0,0,0.3);
        border: 1px solid var(--border);
        border-radius: 2px;
        transition: opacity 0.3s ease-in-out, z-index 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        visibility: hidden;
        z-index: -1;
        opacity: 0;
      }
      :host span .tooltip.show {
        visibility: visible;
        opacity: 1;
        z-index: 1;
      }
      :host span .tooltip.arrow:after {
        content: '';
        width: 12px;
        height: 12px;
        position: absolute;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 50%;
        margin-left: -8px;
      }
      :host span .tooltip.top:after {
        margin-bottom: -6px;
        bottom: 100%;
        border-top-color: var(--border);
        border-left-color: var(--border);
      }
      :host span .tooltip.bottom:after {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--border);
        border-right-color: var(--border);
      }
      :host span .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 47% 83%, 39% 75%, 0% 75%);
        clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 47% 83%, 39% 75%, 0% 75%);
      }
      `

    this.defaults = {
      width: '250px',
      height: '150px'
    }
  }

  mouseenter (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.getElementById('tooltip')
      let el = this.parentNode

      while (true) {
        if (!el || el.tagName === 'html') break
        if (window.getComputedStyle(el).overflow === 'scroll') break
        el = el.parentNode
      }

      let { top } = this.getBoundingClientRect()
      top += (el.scrollY || 0)
      let left = -(tooltip.offsetWidth / 2) + (this.offsetWidth / 2)

      if (left < 0) {
        left = 0
      }

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('bottom')
        tooltip.classList.add('top')
        tooltip.style.top = `30px`
        tooltip.style.left = `${left}px`
      } else {
        tooltip.classList.remove('top')
        tooltip.classList.add('bottom')
        const offsetTop = tooltip.offsetHeight + this.offsetHeight
        tooltip.style.top = `-${offsetTop}px`
        tooltip.style.left = `${left}px`
      }

      tooltip.classList.add('show')
    }, 128)
  }

  mouseleave (e) {
    clearTimeout(this.timer)
    const tooltip = this.root.getElementById('tooltip')
    tooltip.classList.remove('show')
  }

  willConnect () {
    const {
      width,
      height
    } = { ...this.defaults, ...this.props }

    const id = this.getAttribute('id')
    this.text = this.getAttribute('text')

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    const span = document.createElement('span')
    span.textContent = this.innerHTML
    span.id = 'text'

    while (this.firstChild) this.firstChild.remove()

    const tooltip = document.createElement('div')
    tooltip.id = 'tooltip'
    tooltip.className = 'tooltip arrow'
    tooltip.setAttribute('style', style.join(''))
    const template = document.querySelector(`template[for="${id}"]`)
    const clone = document.importNode(template.content, true)

    const image = document.createElement('div.image')
    tooltip.appendChild(clone)
    clone.appendChild(image)
    span.appendChild(tooltip)
    this.root.appendChild(span)
    this.structure = span
  }

  render () {
    return this.structure
  }
}

Tonic.add(ContentTooltip, { shadow: true })
