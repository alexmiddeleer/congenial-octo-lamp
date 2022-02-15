'use strict'

import init from '../index.js'

let s = 0

const fail = () => s++

const asserty = (b, s) => {
  if (!b) {
    console.log('Assertion failure: ' + s)
    fail()
  }
}

const assertEquals = (a, b, s) => {
  asserty(a === b, `${s}: expected ${a} to equal ${b} (but it did not)`)
}

const result = init()

assertEquals(result.count(), 1, 'result count should be 0 if no tests run')

if (s > 0) {
  process.exit(1)
}
process.exit(0)
