import React from 'react'
import { shallow } from 'enzyme/build/index'

import Layout from '../../components/layout'

describe('Layout', () => {
  it('should link to home', () => {
    const comp = shallow(<Layout>
      <div/>
    </Layout>)
    expect(comp.find('Navbar > Link').prop('href')).toBe('/')
  })
})
