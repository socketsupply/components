class Windowed extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.getRows = () => this.rows
    this.root.load = (rows) => this.load(rows)
    this.root.rePaint = () => this.rePaint()

    const that = this

    Object.defineProperty(this.root, 'length', {
      get () { return that.rows.length }
    })
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

  splice (...args) {
    if (!this.rows) return null
    return this.rows.splice(...args)
  }

  async getRow (idx) {
    const el = this.rows[idx]
    return typeof el === 'function' ? el() : el
  }

  load (rows = []) {
    if (!this.root) return

    this.rows = rows
    this.reRender()

    const outer = this.root.querySelector('.tonic--windowed--outer')
    if (!outer) return

    this.outerHeight = outer.offsetHeight

    this.numPages = Math.ceil(this.rows.length / this.props.rowsPerPage)

    this.pages = {}
    this.pagesAvailable = this.pagesAvailable || []
    this.rowHeight = parseInt(this.props.rowHeight, 10)

    const inner = this.root.querySelector('.tonic--windowed--inner')
    inner.innerHTML = ''
    inner.style.height = `${this.rowHeight * this.rows.length}px`
    this.pageHeight = this.props.rowsPerPage * this.rowHeight
    this.padding = this.props.rowPadding * this.rowHeight

    this.rePaint()
  }

  setHeight (height, { render } = {}) {
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')
    if (!outer) return

    outer.style.height = height
    this.outerHeight = outer.offsetHeight

    if (render !== false) {
      this.rePaint()
    }
  }

  getPage (i) {
    let page, state

    ;[page, state] = this.pages[i]
      ? [this.pages[i], 'ok']
      : this.pagesAvailable.length
        ? [this.getAvailablePage(i), 'old']
        : [this.createNewPage(i), 'fresh']

    this.pages[i] = page

    page.style.height = i < this.numPages - 1
      ? `${this.pageHeight}px`
      : this.getLastPageHeight()

    page.style.top = this.getPageTop(i)
    return [page, state]
  }

  getAvailablePage (i) {
    const page = this.pagesAvailable.pop()
    const inner = this.root.querySelector('.tonic--windowed--inner')
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

    const inner = this.root.querySelector('.tonic--windowed--inner')
    inner.appendChild(page)
    return page
  }

  async rePaint ({ refresh, load } = {}) {
    if (!this.root) return

    if (refresh && load !== false) this.load(this.rows)

    const outer = this.root.querySelector('.tonic--windowed--outer')
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
          await this.fillPage(i)
        }
      }
      pagesRendered[i] = true
    }

    const inner = this.root.querySelector('.tonic--windowed--inner')

    for (const i of Object.keys(this.pages)) {
      if (pagesRendered[i]) continue

      this.pagesAvailable.push(this.pages[i])
      inner.removeChild(this.pages[i])
      delete this.pages[i]
    }

    if (this.state.scrollTop) {
      outer.scrollTop = this.state.scrollTop
    }
  }

  getPageTop (i) {
    return `${i * this.pageHeight}px`
  }

  getLastPageHeight (i) {
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

    window.requestAnimationFrame(() => page.appendChild(frag))
  }

  async updatePage (i) {
    const page = this.pages[i]
    const start = i * this.props.rowsPerPage
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.rows.length)

    const inner = this.root.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.pages[i]
      return
    }

    for (let j = start, rowIdx = 0; j < limit; j++, rowIdx++) {
      if (page.children[rowIdx] && this.updateRow) {
        this.updateRow(await this.getRow(j), page.children[rowIdx])
      } else {
        const div = document.createElement('div')
        div.innerHTML = this.renderRow(await this.getRow(j))
        page.appendChild(div.firstElementChild)
      }
    }

    while (page.children.length > limit - start) {
      page.removeChild(page.lastChild)
    }
  }

  connected () {
    if (!this.props.data || !this.props.data.length) return
    this.load(this.props.data)
  }

  updated () {
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')

    outer && outer.addEventListener('scroll', () => {
      this.state.scrollTop = outer.scrollTop
      this.rePaint()
    }, { passive: true })
  }

  renderLoadingState () {
    return `<div class="tonic--windowed--loader"></div>`
  }

  renderEmptyState () {
    return `<div class="tonic--windowed--empty"></div>`
  }

  render () {
    if (!this.rows) {
      return this.renderLoadingState()
    }

    if (!this.rows.length) {
      return this.renderEmptyState()
    }

    return `
      <div class="tonic--windowed--outer" styles="outer">
        <div class="tonic--windowed--inner" styles="inner">
        </div>
      </div>
    `
  }
}

Tonic.Windowed = Windowed
