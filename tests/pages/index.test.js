import renderer from 'react-test-renderer'

import App from '../../pages/index.js'

import realData from '../../data'

const getRepos = (data) => Object
  .values(data)

describe('With real data', () => {
  it('Renders without errors', () => {
    renderer.create(<App repos={getRepos(realData)}/>)
  })
})
