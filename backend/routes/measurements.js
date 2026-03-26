import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { sendOrderNotification } from '../utils/email.js';
import Measurement from '../models/Measurement.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/designs';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG, PNG, and PDF files are allowed'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Submit measurement order
router.post('/submit', upload.single('designFile'), async (req, res) => {
  console.log('--- NEW SUBMISSION ---');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body Keys:', Object.keys(req.body || {}));
  console.log('Body Values:', JSON.stringify(req.body, null, 2));
  console.log('File:', req.file ? req.file.originalname : 'No file');
  try {
    const {
      garmentType,
      customerName,
      phone,
      email,
      measurements: measurementsStr,
      notes,
    } = req.body;

    // Parse measurements if it comes as a string (FormData sends it as a string)
    let measurements = measurementsStr;
    if (typeof measurementsStr === 'string') {
        try {
            measurements = JSON.parse(measurementsStr);
        } catch (e) {
            console.error('Error parsing measurements JSON:', e);
        }
    }

    // Validate required fields
    if (!garmentType || !customerName || !phone) {
      const missing = [];
      if (!garmentType) missing.push('garmentType');
      if (!customerName) missing.push('customerName');
      if (!phone) missing.push('phone');
      
      return res.status(400).json({
        success: false,
        message: `[FINAL_CHECK] Missing required fields: ${missing.join(', ')}`,
      });
    }

    const order = new Measurement({
      garmentType,
      customerName,
      phone,
      email: email || '',
      measurements: measurements || {},
      notes: notes || '',
      designFile: req.file ? `/uploads/designs/${req.file.filename}` : '',
    });

    await order.save();

    console.log('New measurement order saved to DB:', order._id);

    // Send email notification
    await sendOrderNotification(order, req.file);

    res.status(201).json({
      success: true,
      message: 'Measurement order submitted successfully',
      orderId: order._id,
    });
  } catch (error) {
    console.error('Error submitting measurement:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
});

// Get all measurements (admin endpoint)
router.get('/all', async (req, res) => {
  try {
    const orders = await Measurement.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// Get measurement by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = measurements.find((m) => m.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  res.json({
    success: true,
    data: order,
  });
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const order = await Measurement.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;

