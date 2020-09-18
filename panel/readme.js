const fetch = require('node-fetch')
const Tonic = require('@optoolco/tonic')

class ReadWikipedia extends Tonic {
  async getArticle (title) {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}&origin=*`)
      return Object.values((await res.json()).query.pages)[0]
    } catch (err) {
      return { title: 'Error', extract: err.message }
    }
  }

  async click (e) {
    if (e.target.value === 'close') {
      return this.parentElement.hide()
    }

    if (e.target.value === 'get') {
      const page = await this.getArticle('HTML')

      this.reRender(props => ({
        ...props,
        ...page
      }))
    }
  }

  async * render () {
    const title = this.props.title || 'Hello'
    const content = this.props.extract
      ? this.props.extract
      : 'Click "get" to fetch the content from Wikipedia.'

    return this.html`
      <header>Panel Example</header>
      <main>
        <h3>${title}</h3>
        <p>${content}</p>
      </main>
      <footer>
        <tonic-button value="close">Close</tonic-button>
        <tonic-button value="get" async="true">Get</tonic-button>
      </main>
    `
  }
}

Tonic.add(ReadWikipedia)

//
// For this example, a button element will trigger the
// `.show()` method on the panel when it is clicked.
//
const panelLink = document.getElementById('content-panel-link-example')
const panel = document.getElementById('tonic-panel-example')

panelLink.addEventListener('click', e => panel.show())
