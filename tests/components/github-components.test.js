import React from 'react'
import { shallow } from 'enzyme/build/index'

import { Issues, Language, PullRequests, ReadmeBadge } from '../../components/github-components'

describe('Issues', () => {
  it('should display count', () => {
    const comp = shallow(<Issues count={1} url={'foo'}/>)
    expect(comp.find('a').text()).toEqual('1')
  })

  it('should turn url to a link', () => {
    const comp = shallow(<Issues count={1} url={'foo'}/>)
    expect(comp.exists({href: 'foo'})).toBe(true)
  })
})

describe('Language', () => {
  it('should provide a language color', () => {
    const comp = shallow(<Language language={'Python'}/>)
    const style = comp.find('.color').prop('style')
    expect(style.color).toEqual('#3572A5')
  })

  it('should not provide a color if not identified', () => {
    const comp = shallow(<Language language={'foo'}/>)
    const style = comp.find('.color').prop('style')
    expect(style.color).toEqual(undefined)
  })

  it('should display normalised language', () => {
    const comp = shallow(<Language language={'Shell'}/>)
    const el = comp.find('.text')
    expect(el.text()).toEqual('Sh')
  })

  it('should display raw language if not identified', () => {
    const comp = shallow(<Language language={'foo'}/>)
    const el = comp.find('.text')
    expect(el.text()).toEqual('foo')
  })
})

describe('PullRequests', () => {
  it('should display count', () => {
    const comp = shallow(<PullRequests count={1} url={'foo'}/>)

    expect(comp.find('a').text()).toEqual('1')
  })
})

describe('ReadmeBadge', () => {
  it('should have title', () => {
    const comp = shallow(<ReadmeBadge/>)

    expect(comp.find('.icon').prop('title')).toEqual('Has README.md')
  })
})
