import 'isomorphic-unfetch'

import { actionTypes } from './index'

export const guardedStartDataPoll = isServer => isServer ? startDataPoll() : async () => {}

export const startDataPoll = () => async (dispatch, getState) => {
  console.log('Starting data polling')

  const state = await getState()

  try {
    await fetchDataJson(dispatch, state.dataUrl)
  } catch (err) {
    if (!(err instanceof FetchError)) throw err
  }

  let fetching = false
  return setInterval(async () => {
    console.log('Heartbeat')
    if (fetching === true)
      return

    fetching = true
    try {
      await fetchDataJson(dispatch, state.dataUrl)
    } catch (err) {
      if (!(err instanceof FetchError)) throw err
    } finally {
      fetching = false
    }
  }, 2000)
}

async function fetchDataJson (dispatch, url) {
  dispatch({type: actionTypes.FETCHING})
  const res = await fetch(url)
  if (res.ok) {
    const data = await res.json()
    dispatch({type: actionTypes.FETCHED, response: res, data: data})
  } else {
    dispatch({type: actionTypes.FETCHED, response: res})
    throw new FetchError(res.statusText)
  }
}

function FetchError () {}

FetchError.prototype = new Error()
