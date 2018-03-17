'use strict'
const loadedFileData = require('../data')

module.exports = function (fileData = loadedFileData) {
  // transform repos into pathname `/post/:id`
  const pages = Object
    .keys(fileData.repos)
    .reduce((pages, key) => {
      const url = `/repo/${key}`
      const query = {page: '/repo', query: {id: key}}
      return Object.assign({}, pages, {[url]: query})
    }, {})

  // combine the map of post pages with home
  return Object.assign({}, pages, {
    '/': {page: '/'},
  })
}
