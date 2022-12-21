import { Tonic } from '@socketsupply/tonic'

export class TonicSplitLeft extends Tonic {
  render () {
    if (this.props.width) {
      this.style.width = this.props.width
    }

    return this.html`
      ${this.elements}
    `
  }
}

export class TonicSplitTop extends Tonic {
  render () {
    if (this.props.height) {
      this.style.height = this.props.height
    }

    return this.html`
      ${this.elements}
    `
  }
}

export class TonicSplitRight extends TonicSplitLeft {}
export class TonicSplitBottom extends TonicSplitTop {}

export class TonicSplit extends Tonic {
  constructor () {
    super()
    this.left = null
    this.right = null
    this.top = null
    this.bottom = null
    this.handleId = `tonic--handle-${Math.random().toString().slice(2)}`

    this.state.meta = {}
  }

  static stylesheet () {
    return `
      tonic-split {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      tonic-split > tonic-split-top,
      tonic-split > tonic-split-bottom,
      tonic-split > tonic-split-left,
      tonic-split > tonic-split-right {
        position: absolute;
        overflow: hidden;
      }

      tonic-split > tonic-split-left,
      tonic-split > tonic-split-right {
        top: 0;
        bottom: 0;
      }

      tonic-split > tonic-split-left {
        left: 0;
        right: unset;
        width: 60%;
      }

      tonic-split > tonic-split-right {
        right: 0;
        left: unset;
        width: 40%;
      }

      tonic-split > tonic-split-top,
      tonic-split > tonic-split-bottom {
        left: 0;
        height: 50%;
        right: 0;
      }

      tonic-split > tonic-split-bottom {
        bottom: 0;
        top: unset;
      }

      tonic-split > tonic-split-top {
        top: 0;
        bottom: unset;
        z-index: 4;
      }

      tonic-split > tonic-split-right {
        right: 0;
        left: unset;
        width: 40%;
      }

      tonic-split .tonic--split-handle {
        position: absolute;
        z-index: 1;
        user-select: none;
        -webkit-user-select: none;
        background-color: transparent;
        transition: background .1s ease;
      }

      #split-query > div {
        z-index: 101;
        margin-top: -5px;
      }

      tonic-split .tonic--split-vertical {
        top: 0;
        bottom: 0;
        left: 60%;
        width: 5px;
        border-left: 1px solid var(--tonic-border);
        cursor: ew-resize;
      }

      tonic-split .tonic--split-horizontal {
        left: 0;
        right: 0;
        height: 5px;
        top: 50%;
        border-bottom: 1px solid var(--tonic-border);
        cursor: ns-resize;
      }

      tonic-split[dragging] > .tonic--split-handle,
      tonic-split .tonic--split-handle:hover {
        background: var(--tonic-accent);
      }

      tonic-split[dragging],
      tonic-split[dragging] * {
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
      }

      tonic-split[dragging] * {
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
      }
    `
  }

  start () {
    this.dragging = true
    this.setAttribute('dragging', true)
  }

  cancel () {
    this.dragging = false
    this.removeAttribute('dragging')
  }

  willConnect () {
    this.updated()
  }

  hide (panel) {
    if (this[panel].hidden) return
    this.toggle(panel, false)
  }

  show (panel) {
    if (!this[panel].hidden) return
    this.toggle(panel, true)
  }

  toggle (panel, state) {
    const {
      meta
    } = this.state

    if (typeof state === 'boolean' && state === false) {
      delete meta[panel]
    }

    const previous = meta[panel]
    let opposite = ''
    let property = ''

    if (this.props.type === 'vertical') {
      opposite = panel === 'left' ? 'right' : 'left'
      property = 'width'
    } else {
      opposite = panel === 'top' ? 'bottom' : 'top'
      property = 'height'
    }

    if (!previous && !state) {
      //
      // First, save the state of the panel to hide and its opposite
      //
      meta[panel] = {
        [panel]: this[panel].style[property],
        [panel + 'visibility']: this[panel].style.visibility,
        [opposite]: this[opposite].style[property],
        [opposite + 'visibility']: this[opposite].style.visibility,
        handle: this.handle.style.display
      }

      //
      // Set the panel to hide as zero width, hide the handle
      // and set the opposite panel to fill the splitter
      //
      this[panel].style[property] = 0
      this[panel].style.visibility = 'hidden'
      this[opposite].style[property] = '100%'
      this[opposite].style.visibility = 'inherit'
      this.handle.style.display = 'none'
      return
    }

    //
    // If there is meta data, use it to restore the previous
    // property values. After restored, delete the meta data.
    //
    if (previous) {
      this[panel].style[property] = previous[panel]
      this[panel].style.visibility = previous[panel + 'visibility']
      this[opposite].style[property] = previous[opposite]
      this[opposite].style.visibility = previous[opposite + 'visibility']
      this.handle.style.display = previous.handle
      delete meta[panel]
    }
  }

  connected () {
    this.handle = this.querySelector(`#${this.handleId}`)

    if (this.props.type === 'vertical') {
      this.left = this.elements[0]
      this.right = this.elements[1]
      this.handle.style.left = this.left.getAttribute('width')
    } else {
      this.top = this.elements[0]
      this.bottom = this.elements[1]
      this.handle.style.top = this.top.getAttribute('height')
    }
  }

  afterResize () {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.dispatchEvent(new window.CustomEvent(
        'resize', { bubbles: true }
      ))
    }, 64)
  }

  updated () {
    this.cancel()
  }

  disconnected () {
    this.handle = null
    this.left = null
    this.right = null
    this.top = null
    this.bottom = null
  }

  mousemove (e) {
    if (!this.dragging) return

    const { x, y } = this.getBoundingClientRect()

    const w = this.offsetWidth
    const h = this.offsetHeight

    this.lastX = e.clientX + 1
    this.lastY = e.clientY - 1

    const max = parseInt(this.props.max, 10) || 25
    const min = parseInt(this.props.min, 10) || 25

    if (this.props.type === 'vertical') {
      this.left = this.elements[0]
      this.right = this.elements[1]

      let t = e.clientX - x

      if (t >= w - max) t = w - max
      if (t <= min) t = min

      const p = (t / w) * 100

      this.left.style.width = p + '%'
      this.handle.style.left = p + '%'
      this.right.style.width = (100 - p) + '%'
      this.afterResize()
      return
    }

    this.top = this.elements[0]
    this.bottom = this.elements[1]

    let t = e.clientY - y

    if (t >= h - max) t = h - max
    if (t <= min) t = min

    const p = (t / h) * 100

    if (p <= 100 - 5) {
      this.top.style.height = p + '%'
      this.handle.style.top = p + '%'
      this.bottom.style.height = (100 - p) + '%'
      this.afterResize()
    }
  }

  mouseenter (e) {
    if (e.buttons === 0) {
      this.cancel()
    }
  }

  mouseleave (e) {
    if (e.buttons === 0) {
      this.cancel()
    }
  }

  mousedown (e) {
    const handle = Tonic.match(e.target, '.tonic--split-handle')

    if (handle && handle.parentElement === this) {
      this.handle = handle
      this.start()
    }
  }

  mouseup (e) {
    this.cancel()
  }

  render () {
    const classes = [
      'tonic--split-handle',
      `tonic--split-${this.props.type}`
    ].join(' ')

    return this.html`
      ${this.elements[0]}

      <div class="${classes}" id="${this.handleId}">
      </div>

      ${this.elements[1]}
    `
  }
}
