class ContentTooltip extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    const target = node.getAttribute('for')
    const el = document.getElementById(target)
    let timer = null

    const leave = e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hide()
      }, 256)
    }

    el.addEventListener('mouseenter', e => this.show(el))
    node.addEventListener('mouseenter', e => clearTimeout(timer))
    node.addEventListener('mouseleave', leave)
    el.addEventListener('mouseleave', leave)
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

  show (relativeNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.querySelector('.tooltip')
      const arrow = this.root.querySelector('.tooltip-arrow')
      let scrollableArea = relativeNode.parentNode

      while (true) {
        if (!scrollableArea || scrollableArea.tagName === 'BODY') break
        if (window.getComputedStyle(scrollableArea).overflow === 'scroll') break
        scrollableArea = scrollableArea.parentNode
      }

      let { top, left } = relativeNode.getBoundingClientRect()
      let pos = top + scrollableArea.scrollTop

      left -= scrollableArea.offsetLeft + (tooltip.offsetWidth / 2)
      left += relativeNode.offsetWidth / 2

      const offset = relativeNode.offsetHeight + (arrow.offsetHeight / 2)

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('bottom')
        tooltip.classList.add('top')
        pos += offset
      } else {
        tooltip.classList.remove('top')
        tooltip.classList.add('bottom')
        pos -= offset + tooltip.offsetHeight
      }

      tooltip.style.top = `${pos}px`
      tooltip.style.left = `${left}px`
      tooltip.classList.add('show')
    }, 128)
  }

  hide () {
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

    return `
      <div style="${style}" class="tooltip">
        ${this.root.innerHTML}
        <span class="tooltip-arrow"></span>
      </div>
    `
  }
}

Tonic.add(ContentTooltip)
