#!/usr/bin/env node
const _prettyPath = require('../lib/pretty-path')
const {configureLog, getLogLevel, log} = require('../lib/log')

const steps = require('./processing-steps')

const prettyPath = (...args) => {
  return _prettyPath(...args, {alwaysAbsolute: log.getLevel() <= log.levels.DEBUG})
}

const defaultOptions = {
  cachefolder: undefined,
  outfolder: 'out/',
  production: false,
  scrapedfolder: 'scraped/',
}

const argv = require('yargs')
  .usage('$0 <base>', 'Generate static site displaying scraped data', yargs => {
    yargs.positional('base', {
      describe: `Base URL where site is deployed to, e.g. "http://localhost"`,
      type: 'string'
    })
    yargs.option('s', {
      alias: 'scrapedfolder',
      default: defaultOptions.scrapedfolder,
      describe: 'Folder containing scraped repo data',
      type: 'string'
    })
    yargs.option('o', {
      alias: 'outfolder',
      default: defaultOptions.outfolder,
      describe: 'Folder to export to',
      type: 'string'
    })
    yargs.option('p', {
      alias: 'production',
      default: process.env.NODE_ENV === 'production' || defaultOptions.production,
      describe: 'Enable production mode, defaults to $NODE_ENV==production',
    })
    yargs.option('v', {
      alias: 'verbose',
      count: true,
      describe: 'Debug level count, corresponding to WARN, INFO, DEBUG, TRACE, SILENT',
    })
    yargs.option('c', {
      alias: 'cachefolder',
      default: defaultOptions.cachefolder,
      describe: 'Debug flag to set caching folder',
      type: 'string',
    })
  })
  .strict(true)
  .argv

const onError = err => {
  log.error(err)
  process.exit(1)
}

const informUserStart = argv => {
  if (log.getLevel() !== log.levels.SILENT) {
    if (argv.verbose !== 0) console.log(`Log level ${getLogLevel()}`)
    console.log(`Exporting ${argv.production ? 'production' : 'dev'} static site to '${prettyPath(argv.outfolder)}', ` +
      `with assets from '${prettyPath(argv.scrapedfolder)}'`)
  }
  log.debug(`Caching to '${prettyPath(argv.cachefolder)}'`)
}

configureLog(argv.verbose)
steps.sanitizeArgv(argv)
  .then(() => informUserStart(argv))
  .then(() => log.debug('Preparing folders...'))
  .then(() => steps.createDirs(argv))
  .then(() => log.debug('Folders prepared'))

  .then(() => log.debug('Preparing cache...'))
  .then(() => steps.prepareCache(argv))
  .then(() => log.debug('Cache prepared'))

  .then(() => log.info('Building...'))
  .then(() => steps.build(argv))
  .then(() => log.debug('Project built'))

  .then(() => log.info('Final processing...'))
  .then(() => steps.copyAssets(argv))
  .then(() => log.debug('Assets copied'))

  .then(() => {log.info('Done')})
  .catch(onError)
