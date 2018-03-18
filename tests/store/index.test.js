import * as redux from 'redux'

import { initialState, initStore } from '../../store'
import { reducer } from '../../store/reducers'

describe('initStore', () => {
  beforeEach(() => {
    // noinspection JSAnnotator
    redux.createStore = jest.fn()
    jest.setMock('redux', redux)
  })

  it('takes an initial state', () => {
    initStore({})
    expect(redux.createStore).toHaveBeenCalledWith(
      reducer,
      {},
      expect.anything()
    )
  })

  it('uses initial state by default', () => {
    initStore()
    expect(redux.createStore).toHaveBeenCalledWith(
      reducer,
      initialState,
      expect.anything()
    )
  })
})
