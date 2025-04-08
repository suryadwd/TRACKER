const express = require('express');
const router = express.Router();

const { placeOrder, assignDriverForOrder, getOrderDetails, updateOrderStatus} = require('../controller/order.controller')

router.post("/place", placeOrder);

router.put("/assign-driver", assignDriverForOrder);

router.get("/:orderId/status", getOrderDetails);

router.put("/:orderId/status", updateOrderStatus);

module.exports = router;