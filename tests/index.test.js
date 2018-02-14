import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import App from '../pages/index.js'

describe('With Enzyme', () => {
  it('App shows "List of posts" heading', () => {
    const app = shallow(<App posts={[{id: 1}]}/>)

    expect(app.find('h2').length).toEqual(1)
  })
})

describe('With Snapshot Testing', () => {
  beforeEach(() => MockDate.set('1/1/2000'))

  it('App matches snapshot', () => {
    const component = renderer.create(<App posts={[{id: 1}]}/>)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  afterEach(() => MockDate.reset())
})
