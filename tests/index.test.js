'use strict'

import init from '../src/index.js'
import { } from './ResultReport.test.js'

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
  const result = init()
  assertEquals(!!result.report, true, 'It has a report')
}

{
  const result = init()
  assertEquals(!!result.report, true, 'It has a report')
  assertEquals(result.report.count(), 0, 'Its report has zero results')
}

{
  const result = init({
    tests: [{}]
  })
  assertEquals(!!result.report, true, 'It has a report')
  assertEquals(result.report.count(), 1, 'Its report has 1 result')
}

if (s > 0) {
  process.exit(1)
}
