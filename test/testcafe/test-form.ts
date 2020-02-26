'use strict'

/* global fixture, test */
import { Selector } from 'testcafe'

fixture`Test form`
  .page`http://localhost:8030/`

test('can click button', async (t) => {
  const form = Selector('.tc-test-form')

  const button = form.find('button').withText(/Submit/i)
  const input = form.find('#tonic--input_test-form-input')

  await t.typeText(input, 'sample text')
  await t.click(button)

  const span = form.find('span').withText(/Text is: sample text/i)
  await t.expect(span.visible).eql(true)
})
