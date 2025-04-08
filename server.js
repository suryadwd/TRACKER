const express = require('express');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const {connectDb} = require('./config/db')
const PORT = process.env.PORT 
const driverRouter = require("./routes/driver.route")
const orderRouter = require("./routes/order.route")

app.use(cors())
app.use(express.json())

app.use('/driver', driverRouter)
app.use('/order', orderRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDb()
})

