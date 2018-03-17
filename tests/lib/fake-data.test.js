const fs = require('fs')
const path = require('path')

const getFakeData = require('../../lib/fake-data')
const getRealData = () => JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', 'data.json')).toString()
)

describe('Fake data', () => {
  let fakeData, realData

  describe('root', () => {
    beforeEach(() => {
      fakeData = getFakeData()
      realData = getRealData()
    })

    it('has same keys', () => {
      expect(Object.keys(realData))
        .toEqual(Object.keys(fakeData))
    })
  })

  describe('repos first entry', () => {
    beforeEach(() => {
      fakeData = firstKeyOf(getFakeData().repos)
      realData = firstKeyOf(getRealData().repos)
    })

    it('has same keys', () => {
      expect(Object.keys(realData))
        .toEqual(Object.keys(fakeData))
    })
  })
})

function firstKeyOf (obj) {
  return obj[Object.keys(obj)[0]]
}
