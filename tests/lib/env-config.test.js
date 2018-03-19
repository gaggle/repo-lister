const envConfig = require('../../lib/env-config')

describe('env config', () => {
  it('defaults BUILD_DATE to 01/01/2000 00:00:00', () => {
    expect(envConfig).toMatchObject({
      'process.env.BUILD_DATE': '946684800000'
    })
  })
})
