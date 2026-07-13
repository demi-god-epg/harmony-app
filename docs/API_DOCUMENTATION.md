# Harmony Lifebond - API Documentation

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.harmonylifebond.com/api
```

---

## Authentication

All endpoints (except Auth) require JWT token in header:

```bash
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Authentication Endpoints

### Register User

**POST** `/auth/register`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+233541234567",
  "password": "SecurePass123!",
  "ghanaCardId": "GHA-123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "userId": "user-123",
  "token": "eyJhbGc..."
}
```

### Login

**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "user-123",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### Request OTP

**POST** `/auth/request-otp`

```json
{
  "phone": "+233541234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to phone",
  "otpId": "otp-123"
}
```

### Verify OTP

**POST** `/auth/verify-otp`

```json
{
  "otpId": "otp-123",
  "code": "123456"
}
```

---

## 👤 Member Endpoints

### Get Member Profile

**GET** `/members/profile`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "member-123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+233541234567",
    "membershipStatus": "active",
    "membershipDate": "2024-01-15",
    "membershipTier": "gold"
  }
}
```

### Update Member Profile

**PUT** `/members/profile`

```json
{
  "phone": "+233541234567",
  "address": "Accra, Ghana",
  "occupation": "Engineer"
}
```

### Get Member Dashboard

**GET** `/members/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "recentActivity": [],
    "pendingApplications": 2,
    "monthlyDuesStatus": "paid",
    "lastPaymentDate": "2024-07-01",
    "nextPaymentDue": "2024-08-01"
  }
}
```

### Get Member Directory

**GET** `/members?page=1&limit=20&search=john`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "member-123",
      "firstName": "John",
      "lastName": "Doe",
      "occupation": "Engineer",
      "location": "Accra"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 8
  }
}
```

---

## 💳 Payment Endpoints

### Initiate Payment

**POST** `/payments/initiate`

```json
{
  "type": "monthly_dues",
  "amount": 50,
  "currency": "GHS",
  "paymentMethod": "mtn_momo",
  "phoneNumber": "+233541234567"
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "txn-123",
  "amount": 50,
  "currency": "GHS",
  "status": "pending"
}
```

### Verify Payment

**POST** `/payments/verify`

```json
{
  "transactionId": "txn-123",
  "referenceNumber": "REF-2024-001"
}
```

### Get Payment History

**GET** `/payments/history?page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "payment-123",
      "type": "monthly_dues",
      "amount": 50,
      "status": "completed",
      "date": "2024-07-01",
      "reference": "REF-2024-001"
    }
  ]
}
```

---

## 💰 Financial Support Endpoints

### Apply for Support

**POST** `/support/apply`

```json
{
  "type": "funeral",
  "beneficiaryType": "parent",
  "reason": "Death of parent",
  "description": "Father passed away",
  "documents": ["death_certificate.pdf"],
  "supportNeeded": 15000
}
```

**Response:**
```json
{
  "success": true,
  "applicationId": "app-123",
  "status": "pending",
  "appliedDate": "2024-07-13"
}
```

### Get Support Application Status

**GET** `/support/applications/:applicationId`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app-123",
    "type": "funeral",
    "status": "approved",
    "appliedDate": "2024-07-13",
    "approvalDate": "2024-07-14",
    "approvalAmount": 15000,
    "notes": "Approved - Payment processed"
  }
}
```

### List My Applications

**GET** `/support/my-applications?status=pending&type=funeral`

---

## 📰 News & Announcements Endpoints

### Get News Feed

**GET** `/news?page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "news-123",
      "title": "New Business Opportunity",
      "content": "Lorem ipsum...",
      "image": "https://...",
      "publishedDate": "2024-07-13",
      "author": "Admin"
    }
  ]
}
```

### Get Single News

**GET** `/news/:newsId`

---

## 📅 Events Endpoints

### Get Events

**GET** `/events?page=1&limit=10&status=upcoming`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "event-123",
      "title": "Monthly Meeting",
      "description": "General meeting for all members",
      "date": "2024-08-01",
      "time": "18:00",
      "location": "Accra Community Center",
      "attendees": 45
    }
  ]
}
```

### Register for Event

**POST** `/events/:eventId/register`

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "reg-123"
}
```

---

## 👥 Community Endpoints

### Get Discussion Forum Posts

**GET** `/community/forum?page=1&limit=20`

### Create Forum Post

**POST** `/community/forum`

```json
{
  "title": "Business Tips",
  "content": "Here are some business tips...",
  "category": "business"
}
```

### Add Comment

**POST** `/community/forum/:postId/comments`

```json
{
  "content": "Great post!"
}
```

---

## 🏢 Admin Endpoints

### Get Member Applications

**GET** `/admin/applications?status=pending`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "member-app-123",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "appliedDate": "2024-07-10",
      "status": "pending"
    }
  ]
}
```

### Approve Member

**POST** `/admin/applications/:applicationId/approve`

```json
{
  "notes": "Application approved"
}
```

### Reject Member

**POST** `/admin/applications/:applicationId/reject`

```json
{
  "reason": "Incomplete documentation"
}
```

### Approve Financial Support

**POST** `/admin/support/:applicationId/approve`

```json
{
  "approvalAmount": 15000,
  "notes": "Approved for funeral support"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": []
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Authentication failed |
| FORBIDDEN | 403 | Permission denied |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input |
| SERVER_ERROR | 500 | Internal server error |

---

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## Pagination

All list endpoints support pagination:

- `page` (default: 1)
- `limit` (default: 20, max: 100)

---

For more information, visit: harmonylifebond@gmail.com
