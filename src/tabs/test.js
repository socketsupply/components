// const tape = require('../../test/tape')
// const { qs, qsa } = require('qs')
//
// tape('{{tabs-1}} data tabs have tabindex attribute', t => {
//   const container = qs('#tabs-1')
//   const component = qs('tonic-tabs', container)
//   const tabs = qsa('[data-tab-name]', component)
//
//   t.ok(tabs, 'the component was created with tabs')
//   t.equal(component.hasAttribute('tabindex'), false, 'component does not have tabindex attribute')
//
//   tabs.forEach(tab => {
//     t.equal(tab.hasAttribute('tabindex'), true, 'tab has tabindex attribute')
//   })
//
//   t.end()
// })
