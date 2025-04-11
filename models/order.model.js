const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

  customerName: { type: String, required: true},
  customerAddress: { type: String, required: true},
  customerPhone: { type: String, required: true},
  customerLocation: {
    lat: { type: Number, required: true},
    lng: { type: Number, required: true} 
  },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null},
  eta:{ type: String, default:null},
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Picked Up', 'Delivered'], // example statuses
    default: 'Pending'
  }
  
},{timestamps: true});

module.exports = mongoose.model('Order', orderSchema)
