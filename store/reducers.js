import { actionTypes } from './index'

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      return Object.assign({}, state, {fetching: true})

    case actionTypes.FETCHED:
      let newRequestHistory = state.requestHistory.concat(
        [new ResponseEntry(action.response || {})]
      )
      if (newRequestHistory.length > 50) {
        newRequestHistory = newRequestHistory
          .slice(1, newRequestHistory.length)
      }
      const newState = {
        fetching: false,
        initialized: true,
        requestHistory: newRequestHistory,
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
