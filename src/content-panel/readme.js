const panelLink1 = document.getElementById('content-panel-link-example-1')
const panel1 = document.getElementById('content-panel-example-1')
panelLink1.addEventListener('click', e => panel1.show())

const panelLink2 = document.getElementById('content-panel-link-example-2')
const panel2 = document.getElementById('content-panel-example-2')
panelLink2.addEventListener('click', e => panel2.show())

const panelLink3 = document.getElementById('content-panel-link-example-3')
const panel3 = document.getElementById('content-panel-example-3')
panelLink3.addEventListener('click', e => panel3.show())

const panels = [...document.getElementsByTagName('content-panel')]
panels.forEach(panel => panel.addEventListener('click', e => {
  if (e.target.value === 'cancel') panel.hide()
  if (e.target.value === 'confirm') {
    setTimeout(() => {
      panel.hide(() => {
        panel.setProps(props => props)
      })
    }, 500)
  }
}))
