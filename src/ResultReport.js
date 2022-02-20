export default class ResultReport {
  constructor () {
    this.results = []
  }

  count () {
    return this.results.length
  }

  addResult (r) {
    this.results.push(r)
  }
}
