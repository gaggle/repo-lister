/* global fetch */
import { actionTypes } from './index'

/**
 * Async poll for data
 */
export const dataPoll = () => async (dispatch, getState) => {
  console.debug('Starting data poll')
  const state = await getState()
  return fetchDataJson(dispatch, state.dataUrl)
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchDataJson = async (dispatch, url) => {
  dispatch({type: actionTypes.FETCHING})
  const res = await fetch(url)
  console.debug('Got response', url, res.status)

  const fail = () => {
    console.error('Failed to parse data', res)
    dispatch({type: actionTypes.FETCHED, response: res})
  }

  if (!res.ok) return fail()

  let data
  try {
    data = await res.json()
  } catch {
    return fail()
  }

  console.debug('Got data OK', data)
  dispatch({type: actionTypes.FETCHED, response: res, data})
}
