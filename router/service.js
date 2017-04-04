let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let uuid = require('uuid')

const dataFile = path.join(__dirname, './../src/data.json')
let timers = JSON.parse(fs.readFileSync(dataFile).toString())

router.get('/timers', function (req, res) {
    res.json(timers)
})

router.post('/timers', function(req, res) {
    let timer = {
        title: req.body.title? req.body.title : 'Timer',
        project: req.body.project? req.body.project : 'Project',
        id: uuid.v4(),
        elapsed: 0
    }
    timers.push(timer)
    fs.writeFileSync(dataFile, JSON.stringify(timers), 'utf8');
    res.json(timers)
})

router.delete('/timers', function(req, res) {
    let timerId = req.body.id? req.body.id : null
    if (!timerId) {
        res.json({flag: 0})
    } else {
        console.info(timerId)
        timers = timers.filter(t => t.id !== timerId)
        fs.writeFileSync(dataFile, JSON.stringify(timers), 'utf8');
        res.json(timers)
    }
})

router.put('/timers', function(req, res) {
    let timerInfo = {
        id: req.body.id? req.body.id : null,
        title: req.body.title? req.body.title : null,
        project: req.body.project? req.body.project : null
    }
    if (!timerInfo.id || !timerInfo.title || !timerInfo.project) {
        res.json({flag: 0})
    } else {
        timers = timers.map((timer) => {
            if (timer.id === timerInfo.id) {
                return Object.assign({}, timer, {
                    title: timerInfo.title,
                    project: timerInfo.project
                })
            } else {
                return timer
            }
        })
        fs.writeFileSync(dataFile, JSON.stringify(timers), 'utf8');
        res.json(timers)
    }
})

router.post('/timers/start', function(req, res) {
    let timerId = req.body.id? req.body.id : null
    if (!timerId) {
        res.json({flag: 0})
    } else {
        const now = Date.now()
        timers = timers.map((timer) => {
            if (timer.id === timerId) {
                return Object.assign({}, timer, {
                    runningSince: now
                })
            } else {
                return timer
            }
        })
        fs.writeFileSync(dataFile, JSON.stringify(timers), 'utf8');
        res.json(timers)
    }
})

router.post('/timers/stop', function(req, res) {
    let timerId = req.body.id? req.body.id : null
    if (!timerId) {
        res.json({flag: 0})
    } else {
        const now = Date.now()
        timers = timers.map((timer) => {
            if (timer.id === timerId) {
                const lastElapsed = now - timer.runningSince
                return Object.assign({}, timer, {
                    elapsed: timer.elapsed + lastElapsed,
                    runningSince: null
                })
            } else {
                return timer
            }
        })
        fs.writeFileSync(dataFile, JSON.stringify(timers), 'utf8');
        res.json(timers)
    }
})

module.exports = router