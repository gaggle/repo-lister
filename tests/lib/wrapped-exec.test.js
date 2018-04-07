const exec = require('../../lib/wrapped-exec')

describe('exec', () => {
  it('should return stdout', async () => {
    const result = await exec('echo foo')
    expect(result.stdout).toEqual('foo\n')
  })

  it('should have empty stderr given no errors occurred', async () => {
    const result = await exec('echo foo')
    expect(result.stderr).toEqual('')
  })

  it('should set env. variables', async () => {
    const result = await exec('echo $foo', {foo: 'bar'})
    expect(result.stdout).toEqual('bar\n')
  })

  it('should return stderr', async () => {
    const result = await exec('>&2 echo "error"')
    expect(result.stderr).toEqual('error\n')
  })

  it('should have empty stdout given nothing was output', async () => {
    const result = await exec('>&2 echo "error"')
    expect(result.stdout).toEqual('')
  })
})
