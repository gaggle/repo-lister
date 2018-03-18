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

  it('bar', () => {
    startDataPoll(true)
  })

  it('dispatches FETCHING then FETCHED events', async () => {
    fetchMock.get(initialState.dataUrl, {body: getFakeData()})

    await store.dispatch(startDataPoll())

    const actions = store.getActions()
    expect(actions)
      .toMatchObject([
        {type: actionTypes.FETCHING},
        {type: actionTypes.FETCHED}
      ])
  })

  it('dispatches FETCHED event with data', async () => {
    fetchMock.get(initialState.dataUrl, {body: getFakeData()})

    await store.dispatch(startDataPoll())

    const actions = store.getActions()
    expect(actions[1]).toMatchObject({data: getFakeData()})
  })
  it('dispatches FETCHED event with response', async () => {
    fetchMock.get(initialState.dataUrl, {body: getFakeData()})

    await store.dispatch(startDataPoll())

    const actions = store.getActions()
    expect(actions[1]).toMatchObject({response: {}})
  })
})
