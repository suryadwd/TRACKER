const express = require('express');
const router = express.Router();

const { loationDetails, geoCodeLocation } = require('../controller/google.controller')

router.get("/location/:orderId", loationDetails);
router.post("/geoCodeLocation", geoCodeLocation);

module.exports = router