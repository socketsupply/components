class MyWindowed extends Tonic.Windowed {
  connected () {
    const rows = []

    for (let i = 0; i < 10000; i++) {
      rows.push({
        foo: String(new Date()),
        bar: 'beep',
        beep: Math.random().toString(16).slice(2)
      })
    }

    this.load(rows)
  }

  styles () {
    return `
      my-windowed .outer {
        overflow: auto;
      }
    `
  }

  renderRow (row) {
    return `
      <div class="tr">
        <div class="td">${row.foo}</div>
        <div class="td">${row.bar}</div>
        <div class="td">${row.beep}</div>
      </div>`
  }

  render () {
    return `
      <div class="outer">
        <div class="inner">
        </div>
      </ul>
    `
  }
}

Tonic.add(MyWindowed)
