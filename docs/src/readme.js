
    module.exports = Tonic => {
      
        //
        // ./src/content-route/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const select = document.getElementById('content-route-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('show', e => {
  const { number } = e.target.getProps()

  document.getElementById('page2-number').textContent = number
})

        }
      

        //
        // ./src/dialog/readme.js
        //
        if (document.body.dataset.page === 'components') {
          class MyDialog extends Tonic.Dialog {
  click (e) {
    if (!Tonic.match(e.target, '#update')) return

    this.reRender(props => ({
      ...props,
      message: `Date stamp ${Date.now()}`
    }))
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message}
      </main>
      <footer>
        <input-button id="update">Update</input-button>
      </footer>
    `
  }
}

Tonic.add(MyDialog)

const link = document.getElementById('example-dialog-link')
const dialog = document.getElementById('example-dialog')

link.addEventListener('click', e => dialog.show())

        }
      

        //
        // ./src/input-button/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const button = document.getElementById('input-button-example')
button.addEventListener('click', e => {
  setTimeout(() => {
    button.loading(false)
  }, 3e3)
})

        }
      

        //
        // ./src/input-select/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const select = document.getElementById('options-example-1')
const notification = document.getElementsByTagName('notification-center')[0]

select.addEventListener('change', ({ target }) => {
  notification.create({
    type: 'success',
    message: `Selected option was "${select.value}".`,
    title: 'Selection',
    duration: 2000
  })
})

        }
      

        //
        // ./src/input-text/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const input = document.getElementById('input-example')
const span = document.getElementById('input-state')

const listener = e => {
  const state = input.getState()
  span.textContent = `Value: "${state.value || 'Empty'}", Focus: ${state.focus}`
}

input.addEventListener('input', listener)
input.addEventListener('blur', listener)
input.addEventListener('focus', listener)

        }
      

        //
        // ./src/notification-badge/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const add = document.getElementById('add-notification')
const subtract = document.getElementById('subtract-notification')
const notificationBadge = document.querySelector('notification-badge')

let count = 0

add.addEventListener('click', (e) => {
  notificationBadge.reRender(props => ({
    ...props,
    count: ++count
  }))
})

subtract.addEventListener('click', e => {
  notificationBadge.reRender(props => ({
    ...props,
    count: count > 0 ? --count : count
  }))
})

        }
      

        //
        // ./src/notification-center/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const notification = document.querySelector('notification-center')

document
  .getElementById('notification-center-example')
  .addEventListener('click', e => notification.create({
    type: 'success',
    title: 'Greetings',
    message: 'Hello, World'
  }))

        }
      

        //
        // ./src/notification-inline/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const notification1 = document.getElementById('notification-1')
const notificationLink1 = document.getElementById('notification-link-1')

notificationLink1.addEventListener('click', e => {
  notification1.create({
    type: 'warning',
    title: 'Warning',
    message: 'This is a warning, please be careful.'
  })
})

        }
      

        //
        // ./src/panel/readme.js
        //
        if (document.body.dataset.page === 'components') {
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

      this.reRender(props => ({
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

        }
      

        //
        // ./src/popover/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const popover = document.getElementById('popover-example')
popover.addEventListener('show', event => {
  document.body.addEventListener('click', e => {
    popover.hide()
  }, { once: true })
})

        }
      

        //
        // ./src/profile-image/readme.js
        //
        if (document.body.dataset.page === 'components') {
          const profile = document.getElementById('profile-image-example-editable')

profile.addEventListener('changed', e => console.log(e.data))
profile.addEventListener('error', e => console.log(e.message))

        }
      

        //
        // ./src/progress-bar/readme.js
        //
        if (document.body.dataset.page === 'components') {
          let percentage = 0
let interval = null

const progressBar = document.getElementById('progress-bar-example')

document.getElementById('start-progress').addEventListener('click', e => {
  clearInterval(interval)
  interval = setInterval(() => {
    progressBar.setProgress(percentage++)
    if (progressBar.value >= 100) percentage = 0
  }, 128)
})

document.getElementById('stop-progress').addEventListener('click', e => {
  clearInterval(interval)
})

        }
      

        //
        // ./src/windowed/readme.js
        //
        if (document.body.dataset.page === 'components') {
          class MyWindowed extends Tonic.Windowed {
  renderRow (row) {
    return `
      <div class="tr">
        <div class="td">${row.title}</div>
        <div class="td">${row.date}</div>
        <div class="td">${row.random}</div>
      </div>
    `
  }

  render () {
    return `
      <div class="th">
        <div class="td">Title</div>
        <div class="td">Date</div>
        <div class="td">Random</div>
      </div>
      ${super.render()}
    `
  }
}

Tonic.add(MyWindowed)

//
// This demo generates the data after you click the overlay instead of
// on page load since 500K rows of data can take a few seconds to create.
//
const windowed = document.getElementsByTagName('my-windowed')[0]
const overlay = document.getElementById('click-to-load')

overlay.addEventListener('click', e => {
  const rows = []

  for (let i = 1; i < 500001; i++) {
    rows.push({
      title: `Row #${i}`,
      date: String(new Date()),
      random: Math.random().toString(16).slice(2)
    })
  }

  overlay.classList.add('hidden')
  windowed.load(rows)
})

        }
      
    }
  