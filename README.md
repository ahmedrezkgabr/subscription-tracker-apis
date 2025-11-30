# Subscription Tracker – Backend (Under Development)

A backend service for managing user subscriptions, built with **Node.js**, **Express.js**, and **MongoDB**.
This project is currently **in active development**.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (Authentication)
- **bcrypt** (Password hashing)
- **dotenv** (Environment configuration)
- **Arcjet** (Security/Rate limiting)

---

## Modules / Features (Work in Progress)

### Auth

- User registration & login
- JWT-based authentication
- Secure password hashing using bcrypt

### User Module

- Manage user profiles
- Link users to their subscriptions

### Subscription Module

- Create, update, and delete subscriptions
- Track renewal dates, pricing, categories, etc.
- Associate subscriptions with users

---

## Architecture

- **REST API**
- **Modular Express routing**
- **Mongoose models for all main resources**
- Environment-based configuration (`.env.development.local` / `.env.production.local`)

---

## Installation & Setup (Development)

### 1. Clone the repository

```bash
git clone https://github.com/ahmedrezkgabr/subscription-tracker-apis.git
cd subscription-tracker-apis
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create one of the following files depending on the environment:

- `.env.development.local`
- `.env.production.local`

Required variables include:

```
PORT=<server-port>
DB_URI=<mongodb-connection-string>
NODE_ENV=<develompment/productiono>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=<duration>
ARCJET_KEY=<arcjet-key-if-used>
```

### 4. Start the development server

```bash
npm run dev
```

---

## Database

This project uses **MongoDB**.
You must provide a valid MongoDB URI in your environment file

---

## Deployment

- Deployment is currently **manual hosting**.
- Ensure you configure `.env.production.local` on the server.
- Run:

```bash
npm install --production
npm start
```

---

## Authentication

- Uses **JSON Web Tokens (JWT)** for protecting routes.
- Tokens are issued on login and validated via middleware.

---

## API Documentation

API docs are being developed and will include:

- Authentication routes
- User routes
- Subscription routes
- Error handling & examples

> Once the API stabilizes, full documentation will be published.

---
