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
