import 'isomorphic-unfetch'

import { actionTypes } from './index'

export const guardedStartDataPoll = isServer => isServer ? startDataPoll() : asyncNoop()

export const startDataPoll = () => async (dispatch, getState) => {
  const state = await getState()
  return fetchDataJson(dispatch, state.dataUrl)
}

const asyncNoop = () => async () => {}

const fetchDataJson = async (dispatch, url) => {
  dispatch({type: actionTypes.FETCHING})
  const res = await fetch(url)

  if (res.ok) {
    const data = await res.json()
    dispatch({type: actionTypes.FETCHED, response: res, data})
  } else {
    dispatch({type: actionTypes.FETCHED, response: res})
  }
}
