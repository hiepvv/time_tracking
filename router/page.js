let express = require('express')
let router = express.Router()
let path = require('path')

router.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/index.html'))
})

module.exports = router