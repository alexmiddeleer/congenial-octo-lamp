exports.runTests = () => {
  const { status, stdout, stderr } = require('child_process').spawnSync('node', ['out.js'])
  if (status > 0) {
    console.log(`Test exec status = ${status} ❌ ${stdout} ${stderr}`)
  } else {
    console.log(`All tests passed ✅ ${stdout}`)
  }
  return status
}

exports.cleanUp = () => {
  const { status, stderr } = require('child_process').spawnSync('rm', ['out.js'])
  if (status > 0) {
    console.log(`Failed to clean up ❌ ${stderr}`)
  }
  return status
}

exports.build = (args = {}) => {
  return require('esbuild').build({
    entryPoints: [process.env.TEST_ENTRY],
    outfile: 'out.js',
    bundle: true,
    ...args
  })
}

const standardError = new Error('System not nominal')
exports.afterBuild = ({ errors, warnings }) => {
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
  let s = exports.runTests()
  s += exports.cleanUp()
  if (s > 0) {
    throw standardError
  }
}
