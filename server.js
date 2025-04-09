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

// using the socket.io library

const socketIo = require('socket.io')
const http = require('http') // http to creata a server
const server = http.createServer(app)  //crete a server of app(express container) 

// SOCKET.IO setup
const io = socketIo(server, {
  cors:{
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection",(socket)=>{
  console.log("Driver connected", socket.id)
  socket.on("driverLocation",(data) => {
    console.log("New location: ", data)
    io.emit(`LocationUpdates: ${data.driverId}`, data)
  })
  socket.on("disconnect", () => {
    console.log("Driver disconnected", socket.id)
  })
})

//till here code in between 

server.listen(PORT, () => {   //aap ke jaga server le liya
  console.log(`Server running on port ${PORT}`)
  connectDb()
})

