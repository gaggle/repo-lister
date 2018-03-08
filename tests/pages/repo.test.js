import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'

import Repo from '../../pages/repo.js'

describe('With Snapshot Testing', () => {
  beforeEach(() => MockDate.set('1/1/2000'))

  it('Element matches snapshot', () => {
    const component = renderer.create(<Repo title='Foo'
                                            body='Content goes here'/>)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  afterEach(() => MockDate.reset())
})

describe('getInitialProps', () => {
  it('returns', async () => {
    expect(await Repo.getInitialProps({
      query: {
        full_name: 'foo',
        id: 1,
      }
    })).toEqual({
      'body': undefined,
      'id': 1,
      'title': 'title for foo',
    })
  })
})
