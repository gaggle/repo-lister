function getDatetime (dateStr) {
  let datetime = new Date(dateStr)
  if (!isValidDate(datetime)) {
    datetime = new Date(parseInt(dateStr))
  }

  if (!isValidDate(datetime)) {
    throw new Error(`Cannot create date from '${dateStr}'`)
  }

  return datetime
}

function isValidDate (date) {
  return !isNaN(Date.parse(date))
}

export {
  getDatetime,
  isValidDate,
}
