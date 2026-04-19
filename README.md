# Health Tracker

A full-stack health tracking web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Users can register, log daily health metrics, and visualize their progress over time.

---

## Features

- **Authentication** — Register and login with JWT-based session management
- **Daily Health Logging** — Track weight, calories, steps, water intake, and sleep hours
- **Dashboard** — At-a-glance stat cards showing your latest metrics
- **Trend Charts** — Line graphs of weight and steps over your last 10 entries (Recharts)
- **History Table** — View and delete all past entries

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router v6, Recharts |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB, Mongoose                   |
| Auth      | JWT (jsonwebtoken), bcryptjs        |
| HTTP      | Axios                               |

---

## Project Structure

```
healthtracker/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── HealthLog.js      # Health log schema
│   ├── routes/
│   │   ├── auth.js           # POST /api/auth/register, /login
│   │   └── health.js         # GET/POST/PUT/DELETE /api/health
│   ├── .env                  # Environment variables (not committed)
│   ├── server.js             # Express app entry point
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── axios.js      # Axios instance with auth interceptor
    │   ├── components/
    │   │   └── Navbar.js     # Navigation bar
    │   ├── context/
    │   │   └── AuthContext.js  # Global auth state
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── LogHealth.js
    │   │   └── History.js
    │   └── App.js            # Routes and layout
    └── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally  
  *(or a free [MongoDB Atlas](https://cloud.mongodb.com) cluster)*

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd healthtracker
```

### 2. Configure environment variables

Create `backend/.env` with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthtracker
JWT_SECRET=your_secret_key_here
```

### 3. Install dependencies & run the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at **http://localhost:5000**

### 4. Install dependencies & run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at **http://localhost:3000**

---

## API Endpoints

### Auth

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | /api/auth/register   | Register new user |
| POST   | /api/auth/login      | Login user        |

### Health Logs *(requires Authorization header)*

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | /api/health      | Get all logs for user  |
| POST   | /api/health      | Create a new log entry |
| PUT    | /api/health/:id  | Update a log entry     |
| DELETE | /api/health/:id  | Delete a log entry     |

---

## Screenshots

> Dashboard — stat cards and trend chart  
> Log Health — form to record daily metrics  
> History — table of all past entries

---

## License

This project was built as a college assignment.
