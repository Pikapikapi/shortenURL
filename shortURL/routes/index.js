const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const shorten = require('./modules/shorten')
const result = require('./modules/result')
router.use('/', home)
router.use('/shorten', shorten)
router.use('/result', result)

module.exports = router
