const Tonic = require('@optoolco/tonic')
const { Windowed } = require('./index')

class ExampleWindowed extends Windowed {
  async click (e) {
    const row = Tonic.match(e.target, '[data-id]')

    if (row) {
      console.log(await this.getRow(+row.dataset.id))
    }
  }

  //
  // Reuses the same DOM structure
  //
  updateRow (row, index, element) {
    element.children[0].textContent = row.title
    element.children[1].textContent = row.date
    element.children[2].textContent = row.random
  }

  //
  // Creates a new DOM structure
  //
  renderRow (row, index) {
    return `
      <div class="tr" data-id="${row.id}">
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

Tonic.add(ExampleWindowed)

//
// This demo generates the data after you click the overlay instead of
// on page load since 500K rows of data can take a few seconds to create.
//
const windowed = document.getElementsByTagName('example-windowed')[0]

window.requestIdleCallback(() => {
  const rows = []

  for (let i = 1; i < 500001; i++) {
    rows.push({
      id: i - 1,
      title: `Row #${i}`,
      date: String(new Date()),
      random: Math.random().toString(16).slice(2)
    })
  }

  windowed.load(rows)
})
