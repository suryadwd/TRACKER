
module.exports = {
  registerDriver : async(req, res) => {
    
    try {
      
      const {name, vehicle, lat, log} = req.body

      const newDriver = new Driver({
        name,
        vehicle,
        location:{ lat, log } 
      })

      await newDriver.save()

      return res.status(200).json({
        success: true,
        message: "Driver registered successfully"
      })

    } catch (error) {
      console.log("error in the registerDriver Controller",error)    
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }

  }, 
  updateDriverLocation : async(req, res) => {
    try {
      
      const {id} = req.params
      const {lat, log} = req.body

      const driver = await Driver.findById(id)
      if(!driver) return res.status(404).json({
        success: false,
        message: "Driver not found"
      })

      driver.location = { lat, log }

      await driver.save()

      return res.status(200).json({
        success: true,
        message: "Driver location updated successfully"
      })

    } catch (error) {
      console.log("error in the updateDriverLocation Controller",error)
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  },

  getDriverLocation : async(req, res) => {
    try {
      const {id} = req.params
      const driver = await Driver.findById(id)
      if(!driver) return res.status(404).json({
        success: false,
        message: "Driver not found"
      })

      return res.status(200).json({
        success: true,
        message: "Driver location fetched successfully",
        location: driver.location
      })

    } catch (error) {
      console.log("error in the getDriverLocation Controller",error)
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }

}