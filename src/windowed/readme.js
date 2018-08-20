class MyWindowed extends Tonic.Windowed {
  connected () {
    const rows = []

    for (let i = 0; i < 500000; i++) {
      rows.push({
        title: `Row #${i}`,
        date: String(new Date()),
        random: Math.random().toString(16).slice(2)
      })
    }

    this.load(rows)
  }

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
    `
  }
}

Tonic.add(MyWindowed)
