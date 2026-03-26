# Tailoring Website

A modern tailoring website with custom stitching services and craft classes.

## Project Structure

```
tailoring/
├── src/              # Frontend React application
├── backend/          # Backend Express.js API server
└── public/           # Static assets
```

## Features

### Frontend
- **Home Page** - Overview of services and classes
- **About Page** - Information about the tailoring business
- **Stitching Services** - Custom garment stitching with 4 categories:
  - Chudi
  - Pants
  - Blouse
  - Skirts
- **Classes** - Three types of craft classes:
  - Tailoring Classes
  - Aari Work Classes
  - Embroidery Classes
  - Each with Online (preferred time) and Offline (contact) options
- **Measurement Pages** - Detailed measurement guides with images showing correct measurement points

### Backend
- RESTful API for measurement orders
- Class enrollment management
- CORS enabled for frontend communication

## Getting Started

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

### Backend
- Node.js
- Express.js
- CORS
- Body Parser

## Project Structure

### Frontend (`src/`)
- `pages/` - Page components
- `components/` - Reusable components
  - `forms/` - Form components
  - `features/` - Feature components
  - `layout/` - Layout components
  - `ui/` - UI components
- `lib/` - Utility functions and API client
- `hooks/` - Custom React hooks

### Backend (`backend/`)
- `routes/` - API route handlers
- `server.js` - Main server file

## API Endpoints

See `backend/README.md` for detailed API documentation.

## Development

- Frontend: `npm run dev` (port 8080)
- Backend: `cd backend && npm run dev` (port 5000)

## Build

### Frontend
```bash
npm run build
```

### Backend
The backend runs directly with Node.js, no build step required.

## License

ISC
