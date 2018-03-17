import renderer from 'react-test-renderer'

import App from '../../pages/index.js'

describe('With real data', () => {
  it('Renders without errors', () => {
    renderer.create(<App/>)
  })
})
