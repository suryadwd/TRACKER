
# 🚚 Driver Tracking API

A RESTful API for managing and tracking real-time driver locations for delivery/ride-sharing services.

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

> Base URL: `http://localhost:6000`

---

## 👤 Driver Routes

### ✅ Register a New Driver

- **Method**: `POST`
- **URL**: `/driver/register`

Registers a new driver with initial location data.

#### 🔻 Request Body:
```json
{
  "name": "John Doe",
  "vehicle": "Toyota Camry",
  "lat": 37.7749,
  "lng": -122.4194
}
```

---

### 📍 Get Driver Location

- **Method**: `GET`
- **URL**: `/driver/location/:id`

Fetches current location and details of a driver.

---

### 🔁 Update Driver Location

- **Method**: `PUT`
- **URL**: `/driver/location/:id`

Updates real-time location of a driver.

#### 🔻 Request Body:
```json
{
  "lat": 37.7750,
  "lng": -122.4180
}
```

---

## 📦 Order Routes

### 🛒 Place a New Order (Auto Driver Assignment)

- **Method**: `POST`
- **URL**: `/order/place`

Places a new customer order and **automatically assigns an available driver**.

#### 🔻 Request Body:
```json
{
  "customerName": "Jane Smith",
  "customerAddress": "123 Main Street, Anytown",
  "customerPhone": "555-123-4567",
  "lat": 37.7749,
  "lng": -122.4194
}
```

#### ✅ Success Response:
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "ORDER_ID",
    "customerName": "Jane Smith",
    "customerAddress": "123 Main Street, Anytown",
    "customerPhone": "555-123-4567",
    "customerLocation": {
      "lat": 37.7749,
      "lng": -122.4194
    },
    "status": "Pending",
    "createdAt": "..."
  },
  "driver": {
    "name": "John Doe",
    "vehicle": "Toyota Camry"
  }
}
```

#### ❌ Error Responses:
- 400 Bad Request: `All fields are required`
- 404 Not Found: `No available drivers`
- 500 Internal Server Error

---

### 📋 Get Order Details

- **Method**: `GET`
- **URL**: `/order/status/:orderId`

Retrieves full order details including the assigned driver.

#### ✅ Success Response:
```json
{
  "message": "Order details fetched successfully",
  "order": {
    "_id": "ORDER_ID",
    "customerName": "Jane Smith",
    "customerAddress": "123 Main Street, Anytown",
    "customerPhone": "555-123-4567",
    "customerLocation": {
      "lat": 37.7749,
      "lng": -122.4194
    },
    "status": "Assigned",
    "driver": {
      "_id": "DRIVER_ID",
      "name": "John Doe",
      "vehicle": "Toyota Camry",
      "location": {
        "lat": 37.7750,
        "lng": -122.4180
      }
    },
    "createdAt": "..."
  }
}
```

#### ❌ Error Responses:
- 404 Not Found: `Order not found`
- 500 Internal Server Error

---

### 🔄 Update Order Status

- **Method**: `PUT`
- **URL**: `/order/status/:orderId`

Updates the status of an existing order (e.g., Picked up, Delivered).

#### 🔻 Request Body:
```json
{
  "status": "Delivered"
}
```

#### ✅ Success Response:
```json
{
  "message": "Order status updated successfully",
  "order": {
    "_id": "ORDER_ID",
    "status": "Delivered"
  }
}
```

#### ❌ Error Responses:
- 404 Not Found: `Order not found`
- 500 Internal Server Error

---

## 🛰️ Coming Soon: Real-Time Tracking (via Socket.IO)

**Driver emits:**
- `locationUpdate` → `{ driverId, lat, lng }`

**Client receives:**
- `locationUpdate` → Updated driver position in real-time

Stay tuned for the live map integration 🎯

---

> Built with ❤️ using MERN stack + WebSockets + Google Maps API
