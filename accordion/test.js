const tape = require('../test/tape')
const { qs } = require('qs')

tape('{{accordion-1}} has correct default state', t => {
  const container = qs('#accordion-1')
  const component = qs('tonic-accordion', container)

  t.ok(component, 'rendered')
  t.end()
})
