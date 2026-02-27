import express from 'express';
import ClassEnrollment from '../models/ClassEnrollment.js';

const router = express.Router();

// Submit online class enrollment
router.post('/online', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      classType,
      preferredDate,
      preferredTime,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !classType || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create enrollment
    const enrollment = new ClassEnrollment({
      type: 'online',
      name,
      email,
      phone,
      classType,
      preferredDate,
      preferredTime,
    });

    await enrollment.save();

    console.log('New online class enrollment:', enrollment);

    res.status(201).json({
      success: true,
      message: 'Online class enrollment submitted successfully',
      enrollmentId: enrollment._id,
    });
  } catch (error) {
    console.error('Error submitting online enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Submit offline class contact request
router.post('/offline', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      classType,
      address,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !classType) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and classType are required',
      });
    }

    // Create contact request
    const contactRequest = new ClassEnrollment({
      type: 'offline',
      name,
      email,
      phone,
      classType,
      address: address || '',
      message: message || '',
    });

    await contactRequest.save();

    console.log('New offline class contact request:', contactRequest);

    res.status(201).json({
      success: true,
      message: 'Contact request submitted successfully. We will contact you soon.',
      requestId: contactRequest._id,
    });
  } catch (error) {
    console.error('Error submitting offline contact:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get all enrollments (admin endpoint)
router.get('/all', async (req, res) => {
  try {
    const enrollments = await ClassEnrollment.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await ClassEnrollment.findById(id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    res.json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;

