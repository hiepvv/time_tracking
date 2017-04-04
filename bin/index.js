let http = require('http')
let app = require('./../src/app')

var server = http.createServer(app)

var boot = function () {
  server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
  })
}

if (require.main == module) {
  boot()
}