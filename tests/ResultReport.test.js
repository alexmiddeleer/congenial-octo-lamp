'use strict'

import ResultReport from '../src/ResultReport.js'

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

{
  const report = new ResultReport()
  assertEquals(!!report, true, 'It can be constructed')
}

if (s > 0) {
  process.exit(1)
}
