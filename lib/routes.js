'use strict'
import { existsSync } from 'fs-extra'
import { resolve } from 'path'

module.exports = () => {
  const scrapeDir = process.env.SCRAPE_DIR
  if (!scrapeDir) throw new Error('SCRAPE_DIR not specified, cannot get routes')
  const scrapeFile = resolve(`${scrapeDir}/data.json`)
  if (!existsSync(scrapeFile)) throw new Error(`${scrapeFile} doesn't exist, cannot get routes`)
  const fileData = require(scrapeFile)

  // transform repos into pathname `/post/:id`
  const pages = Object
    .keys(fileData.repos)
    .reduce((pages, key) => {
      const url = `/repos/${key}`
      const query = {page: '/repo', query: {id: key}}
      return Object.assign({}, pages, {[url]: query})
    }, {})

  // combine the map of post pages with home
  return Object.assign({}, pages, {
    '/': {page: '/'},
  })
}
