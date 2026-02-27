import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import measurementRoutes from './routes/measurements.js';
import classRoutes from './routes/classes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tailoring')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/measurements', measurementRoutes);
app.use('/api/classes', classRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tailoring API is running' });
});

// Start server with retry on EADDRINUSE
function startServer(port, attempts = 5) {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
      if (attempts > 0) {
        const nextPort = Number(port) + 1;
        console.log(`Retrying with port ${nextPort} (${attempts - 1} attempts left)...`);
        // small delay before retrying to allow previous process to shut down
        setTimeout(() => startServer(nextPort, attempts - 1), 300);
      } else {
        console.error('No available ports found. Exiting.');
        process.exit(1);
      }
    } else {
      throw err;
    }
  });
}

startServer(Number(PORT));

