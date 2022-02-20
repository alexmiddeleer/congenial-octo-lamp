import ChildProcess from 'child_process'
import { build as esbuild } from 'esbuild'

export const runTests = () => {
  const { status, stdout, stderr } = ChildProcess.spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Test exec status = ${status} ❌ ${stdout} ${stderr}`)
  } else {
    console.log(`All tests passed ✅ ${stdout}`)
  }
  return status
}

export const cleanUp = () => {
  const { status, stderr } = ChildProcess.spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up ❌ ${stderr}`)
  }
  return status
}

export const build = (args = {}) => {
  return esbuild({
    entryPoints: [process.env.TEST_ENTRY],
    platform: 'node',
    format: 'esm',
    outfile: 'out.js',
    bundle: true,
    ...args
  })
}

const standardError = new Error('System not nominal')
export const afterBuild = ({ errors, warnings }) => {
  if (warnings && warnings.length) {
    console.log('warnings 🟡')
    console.log(warnings.join('\n'))
  }
  if (errors && errors.length) {
    console.log(`There were build errors ❌  ${errors.join('\n')}`)
    throw standardError
  } else {
    console.log('Build succeeded ✅ ')
  }
  let s = runTests()
  s += cleanUp()
  if (s > 0) {
    throw standardError
  }
}
