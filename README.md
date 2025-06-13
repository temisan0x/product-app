# Ecommerce Backend API

Express.js REST API for ecommerce application with PostgreSQL database.

## Quick Start

### Install dependencies

```bash
npm install
```

### Environment Setup

Create `.env` file:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_NAME=ecommerce
DB_PASSWORD=your_password
NODE_ENV=development
SECRET_KEY=your_secret_key_here
```

### Run the application

```bash
npm run dev    # Development
```

Server runs on http://localhost:4000

## Tech Stack

- Express.js
- Node.js
- PostgreSQL (Sequelize ORM)
- JWT Authentication
- CORS

## API Routes

**Authentication - `/api/v1/auth`**

- `POST /signup` - Register user
- `POST /signin` - Login user

**Users - `/api/v1/users`**

- `GET /` - Get all users
- `GET /:id` - Get user by ID

**Products - `/api/v1/products`**

- `GET /` - Get all products
- `POST /` - Create product
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product

## Authentication Details

**Signup Request**

`POST /api/v1/auth/signup`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

**Signup Response**

```json
{
  "status": "success",
  "message": "user successfully created",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "CUSTOMER"
  }
}
```

**Signin Request**

`POST /api/v1/auth/signin`

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Signin Response**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "CUSTOMER"
  }
}
```

## Test Endpoints

```bash
# Welcome message
GET http://localhost:4000/

# Register user
curl -X POST http://localhost:4000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login user
curl -X POST http://localhost:4000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Security Features

- JWT Authentication - Token-based auth system
- Password Validation - Secure password handling
- Email Uniqueness - Prevents duplicate accounts
- CORS Protection - Configured for frontend origins
- Input Validation - Request validation schemas
- Error Handling - Global error middleware

## Deployment

Set environment variables on your hosting platform and deploy.
# product-app
