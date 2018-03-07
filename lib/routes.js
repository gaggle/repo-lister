'use strict'
const _ = require('lodash')
const queries = require('./data-query')

const file_data = require('../data')

module.exports = function (data = file_data) {
  // transform posts into pathname `/post/:id`
  const pages = data.reduce(
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
