const express = require('express');
const router = express.Router();

const { placeOrder, assignDriverForOrder, getOrderDetails, updateOrderStatus} = require('../controller/order.controller')

router.post("/place", placeOrder);

router.put("/assign-driver", assignDriverForOrder);

router.get("/status/:orderId", getOrderDetails);

router.put("/status/:orderId", updateOrderStatus);

module.exports = router;