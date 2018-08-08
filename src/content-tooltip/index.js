class ContentTooltip extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    console.log('NODE', node)
    const target = node.getAttribute('for')
    console.log('TARGET', target)
    const el = document.getElementById(target)
    el.addEventListener('mouseenter', e => this.show())
    el.addEventListener('mouseleave', e => this.hide())
  }

  defaults (props) {
    return {
      width: '450px',
      height: 'auto'
    }
  }

  style () {
    return `%style%`
  }

  show (e) {
    console.log('SHOW')
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.querySelector('.tooltip')
      let el = this.root.parentNode

      while (true) {
        if (!el || el.tagName === 'html') break
        if (window.getComputedStyle(el).overflow === 'scroll') break
        el = el.parentNode
      }

      let { top } = this.root.getBoundingClientRect()
      top += (el.scrollY || 0)
      let left = -(tooltip.offsetWidth / 2) + (this.root.offsetWidth / 2)

      if (left < 0) {
        left = 0
      }

      if ((left + tooltip.offsetWidth) > window.innerWidth) {
        left = window.innerWidth - tooltip.offsetWidth
      }

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('bottom')
        tooltip.classList.add('top')
        tooltip.style.top = `30px`
        tooltip.style.left = `${left}px`
      } else {
        tooltip.classList.remove('top')
        tooltip.classList.add('bottom')
        const offsetTop = tooltip.offsetHeight + this.root.offsetHeight
        tooltip.style.top = `-${offsetTop}px`
        tooltip.style.left = `${left}px`
      }

      tooltip.classList.add('show')
    }, 128)
  }

  hide (e) {
    console.log('HIDE')
    clearTimeout(this.timer)
    const tooltip = this.root.querySelector('.tooltip')
    tooltip.classList.remove('show')
  }

  render () {
    const {
      theme,
      width,
      height
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    const arrow = document.createElement('span')
    arrow.textContent = ' '

    while (this.root.firstChild) this.root.firstChild.remove()

    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip arrow'
    tooltip.setAttribute('style', style.join(''))

    tooltip.appendChild(arrow)
    tooltip.innerHTML = this.root.innerHTML
    return tooltip.innerHTML
  }
}

Tonic.add(ContentTooltip)
