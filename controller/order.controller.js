const Driver = require('../models/driver.model')
const Order = require('../models/order.model')

module.exports = {
  placeOrder : async(req, res) => {
    try {
      const{ customerName, customerAddress, customerPhone, lat, lng } = req.body
    
      const newOrder = new Order({
        customerName,
        customerAddress,
        customerPhone,
        customerLocation: { lat, lng }
      })
  
      await newOrder.save()
      res.status(201).json({ message: 'Order placed successfully', order: newOrder })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
      console.log(error)
    }
  },
  assignDriverForOrder: async(req, res) => {
  try {
    const { orderId, driverId } = req.body
    const order = await Order.findById(orderId)
    const driver = await Driver.findById(driverId)
    if (!order)  return res.status(404).json({ message: 'Order not found' })
    if (!driver)  return res.status(404).json({ message: 'driver not found' })
    order.driver = driverId
    order.status = 'Assigned'
    await order.save()
    res.status(200).json({ message: 'Driver assigned successfully', order })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
    console.log(error)
  }
  }
}
