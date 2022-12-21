'use strict'

import { Tonic } from '@socketsupply/tonic'

class MainComp extends Tonic {
  constructor (str, strings, values) {
    super()

    this.str = str
    this.strings = strings
    this.values = values
  }

  render () {
    return this.html(
      [this.str, ...this.strings], ...this.values
    )
  }
}
Tonic.add(MainComp, 'test-main-comp')

export function html ([str, ...strings], ...values) {
  const comp = new MainComp(str, strings, values)
  return comp
}
