const mongoose = require('mongoose');

module.exports = {
  connectDb:  () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))
  }
}