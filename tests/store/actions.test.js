/* global afterEach beforeEach describe expect it */
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

import { actionTypes, initialState } from '../../store'
import { dataPoll } from '../../store/actions'

import sampleData from '../fixtures/sample-data/data'
import { getResponse } from './helpers'

const getMockStore = configureMockStore([thunk])

describe('dataPoll', () => {
  let store

  beforeEach(() => { store = getMockStore(initialState)})

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('dispatches type of events in specified order', async () => {
    fetchMock.get(initialState.dataUrl, {body: sampleData})

    await store.dispatch(dataPoll())
    const actions = store.getActions()

    expect(actions)
      .toMatchObject([
        {type: actionTypes.FETCHING},
        {type: actionTypes.FETCHED},
      ])
  })

  describe('FETCHED event', () => {
    it('has data key with body of store url', async () => {
      fetchMock.get(initialState.dataUrl, {body: {foo: 'bar'}})

      await store.dispatch(dataPoll())
      const action = store.getActions()[1]

      expect(action).toMatchObject({data: {foo: 'bar'}})
      expect(fetchMock.calls().length).toEqual(1)
    })

    it('has response key with fetch response', async () => {
      fetchMock.get(initialState.dataUrl, {body: {foo: 'bar'}})

      await store.dispatch(dataPoll())
      const action = store.getActions()[1]

      expect(action).toMatchObject({response: getResponse()})
    })

    it('has response key but no data if request failed', async () => {
      fetchMock.get(initialState.dataUrl, {status: 500})

      await store.dispatch(dataPoll())
      const action = store.getActions()[1]

      expect(action).toMatchObject({
        response: getResponse({
          status: 500,
          statusText: 'Internal Server Error',
        })
      })
      expect(action).not.toHaveProperty('data')
    })
  })
})
