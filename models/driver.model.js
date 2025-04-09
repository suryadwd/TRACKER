const mongoose = require('mongoose')

const driverSchmea = new mongoose.Schema({

  name: { type: String, required: true},
  vehicle: { type: String, required: true},
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },

  status: { type: String, enum: ["Available", "On Delivery"], default: "Available"}
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchmea)