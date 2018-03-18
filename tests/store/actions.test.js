import configureMockStore from 'redux-mock-store'
import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

import getFakeData from '../../lib/fake-data'
import { actionTypes, initialState } from '../../store'
import { startDataPoll } from '../../store/actions'

const getMockStore = configureMockStore([thunk])

describe('startDataPoll', () => {
  let store

  beforeEach(() => {
    store = getMockStore(initialState)
  })

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('dispatches type of events in specified order', async () => {
    fetchMock.get(initialState.dataUrl, {body: getFakeData()})

    await store.dispatch(startDataPoll())
    const actions = store.getActions()

    expect(actions)
      .toMatchObject([
        {type: actionTypes.FETCHING},
        {type: actionTypes.FETCHED},
      ])
  })

  describe('dispatches FETCHED event', () => {
    it('containing data entry with content from url', async () => {
      fetchMock.get(initialState.dataUrl, {body: getFakeData()})

      await store.dispatch(startDataPoll())
      const action = getAction(store, actionTypes.FETCHED)

      expect(action).toMatchObject({data: getFakeData()})
      expect(fetchMock.calls().length).toEqual(1)
    })

    it('containing response entry', async () => {
      fetchMock.get(initialState.dataUrl, {body: getFakeData()})

      await store.dispatch(startDataPoll())
      const action = getAction(store, actionTypes.FETCHED)

      expect(action).toMatchObject({response: {}})
    })

    it('containing no data in case of request-error', async () => {
      fetchMock.get(initialState.dataUrl, {status: 500})

      await store.dispatch(startDataPoll())
      const action = getAction(store, actionTypes.FETCHED)

      expect(action).not.toHaveProperty('data')
    })
  })

  describe('(fetching behavior)', () => {
    it('fetches data immediately', async () => {
      fetchMock.get(initialState.dataUrl, {body: getFakeData()})
      await store.dispatch(startDataPoll())
      expect(fetchMock.calls().length).toEqual(1)
    })
  })
})

function getAction (store, entry) {
  const actions = store.getActions()
  switch (entry) {
    case actionTypes.FETCHING:
      return actions[0]
    case actionTypes.FETCHED:
      return actions[1]
  }
}
