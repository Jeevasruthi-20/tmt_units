// No package needed — uses Node.js 22 built-in fetch
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

console.log('--- TMT Email Test ---');
console.log('API Key:', RESEND_API_KEY ? RESEND_API_KEY.slice(0, 8) + '...' : '❌ MISSING!');
console.log('Admin Email:', ADMIN_EMAIL || '❌ MISSING!');

if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key_here') {
  console.error('\nPlease add your RESEND_API_KEY to .env first!');
  process.exit(1);
}

console.log('\nSending test email...');

fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'TMT Test <onboarding@resend.dev>',
    to: [ADMIN_EMAIL],
    subject: '✅ TMT Email System — Working!',
    html: '<h2 style="color:#3c2a21">✅ Email system is working!</h2><p>Your <strong>Thangam Magalir Thaiyalagam</strong> email notifications are now fully active.</p>',
  }),
})
  .then((r) => r.json())
  .then((data) => {
    if (data.id) {
      console.log('✅ SUCCESS! Email sent. ID:', data.id);
      console.log('👉 Check your inbox at:', ADMIN_EMAIL);
    } else {
      console.error('❌ FAILED:', JSON.stringify(data, null, 2));
    }
  })
  .catch((err) => {
    console.error('❌ Network error:', err.message);
  });
