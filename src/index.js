import ResultReport from './ResultReport'

export default function init ({ tests } = {}) {
  tests = tests || []
  const report = new ResultReport()
  tests.forEach(t => report.addResult(t))
  return { report }
}
