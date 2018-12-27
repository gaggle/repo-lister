import * as redux from 'redux'

import { initialState, makeStore } from '../../store'
import { reducer } from '../../store/reducers'

describe('initStore', () => {
  beforeEach(() => {
    // noinspection JSUnresolvedVariable
    redux.createStore = jest.fn()
    jest.setMock('redux', redux)
  })

  it('takes an initial state', () => {
    makeStore({foo: 'bar'})
    expect(redux.createStore).toHaveBeenCalledWith(
      reducer,
      {foo: 'bar'},
      expect.anything()
    )
  })

  it('uses initial state by default', () => {
    makeStore()
    expect(redux.createStore).toHaveBeenCalledWith(
      reducer,
      initialState,
      expect.anything()
    )
  })
})
