#!/usr/local/bin/node
'use strict'

const { runTests, build, cleanUp, afterBuild } = require('./test-utils')

build({
  watch: {
    onRebuild (error, result) {
      if (error) {
        console.error('rebuild failed ❌', error)
      } else {
        runTests()
        cleanUp()
      }
    }
  }
}).then(result => {
  try {
    afterBuild(result)
  } catch {
    // Wait for rebuild.
  }
})
