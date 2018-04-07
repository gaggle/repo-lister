exports.log = require('loglevel')

exports.configureLog = verbosity => {
  const levelName = getLevelName(verbosity)
  exports.log.setLevel(levelName)
  return levelName
}

exports.getLogLevel = () => {
  const level = exports.log.getLevel()
  return Object.keys(exports.log.levels)[level]
}

const getLevelName = verbosity => {
  switch (verbosity) {
    case 0:
      return 'ERROR'
    case 1:
      return 'WARN'
    case 2:
      return 'INFO'
    case 3:
      return 'DEBUG'
    case 4:
      return 'TRACE'
    default:
      return 'SILENT'
  }
}
