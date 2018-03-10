import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import App from '../../pages/index.js'

import realData from '../../data'

const fileData = [{full_name: 'user/name', id: 'id'}]

describe('With Enzyme', () => {
  it('App shows "List of repos" heading', () => {
    const app = shallow(<App repos={fileData}/>)

    expect(app.find('h2').length).toEqual(1)
  })
})

describe('With Snapshot Testing', () => {
  beforeEach(() => MockDate.set('1/1/2000'))

  it('App matches snapshot', () => {
    const app = renderer.create(<App repos={fileData}/>)
    const tree = app.toJSON()

    expect(tree).toMatchSnapshot()
  })

  afterEach(() => MockDate.reset())
})

describe('With real data', () => {
  it('Renders without errors', () => {
    renderer.create(<App repos={realData}/>)
  })
})
