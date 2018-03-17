import { actionTypes } from './index'

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      return Object.assign({}, state, {fetching: true})
    case actionTypes.FETCHED:
      const newState = {
        fetching: false,
        initialized: true,
        requestHistory: state.requestHistory.concat([new ResponseEntry(action.response)])
      }
      if (newState.requestHistory.length > 50) {
        newState.requestHistory = newState.requestHistory.slice(1, newState.requestHistory.length)
      }
      if (action.data) newState.data = action.data
      return Object.assign({}, state, newState)
    default:
      return state
  }
}

class ResponseEntry {
  constructor (res) {
    this.createdAt = new Date()
    this.status = res.status
    this.statusText = res.statusText
  }
}
