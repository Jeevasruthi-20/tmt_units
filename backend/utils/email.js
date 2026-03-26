import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'thangamwrites@gmail.com';

const resend = new Resend(RESEND_API_KEY);

export const verifyTransporter = async () => {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key_here') {
    console.warn('⚠️  RESEND_API_KEY missing — email notifications disabled.');
    return false;
  }
  try {
    // Resend doesn't have a direct "verify" like nodemailer, but we can check if the key is present
    console.log('✅ Resend email service ready');
    return true;
  } catch (err) {
    console.error('❌ Resend service verification failed:', err.message);
    return false;
  }
};

async function sendEmail({ to, subject, html, reply_to, from }) {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key_here') {
    console.warn('⚠️  RESEND_API_KEY not configured — skipping email.');
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || 'TMT Boutique <onboarding@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      reply_to,
      subject,
      html,
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('❌ Network error sending email:', err.message);
    return null;
  }
}

export const sendOrderNotification = async (order, file) => {
  const { customerName, phone, email, garmentType, measurements, notes } = order;

  const data = await sendEmail({
    to: ADMIN_EMAIL,
    reply_to: email || undefined,
    subject: `📋 New Order: ${garmentType} — ${customerName}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
        <h2 style="color:#3c2a21;border-bottom:2px solid #3c2a21;padding-bottom:10px;">New Tailoring Order</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr><td style="padding:8px;font-weight:bold;width:30%;">Name:</td><td style="padding:8px;">${customerName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Garment:</td><td style="padding:8px;color:#3c2a21;font-weight:bold;">${garmentType}</td></tr>
        </table>
        <h3 style="background:#fdfaf7;padding:10px;border-left:4px solid #3c2a21;">Measurements (${measurements?.unit || ''})</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(measurements || {})
            .filter(([key]) => !key.endsWith('_inches') && key !== 'unit')
            .map(([key, value]) => `
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px;font-weight:500;text-transform:capitalize;">${key.replace(/([A-Z])/g, ' $1').trim()}:</td>
                <td style="padding:10px;text-align:right;">${value} ${measurements?.unit || ''}</td>
              </tr>
            `).join('')}
        </table>
        <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px;">
          <p style="margin:0;font-weight:bold;">Additional Notes:</p>
          <p style="margin:10px 0 0 0;color:#555;">${notes || 'None'}</p>
        </div>
        ${file ? `<p style="margin-top:15px;font-size:14px;color:#666;">📎 <strong>Design:</strong> ${file.originalname}</p>` : ''}
        <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">
        <p style="font-size:12px;color:#999;text-align:center;">தங்கம் மகளிர் தையலகம் — Artisan Portal</p>
      </div>`,
  });

  if (data) console.log(`✅ Order email sent for ${customerName}`);
};

export const sendClassNotification = async (enrollment) => {
  const { name, phone, email, type, classType, preferredDate, preferredTime, address, message } = enrollment;

  const data = await sendEmail({
    to: ADMIN_EMAIL,
    reply_to: email || undefined,
    subject: `🎓 New Enrollment: ${classType} — ${name}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
        <h2 style="color:#3c2a21;border-bottom:2px solid #3c2a21;padding-bottom:10px;">New Class Enrollment</h2>
        <span style="background:${type === 'online' ? '#e0f2fe' : '#ecfdf5'};color:${type === 'online' ? '#0369a1' : '#047857'};padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:bold;text-transform:uppercase;">${type} Mode</span>
        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
          <tr><td style="padding:8px;font-weight:bold;width:35%;">Name:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Class:</td><td style="padding:8px;color:#3c2a21;font-weight:bold;">${classType}</td></tr>
          ${preferredDate ? `<tr><td style="padding:8px;font-weight:bold;">Start Date:</td><td style="padding:8px;">${preferredDate}</td></tr>` : ''}
          ${preferredTime ? `<tr><td style="padding:8px;font-weight:bold;">Time Slot:</td><td style="padding:8px;">${preferredTime}</td></tr>` : ''}
          ${address ? `<tr><td style="padding:8px;font-weight:bold;">Address:</td><td style="padding:8px;">${address}</td></tr>` : ''}
        </table>
        ${message ? `<div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px;"><p style="margin:0;font-weight:bold;">Message:</p><p style="margin:10px 0 0 0;color:#555;">${message}</p></div>` : ''}
        <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">
        <p style="font-size:12px;color:#999;text-align:center;">தங்கம் மகளிர் தையலகம் — Academic Portal</p>
      </div>`,
  });

  if (data) console.log(`✅ Class email sent for ${name}`);
};

// Simplified version for the new orders route
export const sendSimpleOrderNotification = async ({ customerName, product, amount }) => {
    const data = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Order from ${customerName}`,
      html: `
        <h2>New Order Received! 🛒</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });
  
    if (data) console.log(`✅ Simple Order email sent for ${customerName}`);
};

