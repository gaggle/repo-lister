import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer } from './reducers'

export const actionTypes = {
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

const exampleInitialState = {
  data: {repos: {}},
  fetching: undefined,
  initialized: false,
  lastUpdate: 0,
  requestHistory: [],
}


