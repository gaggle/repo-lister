/* global describe expect it */
import lo from 'lodash'

import { actionTypes, initialState } from '../../store'
import { reducer, ResponseEntry } from '../../store/reducers'
import { getResponse } from './helpers'

describe('reducer', () => {
  describe('FETCHING', () => {
    it('enables fetching', () => {
      const state = reducer(initialState, { type: actionTypes.FETCHING })
      expect(state).toMatchObject({ fetching: true })
    })
  })

  describe('FETCHED', () => {
    it('disables fetching', () => {
      const state = reducer(initialState, { type: actionTypes.FETCHED })
      expect(state).toMatchObject({ 'fetching': false })
    })

    it('enables hasFetchedOnce', () => {
      const state = reducer(initialState, { type: actionTypes.FETCHED })
      expect(state).toMatchObject({ 'hasFetchedOnce': true })
    })

    it('appends ResponseEntry to request history', () => {
      const state = reducer(initialState, {
        type: actionTypes.FETCHED,
        response: getResponse()
      })
      expect(state).toMatchObject({ 'requestHistory': [expect.any(ResponseEntry)] })
    })

    it('stores response details in request history', () => {
      const state = reducer(initialState, {
        type: actionTypes.FETCHED,
        response: getResponse({ status: 1, statusText: 'Foo' })
      })
      expect(state.requestHistory[0]).toMatchObject({
        createdAt: expect.any(Date),
        status: 1,
        statusText: 'Foo'
      })
    })

    it('limits request history length', () => {
      let state = initialState
      for (let i in lo.range(100)) {
        state = reducer(state, { type: actionTypes.FETCHED, response: { statusText: i } })
      }
      expect(state.requestHistory.length).toEqual(50)
    })

    it('stores action data', () => {
      const state = reducer(initialState, { type: actionTypes.FETCHED, data: { foo: 'bar' } })
      expect(state).toMatchObject({ data: { foo: 'bar' } })
    })
  })
})
