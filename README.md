# 🛒 E-Commerce Backend API (Node.js + Express)

A fully functional backend system for an e-commerce application built using **Node.js**, **Express**, and **MongoDB**.  
This project focuses on building a scalable, secure, and production-ready REST API with authentication, file uploads, and payment integration.

---

## 🚀 Features

### 👤 User Management
- User registration & login
- Secure password hashing using **bcrypt**
- Authentication using **JWT tokens**

### 🔐 Admin Control
- Admin login functionality
- Protected routes using custom **adminAuth middleware**
- Only admins can add/manage products

### 🛍️ Product Management
- Create, read, update, and delete products
- Image upload using **Multer** (temporary storage)
- Cloud storage integration with **Cloudinary**

### 🛒 Cart System
- Add/remove items from cart
- Protected routes using authentication middleware

### 📦 Order System
- Create and manage orders
- Structured order model

### 💳 Payment Integration
- Integrated **Stripe** payment gateway

### 🧪 API Testing
- All endpoints tested using **Postman**

---

## 🏗️ Project Structure

```
backend/
│
├── config/
│   ├── cloudinary.js
│   └── mongooseDB.js
│
├── controllers/
│   ├── cart.controller.js
│   ├── order.controller.js
│   ├── product.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── adminAuth.js
│   ├── auth.js
│   └── multer.js
│
├── models/
│   ├── order.model.js
│   ├── product.model.js
│   └── user.model.js
│
├── routes/
│   ├── cart.route.js
│   ├── order.route.js
│   ├── product.route.js
│   └── user.route.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary
- Stripe
- Postman

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the server
```bash
npm run server
```

Server will run on:
```
http://localhost:5000
```

---

## 📡 API Base URL

```
http://localhost:5000/api
```

---

## 🧪 API Testing

Use **Postman** to test:

- User authentication (Register/Login)
- Product management (Admin only)
- Cart operations
- Order creation & payment

---

## 🔒 Authentication Flow

- User logs in → receives JWT token  
- Token is used to access protected routes  
- Admin routes require additional authorization  

---

## 📌 Sample Endpoint

### Register User

**POST** `/api/user/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

## 📌 Future Improvements

- Add frontend (React / MERN stack)
- Implement advanced user roles
- Add product categories & filters
- Improve error handling & logging
- Deploy application (Render / Railway / AWS)

---

## 👨‍💻 Author

**Muhammad Hassan Asif**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
<!-- 

config mongooseDB Cloudinary
Added all the folder structure

Added user - model routes 
created user controller
add hashing to the password (bcrypt) and created token (jwt)

Added product - model routes 
created multer middleware ((handles file - Temporary storage)) add it in product routes to get the prodect photo
create product controller (storge images in cloudinary)

added admin Login in user controller
created admin auth middleware 
added admin wuth middleware in the product route(all product, so only admin can add product) 


created cart routes 
created auth middleware and added it in the cart routes

created order model, order routes
added order controllers
added stripe method
 -->

