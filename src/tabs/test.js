const Tonic = require('@conductorlab/tonic')
const tape = require('../../test/tape')
const { qs } = require('qs')

class ComponentContainer extends Tonic {
  click () {
    console.log('COMPONENT CONTAINER CLICK')
    this.reRender()
  }

  render () {
    return this.html`
      ${this.nodes}
    `
  }
}

Tonic.add(ComponentContainer)

tape('{{tabs-3}} has correct default state', t => {
  const container = qs('component-container')

  t.ok(container, 'rendered')
  console.log(container)
  t.end()
})
