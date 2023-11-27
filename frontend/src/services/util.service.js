export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  getFormattedDate,
  isYesterday,
  getDayName,
  formatTimeAgo,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function isYesterday(timestamp) {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today.setDate(today.getDate() - 1))

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  )
}

function getDayName(timestamp) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date(timestamp).getDay()]
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getFormattedDate() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  const formattedDate = `${day} ${month}, ${year}`

  return formattedDate
}

function formatTimeAgo(sentAt) {
  const timestamp = Date.now()
  const seconds = Math.floor(timestamp / 1000)
  const oldTimestamp = Math.floor(sentAt / 1000)

  const difference = seconds - oldTimestamp
  let output = ``
  if (difference < 60) {
    // Less than a minute has passed:
    output = `Just now`
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)}min ago`
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)}hrs ago`
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`
  }

  return `${output}`
}
