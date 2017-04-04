function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

let client = {

  getTimers: function () {
    return fetch('/api/timers', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        return data
      })
  },
  createTimer: function (timer) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    return fetch('/api/timers', {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(timer)
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        return data
      })
  },
  deleteTimer: function (timerId) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    return fetch('api/timers', {
      method: 'delete',
      headers: myHeaders,
      body: JSON.stringify({id: timerId})
    }).then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data
    })
  },
  updateTimer: function (timerInfo) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    return fetch('api/timers', {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify(timerInfo)
    }).then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data
    })
  },
  startTimer: function (timerId) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    return fetch('api/timers/start', {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({id: timerId})
    }).then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data
    })
  },
  stopTimer: function (timerId) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    return fetch('api/timers/stop', {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify({id: timerId})
    }).then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data
    })
  }
}