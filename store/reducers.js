import { actionTypes } from './index'

export const reducer = (state, action) => {
  function addRequestHistory (res) {
    let newRequestHistory = state.requestHistory.concat([
      new ResponseEntry(res || {})
    ])
    if (newRequestHistory.length > 50) {
      newRequestHistory = newRequestHistory
        .slice(1, newRequestHistory.length)
    }
    return newRequestHistory
  }

  switch (action.type) {
    case actionTypes.FETCHING:
      return Object.assign({}, state, { fetching: true })

    case actionTypes.FETCHED:
      const newState = {
        fetching: false,
        hasFetchedOnce: true,
        requestHistory: addRequestHistory(action.response)
      }
      if (action.data) newState.data = action.data
      return Object.assign({}, state, newState)

    default:
      return state
  }
}

export class ResponseEntry {
  constructor (res) {
    this.createdAt = new Date()
    this.status = res.status
    this.statusText = res.statusText
  }
}
