/* eslint-env jest */

import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import App from '../pages/index.js'


describe('With Enzyme', () => {
  it('App shows "List of posts" heading', () => {
    const app = shallow(<App posts={[{id: 1}]}/>)

    expect(app.find('h2').length).toEqual(2)
  })
})

describe('With Snapshot Testing', () => {
  it('App matches snapshot', () => {
    MockDate.set('1/1/2000')
    const component = renderer.create(<App posts={[{id: 1}]}/>)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  afterEach(() => MockDate.reset())
})
