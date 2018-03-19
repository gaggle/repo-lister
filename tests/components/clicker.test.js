import React from 'react'
import { shallow } from 'enzyme/build/index'

import Clicker from '../../components/clicker'

describe('Clicker', () => {
  it('should have expected buttons', () => {
    const comp = shallow(<Clicker/>)
    expect(comp.exists('button.incr')).toBe(true)
    expect(comp.exists('button.reset')).toBe(true)
    expect(comp.exists('button.decr')).toBe(true)
  })

  it('should increment count', () => {
    const comp = shallow(<Clicker/>)
    comp.find('button.incr').prop('onClick')()
    expect(comp.state('count')).toEqual(1)
  })

  it('should decrement count', () => {
    const comp = shallow(<Clicker/>)
    comp.find('button.decr').prop('onClick')()
    expect(comp.state('count')).toEqual(-1)
  })

  it('should reset count', () => {
    const comp = shallow(<Clicker/>)
    comp.find('button.incr').prop('onClick')()
    comp.find('button.reset').prop('onClick')()
    expect(comp.state('count')).toEqual(0)
  })
})
