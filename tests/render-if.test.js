import renderIf from '../lib/render-if'

describe('render-if', () => {
  it('calls function if condition is true', (done) => {
    renderIf(true, () => {
      done()
    })
  })

  it('does not call function if condition is false', (done) => {
    renderIf(false, () => {
      done.fail(new Error('Must not be called'))
    })
    done()
  })
})
