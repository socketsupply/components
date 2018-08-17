class MyPanel extends Tonic.Panel {
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

      this.rerender(props => ({
        ...props,
        ...page
      }))
    }
  }

  render () {
    return `
      <header></header>
      <main>
        <h3>${this.props.title || 'Hello'}
        <p>${this.props.extract || 'Click "get" to fetch the content from Wikipedia.'}</p>
      </main>
      <footer>
        <input-button value="close">Close</input-button>
        <input-button value="get" async="true">Get</input-button>
      </footer>
    `
  }
}

Tonic.add(MyPanel)

//
// For this example, a button element will trigger the
// `.show()` method on the panel when it is clicked.
//
const panelLink = document.getElementById('content-panel-link-example')
const panel = document.getElementById('content-panel-example')

panelLink.addEventListener('click', e => panel.show())
