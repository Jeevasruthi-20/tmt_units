import express from 'express';
import { sendSimpleOrderNotification } from '../utils/email.js';

const router = express.Router();

router.post('/orders', async (req, res) => {
  const { customerName, product, amount } = req.body;

  try {
    // Your existing DB save logic here (if any)

    // Send email notification
    await sendSimpleOrderNotification({ customerName, product, amount });

    res.json({ success: true, message: 'Order placed & email sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;