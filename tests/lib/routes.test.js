import routes from '../../lib/routes'

const getRoutes = () => routes([
  {
    full_name: 'user/name',
    id: 'id',
  }
])

describe('routes', () => {
  it('specifies root page', () => {
    expect(getRoutes()).toEqual(expect.objectContaining({
      '/': {page: '/'}
    }))
  })

  it('puts data-elements into expected page', () => {
    expect(getRoutes()).toEqual(expect.objectContaining({
      '/repo/user/name': {
        page: '/repo', query: {
          full_name: 'user/name',
          id: 'id',
        }
      }
    }))
  })
})

describe('routes with real data', () => {
  it('specifies root page', () => {
    expect(routes())
      .toEqual(expect.objectContaining({'/': {'page': '/'}}))
  })
})
