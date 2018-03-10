'use strict'
const _ = require('lodash')

const queries = require('./data-query-entries')

const loadedFileData = require('../data')

module.exports = function (fileData = loadedFileData) {
  // transform repos into pathname `/post/:id`
  const pages = fileData.reduce(
    (pages, el) => {
      return Object.assign({}, pages, {
        [`/repo/${el.full_name}`]: {
          page: '/repo',
          query: _.pick(el, queries)
        }
      })
    }, {}
  )

  // combine the map of post pages with home
  return Object.assign({}, pages, {
    '/': {page: '/'},
  })
}
