const Driver = require('../models/driver.model')
const {registerDriver, getDriverLocation, updateDriverLocation} = require('../controller/driver.controller')
const express = require('express')
const router = express.Router()

router.post('/register', registerDriver)
router.get('/location/:id', getDriverLocation)
router.put('/location/:id', updateDriverLocation)

module.exports = router