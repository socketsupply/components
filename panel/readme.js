const fetch = require('node-fetch')
const Tonic = require('@optoolco/tonic')
const { Panel } = require('./index')

class TonicPanel extends Panel {
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
      return this.hide()
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
      <div class="tonic--header">Panel Example</div>
      <div class="tonic--main">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
      <div class="tonic--footer">
        <tonic-button value="close">Close</tonic-button>
        <tonic-button value="get" async="true">Get</tonic-button>
      </div>
    `
  }
}

Tonic.add(TonicPanel)

//
// For this example, a button element will trigger the
// `.show()` method on the panel when it is clicked.
//
const panelLink = document.getElementById('content-panel-link-example')
const panel = document.getElementById('content-panel-example')

panelLink.addEventListener('click', e => panel.show())
