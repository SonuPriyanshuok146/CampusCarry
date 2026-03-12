# CampusCarry – Campus Gate Delivery Management System

## 1. Introduction

CampusCarry is a backend system designed to manage and secure parcel deliveries inside a university campus. Many universities face issues where delivery personnel cannot directly access student hostels or academic blocks. Parcels are usually received at the campus gate by security guards, and students must collect them later.

The CampusCarry system solves this problem by introducing a secure delivery verification and parcel management system.

The system allows:

- Students to register expected deliveries 
- Security guards to verify arriving parcels  
- A secure OTP-based verification for parcel collection
- Token-based parcel pickup management

The backend is built using Node.js, Express.js, and MongoDB, following a modular MVC architecture with proper authentication, validation, and role-based access control.

---

## 2. Problem Statement

In many university campuses:

- Delivery agents cannot access hostels or academic buildings.  
- Security guards receive parcels without proper tracking. 
- Students must manually search for their packages. 
- There is no secure verification mechanism to confirm parcel ownership. 

This leads to:

- Parcel misplacement  
- Unauthorized parcel pickup
- Lack of delivery tracking

CampusCarry provides a secure, structured system to solve these problems.

---

## 3. System Objectives
The main objectives of CampusCarry are:
- Provide a secure parcel delivery management system.
- Allow students to register expected deliveries.
- Allow security guards to verify deliveries at the campus gate.
- Use OTP and token verification to prevent unauthorized parcel collection.
- Maintain delivery records and tracking information.
- Provide a scalable backend architecture.

---

## 4. System Architecture

CampusCarry backend follows MVC (Model-View-Controller) architecture.

Client (Frontend / Postman) │ Express Routes │ Controllers │ Models (MongoDB) │ Database

Additional layers:
- Middlewares
- Validators
- Utilities
- Authentication (JWT)
- Role-Based Access Control


---

## 5. Technology Stack

| Component | Technology |
|----------|------------|
| Backend Runtime | Node.js |
| Web Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (JSON Web Token) |
| Validation | express-validator |
| Environment Variables | dotenv |
| API Testing | Postman |
| Email Testing | Mailtrap |

---

## 6. Key Features

### User Authentication
- User Registration
- Login
- Logout
- Email Verification
- Password Reset
- Refresh Access Token

### Delivery Order System
- Students can create delivery orders.
- Each order includes a tracking ID and OTP.

### Guard Verification
- Guards verify deliveries arriving at the campus gate.
- Verification is done using tracking ID and OTP.

### Parcel Pickup Token
- Pickup token generated for student collection.

### Role-Based Access Control

Roles in the system:

```
Student
Guard
Admin
```

---

## 7. Authentication System

CampusCarry uses **JWT authentication**.

Login Flow:

```
User Login
     |
Server generates Access Token
     |
Client stores token
     |
Client sends token in Authorization header
     |
verifyJWT middleware verifies user
```

Authorization header example:

```
Authorization: Bearer ACCESS_TOKEN
```

---

## 8. Technical Specifications

## Base API URL

```
/api/v1
```

---

# 8.1 Authentication Routes

### Register User

```
POST /api/v1/auth/register
```

Request Body

```json
{
  "email": "user@email.com",
  "username": "student1",
  "password": "123456",
  "fullName": "Student Name"
}
```

---

### Login User

```
POST /api/v1/auth/login
```

---

### Logout User

```
POST /api/v1/auth/logout
```

---

### Get Current User

```
POST /api/v1/auth/current-user
```

---

### Refresh Access Token

```
POST /api/v1/auth/refresh-token
```

---

### Verify Email

```
GET /api/v1/auth/verify-email/:verificationToken
```

---

### Forgot Password

```
POST /api/v1/auth/forgot-password
```

---

### Reset Password

```
POST /api/v1/auth/reset-password/:resetToken
```

---

### Change Password

```
POST /api/v1/auth/change-password
```

---

### Resend Email Verification

```
POST /api/v1/auth/resend-email-verification
```

---

# 8.2 Order Routes (Student)

### Create Delivery Order

```
POST /api/v1/orders
```

Request Body

```json
{
  "deliveryService": "Amazon",
  "trackingId": "AMZ123456",
  "deliveryOtp": "654321"
}
```

---

### Get Student Orders

```
GET /api/v1/orders/my-orders
```

---

### Get Order By ID

```
GET /api/v1/orders/:orderId
```

---

### Cancel Order

```
DELETE /api/v1/orders/:orderId
```

---

# 8.3 Token Routes

### Generate Pickup Token

```
POST /api/v1/tokens/generate
```

---

### Verify Pickup Token

```
POST /api/v1/tokens/verify
```

---

# 8.4 Guard Routes

### Get Pending Deliveries

```
GET /api/v1/guard/deliveries
```

---

### Verify Delivery Arrival

```
POST /api/v1/guard/verify-delivery
```

Request Body

```json
{
  "trackingId": "AMZ123456",
  "otp": "654321"
}
```

---

### Handover Parcel

```
POST /api/v1/guard/handover
```

---

# 8.5 Delivery Routes

### Mark Delivery Arrived

```
POST /api/v1/delivery/arrived
```

---

### Confirm Delivery Pickup

```
POST /api/v1/delivery/pickup
```

---


## 9. Middleware

### Authentication Middleware

```
verifyJWT
```

Verifies JWT token and authenticates the user.

---

### Role Middleware

```
verifyStudent
verifyGuard
verifyAdmin
```

Restricts access based on user role.

---

### Validation Middleware

```
validate
```

Uses express-validator to validate request data.

---

### Error Handling Middleware

Centralized error handling ensures consistent API responses.

---

## 10. Security Features

CampusCarry implements several security measures:

- JWT Authentication
- Role-Based Authorization
- Input Validation
- Password Hashing using bcrypt
- OTP Verification
- Token Expiration
- Centralized Error Handling

---

# 11. Environment Variables

Create a `.env` file.

```
PORT=8000

MONGODB_URI=mongodb://localhost:27017/campuscarry

ACCESS_TOKEN_SECRET=accessSecret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=refreshSecret
REFRESH_TOKEN_EXPIRY=10d
```

---

# 12. Running the Project

### Install Dependencies

```
npm install
```

### Start Server

```
npm run dev
```

Server runs at:

```
http://localhost:8000
```

---

# 13. Testing APIs

Tools used for testing:

- Postman
- Mailtrap

Example testing flow:

```
Register User
Login User
Create Delivery Order
Guard Verifies Delivery
Generate Pickup Token
Student Collects Parcel
```

---

# 14. Future Improvements

Possible improvements for the system:

- Mobile application integration
- QR code based parcel pickup
- Real-time delivery notifications
- Admin dashboard
- Delivery analytics system

---

# 15. Conclusion

CampusCarry provides a secure and structured solution for managing parcel deliveries inside a university campus. By integrating authentication, OTP verification, and role-based access control, the system ensures that deliveries are properly tracked and securely handed over to the correct student.

The backend architecture is modular and scalable, making it suitable for future enhancements such as mobile applications, real-time notifications, and analytics dashboards.
