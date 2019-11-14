const Tonic = require('@optoolco/tonic')

class TonicChart extends Tonic {
  constructor (o) {
    super(o)

    try {
      let dynamicRequire = require
      this.Chart = dynamicRequire('chart.js')
    } catch (err) {
      console.error('could not find "chart.js" dependency. npm install?')
    }
  }

  stylesheet () {
    return `
      tonic-chart {
        display: inline-block;
        position: relative;
      }

      tonic-chart canvas {
        display: inline-block;
        position: relative;
      }
    `
  }

  draw (data = {}, options = {}) {
    const root = this.querySelector('canvas')
    const type = this.props.type || options.type

    return new this.Chart(root, {
      type,
      options,
      data
    })
  }

  async fetch (url, opts = {}) {
    if (!url) return {}

    try {
      const res = await window.fetch(url, opts)
      return { data: await res.json() }
    } catch (err) {
      return { err }
    }
  }

  async connected () {
    let data = null

    const options = {
      ...this.props,
      ...this.props.options
    }

    const src = this.props.src

    if (typeof src === 'string') {
      const response = await this.fetch(src)

      if (response.err) {
        console.error(response.err)
        data = {}
      } else {
        data = response.data
      }
    }

    if (src === Object(src)) {
      data = src
    }

    if (data.chartData) {
      throw new Error('chartData propery deprecated')
    }

    if (data) {
      this.draw(data, options)
    }
  }

  render () {
    const {
      width,
      height
    } = this.props

    this.style.width = width
    this.style.height = height

    return `
      <canvas width="${width}" height="${height}">
      </canvas>
    `
  }
}

module.exports = { TonicChart }
