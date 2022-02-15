'use strict'

import init from '../index.js'

const asserty = (b, s) => {
  if (!b) console.log('Assertion failure: ' + s)
}

const assertEquals = (a, b, s) => {
  asserty(a === b, `${s}: expected ${a} to equal ${b} (but it did not)`)
}

const result = init()

assertEquals(result.count(), 0, 'result count should be 0 if no tests run')
