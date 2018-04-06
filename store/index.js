import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer } from './reducers'

export const actionTypes = {
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
}

export const initStore = (state = initialState) => {
  return createStore(reducer, state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initialState = {
  data: {repos: {}},
  dataUrl: process.env.DATA_URL || 'http://localhost:3000/repos/data.json',
  fetching: undefined,
  initialized: false,
  lastUpdate: 0,
  requestHistory: [],
}
