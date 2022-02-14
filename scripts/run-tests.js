#!/usr/local/bin/node
'use strict'

const { spawnSync } = require('child_process')

{
  const { status, stderr, stdout } = spawnSync('npx', ['esbuild', 'tests/index.js', '--bundle', '--outfile=out.js'])
  if (status > 0) {
    console.log(`Failed to build for tests: ${stderr}`)
  }
  console.log(`Build succeeded: ${stdout}`)
}
{
  const { status, stderr, stdout } = spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Failed to run test out.js: ${stderr}`)
  }
  console.log(`Done running tests: ${stdout}`)
}
{
  const { status, stderr, stdout } = spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up test out.js: ${stderr}`)
  }
  console.log(`Done: ${stdout}`)
}
