const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

  customerName: { type: String, required: true},
  customerAddress: { type: String, required: true},
  customerPhone: { type: String, required: true},
  customerLocation: {
    lat: { type: Number, required: true},
    lng: { type: Number, required: true} 
  },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true},
  eta:{ type: String, default:null},
},{timestamps: true});

module.exports = mongoose.model('Order', orderSchema)
