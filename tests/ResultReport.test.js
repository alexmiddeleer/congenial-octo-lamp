'use strict'

import ResultReport from '../src/ResultReport.js'
import assert from 'assert'

{
  const report = new ResultReport()
  assert.ok(report, 'It can be constructed')
//   assert.ok(false, 'fail')
  assert.ok(true, 'pass')
}
