const Driver = require('../models/driver.model')
const Order = require('../models/order.model')
const getEta = require('../utils/getEta')

module.exports = {
  placeOrder : async(req, res) => {
    try {
      const{ customerName, customerAddress, customerPhone, lat, lng } = req.body
      if(!customerName || !customerAddress || !customerPhone || !lat || !lng)  return res.status(400).json({ message: 'All fields are required' })
      
      const availableDriver = await Driver.findOne({ status: 'Available' })
      if(!availableDriver) return res.status(404).json({ message: 'No available drivers' })

      const newOrder = new Order({
        customerName,
        customerAddress,
        customerPhone,
        customerLocation: { lat, lng },
        driver: availableDriver._id,
      })

      await newOrder.save()
      return res.status(201).json({ message: 'Order placed successfully', order: newOrder,  driver: {
        name: availableDriver.name,
        vehicle: availableDriver.vehicle
      }})
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
      console.log(error)
    }
  },
  // assignDriverForOrder: async(req, res) => {
  // try {
  //   const { orderId, driverId } = req.body
  //   const order = await Order.findById(orderId)
  //   const driver = await Driver.findById(driverId)
  //   if (!order)  return res.status(404).json({ message: 'Order not found' })
  //   if (!driver)  return res.status(404).json({ message: 'driver not found' })
  //   const etaData = await getEta(
  //     driver.location.lat,
  //     driver.location.lng, 
  //     order.customerLocation.lat,
  //     order.customerLocation.lng
  //   )
  //   order.driver = driverId
  //   order.status = 'Assigned'
  //   order.eta = etaData.duration
  //   await order.save()
  //   return res.status(200).json({ message: 'Driver assigned successfully', order })
  // } catch (error) {
  //   return res.status(500).json({ message: 'Internal server error' })
  //   console.log(error)
  // }
  // },
  getOrderDetails: async(req, res) => {
    try {
      const { orderId } = req.params
      const order = await Order.findById(orderId).populate('driver')
      if (!order) return res.status(404).json({ message: 'Order not found' })
      return res.status(200).json({ message: 'Order details fetched successfully', order })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
      console.log(error)
    }
  },
  updateOrderStatus: async(req, res) => {
    try {
      const { orderId } = req.params
      const { status } = req.body
      const order = await Order.findById(orderId)
      if (!order) return res.status(404).json({ message: 'Order not found' })
      order.status = status
      await order.save()
      return res.status(200).json({ message: 'Order status updated successfully', order })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
      console.log(error)
    }
  }
}
