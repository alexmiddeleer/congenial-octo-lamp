#!/usr/local/bin/node
'use strict'

import { runTests, build, cleanUp, afterBuild } from './test-utils.js'

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
