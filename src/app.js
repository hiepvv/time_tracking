let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')

let page = require('./../router/page')
let service = require('./../router/service')

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, './../public')))

app.set('port', process.env.PORT || 3000)

app.use('/', page)
app.use('/api', service)

module.exports = app