const buildDate = process.env.NODE_ENV === 'test' ? 946684800000 : new Date().getTime()

module.exports = {
  'process.env.BUILD_DATE': buildDate.toString(),
  'process.env.DATA_URL': process.env.DATA_URL
}
