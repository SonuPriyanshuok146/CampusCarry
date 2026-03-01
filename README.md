# CampusCarry – Campus Gate Delivery Management System

## 1. Introduction

CampusCarry is a secure and efficient delivery handling system designed specifically for managing parcels at the campus gate. It addresses the challenges faced by students who are often busy in academic classes or hostel routines and unable to collect deliveries immediately.

The system digitizes the parcel handling process by introducing authentication, order tracking, delivery verification, and token-based management to ensure transparency and security.

---

## 2. Problem Statement

CampusCarry is designed to manage delivery handling at the campus gate securely and efficiently for students who are busy in classes or hostel routines.

In traditional campus environments, delivery handling is often manual and unstructured. Security guards maintain physical registers, which leads to:

- Delays in parcel distribution  
- Manual entry errors  
- Risk of parcel misplacement  
- Lack of proper verification  
- Unauthorized parcel collection  

Students may not be available at the time of delivery, resulting in confusion and inefficiency.

CampusCarry solves this problem by implementing a digital system that ensures secure authentication, verified parcel handover, and token-based tracking of deliveries.

---

## 3. System Objectives

- Digitally manage parcel entries at campus gate.
- Allow students to register and track their deliveries.
- Enable guards to verify parcel collection using OTP and tracking ID.
- Assign tokens for organized parcel distribution.
- Maintain secure database records.
- Improve efficiency and reduce manual errors.

---

## 4. System Scope

The system includes:

- User Authentication Module
- Order Management Module
- Delivery Verification Module
- Token Management Module
- Admin Management Module

The system is designed for backend API implementation using Node.js and database integration (MongoDB/MySQL).

---

## 5. System Architecture

The system follows a layered architecture:

- Presentation Layer (Frontend / API Client)
- Application Layer (Node.js + Express)
- Database Layer (Student DB, Guard DB, Order DB, Token DB)

Main Components:

- Student
- Guard
- Admin
- Authentication Process
- Order Management Process
- Delivery Verification Process
- Token Management Process

---

## 6. Functional Requirements

### 6.1 Authentication

- Users must log in using valid credentials.
- System validates user role (Student / Guard / Admin).
- Passwords must be securely stored (hashed).

### 6.2 Order Management

- Student can add new order details.
- Order must include:
  - Tracking ID
  - OTP
  - Source
- System stores order in Order Database.
- Order status can be updated.

### 6.3 Delivery Verification

- Guard verifies delivery using:
  - Last 4 digits of Tracking ID
  - OTP
- System validates order details.
- Order status updated to "Delivered" after verification.

### 6.4 Token Management

- Guard requests token assignment.
- System fetches available token.
- Token assigned to order.
- Token availability updated.
- Admin can manage token records.

### 6.5 Admin Management

- Admin can:
  - Add/Remove Guards
  - Manage Tokens
  - Monitor system records

---

## 7. Non-Functional Requirements

### 7.1 Security
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based access control.

### 7.2 Performance
- System should handle multiple concurrent requests.
- Database queries should be optimized.

### 7.3 Reliability
- Data integrity must be maintained.
- All transactions should be logged.

### 7.4 Usability
- Easy API structure.
- Clear status messages.

---

## 8. Database Design (ER Model Summary)

### Entities

#### STUDENT
- student_id (Primary Key)
- name
- hostel_name
- room_number
- mobile
- email
- password

#### GUARD
- guard_id (Primary Key)
- name
- login_id
- password

#### TOKEN
- token_number (Primary Key)
- availability_status

#### ORDER
- order_id (Primary Key)
- student_id (Foreign Key)
- guard_id (Foreign Key)
- token_number (Foreign Key)
- source
- tracking_id
- otp
- status
- created_at

### Relationships

- One Student can place multiple Orders (1:M).
- One Guard can verify multiple Orders (1:M).
- One Token can be assigned to multiple Orders over time (1:M).

---

## 9. Data Flow Overview

### DFD Level 1 Processes

1. Authentication
2. Order Management
3. Delivery Verification
4. Token Management

Data Stores:
- D1: Student DB
- D2: Order DB
- D3: Guard DB
- D4: Token DB

---

## 10. Technology Stack

- Node.js
- Express.js
- MongoDB / MySQL
- JWT Authentication
- bcrypt for password hashing

---

## 11. Installation

```bash
npm install
npm run dev