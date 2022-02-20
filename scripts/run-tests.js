#!/usr/local/bin/node
'use strict'

import { build, afterBuild } from './test-utils.js'

build().then(result => {
  try {
    afterBuild(result)
  } catch {
    process.exit(1)
  }
})
