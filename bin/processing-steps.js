const fs = require('fs-extra')
const tmp = require('tmp-promise')
const {join, relative, resolve} = require('path')
const {URL} = require('url')

const wrappedExec = require('../lib/wrapped-exec')
const {log} = require('../lib/log')

exports.build = async argv => {
  const buildFolder = relative(process.cwd(), join(argv.cachefolder, 'next'))
  log.debug(`Building to: ${resolve(buildFolder)}`)
  await wrappedExec('next build', {
    DATA_URL: new URL('/repos/data.json', argv.base),
    DIST_DIR: buildFolder,
  })

  log.debug(`Removing '${argv.outfolder}'`)
  await fs.remove(argv.outfolder)

  const promises = [wrappedExec(`next export -o ${argv.outfolder}`, {DIST_DIR: buildFolder})]
  if (!argv.production)
    promises.push(wrappedExec(`build-storybook -o ${argv.outfolder}/storybook`))
  return Promise.all(promises)
}

exports.copyAssets = async argv => {
  const fontSrc = './node_modules/ionicons/dist/fonts/'
  const fontDst = join(argv.outfolder, 'fonts')

  const scrapedSrc = join(argv.scrapedfolder, '/')
  const scrapedDst = join(argv.outfolder, 'repos', '/')

  return Promise.all([
    fs.copy(fontSrc, fontDst)
      .then(() => log.debug(`Copied '${fontSrc}' -> '${fontDst}'`)),
    wrappedExec(`rsync -a ${scrapedSrc} ${scrapedDst}`)
      .then(() => log.debug(`Synced '${fontSrc}' -> '${fontDst}'`)),
  ])
}

exports.createDirs = async argv => {
  const folders = [argv.outfolder, argv.cachefolder]
  log.debug(`Ensuring folders exist: ${folders.join(', ')}`)
  return Promise.all(folders.map(el => fs.ensureDir(el)))
}

/**
 * Beware, this may mutate Current Working Directory!
 */
exports.prepareCache = async argv => {
  const cwd = process.cwd()
  const repoListerPath = resolve(join(__dirname, '..'))

  if (relative(cwd, argv.cachefolder).indexOf('..') === -1) {
    log.debug('Cachefolder is under CWD, using simple cache preparation')
  } else {
    log.debug('Cachefolder is above CWD')
    const currentNodeModulesPath = join(cwd, 'node_modules')
    const tmpRepoListerPath = join(argv.cachefolder)
    const tmpNodeModulesPath = join(tmpRepoListerPath, 'node_modules')

    await Promise.all([
      fs.copy(repoListerPath, tmpRepoListerPath)
        .then(() => log.debug(`Copied '${repoListerPath}' -> '${tmpRepoListerPath}'`)),
      fs.ensureSymlink(currentNodeModulesPath, tmpNodeModulesPath)
        .then(() => log.debug(`Symlinked '${currentNodeModulesPath}' -> '${tmpNodeModulesPath}'`)),
    ])
    process.chdir(tmpRepoListerPath)
  }
}

/**
 * Beware, this mutates
 `argv`
 !
 */
exports.sanitizeArgv = async argv => {
  if (argv.cachefolder) {
    const cachefolder = resolve(argv.cachefolder)
    log.debug(
      `Sanitizing cachefolder: '${argv.cachefolder}' -> '${cachefolder}'`
    )
    argv.cachefolder = cachefolder
  } else {
    const opts = {unsafeCleanup: true}
    if (log.getLevel() <= log.levels.TRACE) opts['keep'] = true
    const tmpObj = await tmp.dir(opts)
    argv.cachefolder = tmpObj.path
    log.debug(
      `Making temp cachefolder: '${argv.cachefolder}'`
    )
  }
  const outfolder = resolve(argv.outfolder)
  log.debug(
    `Sanitizing outfolder: '${argv.outfolder}' -> '${outfolder}'`
  )
  argv.outfolder = outfolder

  const scrapedfolder = resolve(argv.scrapedfolder)
  log.debug(
    `Sanitizing scrapedfolder: '${argv.scrapedfolder}' -> '${scrapedfolder}'`
  )
  argv.scrapedfolder = scrapedfolder
}

