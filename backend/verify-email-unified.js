import 'dotenv/config';
import { sendSimpleOrderNotification, sendClassNotification } from './utils/email.js';

console.log('--- Email Verification Script ---');
console.log('Testing with API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');

async function test() {
  console.log('\n1. Testing Simple Order Notification...');
  await sendSimpleOrderNotification({
    customerName: 'Test User',
    product: 'Test Gown',
    amount: 1500
  });

  console.log('\n2. Testing Class Enrollment Notification...');
  await sendClassNotification({
    name: 'Test Student',
    phone: '1234567890',
    email: 'test@example.com',
    type: 'online',
    classType: 'Aari Work',
    preferredDate: '2026-04-01',
    preferredTime: '10:00 AM'
  });

  console.log('\nVerification complete. Check your admin email inbox!');
}

test().catch(console.error);
