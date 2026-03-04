import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import measurementRoutes from './routes/measurements.js';
import classRoutes from './routes/classes.js';
import User from './models/User.js';

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

// Helper to ensure admin exists (Auto-seeding)
const ensureAdminExists = async () => {
  try {
    const adminEmail = 'thangamwrites@gmail.com';
    const adminPassword = 'Thangama@547';

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('No admin found. Creating default admin...');
      const newAdmin = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error ensuring admin existence:', error);
  }
};

// MongoDB Connection
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await ensureAdminExists();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

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

