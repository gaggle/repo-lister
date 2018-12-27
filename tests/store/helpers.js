export const getResponse = (opts = {}) => {
  const response = {
    size: 0,
    status: 200,
    statusText: 'OK',
    timeout: 0,
    url: 'http://localhost:3000/static/repos/data.json'
  }
  return {...response, ...opts}
}
