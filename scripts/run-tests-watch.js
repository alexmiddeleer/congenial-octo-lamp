#!/usr/local/bin/node
'use strict'

const { spawnSync } = require('child_process')

function runTests () {
  const { status, stderr, stdout } = spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Failed to run test out.js: ${stderr}`)
  } else {
    console.log('Done running tests: ' + stdout)
  }
}
function cleanUp () {
  const { status, stderr } = spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up test out.js: ${stderr}`)
  }
}

require('esbuild').build({
  entryPoints: ['tests/index.js'],
  outfile: 'out.js',
  bundle: true,
  watch: {
    onRebuild (error, result) {
      if (error) {
        console.error('watch build failed:', error)
      } else {
        runTests()
        cleanUp()
      }
    }
  }
}).then(() => {
  runTests()
  cleanUp()
})
