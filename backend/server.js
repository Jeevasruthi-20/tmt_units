import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import measurementRoutes from './routes/measurements.js';
import classRoutes from './routes/classes.js';
import User from './models/User.js';
import { verifyTransporter } from './utils/email.js';

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

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Helper to ensure admin exists (auto-seeding / reset password)
const ensureAdminExists = async () => {
  try {
    const adminEmail = 'thangamwrites@gmail.com';
    const adminPassword = 'Thangama@547';

    // Always upsert the admin with the known credentials.
    // This guarantees that deployments (e.g. on Render) have a working admin login.
    const admin = await User.findOneAndUpdate(
      { email: adminEmail.toLowerCase() },
      {
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log(`Admin ensured: ${admin.email} (role: ${admin.role})`);
  } catch (error) {
    console.error('Error ensuring admin existence:', error);
  }
};

// MongoDB Connection
import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

// Explicit file logging for connection status
const logDbStatus = (msg) => {
  try {
    fs.appendFileSync(path.join(__dirname, 'db-status.txt'), `${new Date().toISOString()} - ${msg}\n`);
  } catch (e) {}
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  logDbStatus(`CONNECTION ERROR: ${err.message}`);
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  logDbStatus('CONNECTED SUCCESSFULLY');
});

mongoose.connection.on('disconnected', () => {
  logDbStatus('DISCONNECTED');
});

logDbStatus('ATTEMPTING CONNECTION...');
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000
})
  .then(async () => {
    await ensureAdminExists();
    verifyTransporter(); // Run in background, don't block startup
  })
  .catch((err) => {
    console.error('Initial MongoDB connection error:', err);
    logDbStatus(`INITIAL ERROR: ${err.message}`);
  });

// Routes
console.log('Registering routes...');
app.use('/api/measurements', measurementRoutes);
app.use('/api/classes', classRoutes);

// Auth Routes Inlined
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for: [${email}]`);
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

    // Normalize during lookup
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log(`User not found: [${email}]`);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      console.log(`Password mismatch for: [${email}]`);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    console.log(`Login successful: [${email}]`);
    res.json({ success: true, message: 'Login successful', user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
console.log('Routes registered!');

app.get("/", (req, res) => {
  res.send("Tailoring Backend API is running successfully 🚀");
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tailoring API is running',
    version: '3.1.0' 
  });
});

// Start server with retry on EADDRINUSE
function startServer(port, attempts = 5) {
  const server = app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`SERVER STARTED - VERSION 3.1.0`);
    console.log(`Listening on port ${port}`);
    console.log(`=========================================`);
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

