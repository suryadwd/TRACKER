# Driver Tracking API

A RESTful API for tracking driver locations in real-time for ride-sharing or delivery services applications.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

The API will be available at `http://localhost:6000`.

## Driver Routes

- **Register a new driver**
  - `POST /driver/register`
  - Request body:
    ```json
    {
      "name": "John Doe",
      "vehicle": "Toyota Camry",
      "lat": 37.7749,
      "log": -122.4194
    }
    ```

- **Get driver location**
  - `GET /driver/location/:id`

- **Update driver location**
  - `PUT /driver/location/:id`
  - Request body:
    ```json
    {
      "lat": 37.7749,
      "lng": -122.4194
    }
    ```

# Order Routes 

This documentation covers the order management endpoints for the driver tracking application.

## Available Endpoints

### Place a New Order

Creates a new customer order in the system.

- **URL**: `/order/place`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "customerName": "Jane Smith",
    "customerAddress": "123 Main Street, Anytown",
    "customerPhone": "555-123-4567",
    "lat": 37.7749,
    "lng": -122.4194
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "message": "Order placed successfully",
      "order": {
        "_id": "60d21b4667d0d8992e610c85",
        "customerName": "Jane Smith",
        "customerAddress": "123 Main Street, Anytown",
        "customerPhone": "555-123-4567",
        "customerLocation": {
          "lat": 37.7749,
          "lng": -122.4194
        },
        "status": "Pending",
        "createdAt": "2023-06-22T18:40:39.962Z"
      }
    }
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Internal server error" }`

### Assign Driver to Order

Assigns a specific driver to fulfill a customer order.

- **URL**: `/order/assign-driver`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "orderId": "60d21b4667d0d8992e610c85",
    "driverId": "60d21b4667d0d8992e610c86"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Driver assigned successfully",
      "order": {
        "_id": "60d21b4667d0d8992e610c85",
        "customerName": "Jane Smith",
        "status": "Assigned",
        "driver": "60d21b4667d0d8992e610c86"
      }
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
  - **Content**: `{ "message": "Order not found" }` or `{ "message": "Driver not found" }`
  - **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Internal server error" }`

### Get Order Details

Retrieves detailed information about a specific order, including assigned driver information.

- **URL**: `/order/status/:orderId`
- **Method**: `GET`
- **URL Parameters**: `orderId=[MongoDB ObjectId]`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Order details fetched successfully",
      "order": {
        "_id": "60d21b4667d0d8992e610c85",
        "customerName": "Jane Smith",
        "customerAddress": "123 Main Street, Anytown",
        "customerPhone": "555-123-4567",
        "customerLocation": {
          "lat": 37.7749,
          "lng": -122.4194
        },
        "status": "In Progress",
        "driver": {
          "_id": "60d21b4667d0d8992e610c86",
          "name": "John Doe",
          "vehicle": "Toyota Camry",
          "location": {
            "lat": 37.7750,
            "lng": -122.4180
          }
        },
        "createdAt": "2023-06-22T18:40:39.962Z"
      }
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
  - **Content**: `{ "message": "Order not found" }`
  - **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Internal server error" }`

### Update Order Status

Updates the status of an existing order.

- **URL**: `/order/status/:orderId`
- **Method**: `PUT`
- **URL Parameters**: `orderId=[MongoDB ObjectId]`
- **Request Body**:
  ```json
  {
    "status": "Delivered"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Order status updated successfully",
      "order": {
        "_id": "60d21b4667d0d8992e610c85",
        "customerName": "Jane Smith",
        "status": "Delivered"
      }
    }
    ```
