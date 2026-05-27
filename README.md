# Buyer Portal

A full-stack real-estate buyer portal with authentication and favourites management.

## Prerequisites

Make sure you have **Node.js v18 or higher** installed.

Check if Node.js is installed:

```bash
node -v
```

If not installed, download it from https://nodejs.org and install the LTS version.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd buyer-portal
```

### 2. Docker Setup (Redis)

This project uses Redis for caching.

#### i. Pull and run Redis container

Run Redis using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis/redis-stack-server:latest
```

#### ii. Verify Redis is running

```bash
docker ps
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Add `.env` file and add your values (see `.env.example` for reference):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=expire_time_in_seconds
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379

```

Seed the database with sample properties:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Add `.env` file and add your values (see `.env.example` for reference):

```
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

### 5. Open the app

Go to http://localhost:5173 in your browser.

## Example Flow

1. **Register** — click "Get Started" on the landing page → fill in name, email, password
2. **Login** — use your credentials → redirected to dashboard
3. **Browse properties** — click the heart icon on any property to add to favourites
4. **View favourites** — go to "My Favourites" in the sidebar to see saved properties
5. **Remove favourite** — click the X button on any favourited property
6. **Logout** — click your avatar in the navbar → Logout → redirected to landing page

## Tech Stack

- **Frontend** — React, React Router, Tailwind CSS, Axios, React Toastify
- **Backend** — Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
