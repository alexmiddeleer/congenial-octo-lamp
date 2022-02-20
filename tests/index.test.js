'use strict'

import init from '../src/index.js'
import assert from 'assert'

(async function () {
  const fs = await import('fs')
  fs.readdirSync('tests').forEach(async f => {
    if (f.indexOf('index') > -1) {
      return
    }
    await import(`./tests/${f}`)
  })

  {
    const result = init()
    assert.equal(!!result.report, true, 'It has a report')
  }

  {
    const result = init()
    assert.equal(!!result.report, true, 'It has a report')
    assert.equal(result.report.count(), 0, 'Its report has zero results')
  }

  {
    const result = init({
      tests: [{}]
    })
    assert.equal(!!result.report, true, 'It has a report')
    assert.equal(result.report.count(), 1, 'Its report has 1 result')
  }
})()
