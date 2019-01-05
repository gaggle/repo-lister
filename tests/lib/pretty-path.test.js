/* global describe expect it */
const { join, resolve } = require('path')

const prettyPath = require('../../lib/pretty-path')

describe('pretty-path', () => {
  it('should return relative path given a simple subfolder path', () => {
    const res = prettyPath('foo/bar')
    expect(res).toEqual('foo/bar')
  })

  it('should return absolute path given a parent path', () => {
    const res = prettyPath('../foo')
    expect(res).toEqual(resolve(join(process.cwd(), '..', 'foo')))
  })

  it('should always return absolute path if flag is specified', () => {
    const res = prettyPath('foo', {alwaysAbsolute: true})
    expect(res).toEqual(join(process.cwd(), 'foo'))
  })
})
