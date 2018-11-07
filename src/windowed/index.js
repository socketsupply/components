class Windowed extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)

    this.root.getRows = () => this.state.rows
    this.root.load = (rows) => this.load(rows)
    this.root.rePaint = () => this.rePaint()

    const outer = this.root.querySelector('.tonic--windowed--outer')
    outer.addEventListener('scroll', () => this.rePaint(), { passive: true })

    const that = this
    Object.defineProperty(this.root, 'length', {
      get () { return that.getState().rows.length }
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
    return this.state.rows
  }

  push (o) {
    this.state.rows = this.state.rows || []
    this.state.rows.push(o)
  }

  unshift (o) {
    this.state.rows = this.state.rows || []
    this.state.rows.unshift(o)
  }

  pop () {
    this.state.rows = this.state.rows || []
    this.state.rows.pop()
  }

  shift () {
    this.state.rows = this.state.rows || []
    this.state.rows.shift()
  }

  find (fn) {
    if (!this.state.rows) return -1
    return this.state.rows.find(fn)
  }

  findIndex (fn) {
    if (!this.state.rows) return -1
    return this.state.rows.findIndex(fn)
  }

  splice (...args) {
    if (!this.state.rows) return null
    return this.state.rows.splice(...args)
  }

  async getRow (idx) {
    const el = this.state.rows[idx]
    return typeof el === 'function' ? el() : el
  }

  load (rows = []) {
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')
    this.state.outerHeight = outer.offsetHeight

    this.state.loaded = true
    this.state.rows = rows
    this.state.numPages = Math.ceil(this.state.rows.length / this.props.rowsPerPage)

    this.state.pages = {}
    this.state.pagesAvailable = this.state.pagesAvailable || []
    this.state.rowHeight = parseInt(this.props.rowHeight, 10)

    const inner = this.root.querySelector('.tonic--windowed--inner')
    inner.innerHTML = ''
    inner.style.height = `${this.state.rowHeight * this.state.rows.length}px`
    this.state.pageHeight = this.props.rowsPerPage * this.state.rowHeight
    this.state.padding = this.props.rowPadding * this.state.rowHeight

    this.rePaint()
  }

  setHeight (height, { render } = {}) {
    if (!this.root) return

    const outer = this.root.querySelector('.tonic--windowed--outer')
    outer.style.height = height
    this.state.outerHeight = outer.offsetHeight

    if (render !== false) {
      this.rePaint()
    }
  }

  getPage (i) {
    let page, state

    ;[page, state] = this.state.pages[i]
      ? [this.state.pages[i], 'ok']
      : this.state.pagesAvailable.length
        ? [this.getAvailablePage(i), 'old']
        : [this.createNewPage(i), 'fresh']

    this.state.pages[i] = page

    page.style.height = i < this.state.numPages - 1
      ? `${this.state.pageHeight}px`
      : this.getLastPageHeight()

    page.style.top = this.getPageTop(i)
    return [page, state]
  }

  getAvailablePage (i) {
    const page = this.state.pagesAvailable.pop()
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
    if (refresh && load !== false) this.load(this.state.rows)

    const outer = this.root.querySelector('.tonic--windowed--outer')
    const viewStart = outer.scrollTop
    const viewEnd = viewStart + this.state.outerHeight

    const _start = Math.floor((viewStart - this.state.padding) / this.state.pageHeight)
    const start = Math.max(_start, 0) || 0

    const _end = Math.floor((viewEnd + this.state.padding) / this.state.pageHeight)
    const end = Math.min(_end, this.state.numPages - 1)
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

    for (const i of Object.keys(this.state.pages)) {
      if (pagesRendered[i]) continue

      this.state.pagesAvailable.push(this.state.pages[i])
      inner.removeChild(this.state.pages[i])
      delete this.state.pages[i]
    }
  }

  getPageTop (i) {
    return `${i * this.state.pageHeight}px`
  }

  getLastPageHeight (i) {
    return `${(this.state.rows.length % this.props.rowsPerPage) * this.rowHeight}px`
  }

  async fillPage (i) {
    const page = this.state.pages[i]
    const frag = document.createDocumentFragment()
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.state.rows.length)

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
    const page = this.state.pages[i]
    const start = i * this.props.rowsPerPage
    const limit = Math.min((i + 1) * this.props.rowsPerPage, this.state.rows.length)

    const inner = this.root.querySelector('.tonic--windowed--inner')

    if (start > limit) {
      inner.removeChild(page)
      delete this.state.pages[i]
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

  render () {
    return `
      <div class="tonic--windowed--outer" styles="outer">
        <div class="tonic--windowed--inner" styles="inner">
        </div>
      </div>
    `
  }
}

Tonic.Windowed = Windowed
