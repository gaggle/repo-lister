#!/usr/bin/env node
const {copy, ensureDir, ensureSymlink} = require('fs-extra')
const {dirname, join, relative, resolve} = require('path')
const {exec} = require('child-process-promise')

const defaultOptions = {
  cachefolder: '.cache/',
  datafile: 'data.json',
  outfolder: 'out/',
  production: false,
  staticfolder: 'static/',
}

const argv = require('yargs')
  .usage('$0', 'Export static list of repos', yargs => {
    yargs.option('d', {
      alias: 'datafile',
      default: defaultOptions.datafile,
      describe: 'File to load repo information from',
      type: 'string'
    })
    yargs.option('s', {
      alias: 'staticfolder',
      default: defaultOptions.staticfolder,
      describe: 'Folder to load as repos\' static files',
      type: 'string'
    })
    yargs.option('o', {
      alias: 'outfolder',
      default: defaultOptions.outfolder,
      describe: 'Folder to export to',
      type: 'string'
    })
    yargs.option('c', {
      alias: 'cachefolder',
      default: defaultOptions.cachefolder,
      describe: 'Folder to use for caching',
      type: 'string'
    })
    yargs.option('p', {
      alias: 'production',
      default: process.env.NODE_ENV === 'production' || defaultOptions.production,
      describe: 'Production mode, defaults to $NODE_ENV',
      type: 'boolean'
    })
  })
  .strict(true)
  .argv

const wrappedExec = (cmd, envs = {}) => {
  let s = `export PATH=$(npm bin):$PATH`
  for (let [key, val] of Object.entries(envs)) {
    s += `; export ${key}=${val}`
  }
  s += `; ${cmd}`
  console.log(`exec: ${s}`)
  return exec(s)
    .then(({stdout, stderr}) => {
      if (stderr) console.error(stderr)
      console.log(stdout)
    })
}

ensureDir(argv.cachefolder)
  .then(() => {
    argv.datafile = resolve(argv.datafile)
    argv.staticfolder = resolve(argv.staticfolder)
    argv.outfolder = resolve(argv.outfolder)
    argv.cachefolder = resolve(argv.cachefolder)
  })
  .then(() => {
    let outfolder = relative(process.cwd(), argv.outfolder)
    if (outfolder.indexOf('..') !== -1) outfolder = resolve(outfolder)

    let cachefolder = relative(process.cwd(), argv.cachefolder)
    if (cachefolder.indexOf('..') !== -1) cachefolder = resolve(cachefolder)

    return console.log(
      `Exporting ${argv.production ? 'production' : 'dev'} static site to '${outfolder}', caching to '${cachefolder}'`
    )
  })
  .then(() => {
    const buildFolder = join(argv.cachefolder, 'repo-lister')
    const nodeModulesPath = join(process.cwd(), 'node_modules')
    const repoListerFolder = resolve(join(__dirname, '..'))

    if (repoListerFolder !== process.cwd()) {
      return Promise.all([
        copy(repoListerFolder, buildFolder),
        ensureSymlink(nodeModulesPath, join(buildFolder, 'node_modules')),
      ])
        .then(() => process.chdir(buildFolder))
    }
  })
  .then(() => {
    const nextFolder = relative(process.cwd(), join(argv.cachefolder, '.next'))
    return wrappedExec('next build', {DIST_DIR: nextFolder})
      .then(() => {
        const promises = [
          wrappedExec(`next export -o ${argv.outfolder}`, {DIST_DIR: nextFolder})
        ]
        if (!argv.production)
          promises.push(wrappedExec(`build-storybook -o ${argv.outfolder}/storybook`))
        return Promise.all(promises)
      })
  })
  .then(() => {console.log('Done')})
  .catch(err => {
    console.trace(err)
    process.exit(1)
  })
