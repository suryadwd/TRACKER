const Order = require('../models/order.model');
const Driver = require('../models/driver.model');
const  getETA  = require('../utils/getETA');

module.exports = {
  loationDetails: async (req, res) => {
    try {
      const {orderId} = req.params
      const order = await Order.findById(orderId).populate('driver')
      if (!order)  return res.status(404).json({ message: 'Order not found' });
      const driver = await Driver.findById(order.driver._id)
      if (!driver) return res.status(404).json({ message: 'Driver not found' });
      const eta = await getETA(driver.location, order.customerLocation)
      return res.status(200).json({ message: 'ETA fetched successfully', eta })


      } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
      console.log(error)
    }
  }
}