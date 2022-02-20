#!/usr/local/bin/node
'use strict'

const { build, afterBuild } = require('./test-utils')

build().then(result => {
  try {
    afterBuild(result)
  } catch {
    process.exit(1)
  }
})
