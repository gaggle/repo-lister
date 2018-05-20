const {exec} = require('child-process-promise')

const {log} = require('../lib/log')

module.exports = (cmd, envs = {}) => {
  let s = `export PATH=$(npm bin):$PATH`
  for (let [key, val] of Object.entries(envs)) {
    s += `; export ${key}=${val}`
  }
  s += `; ${cmd}`
  log.debug(`exec start: ${s} (cwd: ${process.cwd()})`)
  return exec(s)
    .then(({stdout, stderr}) => {
      if (stderr) log.error(stderr)
      log.debug(stdout)
      log.debug(`exec done: ${s}`)
      return {stdout, stderr}
    })
    .catch(err => {
      log.trace(err)
      throw new Error(`Error during exec!\n\tcmd: ${s}\n\terr: ${err.stderr}`)
    })
}
