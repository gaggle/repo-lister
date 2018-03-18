import lo from 'lodash'

import { actionTypes, initialState } from '../../store'
import { reducer } from '../../store/reducers'

describe('reducer', () => {
  describe('FETCHING', () => {
    it('sets fetching', () => {
      const state = reducer(initialState, {type: actionTypes.FETCHING})
      expect(state).toMatchObject({fetching: true})
    })
  })

  describe('FETCHED', () => {
    it('unsets fetching', () => {
      const state = reducer(initialState, {type: actionTypes.FETCHED})
      expect(state).toMatchObject({'fetching': false})
    })

    it('sets initialised', () => {
      const state = reducer(initialState, {type: actionTypes.FETCHED})
      expect(state).toMatchObject({'initialized': true})
    })

    it('appends to request history', () => {
      const state = reducer(initialState, {type: actionTypes.FETCHED})
      expect(state).toMatchObject({'requestHistory': [{}]})
    })

    it('appends to request history', () => {
      const state = reducer(initialState, {
        type: actionTypes.FETCHED, response: {status: 'status', statusText: 'text'}
      })
      expect(state.requestHistory[0]).toMatchObject({
        createdAt: expect.any(Date),
        status: 'status',
        statusText: 'text',
      })
    })

    it('limits request history length', () => {
      let state = initialState
      for (let i in lo.range(1000)) {
        state = reducer(state, {type: actionTypes.FETCHED, response: {statusText: i}})
      }
      expect(state.requestHistory.length).toEqual(50)
    })

    it('sets data', () => {
      const state = reducer(initialState, {type: actionTypes.FETCHED, data: {foo: 'bar'}})
      expect(state).toMatchObject({data: {foo: 'bar'}})
    })
  })
})
