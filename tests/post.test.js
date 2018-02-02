import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'

import Post from '../pages/post.js'

describe('With Snapshot Testing', () => {
  beforeEach(() => MockDate.set('1/1/2000'))

  it('Element matches snapshot', () => {
    const component = renderer.create(<Post title='Foo'
                                            body='Content goes here'/>)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  afterEach(() => MockDate.reset())
})

describe('getInitialProps', () => {
  it('returns', async () => {
    expect(await Post.getInitialProps({query: {id: 1}})).toEqual({
      id: 1,
      title: 'title for 1',
      body: 'quia et suscipit\n' +
      'suscipit recusandae consequuntur expedita et cum\n' +
      'reprehenderit molestiae ut ut quas totam\n' +
      'nostrum rerum est autem sunt rem eveniet architecto'
    })
  })
})
