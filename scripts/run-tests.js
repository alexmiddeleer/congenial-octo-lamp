#!/usr/local/bin/node
'use strict'

const { spawnSync } = require('child_process')

let s = 0

{
  const { status, stderr, stdout } = spawnSync('npx', ['esbuild', 'tests/index.js', '--bundle', '--outfile=out.js'])
  if (status > 0) {
    console.log(`Failed to build for tests ❌ ${stderr}`)
    process.exit(1)
  } else {
    console.log(`Build succeeded ✅ ${stdout}`)
  }
}
{
  const { status, stderr, stdout } = spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Something broke or tests failed ❌ ${stdout} ${stderr}`)
    s += status
  } else {
    console.log(`Tests passed ✅ ${stdout}`)
  }
}
{
  const { status, stderr, stdout } = spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up test out.js ❌ ${stderr}`)
    s += status
  } else {
    console.log(`Cleaned up ✅ ${stdout}`)
  }
}

if (s > 0) {
  console.log('System not nominal ❌')
  process.exit(1)
}
process.exit(0)
