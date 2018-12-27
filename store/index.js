import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducer } from './reducers'

export const actionTypes = {
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
}

export const makeStore = (state = initialState) => {
  return createStore(reducer, state, applyMiddleware(thunkMiddleware))
}

export const initialState = {
  data: {repos: {}},
  dataUrl: process.env.DATA_URL || 'http://localhost:3000/static/repos/data.json',
  fetching: undefined,
  hasFetchedOnce: false,
  lastUpdate: 0,
  requestHistory: [],
}
