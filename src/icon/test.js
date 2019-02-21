const tape = require('../../test/tape')
const { qs } = require('qs')

tape('{{icon-1}} is constructed properly', t => {
  const container = qs('#icon-1')
  const component = qs('tonic-icon', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('src'), 'the component has a src')
  t.ok(component.hasAttribute('symbol-id'), 'the component has a symbol id')

  t.end()
})

tape('{{icon-2}} has size attribute', t => {
  const container = qs('#icon-2')
  const component = qs('tonic-icon', container)
  const svg = qs('svg', component)

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('size'), 'the component has the size attribute')
  t.equal(component.getAttribute('size'), svg.style.width, 'the size attribute matches svg width')
  t.equal(component.getAttribute('size'), svg.style.height, 'the size attribute matches svg height')

  t.end()
})

tape('{{icon-3}} has color attribute', t => {
  const container = qs('#icon-3')
  const component = qs('tonic-icon', container)
  const use = qs('use', component)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('fill'), use.getAttribute('fill'), 'the fill attribute on the component matches use')
  t.equal(use.getAttribute('fill'), use.getAttribute('color'), 'use has matching fill and color attributes')

  t.end()
})

tape('{{icon-4}} uses custom symbol', t => {
  const container = qs('#icon-4')
  const component = qs('tonic-icon', container)
  const svg = qs('svg', component)
  const id = component.getAttribute('symbol-id')
  const src = component.getAttribute('src')
  const use = qs('use', component)
  const url = `${src}#${id}`

  t.plan(4)

  t.ok(svg, 'the component was constructed with an svg')
  t.ok(id, 'the component has symbol id')
  t.ok(src, 'the component has src')
  t.equal(use.getAttribute('href'), url, 'the href attribute contains the correct url')

  t.end()
})

tape('{{icon-5}} has tabindex attribute', t => {
  const container = qs('#icon-5')
  const component = qs('tonic-icon', container)
  const svg = qs('svg', component)

  t.plan(3)

  t.ok(svg, 'the component was constructed with an svg')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have tabindex attribute')
  t.equal(svg.hasAttribute('tabindex'), true, 'svg has tabindex attribute')

  t.end()
})
