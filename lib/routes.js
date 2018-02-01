'use strict'
const data = require('../data')

module.exports = function () {
  // transform posts into pathname `/post/:id`
  const pages = data.reduce(
    (pages, post) => {
      return Object.assign({}, pages, {
        [`/post/${post.id}`]: {
          page: '/post',
          query: {
            id: post.id,
          },
        }
      })
    }, {}
  )

  // combine the map of post pages with home
  return Object.assign({}, pages, {
    '/': {page: '/'},
  })
}
