import fetch from 'isomorphic-unfetch'

import { actionTypes } from './index'

export const startDataPoll = isServer => async dispatch => {
  if (!isServer) return

  console.log('Starting data polling')

  try {
    await fetchDataJson(dispatch)
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
      await fetchDataJson(dispatch)
    } catch (err) {
      if (!(err instanceof FetchError)) throw err
    } finally {
      fetching = false
    }
  }, 2000)
}

async function fetchDataJson (dispatch) {
  dispatch({type: actionTypes.FETCHING})
  let url = 'http://localhost:3000/data.json'

  const number = Math.random()
  if (number < 0.2) {
  }
  const res = await fetch(url)

  if (res.ok) {
    const data = await res.json()
    dispatch({type: actionTypes.FETCHED, status: res.status, response: res, data: data})
  } else {
    dispatch({type: actionTypes.FETCHED, status: res.status, response: res})
    throw new FetchError(res.statusText)
  }
}

function FetchError () {}

FetchError.prototype = new Error()
