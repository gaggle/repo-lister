import renderIf, { renderIfElse } from '../../lib/render-if'

describe('renderIf', () => {
  it('calls function if condition is true', done => {
    renderIf(true, () => {
      done()
    })
  })

  it('does not call function if condition is false', done => {
    renderIf(false, () => {
      done.fail(new Error('Must not be called'))
    })
    done()
  })
})

describe('renderIfElse', () => {
  it('calls function if condition is true', done => {
    renderIfElse(true, () => {
      done()
    })
  })

  it('calls other function if condition is false', done => {
    renderIfElse(false, () => {
      done.fail(new Error('Must not be called'))
    }, () => {
      done()
    })
  })
})
