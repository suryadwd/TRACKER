const express = require('express');
const router = express.Router();

const { loationDetails } = require('../controller/google.controller')

router.get("/location/:orderId", loationDetails);

module.exports = router