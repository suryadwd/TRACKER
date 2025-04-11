const axios = require('axios');

module.exports = {
  getAddress: async (lat, lng) => {
    try {
      const apikey = process.env.GOOGLE_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`
    const res = await axios.get(url)
    if (res.data.status !== "OK") throw new Error("Error fetching address data");
    const address = res.data.results[0]?.formatted_address;
    return address
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  }
}