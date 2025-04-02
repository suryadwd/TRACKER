const mongoose = require('mongoose')

const driverSchmea = new mongoose.Schema({

  name: { type: String, required: true},
  vehicle: { type: String, required: true},
  location: { type: Object, required: true},
  status: { type: String, enum: ["Available", "On Delivery"], default: "Available"}
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchmea)