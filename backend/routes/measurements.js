import express from 'express';
const router = express.Router();

import Measurement from '../models/Measurement.js';

// Submit measurement order
router.post('/submit', async (req, res) => {
  try {
    const {
      garmentType,
      customerName,
      phone,
      email,
      measurements,
      notes,
    } = req.body;

    // Validate required fields
    if (!garmentType || !customerName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: garmentType, customerName, and phone are required',
      });
    }

    const order = new Measurement({
      garmentType,
      customerName,
      phone,
      email: email || '',
      measurements: measurements || {},
      notes: notes || '',
    });

    await order.save();

    console.log('New measurement order saved to DB:', order._id);

    res.status(201).json({
      success: true,
      message: 'Measurement order submitted successfully',
      orderId: order._id,
    });
  } catch (error) {
    console.error('Error submitting measurement:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
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

export default router;

