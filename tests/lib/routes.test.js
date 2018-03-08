import routes from '../../lib/routes'

const get_routes = () => routes([
  {
    full_name: 'user/name',
    id: 'id',
  }
])

describe('routes', () => {
  it('specifies root page', () => {
    expect(get_routes()).toEqual(expect.objectContaining({
      '/': {page: '/'}
    }))
  })

  it('puts data-elements into expected page', () => {
    expect(get_routes()).toEqual(expect.objectContaining({
      '/repo/user/name': {
        page: '/repo', query: {
          full_name: 'user/name',
          id: 'id',
        }
      }
    }))
  })
})

describe('routes with default data', () => {
  it('specifies root page', () => {
    expect(routes())
      .toEqual(expect.objectContaining({'/': {'page': '/'}}))
  })
})
