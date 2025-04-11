const Order = require('../models/order.model');
const Driver = require('../models/driver.model');
const  getETA  = require('../utils/getETA');
const getAddress = require('../utils/getAddress');
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
  },
  geoCodeLocation: async (req, res) => {
    try {
      const {lat, lng} = req.body
      if(!lat || !lng) return res.status(400).json({ message: 'Latitude and Longitude are required' });
      const address = await getAddress(lat, lng)
      if (!address) return res.status(404).json({ message: 'Address not found' });
      return res.status(200).json({ message: 'Address fetched successfully', address })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
      console.log(error)
    }
  }
}