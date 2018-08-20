class Popover extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    const target = node.getAttribute('for')
    const el = document.getElementById(target)

    this.root.hide = () => this.hide()

    el.addEventListener('click', e => this.show(el))
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto',
      padding: '15px',
      margin: 10,
      position: 'bottomleft'
    }
  }

  style () {
    return `%style%`
  }

  show (triggerNode) {
    const popover = this.root.querySelector('.tonic--popover')
    let scrollableArea = triggerNode.parentNode

    while (true) {
      if (!scrollableArea || scrollableArea.tagName === 'BODY') break
      if (window.getComputedStyle(scrollableArea).overflow === 'scroll') break
      scrollableArea = scrollableArea.parentNode
    }

    const margin = parseInt(this.props.margin, 10)
    let { top, left } = triggerNode.getBoundingClientRect()
    let pos = top + scrollableArea.scrollTop
    left -= scrollableArea.offsetLeft

    switch (this.props.position) {
      case 'topleft':
        pos -= popover.offsetHeight + margin
        break
      case 'topright':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth - popover.offsetWidth)
        break
      case 'top':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
      case 'bottomleft':
        pos += triggerNode.offsetHeight + margin
        break
      case 'bottomright':
        pos += triggerNode.offsetHeight + margin
        left += triggerNode.offsetWidth - popover.offsetWidth
        break
      case 'bottom':
        pos += triggerNode.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
    }

    popover.style.top = `${pos}px`
    popover.style.left = `${left}px`

    window.requestAnimationFrame(() => {
      popover.className = `tonic--popover show tonic--popover--${this.props.position}`
      const event = new window.Event('show')
      this.root.dispatchEvent(event)
    })
  }

  hide () {
    const popover = this.root.querySelector('.tonic--popover')
    if (popover) popover.classList.remove('show')
  }

  render () {
    const {
      theme,
      width,
      height,
      padding
    } = this.props

    if (theme) this.root.classList.add(`theme-${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)
    if (padding) style.push(`padding: ${padding};`)

    return `
      <div
        style="${style.join('')}"
        class="tonic--popover">
          ${this.children.trim()}
      </div>
    `
  }
}

Tonic.add(Popover)
