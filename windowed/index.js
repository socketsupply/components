const Tonic = require('@optoolco/tonic')

const mode = require('../mode')

class Windowed extends Tonic {
  constructor (o) {
    super(o)

    this.prependCounter = 0
    this.currentVisibleRowIndex = -1
  }

  get length () {
    return this.rows.length
  }

  defaults () {
    return {
      page: 100,
      rowsPerPage: 100,
      rowPadding: 50,
      rowHeight: 30,
      debug: false
    }
  }

  styles () {
    return {
      inner: {
        position: 'relative'
      },

      outer: {
        width: '100%',
        height: 'inherit',
        overflow: 'auto'
      }
    }
  }

  getRows () {
    return this.rows
  }

  push (o) {
    this.rows = this.rows || []
    this.rows.push(o)
  }

  unshift (o) {
    this.rows = this.rows || []
    this.rows.unshift(o)
  }

  pop () {
    this.rows = this.rows || []
    this.rows.pop()
  }

  shift () {
    this.rows = this.rows || []
    this.rows.shift()
  }

  find (fn) {
    if (!this.rows) return -1
    return this.rows.find(fn)
  }

  findIndex (fn) {
    if (!this.rows) return -1
    return this.rows.findIndex(fn)
  }

  splice () {
    if (!this.rows) return null

    const index = arguments[0]
    const totalItems = arguments.length - 2

    if (index <= this.currentVisibleRowIndex) {
      this.prependCounter += totalItems
      this.currentVisibleRowIndex += totalItems
    }

    return this.rows.splice.apply(this.rows, arguments)
  }

  async getRow (idx) {
    const el = this.rows[idx]
    return typeof el === 'function' ? el() : el
  }

  async load (rows = []) {
    this.rows = rows
    await this.reRender()

    const inner = this.querySelector('.tonic--windowed--inner')
    if (inner) {
      inner.innerHTML = ''
    }

    this.pages = {}
    this.rowHeight = parseInt(this.props.rowHeight, 10)
    this.pageHeight = this.props.rowsPerPage * this.rowHeight
    this.padding = this.props.rowPadding * this.rowHeight
    this.setInnerHeight()
    return this.rePaint()
  }

  setInnerHeight () {
    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    this.outerHeight = outer.offsetHeight
    this.numPages = Math.ceil(this.rows.length / this.props.rowsPerPage)

    this.pages = this.pages || {}
    this.pagesAvailable = this.pagesAvailable || []

    const inner = this.querySelector('.tonic--windowed--inner')
    inner.style.height = `${this.rowHeight * this.rows.length}px`
  }

  setHeight (height, { render } = {}) {
    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    outer.style.height = height
    this.outerHeight = outer.offsetHeight

    if (render !== false) {
      this.rePaint()
    }
  }

  getPage (i) {
    let page, state

    if (this.pages[i]) {
      page = this.pages[i]
      state = 'ok'
    } else if (this.pagesAvailable.length) {
      page = this.getAvailablePage(i)
      state = 'old'
    } else {
      page = this.createNewPage(i)
      state = 'fresh'
    }

    this.pages[i] = page

    page.style.height = i < this.numPages - 1
      ? `${this.pageHeight}px`
      : this.getLastPageHeight()

    page.style.top = this.getPageTop(i)
    return [page, state]
  }

  getAvailablePage (i) {
    const page = this.pagesAvailable.pop()
    const inner = this.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    return page
  }

  createNewPage (i) {
    const page = document.createElement('div')

    Object.assign(page.style, {
      position: 'absolute',
      minWidth: '100%',
      className: 'tonic--windowed--page'
    })

    if (this.props.debug) {
      const random = Math.random() * 356
      page.style.backgroundColor = `hsla(${random}, 100%, 50%, 0.5)`
    }

    const inner = this.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    page.__overflow__ = []
    return page
  }

  async rePaint ({ refresh, load } = {}) {
    if (refresh && load !== false) this.load(this.rows)

    const outer = this.querySelector('.tonic--windowed--outer')
    if (!outer) return

    const viewStart = outer.scrollTop
    const viewEnd = viewStart + this.outerHeight

    const _start = Math.floor((viewStart - this.padding) / this.pageHeight)
    const start = Math.max(_start, 0) || 0

    const _end = Math.floor((viewEnd + this.padding) / this.pageHeight)
    const end = Math.min(_end, this.numPages - 1)
    const pagesRendered = {}

    for (let i = start; i <= end; i++) {
      const [page, state] = this.getPage(i)

      if (state === 'fresh') {
        await this.fillPage(i)
      } else if (refresh || state === 'old') {
        if (this.updateRow) {
          await this.updatePage(i)
        } else {
          page.innerHTML = ''
          page.__overflow__ = []
          await this.fillPage(i)
        }
      }
      pagesRendered[i] = true
    }

    const inner = this.querySelector('.tonic--windowed--inner')

    for (const i of Object.keys(this.pages)) {
      if (pagesRendered[i]) continue

      this.pagesAvailable.push(this.pages[i])
      inner.removeChild(this.pages[i])
      delete this.pages[i]
    }

    if (this.state.scrollTop) {
      outer.scrollTop = this.state.scrollTop
    }

    if (this.prependCounter > 0) {
      outer.scrollTop += this.prependCounter * this.rowHeight

      this.prependCounter = 0
    }

    // Set the current visible row index used for tracking
    // prepends.
    this.currentVisibleRowIndex = Math.floor(
      outer.scrollTop / this.rowHeight
    )
  }

  getPageTop (i) {
    return `${i * this.pageHeight}px`
  }

  getLastPageHeight () {
    return `${(this.rows.length % this.props.rowsPerPage) * this.rowHeight}px`
  }

  async fillPage (i) {
    const page = this.pages[i]
    const frag = document.createDocumentFragment()
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    for (let j = i * this.props.rowsPerPage; j < limit; j++) {
      const data = await this.getRow(j)
      if (!data) continue

      const div = document.createElement('div')
      div.innerHTML = this.renderRow(data, j)
      frag.appendChild(div.firstElementChild)
    }

    page.appendChild(frag)
  }

  async updatePage (i) {
    const page = this.pages[i]
    const start = i * parseInt(this.props.rowsPerPage, 10)
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    const inner = this.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.pages[i]
      return
    }

    for (let j = start, rowIdx = 0; j < limit; j++, rowIdx++) {
      if (page.children[rowIdx] && this.updateRow) {
        this.updateRow(await this.getRow(j), j, page.children[rowIdx])
      } else if (page.__overflow__.length > 0 && this.updateRow) {
        const child = page.__overflow__.shift()
        this.updateRow(await this.getRow(j), j, child)
        page.appendChild(child)
      } else {
        const div = document.createElement('div')
        div.innerHTML = this.renderRow(await this.getRow(j), j)
        page.appendChild(div.firstElementChild)
      }
    }

    while (page.children.length > limit - start) {
      const child = page.lastChild
      page.__overflow__.push(child)
      page.removeChild(child)
    }
  }

  connected () {
    if (!this.props.data || !this.props.data.length) return
    this.load(this.props.data)
  }

  updated () {
    const outer = this.querySelector('.tonic--windowed--outer')

    outer && outer.addEventListener('scroll', () => {
      this.state.scrollTop = outer.scrollTop
      this.rePaint()
    }, { passive: true })
  }

  renderLoadingState () {
    return this.html`<div class="tonic--windowed--loader"></div>`
  }

  renderEmptyState () {
    return this.html`<div class="tonic--windowed--empty"></div>`
  }

  render () {
    if (mode.strict && !this.props.id) {
      console.warn('In tonic the "id" attribute is used to persist state')
      console.warn('You forgot to supply the "id" attribute.')
      console.warn('')
      console.warn('For element : ')
      console.warn(`${this.outerHTML}`)
      throw new Error('id attribute is mandatory on windowed')
    }

    if (!this.rows) {
      return this.renderLoadingState()
    }

    if (!this.rows.length) {
      return this.renderEmptyState()
    }

    return this.html`
      <div class="tonic--windowed--outer" styles="outer">
        <div class="tonic--windowed--inner" styles="inner">
        </div>
      </div>
    `
  }
}

module.exports = { Windowed }
