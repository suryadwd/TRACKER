const express = require('express');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const {connectDb} = require('./config/db')
const PORT = process.env.PORT 


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDb()
})


