import { join } from 'path'

import getRoutes from '../../lib/routes'

import sampleData from '../fixtures/sample-data/data.json'

const arrContaining = expect.arrayContaining
const objContaining = expect.objectContaining

describe('routes', () => {
  const oldEnv = process.env

  beforeEach(() => {
    process.env = {...oldEnv}
    process.env.SCRAPE_DIR = join(__dirname, '../fixtures/sample-data')
  })

  afterEach(() => process.env = oldEnv)

  it('puts data-elements into expected page', () => {
    const el = sampleData.repos[Object.keys(sampleData.repos)[0]]
    const idealRoute = `/repos/${el.id}`

    const routes = getRoutes()

    expect(Object.keys(routes)).toEqual(arrContaining([idealRoute]))
    expect(routes[idealRoute]).toEqual({
      page: '/repos',
      query: {
        id: el.id,
      }
    })
  })
})
