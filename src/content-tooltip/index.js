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
      width: 'auto',
      height: 'auto'
    }
  }

  style () {
    return {
      '.tonic--tooltip': {
        position: 'absolute',
        top: '30px',
        background: 'var(--window)',
        border: '1px solid var(--border)',
        borderRadius: '2px',
        transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out, z-index 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        visibility: 'hidden',
        zIndex: '-1',
        opacity: '0'
      },
      '.tonic--tooltip.tonic--show': {
        boxShadow: '0px 30px 90px -20px rgba(0, 0, 0, 0.3)',
        visibility: 'visible',
        opacity: '1',
        zIndex: '1'
      },
      '.tonic--tooltip-arrow': {
        width: '12px',
        height: '12px',
        position: 'absolute',
        zIndex: '-1',
        backgroundColor: 'var(--window)',
        border: '1px solid transparent',
        borderRadius: '2px',
        pointerEvents: 'none',
        '-webkit-transform': 'rotate(45deg)',
        '-ms-transform': 'rotate(45deg)',
        transform: 'rotate(45deg)',
        left: '50%'
      },
      '.tonic--top .tonic--tooltip-arrow': {
        marginBottom: '-6px',
        bottom: '100%',
        borderTopColor: 'var(--border)',
        borderLeftColor: 'var(--border)'
      },
      '.tonic--bottom .tonic--tooltip-arrow': {
        marginTop: '-6px',
        position: 'absolute',
        top: '100%',
        borderBottomColor: 'var(--border)',
        borderRightColor: 'var(--border)'
      }
    }
  }

  show (relativeNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.root.querySelector('.tonic--tooltip')
      const arrow = this.root.querySelector('.tonic--tooltip-arrow')
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
        tooltip.classList.remove('tonic--bottom')
        tooltip.classList.add('tonic--top')
        pos += offset
      } else {
        tooltip.classList.remove('tonic--top')
        tooltip.classList.add('tonic--bottom')
        pos -= offset + tooltip.offsetHeight
      }

      tooltip.style.top = `${pos}px`
      tooltip.style.left = `${left}px`

      window.requestAnimationFrame(() => {
        tooltip.classList.add('tonic--show')
      })
    }, 256)
  }

  hide () {
    clearTimeout(this.timer)
    const tooltip = this.root.querySelector('.tonic--tooltip')
    tooltip.classList.remove('tonic--show')
  }

  render () {
    const {
      theme,
      width,
      height
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    const style = []
    if (width) style.push(`width: ${width};`)
    if (height) style.push(`height: ${height};`)

    return `
      <div
        style="${style.join('')}"
        class="tonic--tooltip">
          ${this.children.trim()}
        <span class="tonic--tooltip-arrow"></span>
      </div>
    `
  }
}

Tonic.add(ContentTooltip)
