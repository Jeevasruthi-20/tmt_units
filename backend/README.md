# Tailoring Website Backend API

Backend server for the Tailoring Website built with Express.js.

## Features

- RESTful API for measurement orders
- Class enrollment management (online and offline)
- CORS enabled for frontend communication
- JSON request/response handling

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Measurements
- `POST /api/measurements/submit` - Submit a measurement order
  - Body: `{ garmentType, customerName, phone, email?, measurements, notes? }`
- `GET /api/measurements/all` - Get all measurement orders (admin)
- `GET /api/measurements/:id` - Get a specific measurement order

### Classes
- `POST /api/classes/online` - Submit online class enrollment
  - Body: `{ name, email, phone, classType, preferredDate, preferredTime }`
- `POST /api/classes/offline` - Submit offline class contact request
  - Body: `{ name, email, phone, classType, address?, message? }`
- `GET /api/classes/all` - Get all enrollments (admin)
- `GET /api/classes/:id` - Get a specific enrollment

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Notes

- Currently uses in-memory storage. For production, integrate with a database (MongoDB, PostgreSQL, etc.)
- Add authentication middleware for admin endpoints
- Add input validation and sanitization
- Add rate limiting for production use

