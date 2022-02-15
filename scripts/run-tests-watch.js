#!/usr/local/bin/node
'use strict'

const { spawnSync } = require('child_process')

function runTests () {
  const { status, stdout } = spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Some tests failed ❌ ${stdout}`)
  } else {
    console.log(`All tests passed ✅ ${stdout}`)
  }
}
function cleanUp () {
  const { status, stderr } = spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up ❌ ${stderr}`)
  }
}

require('esbuild').build({
  entryPoints: ['tests/index.js'],
  outfile: 'out.js',
  bundle: true,
  watch: {
    onRebuild (error, result) {
      if (error) {
        console.error('build failed ❌', error)
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
