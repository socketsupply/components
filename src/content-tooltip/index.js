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

  stylesheet () {
    return `
      content-tooltip .tonic--tooltip {
        position: absolute;
        background: var(--window);
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        border: 1px solid var(--border);
        border-radius: 2px;
        transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out, z-index 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      content-tooltip .tonic--tooltip.tonic--show {
        visibility: visible;
        opacity: 1;
        z-index: 1;
        box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3);
      }

      content-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        z-index: -1
        background-color: var(--window);
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 50%;
      }

      content-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        border: 1px solid transparent
        border-radius: 2px
        pointer-events: none
      }

      content-tooltip .tonic--top .tonic--tooltip-arrow {
        margin-bottom: -6px;
        bottom: 100%;
        border-top-color: var(--border);
        border-left-color: var(--border);
      }

      content-tooltip .tonic--bottom .tonic--tooltip-arrow {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--border);
        border-right-color: var(--border);
      }
    `
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

  connected () {
    const {
      width,
      height
    } = this.props

    const tooltip = this.root.querySelector('.tonic--tooltip')
    if (width) tooltip.style.width = width
    if (height) tooltip.style.height = height
  }

  render () {
    if (this.props.theme) {
      this.root.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return `
      <div class="tonic--tooltip">
        ${this.children.trim()}
        <span class="tonic--tooltip-arrow"></span>
      </div>
    `
  }
}

Tonic.add(ContentTooltip)
