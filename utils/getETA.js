const axios = require('axios');

module.exports = {
  getETA: async (originLat, originLng, destinationLat, destinationLng) => {
    try {
      const apiKey = process.env.GOOGLE_API_KEY
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`
      const response = await axios.get(url)
      if (response.data.rows[0].elements[0].status !== "OK") throw new Error("Error fetching distance data");
      const { distance, duration } = response.data.rows[0].elements[0]
      return {
        distance: distance.text,
        duration: duration.text
      }

    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
      console.log(error)
    }
  }
}