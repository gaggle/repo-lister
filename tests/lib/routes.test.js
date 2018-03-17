import getFakeData from '../../lib/fake-data'
import routes from '../../lib/routes'

describe('routes', () => {
  it('specifies root page', () => {
    expect(routes(getFakeData())).toEqual(expect.objectContaining({
      '/': {page: '/'}
    }))
  })

  it('puts data-elements into expected page', () => {
    expect(routes(getFakeData())).toEqual(expect.objectContaining({
      '/repo/id': {
        page: '/repo', query: {
          id: 'id',
        }
      }
    }))
  })
})

describe('routes with real data', () => {
  it('specifies root page', () => {
    const result = routes()
    expect(result)
      .toEqual(expect.objectContaining({'/': {'page': '/'}}))
  })
})
