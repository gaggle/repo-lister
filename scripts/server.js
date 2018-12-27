const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const getRoutes = require('../lib/routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const routes = getRoutes()
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl

    const route = routes[pathname]
    if (route) {
      app.render(req, res, route.page, route.query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
