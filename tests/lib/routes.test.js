import { join } from 'path'

import getRoutes from '../../lib/routes'

import rawScrapeData from '../fixtures/sample-data/data.json'

const arrContaining = expect.arrayContaining
const objContaining = expect.objectContaining

describe('routes', () => {
  const oldEnv = process.env

  beforeEach(() => {
    process.env = {...oldEnv}
    process.env.SCRAPE_DIR = join(__dirname, '../fixtures/sample-data')
  })

  afterEach(() => process.env = oldEnv)

  it('specifies root page', () => {
    expect(getRoutes()).toEqual(objContaining({
      '/': {page: '/'}
    }))
  })

  it('puts data-elements into expected page', () => {
    const el = rawScrapeData.repos[Object.keys(rawScrapeData.repos)[0]]
    const idealRoute = `/repos/${el.id}`

    const routes = getRoutes()

    expect(Object.keys(routes)).toEqual(arrContaining([idealRoute]))
    expect(routes[idealRoute]).toEqual({
      page: '/repo',
      query: {
        id: el.id,
      }
    })
  })
})
