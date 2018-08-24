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
