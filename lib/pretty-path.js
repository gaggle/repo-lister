const { relative, resolve } = require('path')

module.exports = (p, opts = {}) => {
  if (opts.alwaysAbsolute) return resolve(p)

  const prettyPath = relative(process.cwd(), p)
  if (prettyPath.indexOf('..') !== -1) return resolve(prettyPath)
  return prettyPath
}
